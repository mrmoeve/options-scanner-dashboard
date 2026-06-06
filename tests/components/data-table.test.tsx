import { render, screen } from "@testing-library/react";

import { DataTable } from "@/components/ui/data-table";

describe("DataTable", () => {
  it("renders headers and rows", () => {
    render(
      <DataTable
        columns={[
          { key: "symbol", header: "Symbol", render: (row: { symbol: string }) => row.symbol },
          { key: "price", header: "Price", render: (row: { price: string }) => row.price }
        ]}
        rows={[{ symbol: "NVDA", price: "$1245.36" }]}
      />
    );

    expect(screen.getByText("Symbol")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("NVDA")).toBeInTheDocument();
  });
});
