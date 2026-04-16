

## Plan: 5-Slot Weekly Completion Tracker (No Day Labels)

### Changes to `src/pages/ParentDashboard.tsx`

**1. Update `fetchSubmissions`**
- Query submissions for the current week (Sunday–Thursday date range) using the same epoch logic from `LionsPenContext`
- Count how many submissions each student has this week (max 5)
- Store as `weekStatus: { [studentId: string]: number }` — a count of completed sessions

**2. Replace "Today" column with "This Week"**
- Header: "This Week" — no day labels
- Each cell: 5 small circles in a row — filled (✅ or solid gold circle) for each completed session, empty (○) for remaining
- Example: a student who completed 3 of 5 → `● ● ● ○ ○`

**3. No day association**
- Slots fill left-to-right based on count only — no mapping to specific days

### Visual example
```text
| Name  | Grade | This Week     | Gender | ...
| Teddy | 5     | ● ● ● ○ ○    | male   | ...
| Yena  | 8     | ● ● ○ ○ ○    | female | ...
```

### File changed
- `src/pages/ParentDashboard.tsx`

