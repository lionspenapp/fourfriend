## Goal

1. Replace logo with the new uploaded version (`lions_logo_cropped_back.png`) and shrink it to ~50% of current size.
2. Make the catchphrase smaller while keeping the existing 3-line layout.
3. Change the "Enter the Scriptorium" button (and equivalent submit buttons on Parent/Reset pages) to gold (matching the "Who Direct and Command AI Era!" ochre/secondary color) instead of the current blue/white.

## Changes

### 1. New logo asset
- Copy `user-uploads://lions_logo_cropped_back.png` → `src/assets/lions_pen_v4.png`.
- Update logo imports in:
  - `src/pages/StudentLogin.tsx`
  - `src/pages/ParentAuth.tsx`
  - `src/pages/ResetPassword.tsx`
  - `src/pages/ParentDashboard.tsx`
  - `src/pages/StudentPortal.tsx`

### 2. Logo size — 50% smaller
- Auth pages currently use `w-[27rem]` → change to `w-[13.5rem]`.
- Dashboard pages keep current sizing (user only mentioned the auth screen logo).

### 3. Smaller catchphrase (still 3 lines)
On `StudentLogin.tsx`, `ParentAuth.tsx`, `ResetPassword.tsx`, change:
```
text-2xl md:text-3xl  →  text-base md:text-lg
text-xl  md:text-2xl  →  text-sm  md:text-base
```
Layout stays as 3 stacked lines, same colors (primary blue + secondary gold for last line).

### 4. Gold submit button
Currently the primary submit buttons use `bg-primary text-primary-foreground` (deep blue background, white text). Change to gold to match the ochre "Who Direct and Command AI Era!" line:
```
bg-secondary text-secondary-foreground hover:bg-secondary/90
```
Apply on:
- `StudentLogin.tsx` — "Enter the Scriptorium"
- `ParentAuth.tsx` — main submit button ("Sign In" / "Create Account")
- `ResetPassword.tsx` — "Update Password"

No other layout, copy, or color changes.