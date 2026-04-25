## Goal
Fix the question text overlapping the wooden rollers on the scroll, and improve legibility.

All changes in **`src/pages/QuestionPage.tsx`** on the inner scroll container and prompt `<p>`.

## Changes

### Inner scroll container (currently `py-[8%] sm:py-[6%]`)
- Replace responsive percentage vertical padding with a fixed **60px top and bottom** padding so text never sits on the wooden rollers.
- Keep horizontal padding at **25px** left/right.
- Keep `overflow-y-auto` and `scroll-ink` for thin scrollbar containment.
- Change layout to ensure vertical centering: keep `flex flex-col justify-center` (already there), and add `items-center` so short text remains centered both axes within the flat parchment area.

### Prompt text (`<p>`)
- Increase font size to **1.2rem (~18px)** — replace `text-base sm:text-lg md:text-xl` with a fixed `text-[1.2rem]` (or `text-[18px]`), keeping it readable on all viewports.
- Add `font-weight: 500` (`font-medium`) so the ink looks thicker against the papyrus.
- Keep existing color `rgba(28,28,28,0.9)`, `lineHeight: 1.6`, `font-garamond`, `break-words hyphens-auto`, centered text.

## Resulting style snippet

```tsx
<div
  className="absolute inset-0 flex flex-col justify-center items-center overflow-y-auto scroll-ink"
  style={{ paddingTop: 60, paddingBottom: 60, paddingLeft: 25, paddingRight: 25, background: "transparent" }}
>
  <p
    className="font-garamond font-medium text-[1.2rem] break-words hyphens-auto normal-case text-center"
    style={{ color: "rgba(28,28,28,0.9)", lineHeight: 1.6 }}
  >
    {loading ? "Loading question…" : prompt}
  </p>
</div>
```

## Out of scope
- No changes to scroll background image, response papyrus area, buttons, or DB logic.
