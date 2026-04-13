

## Plan: Save Student Submissions and Show Progress in Parent Dashboard

Currently, student responses are **not saved to the database** — they only exist in memory during the session and are lost when the student closes the page. The `submissions` table exists but nothing writes to it. This means you can't see whether your children completed their reflections.

### What will change

**1. Save responses to the database when a student finishes all 3 reflections**
- When a student clicks "Submit to the Celestial Scriptorium" on the character question (the last one), their three responses will be inserted into the `submissions` table.
- The submission is tied to the student's ID, plus the current week and day.
- File: `src/pages/QuestionPage.tsx` — add a database insert on the final "character" step before advancing to celestial.

**2. Track student ID in session context**
- Currently `StudentProfile` doesn't include `id`. We need the student's database ID to save submissions.
- File: `src/context/LionsPenContext.tsx` — add `id` to `StudentProfile`.
- File: `src/pages/StudentLogin.tsx` — pass the student `id` from the login response into context.

**3. Show submission history in the Parent Dashboard**
- Add a new section or expand the children table to show each child's recent submissions (date, whether completed).
- Parents can see at a glance who completed today's reflection and who didn't.
- File: `src/pages/ParentDashboard.tsx` — fetch from `submissions` table joined with students, display completion status.

**4. Add an RLS policy for anonymous student submissions**
- Students are not authenticated users (no Supabase Auth session). The `submissions` INSERT policy currently requires the parent to be authenticated.
- Create a new database migration: add an INSERT policy allowing the `anon` role to insert into `submissions`, or use a `SECURITY DEFINER` function (like `register_student`) to safely insert submissions without exposing the table.
- Recommended: create an `submit_student_response` RPC function that validates the student ID and inserts the submission securely.

### Technical details

- New DB function `submit_student_response(p_student_id, p_academic, p_emotion, p_character, p_week, p_day)` as `SECURITY DEFINER`
- `StudentProfile` gains an `id: string` field
- `hasSubmittedToday` will check the DB instead of just localStorage (keyed per student)
- Parent Dashboard children table gets a "Today" status column (checkmark or dash)

