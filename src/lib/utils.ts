import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** US Eastern — used for program calendar day, week cycle, and “today” checks (not browser locale). */
export const APP_CALENDAR_TIME_ZONE = "America/New_York" as const;

type Ymd = { y: number; m: number; d: number };

function getYmdInTimeZone(date: Date, timeZone: string): Ymd {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const n = (t: Intl.DateTimeFormatPartTypes) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { y: n("year"), m: n("month"), d: n("day") };
}

/** Calendar date in `timeZone` as `YYYY-MM-DD` (for comparisons and storage keys). */
export function getCalendarDateKeyInTimeZone(date: Date, timeZone: string = APP_CALENDAR_TIME_ZONE): string {
  const { y, m, d } = getYmdInTimeZone(date, timeZone);
  return `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function addCalendarDays(ymd: Ymd, delta: number): Ymd {
  const t = Date.UTC(ymd.y, ymd.m - 1, ymd.d + delta);
  return {
    y: new Date(t).getUTCFullYear(),
    m: new Date(t).getUTCMonth() + 1,
    d: new Date(t).getUTCDate(),
  };
}

function ymdToKey(ymd: Ymd): string {
  return `${String(ymd.y).padStart(4, "0")}-${String(ymd.m).padStart(2, "0")}-${String(ymd.d).padStart(2, "0")}`;
}

/** Days from `b` to `a` (ISO date strings, Gregorian). */
export function calendarDaysBetween(aKey: string, bKey: string): number {
  const [ay, am, ad] = aKey.split("-").map(Number);
  const [by, bm, bd] = bKey.split("-").map(Number);
  const ms = Date.UTC(ay, am - 1, ad) - Date.UTC(by, bm - 1, bd);
  return Math.floor(ms / 86400000);
}

/** Rotating curriculum week 1–4; cycle anchored to Sunday Apr 12, 2026 (Eastern calendar). */
export function getCurriculumWeekNumber(
  date: Date = new Date(),
  timeZone: string = APP_CALENDAR_TIME_ZONE
): number {
  const todayKey = getCalendarDateKeyInTimeZone(date, timeZone);
  const epochKey = "2026-04-12";
  const diffDays = calendarDaysBetween(todayKey, epochKey);
  if (diffDays < 0) return 1;
  return (Math.floor(diffDays / 7) % 4) + 1;
}

/** Monday-start week strip: returns five `YYYY-MM-DD` keys for Mon..Fri of the Eastern week containing `date`. */
export function getEasternWeekdayStripKeys(date: Date = new Date()): string[] {
  const ymd = getYmdInTimeZone(date, APP_CALENDAR_TIME_ZONE);
  const dow = new Date(Date.UTC(ymd.y, ymd.m - 1, ymd.d, 12, 0, 0)).getUTCDay();
  const offsetToMonday = (dow + 6) % 7;
  const monday = addCalendarDays(ymd, -offsetToMonday);
  return [0, 1, 2, 3, 4].map((i) => ymdToKey(addCalendarDays(monday, i)));
}

/** Parse `YYYY-MM-DD` to a stable `Date` for formatting (noon UTC on that civil date). */
export function dateFromCalendarKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
}
