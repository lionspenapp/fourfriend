

## Plan: Connect mylionspen.com for branded auth emails

### Step 1 — Set up the email sender domain

Open the email setup dialog and enter `mylionspen.com`. Lovable will provision the subdomain `notify.mylionspen.com` and give you a small set of DNS records (NS records) to add at Hostinger:

1. Log in to Hostinger → **Domains** → `mylionspen.com` → **DNS / Nameservers**.
2. Under **DNS Zone**, add the NS records Lovable shows you (typically two records pointing `notify` to `ns3.lovable.cloud` and `ns4.lovable.cloud`).
3. Save. DNS usually verifies within 10–30 minutes, occasionally longer.

Your apex domain (`mylionspen.com`) keeps working normally — only the `notify.` subdomain is delegated.

### Step 2 — Scaffold and brand the auth email templates

Once the domain is registered with Lovable (does **not** need to be DNS-verified yet), I will:

- Scaffold the 6 auth email templates (recovery, signup, magic link, invite, email change, reauthentication).
- Brand them in Lion's Pen style:
  - White email body (required by email clients) with Lapis `#1B3A6B` primary button, Ochre `#C8962E` accent.
  - Cinzel-style serif headings, clean body copy, ceremonial "Scriber" tone.
  - Lion's Pen logo at the top of each email.
- Deploy the `auth-email-hook` edge function so Supabase routes auth emails through these templates.

### Step 3 — Verify end-to-end

After DNS verifies (you can monitor in **Cloud → Emails**):
- Trigger a password reset from the Parent login page.
- The email arrives from `noreply@notify.mylionspen.com`, branded in Lion's Pen colors.
- Clicking the button lands on **your** `/reset-password` page (not Lovable's login).
- Set a new password and confirm sign-in works.

### What changes vs. what stays the same

| Component | Change |
|---|---|
| `ParentAuth.tsx` | No change — already correct |
| `ResetPassword.tsx` | No change — already correct |
| `supabase/functions/auth-email-hook/` | **New** — handles auth email rendering |
| `supabase/functions/_shared/email-templates/*.tsx` | **New** — 6 branded templates |
| `supabase/config.toml` | Updated to register the hook |
| Hostinger DNS | You add NS records for `notify` subdomain |

### Notes

- DNS verification time depends on Hostinger; usually fast (under an hour). Worst case is 72 hours but rare.
- Until DNS verifies, parents will continue to receive the default Lovable reset email. The moment DNS goes green, branded emails take over automatically — no further action from you.
- Default Lovable emails will keep working in the meantime, so no parent gets locked out during setup.

<lov-actions>
<lov-open-email-setup>Set up mylionspen.com</lov-open-email-setup>
</lov-actions>

