"use client";

import { startTransition, useDeferredValue, useState } from "react";

import { FilterPillGroup } from "@/components/ui/filter-pill-group";
import { LineChart } from "@/components/ui/line-chart";
import { PageHeader } from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-input";
import { SectionCard } from "@/components/ui/section-card";
import { SortableDataTable } from "@/components/ui/sortable-data-table";
import { VolumeChart } from "@/components/ui/volume-chart";
import type { MarketMover } from "@/lib/types/market";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";

interface PremarketMoversViewProps {
  rows: MarketMover[];
}

const sectorOptions = ["All", "Semiconductors", "Software", "Crypto", "Autos", "Healthcare", "Financials", "Hardware", "E-Commerce"];
const sentimentOptions = ["All", "risk-on", "balanced", "risk-off"];

export function PremarketMoversView({ rows }: PremarketMoversViewProps) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");
  const [sentiment, setSentiment] = useState("All");
  const deferredQuery = useDeferredValue(query);

  const filteredRows = rows.filter((row) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      `${row.symbol} ${row.company} ${row.sector} ${row.catalyst}`.toLowerCase().includes(deferredQuery.toLowerCase());
    const matchesSector = sector === "All" || row.sector === sector;
    const matchesSentiment = sentiment === "All" || row.sentiment === sentiment;

    return matchesQuery && matchesSector && matchesSentiment;
  });

  const leadRow = filteredRows[0] ?? rows[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Momentum Scanner"
        title="Premarket Movers"
        description="Search, filter, and rank gap names by price displacement, option flow, float rotation, and opening participation."
      />

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard
          title="Lead Setup"
          description="A focused read on the highest-impact mover currently on the board."
        >
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{leadRow.exchange}</p>
                  <h3 className="mt-2 text-3xl font-semibold">{leadRow.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{leadRow.company}</p>
                </div>
                <span className={leadRow.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"}>
                  {formatPercent(leadRow.changePercent)}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{leadRow.catalyst}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Option Flow</p>
                  <p className="mt-2 text-xl font-semibold">{formatCurrency(leadRow.optionFlow)}</p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Float Rotation</p>
                  <p className="mt-2 text-xl font-semibold">{leadRow.floatRotation.toFixed(1)}%</p>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="h-56 rounded-2xl border border-border bg-secondary/20 p-4">
                <LineChart data={leadRow.priceSeries} color={leadRow.changePercent >= 0 ? "#22c55e" : "#fb7185"} />
              </div>
              <VolumeChart
                data={leadRow.volumeSeries}
                color="from-cyan-400 via-sky-400 to-emerald-400"
                labelFormatter={(value) => `${value.toFixed(1)}M`}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Filter Stack"
          description="Refine the board by sector bias, risk regime, and keyword search."
        >
          <div className="space-y-5">
            <SearchInput value={query} onChange={(value) => startTransition(() => setQuery(value))} />
            <FilterPillGroup label="Sector" options={sectorOptions} value={sector} onChange={(value) => startTransition(() => setSector(value))} />
            <FilterPillGroup label="Sentiment" options={sentimentOptions} value={sentiment} onChange={(value) => startTransition(() => setSentiment(value))} />
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Results</p>
                <p className="mt-2 text-2xl font-semibold">{filteredRows.length}</p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Avg RVOL</p>
                <p className="mt-2 text-2xl font-semibold">
                  {(filteredRows.reduce((total, row) => total + row.relativeVolume, 0) / Math.max(filteredRows.length, 1)).toFixed(1)}x
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Net Bias</p>
                <p className="mt-2 text-2xl font-semibold">
                  {filteredRows.filter((row) => row.changePercent > 0).length >= filteredRows.length / 2 ? "Long" : "Mixed"}
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Sortable Movers Table"
        description="Compare premarket leaders by relative volume, option flow, price change, and float rotation."
      >
        <SortableDataTable
          rows={filteredRows}
          initialSortKey="changePercent"
          columns={[
            {
              key: "symbol",
              header: "Symbol",
              sortValue: (row) => row.symbol,
              render: (row) => (
                <div>
                  <p className="font-semibold">{row.symbol}</p>
                  <p className="text-xs text-muted-foreground">{row.company}</p>
                </div>
              )
            },
            { key: "sector", header: "Sector", sortValue: (row) => row.sector, render: (row) => row.sector },
            { key: "price", header: "Price", sortValue: (row) => row.price, render: (row) => formatCurrency(row.price) },
            {
              key: "changePercent",
              header: "Change",
              sortValue: (row) => row.changePercent,
              render: (row) => <span className={row.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"}>{formatPercent(row.changePercent)}</span>
            },
            {
              key: "relativeVolume",
              header: "RVOL",
              sortValue: (row) => row.relativeVolume,
              render: (row) => `${row.relativeVolume.toFixed(1)}x`
            },
            {
              key: "optionFlow",
              header: "Option Flow",
              sortValue: (row) => row.optionFlow,
              render: (row) => formatCurrency(row.optionFlow)
            },
            {
              key: "volume",
              header: "Shares",
              sortValue: (row) => row.volume,
              render: (row) => formatCompactNumber(row.volume)
            }
          ]}
          mobileCard={(row) => (
            <article className="rounded-3xl border border-border bg-card p-4 shadow-panel">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{row.symbol}</p>
                  <p className="text-sm text-muted-foreground">{row.company}</p>
                </div>
                <span className={row.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"}>
                  {formatPercent(row.changePercent)}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{row.catalyst}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">RVOL</span><p>{row.relativeVolume.toFixed(1)}x</p></div>
                <div><span className="text-muted-foreground">Flow</span><p>{formatCurrency(row.optionFlow)}</p></div>
              </div>
            </article>
          )}
        />
      </SectionCard>
    </div>
  );
}
