/**
 * Origin used in auth email links (confirm signup, magic link, etc.).
 * If you sign up from http://localhost, Supabase would otherwise put localhost
 * in the email — the link fails on phones. Set VITE_APP_ORIGIN in .env / Vercel
 * to your public URL (e.g. https://your-app.vercel.app).
 */
export function getAppOriginForAuthEmail(): string {
  const raw = import.meta.env.VITE_APP_ORIGIN;
  if (typeof raw === "string") {
    const t = raw.trim().replace(/\/$/, "");
    if (t.length > 0 && /^https?:\/\//i.test(t)) {
      return t;
    }
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "";
}

/**
 * Password reset link target; prefers VITE_APP_ORIGIN, then known prod hosts, then current origin.
 */
export function getPasswordResetOrigin(): string {
  const fromEnv = getAppOriginForAuthEmail();
  if (fromEnv && !/^https?:\/\/localhost(?::\d+)?$/i.test(fromEnv)) {
    return fromEnv;
  }
  const PUBLISHED_ORIGIN = "https://pen-guard-vault.lovable.app";
  const allowedOrigin =
    /^https?:\/\/(pen-guard-vault\.lovable\.app|([a-z0-9-]+\.)*mycaptainslog\.app)$/i;
  if (typeof window !== "undefined" && allowedOrigin.test(window.location.origin)) {
    return window.location.origin;
  }
  return PUBLISHED_ORIGIN;
}
