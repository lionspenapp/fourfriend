

## Plan: Per-Student Submission Lock

### Problem
The app uses a single `localStorage` key (`lions_pen_last_submission`) shared across all students. When one student submits, every student on that device gets locked.

### Fix

**1. `src/context/LionsPenContext.tsx`**
- Change `hasSubmittedToday()` to accept a student ID and use key `lions_pen_last_submission_{studentId}`
- Change `markSubmitted()` to accept a student ID and write to the student-specific key

**2. `src/pages/StudentLogin.tsx`**
- After successful login, query the database to check if THIS specific student has already submitted today:
  ```sql
  SELECT id FROM submissions WHERE student_id = ? AND week = ? AND day = ?
  ```
- Only lock if a submission exists for THIS student, not others

**3. `src/pages/QuestionPage.tsx`**
- Pass `student.id` to `markSubmitted()` so only that student's key is set

### Result
Each student has their own submission lock. A newly registered student will never be blocked by a sibling's submission.

