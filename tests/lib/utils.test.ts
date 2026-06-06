import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";

describe("formatting helpers", () => {
  it("formats compact numbers", () => {
    expect(formatCompactNumber(1250000)).toBe("1.3M");
  });

  it("formats currencies", () => {
    expect(formatCurrency(1234.56)).toBe("$1,234.56");
  });

  it("formats percents with a sign", () => {
    expect(formatPercent(4.2)).toBe("+4.20%");
    expect(formatPercent(-1.5)).toBe("-1.50%");
  });
});
