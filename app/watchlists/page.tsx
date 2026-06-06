import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { marketDataRepository } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/utils";

export default async function WatchlistsPage() {
  const rows = await marketDataRepository.watchlists.getAll();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Execution"
        title="Watchlists"
        description="Organize trade ideas, setup quality, and next triggers in a workflow that can later sync to live scanner inputs."
      />

      <SectionCard
        title="Priority Names"
        description="A curated list of symbols, trade theses, and the level or condition that matters next."
      >
        <DataTable
          rows={rows}
          columns={[
            { key: "symbol", header: "Symbol", render: (row) => <span className="font-semibold">{row.symbol}</span> },
            { key: "thesis", header: "Thesis", render: (row) => row.thesis },
            { key: "setup", header: "Setup", render: (row) => row.setup },
            { key: "lastPrice", header: "Last Price", render: (row) => formatCurrency(row.lastPrice) },
            {
              key: "changePercent",
              header: "Change",
              render: (row) => (
                <span className={row.changePercent >= 0 ? "text-success" : "text-danger"}>
                  {formatPercent(row.changePercent)}
                </span>
              )
            },
            { key: "nextTrigger", header: "Next Trigger", render: (row) => row.nextTrigger }
          ]}
        />
      </SectionCard>
    </div>
  );
}
