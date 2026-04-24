## Goal

Replace the tiny tagline currently overlaid on the logo with a bold, multi-line headline rendered as styled text (like the uploaded screenshot) — placed below the logo, above the "Lion's Pen" title.

## Visual target

Three-line stacked headline using `font-cinzel`, bold, uppercase, large:

```text
DAILY REFLECTION
THAT BUILDS LEADERS
WHO DIRECT AND COMMAND AI ERA!
```

- Lines 1 & 2: deep blue (`text-primary`)
- Line 3: ochre/gold (`text-secondary`)
- Centered, bold, tracked-wide, comfortable line-height

## Changes

Edit three auth pages — `src/pages/StudentLogin.tsx`, `src/pages/ParentAuth.tsx`, `src/pages/ResetPassword.tsx`:

1. Remove the `<p>` overlay currently absolutely positioned inside the logo container (the small tagline added previously).
2. Unwrap the logo back to a plain `<img>` (no relative wrapper needed).
3. Insert a new headline block between the logo and the "Lion's Pen" title:

```tsx
<div className="font-cinzel font-bold uppercase text-center leading-tight tracking-wide mb-4">
  <p className="text-primary text-2xl md:text-3xl">Daily Reflection</p>
  <p className="text-primary text-2xl md:text-3xl">That Builds Leaders</p>
  <p className="text-secondary text-xl md:text-2xl mt-1">
    Who Direct and Command AI Era!
  </p>
</div>
```

4. Since the headline now carries the messaging, optionally remove the redundant smaller taglines ("The Inner Scriptorium" / "where you become who you were meant to be") — **kept as-is unless you say otherwise**.

## Notes

- Wording uses your exact phrasing: "Direct and Command AI Era!" (with the exclamation).
- Visible on all screen sizes (no `hidden sm:block`), text scales responsively.
- No other pages touched (dashboards keep small logos without the headline).
