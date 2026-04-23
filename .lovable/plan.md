

## Fix the "Invalid or expired reset link" error on parent password reset

### What's actually broken

When the parent clicks the password-reset link from the email, they land on `/reset-password` and immediately see **"Invalid or expired reset link, back to sign in."** The email send itself is fine (logs confirm `recovery` enqueued + delivered to `parkeunhee327@gmail.com`).

The bug is in `src/pages/ResetPassword.tsx`. It only treats the link as valid if `window.location.hash` contains `type=recovery`:

```ts
if (hash.includes("type=recovery")) setIsRecovery(true);
```

But Supabase's current recovery email (PKCE flow, which is what our SDK uses by default) sends the user to:

```
https://pen-guard-vault.lovable.app/reset-password?code=XXXX
```

— a **`?code=` query param**, NOT a `#type=recovery` hash. So the page never flips `isRecovery` to true and shows the rejection screen, even though the link is perfectly valid.

A second smaller issue: if the link includes `?error=...&error_description=...` (e.g., expired / already used), we currently swallow it and just show the generic message instead of telling the parent what happened.

### The fix (single file)

Update `src/pages/ResetPassword.tsx` so it handles all three valid recovery shapes:

1. **`?code=...` (current PKCE flow — the actual cause of this bug)**
   - On mount, read `code` from `window.location.search`.
   - Call `supabase.auth.exchangeCodeForSession(code)`.
   - On success → `setIsRecovery(true)` and let the parent set a new password.
   - Clean the `?code` out of the URL so a refresh doesn't re-attempt the (now-consumed) exchange.

2. **`#type=recovery&access_token=...` (legacy hash flow)**
   - Keep the existing hash check as a fallback so older email links still work.
   - Keep the `onAuthStateChange` `PASSWORD_RECOVERY` listener.

3. **`?error=...` (expired / already-clicked link)**
   - Read `error` / `error_description` from query (or hash) and show that message instead of the generic "Invalid or expired" screen, with a button to request a new link.

While loading/exchanging, show a brief "Verifying reset link…" state instead of the rejection screen, so legitimate users never flash the error.

No changes to:
- `ParentAuth.tsx` — the `resetPasswordForEmail(..., { redirectTo: \`${origin}/reset-password\` })` call is already correct.
- `auth-email-hook` / recovery email template — they're working (logs confirm delivery).
- DB, RLS, routing in `App.tsx` — `/reset-password` is already a public route above the auth gate.

### How the parent will experience it after the fix

1. Click "Forgot password?" on parent sign-in → enter `parkeunhee327@gmail.com` → receive Lion's Pen recovery email (already working).
2. Click the link → land on `/reset-password` → brief "Verifying…" → password form appears.
3. Enter a new password meeting the rules → "Password updated!" toast → redirected to sign in.
4. If the link was already used or expired → clear message ("This reset link has expired or already been used — request a new one") with a button back to the forgot-password flow.

### Out of scope

- Any change to the recovery email content, branding, or sending pipeline.
- Student password reset flow (students don't use Supabase Auth; their password reset is parent-driven via `update_student_password`).
- Touching `auth-email-hook` or `process-email-queue`.

