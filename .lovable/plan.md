
## Plan: Properly lock the day only after celestial message is acknowledged

### Bug analysis
Currently in `StudentLogin.tsx`, after login we query `submissions` for today's `week`/`day`. If a row exists → send to `LockScreen`. The row is inserted at the **start of the character submit** (before celestial message). So:

- If the student finishes all 3 answers but closes before celestial → row exists → next login is locked. ✅ correct
- But the user reports lock firing for partial flows too. Likely cause: an old test/seed submission row exists for today's `week`/`day` for that student, OR the lock fires correctly but feels wrong because the student doesn't remember finishing.

To make the rule unambiguous and match user intent ("only lock when the WHOLE ritual including celestial message is done"), we move the lock trigger to **explicit completion on the celestial Close button**.

### Changes

**1. `submit_student_response` RPC (DB migration)** — currently inserts the row immediately and that row is what triggers the lock. We change semantics:
- Add a `completed_at timestamptz NULL` column to `submissions`.
- The RPC keeps inserting on character-submit (so parent dashboard still sees the responses), but `completed_at` stays `NULL`.
- Add a new RPC `mark_submission_complete(p_student_id, p_week, p_day)` that sets `completed_at = now()`.

**2. `CelestialMessage.tsx`** — in `handleClose`, call `mark_submission_complete` before `resetSession()`. Only then is the day truly "done".

**3. `StudentLogin.tsx`** — change the lock check from "row exists" to "row exists AND `completed_at IS NOT NULL`". If row exists but not completed → resume at `breathing` (fresh ritual; their text is already saved so re-submit will fail the duplicate guard — see #4).

**4. Handle the duplicate-on-resume case** — if a student logs back in mid-flow, `submit_student_response` would error with "Already submitted today". Update it to **upsert** (`ON CONFLICT (student_id, week, day) DO UPDATE`) so they can overwrite their in-progress responses. Make sure the unique constraint exists.

**5. Parent dashboard week tracker** — update the count query to count rows where `completed_at IS NOT NULL` so the 5-dot tracker reflects truly-finished sessions.

### Files
- New migration: add `completed_at` column, unique constraint on `(student_id, week, day)`, update `submit_student_response` to upsert, add `mark_submission_complete`.
- `src/pages/CelestialMessage.tsx` — call new RPC in `handleClose`.
- `src/pages/StudentLogin.tsx` — check `completed_at` not just row existence.
- `src/pages/ParentDashboard.tsx` — filter weekStatus count by `completed_at IS NOT NULL`.
