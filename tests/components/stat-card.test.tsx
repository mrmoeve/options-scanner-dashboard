import { render, screen } from "@testing-library/react";

import { StatCard } from "@/components/ui/stat-card";

describe("StatCard", () => {
  it("renders title, value, and detail", () => {
    render(
      <StatCard
        title="Active Setups"
        value="24"
        change="+6.2%"
        trend="bullish"
        detail="High-conviction names across growth, energy, and semis."
      />
    );

    expect(screen.getByText("Active Setups")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText(/High-conviction names/)).toBeInTheDocument();
  });
});
