

## Why Day 2 is empty for Ken Gross this week

### What actually happened in the data

Ken's submissions for **Week 2** (the current 4-week-cycle week) in the database:

| Day stored | entry_date | completed_at | Notes |
|---|---|---|---|
| Day 1 | 2026-04-19 (Sun) | ✅ completed | Full entry |
| Day 2 | 2026-04-21 (Tue) | ❌ **NULL** | Started, never finished — academic only, no emotion/character |
| Day 3 | 2026-04-23 (Thu) | ✅ completed | Today's entry |

So Day 2 exists, but `completed_at IS NULL`. The portal's tracker only counts rows where `completed_at IS NOT NULL` (see `get_student_week_submissions`), so Day 2 renders as an empty circle. Meanwhile `submit_student_response` numbers new days as `MAX(day) + 1`, so today's finished entry got labeled **Day 3** even though Day 2 was never completed.

In short: **Ken opened a session on Tue Apr 21, wrote an academic answer, then abandoned the flow before submitting the final character question.** That left an orphan Day-2 row with no `completed_at`, and today's session correctly got assigned Day 3.

### Root cause in the code

`submit_student_response` writes the row at the **end of the academic question** (see `QuestionPage.tsx` — wait, actually it writes at the **end of the character question**). Let me re-check: the RPC is called from `QuestionPage` only when `type === "character"`. So the row is inserted on the character step, then `mark_submission_complete` is called separately from `CelestialMessage` to set `completed_at`.

If the student closes the tab between submitting character and reaching the celestial screen (or the celestial RPC fails), you get exactly this state: row exists, `completed_at` NULL, day number "burned."

### The fix — two parts

**1. Backfill Ken's stuck Day 2 (one-time data fix)**

Decide between:
- **(A) Delete the orphan row.** Day 2 becomes available again. Today's entry gets renumbered to Day 2 on next read… except it's already stored as Day 3. So we'd also need to renumber today's row from 3 → 2. Cleanest narrative ("Ken did Day 1 and Day 2"), but rewrites history.
- **(B) Mark the orphan complete with what he wrote.** Day 2 circle fills, but the entry will show only an academic response (emotion/character blank).
- **(C) Leave it.** Day 2 stays empty forever; today is Day 3. Honest but ugly.

My recommendation: **(A)** — delete the orphan AND renumber today's row to Day 2. It tells the true story (Ken has done 2 sessions this week) and the day numbers stay contiguous.

**2. Prevent it from happening again (code fix)**

In `submit_student_response`, set `completed_at = now()` at insert time. The whole "submit then mark complete" two-step is what creates orphan rows. Drop `mark_submission_complete` from the celestial flow (or keep it as a no-op) and let the row be complete the moment the student finishes the 3rd question.

Trade-off: students who close the tab on the celestial screen would still count as "complete" — but they already finished writing all 3 reflections at that point, which is the meaningful threshold.

### Scope

- One SQL migration to fix Ken's data (delete Day 2 orphan, renumber today's Day 3 → Day 2).
- Update `submit_student_response` to set `completed_at = now()` on insert/update.
- `CelestialMessage` keeps calling `mark_submission_complete` harmlessly (it's idempotent), no UI changes needed.

### Out of scope

- Changing the week-rollover or day-numbering logic.
- Any UI changes to the portal.
- Other students' historical data (only Ken has this issue per the query).

### Question for you

Which orphan-fix do you want — **(A) delete + renumber**, **(B) mark complete as-is**, or **(C) leave it**?

