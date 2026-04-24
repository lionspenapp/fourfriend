## Goal

Replace the current logo asset with your newly uploaded cropped version (`lions_logo_croped.png`) so the lion artwork fills more of the visible space without extra whitespace around it.

## Changes

1. **Copy the upload into the project** as a new asset:
   - `user-uploads://lions_logo_croped.png` → `src/assets/lions_pen_v3.png`

2. **Update all logo imports** on the 5 pages currently using the old logo to point at the new cropped file:
   - `src/pages/StudentLogin.tsx` (currently uses `lions_pen_v2.png`)
   - `src/pages/ParentAuth.tsx` (uses `lions_pen.png`)
   - `src/pages/ResetPassword.tsx` (uses `lions_pen.png`)
   - `src/pages/ParentDashboard.tsx` (uses `lions_pen.png`)
   - `src/pages/StudentPortal.tsx` (uses `lions_pen.png`)

   All will switch to: `import lionsPenLogo from "@/assets/lions_pen_v3.png";`

3. **Leave layout/sizing untouched.** Existing classes (`w-[27rem]` on auth pages, smaller sizes on dashboards) stay the same — since the new image has tighter boundaries, the lion will simply appear larger within the same container, which matches your goal.

4. **Old asset files** (`lions_pen.png`, `lions_pen_v2.png`) will be left in place (unused) so nothing breaks if other references appear. They can be deleted later if you want.

## Notes

- The catchphrase headline ("Daily Reflection That Builds Leaders / Who Direct and Command AI Era!") stays exactly as it is.
- No CSS or component structure changes — purely an asset swap.