import { describe, it, expect } from "vitest";
import { getCurrentProgramWeek } from "@/lib/lionsPenWeek";

describe("getCurrentProgramWeek", () => {
  it("returns 1 for week 1 (Apr 26 – May 2, 2026)", () => {
    expect(getCurrentProgramWeek(new Date(2026, 3, 27))).toBe(1);
    expect(getCurrentProgramWeek(new Date(2026, 4, 2))).toBe(1);
  });

  it("returns 2 the week after week 1 ends", () => {
    expect(getCurrentProgramWeek(new Date(2026, 4, 3))).toBe(2);
  });
});
