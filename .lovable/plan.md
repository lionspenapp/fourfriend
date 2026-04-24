## Add show/hide password + confirm-password to the reset-password form

### What changes (single file: `src/pages/ResetPassword.tsx`)

1. **New state**:
   - `confirmPassword: string`
   - `showPassword: boolean` (toggles both fields together — simpler UX)

2. **Two password fields** instead of one:
   - **New Password** with eye icon button on the right to show/hide
   - **Confirm New Password** with the same show/hide state
   - Both use `type={showPassword ? "text" : "password"}`
   - Eye icon: `Eye` when hidden, `EyeOff` when shown (lucide-react)
   - Icon button is absolutely positioned inside the input, themed with `text-foreground/60 hover:text-foreground`, `aria-label` switches between "Show password" / "Hide password"

3. **Live "passwords match" indicator** under the confirm field:
   - Only shown once `confirmPassword.length > 0`
   - Green check + "Passwords match" when equal
   - Muted dot + "Passwords do not match" when different
   - Same `font-cinzel text-xs` styling as the existing password-rules list

4. **Submit validation** in `handleReset`:
   - Existing strength check stays.
   - Add: if `password !== confirmPassword` → toast `{ title: "Passwords don't match", description: "Please retype the same password in both fields.", variant: "destructive" }` and return.
   - Submit button is `disabled` when `loading || !isPasswordValid(password) || password !== confirmPassword` so a mismatched form can't be submitted.

5. **Reset on success**: clear both fields before navigating (defensive — page unmounts anyway).

### Visual / theming

- Reuses existing `inputClass` and Babylonian gold/sand palette — no new colors.
- Eye toggle button: `absolute right-3 top-1/2 -translate-y-1/2`, transparent background, `type="button"` (so it never submits the form).
- Input gets `pr-10` to leave room for the icon.
- Layout stays a single column inside the same gold-bordered card; the card grows by ~one input row.

### Out of scope

- No backend / Supabase changes — same `supabase.auth.updateUser({ password })` call.
- No changes to parent sign-in or sign-up forms (only the reset page, since that's what she asked about). I can apply the same pattern to `ParentAuth.tsx` afterwards if you want.
- No changes to the email link / redirect logic from the previous fix.
