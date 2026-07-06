import { describe, expect, it } from "vitest";
import { isParseableDate } from "@/features/lib/dates";

describe("isParseableDate", () => {
  it("returns true for Date objects", () => {
    expect(isParseableDate(new Date())).toBe(true);
  });

  it("returns true for ISO date strings", () => {
    expect(isParseableDate("2026-07-06T12:00:00.000Z")).toBe(true);
  });

  it("returns false for relative text timestamps", () => {
    expect(isParseableDate("2 weeks ago")).toBe(false);
  });
});
