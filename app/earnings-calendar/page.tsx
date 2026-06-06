import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { marketDataRepository } from "@/lib/data";

export default async function EarningsCalendarPage() {
  const rows = await marketDataRepository.earningsCalendar.getAll();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Catalysts"
        title="Earnings Calendar"
        description="A focused event calendar for optionable names with implied move context and report timing."
      />

      <SectionCard
        title="Upcoming Reports"
        description="Prepared for future replacement with Polygon-backed scheduling and estimate data."
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
            { key: "sector", header: "Sector", render: (row) => row.sector },
            { key: "reportTime", header: "Report Time", render: (row) => row.reportTime },
            { key: "estimate", header: "EPS Estimate", render: (row) => `$${row.estimate.toFixed(2)}` },
            { key: "impliedMove", header: "Implied Move", render: (row) => row.impliedMove }
          ]}
        />
      </SectionCard>
    </div>
  );
}
