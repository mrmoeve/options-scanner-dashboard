import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { marketDataRepository } from "@/lib/data";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";

export default async function PremarketMoversPage() {
  const rows = await marketDataRepository.premarketMovers.getAll();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Momentum"
        title="Premarket Movers"
        description="Track leading gainers and losers before the cash session opens, with placeholder data shaped for future API ingestion."
      />

      <SectionCard
        title="Active Names"
        description="Symbols with strong gap activity, elevated volume, and a likely catalyst."
      >
        <DataTable
          rows={rows}
          columns={[
            {
              key: "symbol",
              header: "Symbol",
              render: (row) => (
                <div>
                  <p className="font-semibold">{row.symbol}</p>
                  <p className="text-xs text-muted-foreground">{row.company}</p>
                </div>
              )
            },
            { key: "price", header: "Price", render: (row) => formatCurrency(row.price) },
            {
              key: "changePercent",
              header: "Change",
              render: (row) => (
                <span className={row.changePercent >= 0 ? "text-success" : "text-danger"}>
                  {formatPercent(row.changePercent)}
                </span>
              )
            },
            { key: "volume", header: "Volume", render: (row) => formatCompactNumber(row.volume) },
            { key: "catalyst", header: "Catalyst", render: (row) => row.catalyst }
          ]}
        />
      </SectionCard>
    </div>
  );
}
