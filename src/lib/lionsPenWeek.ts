/** Week 1 is 4/26/2026–5/2/2026 (Sun–Sat). Four-week cycle (1–4) from that anchor Sunday. */
export function getCurrentProgramWeek(now = new Date()): number {
  const epoch = new Date(2026, 3, 26); // April 26, 2026 (Sunday)
  const diffDays = Math.floor((now.getTime() - epoch.getTime()) / 86400000);
  if (diffDays < 0) return 1;
  const weekIndex = Math.floor(diffDays / 7);
  return (weekIndex % 4) + 1;
}
