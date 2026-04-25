# Weekly Activity → Stacked Timeline

Redesign the "Weekly Activity" card in `src/pages/StudentPortal.tsx` from a vertical list into a single horizontal row of 5 stacked nodes connected by a subtle line.

## What the user will see

A centered timeline inside the existing Weekly Activity card:

```text
   Apr 19      Apr 20      Apr 21      Apr 22      Apr 23
     ●───────────●───────────○───────────○───────────○
    Sun         Mon         Tue         Wed         Thu
```

- Top: short date (e.g., "Apr 19") in Cinzel, lapis blue.
- Middle: status dot — gold filled with a tiny check icon (and soft glow) when completed; hollow lapis-blue outline when not.
- Bottom: weekday abbreviation (e.g., "Sun") in Cinzel uppercase, lapis blue.
- A thin horizontal lapis-blue line (≈1px, ~40% opacity) sits behind the dots connecting all 5 nodes.
- Light cream/parchment background (the card already uses `bg-background` ≈ sand).
- Counter "X / 5" stays, repositioned above or to the right of the timeline.

## State logic

For each of Day 1–5:
- **Completed** (day in `completedDays` set, derived from `submissions`): solid `bg-ochre` (gold) circle, `border-ochre`, white check icon inside, soft `shadow-[0_0_10px_hsl(var(--ochre)/0.5)]` glow.
- **Not completed**: transparent fill, `border-2 border-lapis` outline, no icon.
- Today's node (if not yet completed) gets a subtle pulse ring in lapis to indicate "current".

## Date computation

Submissions carry `entry_date` per day. For days without a submission, derive the date from the week's start so all 5 cells always have a date label.

- Determine week-start (Sunday or Monday — match what the backend uses for `week`; default to Monday since reflections are weekday-oriented). Compute by walking back from today to the most recent Monday.
- For Day N (1..5), date = weekStart + (N-1) days. If a submission exists for Day N, prefer its `entry_date`.
- Format: `Intl.DateTimeFormat` with `{ month: "short", day: "numeric" }` for top label and `{ weekday: "short" }` for bottom label.

## Responsive behavior

- Desktop/tablet: single horizontal row, `flex justify-between items-center`, max-width ~`max-w-2xl mx-auto`.
- Mobile (<480px): keep horizontal row but reduce node size (dot 20px → 16px), font to `text-[10px]`, gap shrinks; the connector line still spans behind. No wrap — 5 small nodes fit on a 320px screen.

## Files to change

- `src/pages/StudentPortal.tsx` — replace the existing 5-dot tracker block AND the per-day "Completed" list inside the Weekly Activity `<Card>` with a single new `<WeeklyTimeline>` block (kept inline in the file; small enough to not need a new component file). Remove the now-redundant submission list rendering. Keep the loading/empty states adapted to the timeline (when loading, render skeleton dots).

## Technical details

- Container: `relative flex items-center justify-between max-w-2xl mx-auto px-2`.
- Connector line: `absolute left-[10%] right-[10%] top-1/2 h-px bg-lapis/30 -z-0` (positioned behind dots; dots get `relative z-10` and a `bg-background` ring so the line doesn't visually cut through hollow circles).
- Dot sizes: `w-6 h-6 sm:w-7 sm:h-7 rounded-full`.
- Completed dot: `bg-ochre border-2 border-ochre text-white shadow-[0_0_10px_hsl(var(--ochre)/0.45)]` with `<Check className="h-3.5 w-3.5" />` inside.
- Pending dot: `bg-background border-2 border-lapis`.
- Today pending dot adds: `ring-2 ring-lapis/30 ring-offset-2 ring-offset-background animate-pulse`.
- Top date label: `font-cinzel text-[11px] sm:text-xs text-lapis tracking-wide`.
- Bottom weekday label: `font-cinzel text-[10px] sm:text-[11px] text-lapis/80 uppercase tracking-widest`.
- Counter "{submissions.length} / 5" moves to a small line under the title: `font-cinzel text-xs text-secondary`.
- Import `Check` from `lucide-react` (already importing from this lib).
- No new dependencies, no schema changes.

## Out of scope

- No changes to Saved Quotations, Resources, Enter the Scriptorium button, or any backend logic.
- No new color tokens — uses existing `lapis`, `ochre`, `background` from `index.css`.