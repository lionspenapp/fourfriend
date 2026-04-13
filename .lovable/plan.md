

## Plan: Apply Lapis + Ochre Text Colors Across the App

Update text colors site-wide to match the Babylonian palette from the logo banner.

### Changes

**1. Global heading color** (`src/index.css`)
- Set all h1-h6 to use `text-primary` (Lapis) by default in the base layer

**2. Student Login** (`src/pages/StudentLogin.tsx`)
- Title "Lion's Pen" → Lapis (already `text-primary`, good)
- Subtitle "The Celestial Scriptorium" → Ochre gold
- Labels "Scriber Name", "Secret Word" → Ochre gold
- "Parent Login →" link → Ochre gold

**3. Scriber Oath** (`src/pages/ScriberOath.tsx`)
- "The Scriber's Oath" heading → Lapis (change from `text-secondary`)
- Grade subtitle → Ochre
- Oath text → keep readable foreground
- Button → keep as-is (already secondary/ochre)

**4. Breathing Page** (`src/pages/BreathingPage.tsx`)
- Heading text → Lapis
- Instruction text → Ochre accent

**5. Question Page** (`src/pages/QuestionPage.tsx`)
- Step headers → Lapis
- Category labels → Ochre

**6. Celestial Message** (`src/pages/CelestialMessage.tsx`)
- Title → Lapis
- Decorative text → Ochre

**7. Parent Auth & Dashboard** (`src/pages/ParentAuth.tsx`, `src/pages/ParentDashboard.tsx`)
- Headings → Lapis
- Action links and highlights → Ochre

### Scope
- Text color changes only — no layout or structural changes
- Body text stays as `foreground` for readability
- Buttons retain current styling

