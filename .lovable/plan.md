

## Change tagline under "Lion's Pen" title

Replace the subtitle on the Student Login screen from "The Celestial Scriptorium" to a new two-line tagline that better reflects the inward, personal nature of the practice.

### Change

**File:** `src/pages/StudentLogin.tsx` (line 95)

Replace:
> The Celestial Scriptorium

With:
> **THE INNER SCRIPTORIUM**
> *where you become who you were meant to be*

### Layout

- Line 1 — "THE INNER SCRIPTORIUM": keep the existing gold/secondary color, Cinzel font, uppercase, wide tracking — same visual weight as today.
- Line 2 — "where you become who you were meant to be": smaller, lighter (e.g. `text-secondary/80`), normal case, italic, tighter tracking. Sits directly below line 1 with a small gap.

### Scope

Only the Student Login subtitle changes. Out of scope (left untouched):
- Oath text in `src/data/mockContent.ts` ("Scriber of the Celestial Scriptorium") — this is ceremonial/historical lore, distinct from the personal entry tagline.
- "Submit to the Celestial Scriptorium" button on `QuestionPage.tsx` — refers to the act of sending the reflection upward, which still fits the celestial framing.
- "A Message from the Celestial Scriptorium" header on `CelestialMessage.tsx` — the reply genuinely comes from above, so the celestial framing is correct here.

If you'd like any of those three other surfaces also rephrased to "Inner Scriptorium," say the word and I'll fold them in.

