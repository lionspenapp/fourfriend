
## Bug

The `day` system is wrong. In `LionsPenContext.tsx`, `getWeekAndDay()` maps:
- Sun→1, Mon→2, Tue→3, Wed→4, Thu→5
- **Fri→5, Sat→5** (capped)

Teddy's only entry was on Saturday April 18 → saved as `day=5`. Today is Sunday April 19 → also computed as `day=1`... wait, let me recheck. April 12 2026 is Sunday (epoch). diffDays for April 18 = 6 → dayInWeek=6 → day=min(7,5)=5. April 19 = diffDays 7 → new week, dayInWeek=0 → day=1.

So today should be week 2 day 1 — and login should let them in. But the entry on April 18 was stored as week 1 day 5, and `weekFull` check uses `subs.length >= 5` (only 1, fine), `todayDone` checks `day===1` (false). They SHOULD get in.

BUT — the user says they can't enter. Looking again: today April 19 → diffDays=7 → weekIndex=1 → week=2. Login fetches week=2 submissions → returns empty → should go to breathing. Unless... the user is testing on a different day than I assume, or something else.

Real issue per user request: **the day numbering is broken**. The current scheme forces a rigid Sun-Thu calendar mapping with Fri/Sat collapsed onto day 5. The user wants flexible: ANY 5 days of the week can be valid entry days, recorded in submission order (1st entry of the week = day 1, 2nd = day 2, etc.).

## Fix Plan

### 1. Redefine "day" as sequence-of-the-week (not calendar weekday)
- Day = `(count of completed submissions this week) + 1`, capped at 5.
- Week = ISO week number since epoch (Sunday-anchored 7-day buckets), cycling 1–4 — keep as-is.
- "Today already done" = does ANY completed submission this week have the same calendar date as today?

### 2. Database changes
New RPC `get_student_week_status(p_student_id, p_week)` returning:
- `submissions` array (existing fields + the calendar date)
- `today_done` bool (any completed_at::date = today)
- `week_full` bool (count >= 5)
- `next_day` int (count + 1)

Keep `get_student_week_submissions` for the portal display.

Update `submit_student_response`: instead of trusting client `p_day`, compute `p_day` server-side as `(SELECT count(*) FROM submissions WHERE student_id AND week AND completed_at IS NOT NULL) + 1`. But there's a subtlety — the row is inserted BEFORE celestial close (completed_at NULL). So compute as `count(completed) + count(in-progress today) + 1`, or simpler: if a row already exists for today's date (completed_at NULL), reuse its day; else assign next sequence number.

Cleanest: add a `entry_date date` column to `submissions`. On `submit_student_response`:
- If row exists with `entry_date = today` → reuse it (UPDATE)
- Else assign `day = (count of distinct entry_dates this week) + 1`, INSERT new row with `entry_date = today`

Drop the `(student_id, week, day)` unique constraint, replace with `(student_id, week, entry_date)`.

### 3. Frontend changes
- `LionsPenContext.tsx`: remove calendar-day mapping. Keep `week` calc. Replace `day` with a value fetched from server (or compute on the fly). Simpler: client no longer passes `day` at all — server assigns it.
- Update `submit_student_response` callers to omit `p_day`.
- Update `mark_submission_complete` to take `p_student_id, p_week` and mark today's row (by entry_date).
- `StudentLogin.tsx`: call new `get_student_week_status` RPC; route to portal if `today_done` OR `week_full`, else to breathing.
- `StudentPortal.tsx`: tracker still shows 5 dots = "Day 1..Day 5" (sequence positions filled by completed entries). Display `entry_date` instead of `completed_at` date label.
- `CelestialMessage.tsx`: call updated `mark_submission_complete` (no day param).
- `ParentDashboard.tsx`: weekly count uses `completed_at IS NOT NULL` (already correct per memory).

### 4. Data migration
For existing submissions, backfill `entry_date` from `submitted_at::date` and renumber `day` per `(student_id, week)` ordered by `submitted_at`.

### Files touched
- New migration: add `entry_date` column, backfill, swap unique constraint, rewrite `submit_student_response`, rewrite `mark_submission_complete`, add `get_student_week_status`.
- `src/context/LionsPenContext.tsx` — drop day calc.
- `src/pages/StudentLogin.tsx` — use new status RPC.
- `src/pages/QuestionPage.tsx` (or wherever character submit RPC is called) — drop day param.
- `src/pages/CelestialMessage.tsx` — drop day param.
- `src/pages/StudentPortal.tsx` — show entry_date, today_done by date.
