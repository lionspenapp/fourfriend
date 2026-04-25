# Add Subscribe Page

## 1. Create the Subscribe page
- Copy `user-uploads://LionsPenSubscription_1.jsx` into the project as **`src/pages/SubscribePage.tsx`** (renamed; converted to `.tsx` with light typing — `plan: any` props on helper components — content/markup unchanged).
- Replace the JSX comment header with a real component that includes a **Home link at the top**:
  - A `react-router-dom` `<Link to="/">` styled as a small back link (e.g. `← Back to Home`), placed above the header block (`Join the Lion's Pen`).
- Wire each `PlanButton` so clicking it navigates to `/parent?signup=1` (where the actual signup form lives). Trial → `/parent?signup=1`, Monthly/Yearly → same route (subscription billing isn't enabled yet, so the button just routes to signup; we can wire Stripe later if/when requested).
- Keep all existing Tailwind classes from the uploaded file as-is.

## 2. Register the route
- In **`src/App.tsx`**, import `SubscribePage` and add inside the `<Routes>` block (next to the other public pages):
  ```tsx
  <Route path="/subscribe" element={<SubscribePage />} />
  ```

## 3. Wire the "Begin My Child's Journey" CTAs to /subscribe
The CTAs live inside two raw HTML strings rendered via `dangerouslySetInnerHTML`:
- `src/pages/landingHtml.ts` line 575 — `<button class="lp-btn-g">Begin My Child's Journey</button>`
- `src/pages/parentLandingHtml.ts` line 928 — `<button class="lp-btn-gold">Begin My Child's Journey</button>`

Approach (no global handlers, no string-to-React rewrite):
- In **`src/pages/StudentLogin.tsx`** and **`src/pages/ParentAuth.tsx`**, attach a click delegate on the wrapper `<div>` that contains the `dangerouslySetInnerHTML`. The handler checks if the click target is the "Begin My Child's Journey" button (matched by class `lp-btn-g` / `lp-btn-gold` or its text content) and calls `navigate("/subscribe")`.
- This keeps the HTML strings untouched and avoids any global style or DOM mutation.

## 4. Files touched
- **created**: `src/pages/SubscribePage.tsx`
- **edited**: `src/App.tsx` (add route + import)
- **edited**: `src/pages/StudentLogin.tsx` (click delegate on landing wrapper)
- **edited**: `src/pages/ParentAuth.tsx` (click delegate on parent landing wrapper)

## Notes / open question
- The Monthly/Yearly buttons currently have no payment backend. They'll route to `/parent?signup=1` like the trial. If you want Stripe checkout wired in, say the word and I'll enable Lovable's payments integration in a follow-up.
