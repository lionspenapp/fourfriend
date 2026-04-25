# Hide date label on hollow (incomplete) timeline dots

In `src/pages/StudentPortal.tsx`, only show the top date label for days the student has actually completed. Pending/hollow dots should render no date above them (just an empty reserved space so the row stays aligned), while still showing the weekday abbreviation below.

## Change

Inside the timeline node render:

- Replace the unconditional date span with one that renders the formatted date only when `completed` is true.
- Keep a `min-h-[1rem]` on the span so completed and incomplete columns align vertically.

```tsx
<span className="font-cinzel text-[11px] sm:text-xs text-lapis tracking-wide min-h-[1rem]">
  {completed ? dateFmt.format(date) : ""}
</span>
```

The weekday abbreviation below the dot remains for all 5 days. No other changes.