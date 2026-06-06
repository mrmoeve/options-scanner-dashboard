import { DataTable } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { marketDataRepository } from "@/lib/data";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";

export default async function UnusualVolumeScannerPage() {
  const rows = await marketDataRepository.unusualVolume.getAll();

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Participation"
        title="Unusual Volume Scanner"
        description="Surface names trading above baseline participation to spot breakouts, reversals, and option flow follow-through."
      />

      <SectionCard
        title="Scanner Results"
        description="Relative volume, current flow, and a concise desk note for each symbol."
      >
        <DataTable
          rows={rows}
          columns={[
            { key: "symbol", header: "Symbol", render: (row) => <span className="font-semibold">{row.symbol}</span> },
            { key: "price", header: "Price", render: (row) => formatCurrency(row.price) },
            { key: "relativeVolume", header: "RVOL", render: (row) => `${row.relativeVolume.toFixed(1)}x` },
            { key: "avgVolume", header: "Avg Volume", render: (row) => formatCompactNumber(row.avgVolume) },
            { key: "currentVolume", header: "Current Volume", render: (row) => formatCompactNumber(row.currentVolume) },
            { key: "alert", header: "Alert", render: (row) => row.alert }
          ]}
        />
      </SectionCard>
    </div>
  );
}
