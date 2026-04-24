## Goal

Make the three reflection questions (Academic, Emotion, Character) easier to read by removing the all-caps styling. Only the first letter of the prompt stays capitalized; the rest renders in normal case.

## Root cause

In `src/pages/QuestionPage.tsx`, the `<h2>` that displays the prompt inherits uppercase letters because the prompts in the database / `questionDatabase.ts` are stored in ALL CAPS. The CSS itself doesn't force uppercase — the source text is uppercase.

## Change

Single file: `src/pages/QuestionPage.tsx`

- Add a small `toSentenceCase(str)` helper that:
  - lowercases the whole string
  - capitalizes the first alphabetic character
  - leaves punctuation, numbers, and line breaks intact
- Apply it when rendering the prompt:
  ```tsx
  {loading ? "Loading question…" : toSentenceCase(prompt)}
  ```

The category label ("Academic Reflection — Question 1 of 3") and the Cinzel headings elsewhere stay unchanged. Only the question body text is normalized.

## Why this approach (not editing the DB)

- Non-destructive: original prompts in Supabase / mock data remain untouched.
- Works for every existing and future prompt automatically.
- If you later want true sentence-by-sentence capitalization, we can extend the helper — but for the current single-sentence prompts, capitalizing only the first letter reads cleanly.

## Verification

Open `/student` → start the day → confirm each of the three questions reads like:
"What is one thing you learned today that surprised you?"
instead of:
"WHAT IS ONE THING YOU LEARNED TODAY THAT SURPRISED YOU?"
