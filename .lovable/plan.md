Slow down the "Read to Me" speech rate slightly on the Celestial Message page.

## Change
In `src/pages/CelestialMessage.tsx`, lower the speech rate from `0.88` to `0.8` so the narration feels a bit more contemplative without sounding sluggish.

```ts
utterance.rate = 0.8; // was 0.88
```

No other changes — voice selection, pitch, and text processing stay as-is.