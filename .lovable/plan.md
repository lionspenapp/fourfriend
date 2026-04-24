## Fix: reset link sends parent to the Lovable login page

### What's actually happening

From the network log of her latest "Forgot password?" click:

```
POST .../auth/v1/recover?redirect_to=https%3A%2F%2Feb436f76-06ed-4ca4-9f7a-be5000022293.lovableproject.com%2Freset-password
```

The `redirect_to` baked into the recovery email is the **Lovable editor's sandbox URL** (`*.lovableproject.com`), not the published site (`pen-guard-vault.lovable.app`). When the email link is clicked from her inbox, it tries to load that sandbox URL — which is a private Lovable editor surface — so she's bounced to **Lovable's login page** instead of Lion's Pen.

This happens because `ParentAuth.tsx` builds the redirect from `window.location.origin`. If anyone (parent OR you while testing inside the editor) clicks "Forgot password?" while the app is running inside the editor preview, the editor origin is what gets baked into the email.

Two extra notes from the same network request:
- `code_challenge: null` — recovery is using the legacy (non-PKCE) flow, so the link will land on `/reset-password` with a session already established. Our updated `ResetPassword.tsx` already handles that case (it checks `getSession()` and enters recovery mode). So once she lands on the right domain, the password form will appear.
- The previous "Invalid or expired" message and today's "Lovable login" detour are two different bugs — this plan fixes the second one.

### The fix (single file: `src/pages/ParentAuth.tsx`)

In `handleForgotPassword`, stop trusting `window.location.origin` blindly. Force the `redirectTo` to the published Lion's Pen site unless we're already on a known public origin.

Pseudocode:

```ts
const PUBLISHED_ORIGIN = "https://pen-guard-vault.lovable.app";
const allowed = /^https?:\/\/(pen-guard-vault\.lovable\.app|.*\.mycaptainslog\.app)$/;
const origin = allowed.test(window.location.origin)
  ? window.location.origin
  : PUBLISHED_ORIGIN;

await supabase.auth.resetPasswordForEmail(resetEmail, {
  redirectTo: `${origin}/reset-password`,
});
```

Effect:
- A parent on `pen-guard-vault.lovable.app` → email link goes to `pen-guard-vault.lovable.app/reset-password` ✓
- A parent on a future custom domain `*.mycaptainslog.app` → email link uses that domain ✓
- You testing inside the Lovable editor (`*.lovableproject.com`) or sandbox preview (`id-preview--*.lovable.app`) → email link is forced to the published `pen-guard-vault.lovable.app/reset-password` so it actually works for real users ✓

### What the parent will experience after the fix

1. Click "Forgot password?" on parent sign-in → enter her email.
2. Email arrives with a link to `https://pen-guard-vault.lovable.app/reset-password?...`.
3. Click → lands on Lion's Pen, brief "Verifying reset link…", then the new-password form (the `ResetPassword.tsx` fix from the previous round handles the session-already-present case).
4. Set new password → "Password updated!" → redirected to sign in.

### Out of scope

- No DB / RLS changes.
- No changes to `auth-email-hook`, recovery email template, queue, or `process-email-queue`.
- No further changes to `ResetPassword.tsx` — last round's fix already covers this flow once the link lands on the right domain.
- Student password reset (parent-driven via `update_student_password`) is unaffected.

### Note on publishing

This is a frontend change. After I apply it, click **Publish → Update** so it ships to `pen-guard-vault.lovable.app`. Then ask her to request a fresh "Forgot password?" link — old emails already in her inbox still point to the editor URL and will keep failing.
