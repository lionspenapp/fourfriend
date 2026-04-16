

## Plan: Enlarge Scroll by ~10%

### Changes to `src/pages/QuestionPage.tsx`

**1. Increase scroll container width and height**
- Change `max-w-2xl` on the outer `motion.div` (line 112) to `max-w-3xl` — this widens the scroll by ~10-15%
- Change the scroll's `aspectRatio` from `"2 / 1.4"` to `"2 / 1.6"` — makes the scroll taller to fit longer prompts
- Reduce the question text font size from `text-xl` to `text-lg` as a safety measure for very long prompts

### File changed
- `src/pages/QuestionPage.tsx` (3 small edits)

