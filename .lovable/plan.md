Plan to fix the remaining scroll text overlap:

1. Replace the current full-scroll text overlay with an inner “safe parchment” area
   - Keep the scroll background image as-is.
   - Move the question text into a smaller absolute container positioned away from the wooden rollers.
   - Use percentage-based top/bottom insets instead of only padding, so the text cannot enter the handle zones.

2. Make the text area reliably scroll inside the parchment
   - Apply `overflow-y-auto` only to the inner safe area.
   - Keep the custom thin scrollbar styling.
   - Ensure long database questions scroll within the paper area instead of expanding over the wood.

3. Preserve the requested typography
   - Keep EB Garamond.
   - Keep carbon-ink brown color.
   - Keep font size around `1.2rem` and weight `500`.
   - Keep centered text and 25px side safety spacing.

Technical details:

In `src/pages/QuestionPage.tsx`, I will change the question scroll structure from:

```text
scroll image
└── full inset text container with padding
```

to:

```text
scroll image
└── inner safe parchment container
    └── vertically centered scrolling text
```

The inner container will use something like:

```tsx
className="absolute left-[14%] right-[14%] top-[28%] bottom-[24%] flex items-center justify-center overflow-y-auto scroll-ink"
style={{ paddingLeft: 25, paddingRight: 25, background: "transparent" }}
```

This directly prevents the letters from occupying the top and bottom roller areas, rather than relying on padding inside the full image box.