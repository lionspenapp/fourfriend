import { describe, expect, it } from "vitest";
import { calendarDaysBetween, getCalendarDateKeyInTimeZone, getCurriculumWeekNumber } from "./utils";

describe("Eastern calendar helpers", () => {
  it("getCalendarDateKeyInTimeZone matches fixed instant in New York", () => {
    // 2026-04-29 03:00 UTC → Apr 28 23:00 in US Eastern (EDT)
    const key = getCalendarDateKeyInTimeZone(new Date("2026-04-29T03:00:00.000Z"));
    expect(key).toBe("2026-04-28");
  });

  it("calendarDaysBetween is symmetric for epoch week", () => {
    expect(calendarDaysBetween("2026-04-12", "2026-04-12")).toBe(0);
    expect(calendarDaysBetween("2026-04-19", "2026-04-12")).toBe(7);
  });

  it("getCurriculumWeekNumber uses Eastern date for week boundary", () => {
    // Monday Apr 13 2026 Eastern → week 1 (day 1 after Sunday epoch)
    expect(getCurriculumWeekNumber(new Date("2026-04-13T12:00:00.000-04:00"))).toBe(1);
  });
});
