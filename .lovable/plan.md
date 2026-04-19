
## Plan: Student Portal + tone down signature size

### Part 1: Shrink signature font
`src/pages/ScriberOath.tsx` — current inline style `fontSize: "5rem"` is too large. Reduce to `fontSize: "3.5rem"` and keep `lineHeight: "0.85"`. Keep `h-36` input height. This gives a comfortable script size without overflowing the box.

### Part 2: Student Portal

**New route**: `/student/portal` (sits alongside `/student` which is the ritual flow).

**New file**: `src/pages/StudentPortal.tsx`
- Header: greeting with student first name, sign-out button, Babylonian theme (Lapis bg, Ochre accents, Cinzel headings)
- **Weekly Activity card**: 5-dot tracker for current week (Day 1–5). Filled ochre dot = completed, empty = not yet. Below the dots, a list of this week's completed entries (Day, date, expandable to show their 3 responses).
- **Resources card**: static placeholder section ("Reading list", "Reflection guides", "Ask a Mentor") — content can be filled later. Styled as 2–3 clickable tiles.
- **Return to Scriptorium button**: 
  - If today is already completed OR student has done 5 entries this week → button disabled with tooltip
  - Otherwise → routes to `/student` (ritual flow)

**Routing changes** (`src/App.tsx`):
- Add `<Route path="/student/portal" element={<StudentPortal />} />`
- Portal must be guarded — if no `student` in `LionsPenContext`, redirect to `/student` (login).

**Flow integration**:

1. **After celestial close** (`src/pages/CelestialMessage.tsx`):
   - Currently `handleClose` calls `mark_submission_complete` then `resetSession()` (which clears student and sets step back to `login`).
   - New behavior: call `mark_submission_complete`, then `navigate("/student/portal")` instead of resetting. Keep the student in context so the portal can show their data.

2. **On login** (`src/pages/StudentLogin.tsx`):
   - Currently: if today's submission `completed_at` is set → `setStep("lock")`; else → `setStep("breathing")`.
   - New behavior: 
     - Query weekly completed count: `SELECT count FROM submissions WHERE student_id = X AND week = current_week AND completed_at IS NOT NULL`.
     - If today is completed OR weekly count >= 5 → `navigate("/student/portal")` (with a toast warning if weekly is full: "You've finished all 5 weekly sessions").
     - Otherwise → `setStep("breathing")` (enter ritual).

3. **LockScreen** becomes redundant for the "already done today" case since we now go to portal. Keep the file for now but it won't be hit through the normal flow.

### Data fetching for portal
Use `supabase.from("submissions").select("*").eq("student_id", id).eq("week", current_week).not("completed_at", "is", null).order("day")`.

RLS issue: current submissions SELECT policy requires `auth.uid() = parent_id`. Students don't authenticate (they use a custom RPC), so a direct client query won't return rows for them. **Need a new RPC** `get_student_week_submissions(p_student_id, p_week)` (SECURITY DEFINER) that returns the student's completed submissions for the week. Migration adds this function.

### Files touched
- `src/pages/ScriberOath.tsx` — shrink signature font
- `src/pages/StudentPortal.tsx` — new
- `src/App.tsx` — add portal route
- `src/pages/CelestialMessage.tsx` — navigate to portal on close
- `src/pages/StudentLogin.tsx` — route to portal when today done or week full
- New migration — add `get_student_week_submissions` RPC
