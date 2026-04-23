

## Why every day this week shows Benjamin Franklin

### The bug

In `src/pages/CelestialMessage.tsx` line 17:

```ts
const msg = getCelestialMessage(grade, week, 1);
```

The third argument — `day` — is **hardcoded to `1`**. So no matter which day of the week the student completes, the lookup always returns the Week-N / Day-1 author.

For Week 2, grade band 5–6, that's **Benjamin Franklin (M026)**. That's why you've been seeing Ben for two days in a row. Day 2 should be C.S. Lewis, Day 3 St. Paul, Day 4 Socrates, Day 5 Helen Keller — they're all in the database, just never being asked for.

(Worth noting: Week 1 looked correct only by coincidence — Day 1 of Week 1 happened to be the day you tested.)

### The fix

Pass the actual day number into `getCelestialMessage`. The day is already known — `submit_student_response` returns it in its JSON response, and `get_student_week_status` exposes `next_day`. Two small changes:

1. **`QuestionPage.tsx`** — when the character RPC returns `{ success: true, day: N }`, stash `N` in the context (new `currentDay` state) before navigating to the celestial screen.
2. **`LionsPenContext.tsx`** — add `currentDay: number | null` + `setCurrentDay` to the context (reset to `null` in `resetSession`).
3. **`CelestialMessage.tsx`** — read `currentDay` from context and pass it as the third arg. Fallback: if `currentDay` is null (e.g. page refresh), call `get_student_week_status` and use `completed_count` (the day just finished) as the lookup key.

### Scope

- Edit 3 files: `CelestialMessage.tsx`, `QuestionPage.tsx`, `LionsPenContext.tsx`.
- No DB or migration changes — the data and RPCs already carry the right info.
- No template/copy changes; messages M026 / M027 / M028 etc. are already correct in `messageDatabase.ts`.

### Out of scope

- Backfilling Ken's previous celestial views (those are not stored — message is computed at view time, so next time he completes a day he'll see the right author automatically).
- Any change to the day-numbering or week-rollover logic.

