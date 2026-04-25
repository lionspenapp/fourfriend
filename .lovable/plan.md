## Goal

Improve the Celestial Message "Read to Me" audio quality without any API key or cost, by smarter use of the browser's built-in `window.speechSynthesis`.

## Why current quality is poor

`new SpeechSynthesisUtterance(...)` with no voice set uses whatever default the OS/browser picked — often a low-quality robotic fallback (e.g. Chrome's default on Windows). The browser actually ships several much better voices; we just need to pick one.

## Changes (single file: `src/pages/CelestialMessage.tsx`)

1. **Load and cache voices on mount**
   - Voices load asynchronously in Chrome. Add a `useEffect` that reads `window.speechSynthesis.getVoices()` and listens to the `voiceschanged` event, storing the list in state.

2. **Pick the best voice with a priority list**
   - Prefer high-quality named voices when present, in this order:
     - `Google UK English Female`
     - `Google US English`
     - `Microsoft Aria Online (Natural) - English (United States)`
     - `Microsoft Jenny Online (Natural)`
     - `Samantha` (macOS/iOS — very natural)
     - `Karen` (macOS English AU)
     - `Daniel` (macOS English UK)
   - Fallback chain: any voice whose `name` contains "Natural" or "Online" → any `en-GB` voice → any `en-*` voice → default.

3. **Tune utterance for a calmer, more "celestial" delivery**
   - `rate`: 0.88 (slightly slow, contemplative)
   - `pitch`: 1.0
   - `volume`: 1.0
   - Assign `utterance.voice = chosenVoice` and `utterance.lang = chosenVoice.lang`.

4. **Add light prosody to the spoken string**
   - Insert a short pause between quote, author, and message using ellipses and commas:
     `"${quote} … by ${author}. … ${message}"`
   - Strip markdown-ish characters and collapse extra whitespace before speaking.

5. **Cancel cleanly**
   - Keep the existing toggle behavior (`window.speechSynthesis.cancel()` on stop and on `handleClose`).
   - Ensure `onend`/`onerror` both reset `isSpeaking`.

6. **No UI changes**
   - Same "🔊 Read to Me" / "Stop Reading" button.

## Out of scope

- No new dependencies, no edge functions, no API keys.
- No changes to other pages — Celestial Message is the only place "Read to Me" exists.

## Expected outcome

On Chrome desktop and macOS/iOS Safari, the voice will switch from the default robotic fallback to a noticeably more natural one (Google/Microsoft Natural voices on Chrome, Samantha on Apple devices). On systems with no good voice installed, it will gracefully fall back to the current behavior.