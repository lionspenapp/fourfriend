## Problem

Yena's student portal shows **4 days completed** this week, but the parent dashboard shows only **3 dots filled**.

## Root cause

The two views use different sources of truth:

- **Student portal** calls the RPC `get_student_week_status`, which counts every completed submission for the week — no date filter. Returns 4 ✅
- **Parent dashboard** queries the `submissions` table directly with a date window from `getCurrentWeekRange()` that only spans **Sunday → Thursday (5 days)**. Yena's Day 4 was submitted Friday Apr 24, which falls **outside** that window, so it is not counted.

## Fix

Make the parent dashboard use the **same RPC** the student portal uses, so both always agree.

In `src/pages/ParentDashboard.tsx`:
- Remove `getCurrentWeekRange()` helper (no longer needed).
- Add a small `getCurrentWeek()` helper matching the one in `LionsPenContext` (4-week cycle anchored to Apr 12, 2026).
- Replace `fetchSubmissions()` with a loop that calls `supabase.rpc("get_student_week_status", { p_student_id, p_week })` for each student, in parallel via `Promise.all`.
- Store `completed_count` per student in `weekStatus`. The 5-dot rendering stays unchanged.

This guarantees the parent's "This Week" dots always match what the student sees and what's actually in the `submissions` table.

## Files changed

- `src/pages/ParentDashboard.tsx`

No database migration needed.
