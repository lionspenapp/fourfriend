

## Plan: Password Visibility Toggle + Unique Backgrounds for Each Page

### 1. Password visibility toggle (eye icon)

Add a show/hide password toggle to all password fields:

**Files:** `src/pages/StudentLogin.tsx`, `src/pages/ParentAuth.tsx`

- Import `Eye` and `EyeOff` icons from `lucide-react`
- Add `showPassword` state for each password field
- Wrap each password `<Input>` in a `relative` div, add an eye icon button at the right side
- Toggle `type` between `"password"` and `"text"`
- StudentLogin: 1 password field (Secret Word)
- ParentAuth: 3 password fields (parent password, child secret code) -- add toggle to each

### 2. Hanging Garden background for Emotion page

- Copy `user-uploads://hanging_garden.jpg` to `src/assets/hanging-garden-bg.jpg`
- In `QuestionPage.tsx`, import it and conditionally apply as full-page background when `type === "emotion"` (same pattern as academic/babylon)
- Add `bg-black/40` overlay for readability

### 3. Daniel background for Character page

- Copy `user-uploads://Daniel.jpg` to `src/assets/daniel-bg.jpg`
- In `QuestionPage.tsx`, import and apply when `type === "character"`
- Add `bg-black/40` overlay

### 4. Palace School background for Oath/Pledge page

- Copy `user-uploads://palace_school.jpg` to `src/assets/palace-school-bg.jpg`
- In `ScriberOath.tsx`, import and set as full-page `bg-cover bg-center` background
- Add `bg-black/40` overlay, ensure content has `z-10`

### 5. River background for Breathing page

- Copy `user-uploads://River.jpg` to `src/assets/river-bg.jpg`
- In `BreathingPage.tsx`, import and set as full-page background
- Add `bg-black/40` overlay, ensure content has `z-10`

### Summary of changes
- **QuestionPage.tsx**: Each question type now gets its own unique background (Babylon for academic, Hanging Garden for emotion, Daniel for character)
- **ScriberOath.tsx**: Palace School background
- **BreathingPage.tsx**: River background
- **StudentLogin.tsx**: Eye toggle on password field
- **ParentAuth.tsx**: Eye toggle on all password fields
- 4 new image assets added

