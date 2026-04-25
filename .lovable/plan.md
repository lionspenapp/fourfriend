# Show weekday only on completed dots (and label as "Day N" otherwise)

In `src/pages/StudentPortal.tsx` weekly timeline, we currently render a weekday abbreviation under every dot using a derived "this week's Monday" date. Since we don't actually know the real calendar dates for incomplete days, the bottom label for hollow dots is misleading.

## Change

For each of the 5 timeline nodes:

- If `completed`: keep top date (e.g. "Apr 19") and bottom weekday (e.g. "Sun"), both derived from the actual `entry_date` of the submission.
- If not completed: render no date on top and "Day N" (1..5) on the bottom instead of a weekday.

Replace the bottom span:

```tsx
<span className="font-cinzel text-[10px] sm:text-[11px] text-lapis/80 uppercase tracking-widest">
  {completed ? dayFmt.format(date) : `Day ${d}`}
</span>
```

No other changes; the `weekStart` / `dayFmt` calculation stays in place but is only consulted for completed entries' formatting (already the case for the date label).