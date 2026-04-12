

# Lion's Pen — Student Flow (UI Only)

Build the complete student daily ritual as a linear, step-by-step experience with the immersive Babylonian theme described in the PRD. All data will use hardcoded mock content for now — no backend required.

## Design System
- **Color palette**: Lapis Lazuli Blue (#1B3A6B), Golden Ochre (#C8962E), Terracotta (#8B4513), Sand/Cream (#F5E6C8), White (#FFFFFF)
- **Typography**: Serif headings (Cinzel or similar ancient feel), clean body text
- **Visual motifs**: Cuneiform texture overlays, ziggurat-stepped shapes, Ishtar Gate–inspired decorative borders, lion silhouette accents
- **Animations**: Framer Motion page transitions with stepped/reveal effects

## Pages & Flow (strictly linear)

### 1. Student Login Page
- Username + password fields on a Babylonian-themed background
- Mock login accepts any credentials and sets a hardcoded student profile (name, grade level)
- "Parent Login" link visible but non-functional for now

### 2. One-Per-Day Lock Screen (conditional)
- If student already submitted today (mocked via localStorage), show the lock screen
- Lapis Blue background, Golden Ochre text: *"The Scriptorium doors are closed for today..."*
- No way to bypass — session ends here

### 3. Breathing Page
- 60-second countdown timer with animated breathing circle (expand/contract)
- Voice cues: "Breathing in..." / "Breathing out..." text displayed on screen
- Sound selector with 8 options (Ocean Waves, Bird Singing, Water Dropping, Harp, Flute, Wind, Bubble Popping, No Sound) — UI only, placeholder audio
- Controls: [Start], [Repeat], [Enter the Scriptorium] (enabled after timer completes)

### 4. Scriber's Oath
- Grade-appropriate oath text displayed (hardcoded for all 3 grade bands, selected based on mock student grade)
- Two signature fields: First Name + Last Name
- [Enter the Scriptorium] button disabled until both fields are filled

### 5. Academic Question (Step 4)
- Displays a hardcoded sample prompt from the PRD
- Large text area for student response
- Soft sentence count warning (advisory, not blocking)
- [Next] button always enabled

### 6. Emotion Question (Step 5)
- Same layout as Academic, different sample prompt
- [Next] button

### 7. Character Question (Step 6)
- Same layout, different sample prompt
- [Submit to the Celestial Scriptorium] button

### 8. Celestial Message (Step 7)
- Displays author name, pull-quote, and full message body (hardcoded sample)
- [Read to Me] button using Web Speech API (browser TTS)
- [Close] button returns to login page and sets localStorage flag for one-per-day lock

## State Management
- React context to hold current step, student profile, and responses
- Linear step progression enforced — no skipping or back navigation
- localStorage tracks daily submission for the lock screen demo

