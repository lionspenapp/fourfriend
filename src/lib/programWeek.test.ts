import { describe, it, expect } from "vitest";
import { getCurrentProgramWeek } from "./programWeek";

describe("getCurrentProgramWeek", () => {
  it("treats Sun Apr 26–Sat May 2 2026 as week 1", () => {
    expect(getCurrentProgramWeek(new Date(2026, 3, 26))).toBe(1);
    expect(getCurrentProgramWeek(new Date(2026, 4, 2))).toBe(1);
  });

  it("advances to week 2 starting Sun May 3 2026", () => {
    expect(getCurrentProgramWeek(new Date(2026, 4, 3))).toBe(2);
  });

  it("returns week 1 before the epoch", () => {
    expect(getCurrentProgramWeek(new Date(2026, 3, 25))).toBe(1);
  });
});
