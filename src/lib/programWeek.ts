/** First day (Sunday) of program week 1 in the 4-week rotating cycle. */
const WEEK_CYCLE_EPOCH = new Date(2026, 3, 26); // April 26, 2026 (Sunday)

/**
 * Current week (1–4) for prompts and Supabase `week` column.
 * Cycles every 4 calendar weeks from the epoch Sunday.
 */
export function getCurrentProgramWeek(now: Date = new Date()): number {
  const diffDays = Math.floor((now.getTime() - WEEK_CYCLE_EPOCH.getTime()) / 86400000);
  if (diffDays < 0) return 1;
  const weekIndex = Math.floor(diffDays / 7);
  return (weekIndex % 4) + 1;
}
