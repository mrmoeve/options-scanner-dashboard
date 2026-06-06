"use client";

import { startTransition, useDeferredValue, useState } from "react";

import { FilterPillGroup } from "@/components/ui/filter-pill-group";
import { LineChart } from "@/components/ui/line-chart";
import { PageHeader } from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-input";
import { SectionCard } from "@/components/ui/section-card";
import { SortableDataTable } from "@/components/ui/sortable-data-table";
import { VolumeChart } from "@/components/ui/volume-chart";
import type { UnusualVolumeRow } from "@/lib/types/market";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";

interface UnusualVolumeViewProps {
  rows: UnusualVolumeRow[];
}

const sectorOptions = ["All", "Internet", "Semiconductors", "Crypto", "Software", "Energy"];
const sentimentOptions = ["All", "risk-on", "balanced", "risk-off"];

export function UnusualVolumeView({ rows }: UnusualVolumeViewProps) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");
  const [sentiment, setSentiment] = useState("All");
  const deferredQuery = useDeferredValue(query);

  const filteredRows = rows.filter((row) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      `${row.symbol} ${row.company} ${row.sector} ${row.alert}`.toLowerCase().includes(deferredQuery.toLowerCase());
    const matchesSector = sector === "All" || row.sector === sector;
    const matchesSentiment = sentiment === "All" || row.sentiment === sentiment;
    return matchesQuery && matchesSector && matchesSentiment;
  });

  const lead = filteredRows[0] ?? rows[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Participation"
        title="Unusual Volume Scanner"
        description="Monitor symbols trading above normal participation with a tighter read on flow quality, squeeze risk, and momentum confirmation."
      />

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard
          title="Lead Flow Candidate"
          description="An at-a-glance read on the symbol printing the strongest abnormal activity."
        >
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{lead.sector}</p>
                  <h3 className="mt-2 text-3xl font-semibold">{lead.symbol}</h3>
                  <p className="text-sm text-muted-foreground">{lead.company}</p>
                </div>
                <span className={lead.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"}>
                  {formatPercent(lead.changePercent)}
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{lead.alert}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Short Interest</p>
                  <p className="mt-2 text-xl font-semibold">{lead.shortInterest.toFixed(1)}%</p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Momentum Score</p>
                  <p className="mt-2 text-xl font-semibold">{lead.momentumScore}</p>
                </div>
              </div>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl border border-border bg-secondary/20 p-4">
                <LineChart data={lead.priceSeries} color="#06b6d4" />
              </div>
              <VolumeChart
                data={lead.volumeSeries}
                color="from-cyan-400 via-sky-400 to-emerald-400"
                labelFormatter={(value) => `${value.toFixed(1)}M`}
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Filter Stack"
          description="Reduce noise by sentiment regime, sector cohort, and keyword search."
        >
          <div className="space-y-5">
            <SearchInput value={query} onChange={(value) => startTransition(() => setQuery(value))} placeholder="Search flow notes, sector names, or tickers..." />
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
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Avg Momentum</p>
                <p className="mt-2 text-2xl font-semibold">
                  {Math.round(filteredRows.reduce((total, row) => total + row.momentumScore, 0) / Math.max(filteredRows.length, 1))}
                </p>
              </div>
            </div>
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Sortable Flow Table"
        description="Compare abnormal participation by RVOL, short interest, option flow, and price response."
      >
        <SortableDataTable
          rows={filteredRows}
          initialSortKey="relativeVolume"
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
            { key: "relativeVolume", header: "RVOL", sortValue: (row) => row.relativeVolume, render: (row) => `${row.relativeVolume.toFixed(1)}x` },
            { key: "currentVolume", header: "Current Volume", sortValue: (row) => row.currentVolume, render: (row) => formatCompactNumber(row.currentVolume) },
            { key: "optionFlow", header: "Flow", sortValue: (row) => row.optionFlow, render: (row) => formatCurrency(row.optionFlow) },
            { key: "momentumScore", header: "Momentum", sortValue: (row) => row.momentumScore, render: (row) => row.momentumScore }
          ]}
          mobileCard={(row) => (
            <article className="rounded-3xl border border-border bg-card p-4 shadow-panel">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{row.symbol}</p>
                  <p className="text-sm text-muted-foreground">{row.company}</p>
                </div>
                <span className="rounded-full bg-cyan-500/12 px-3 py-1 text-xs text-cyan-300">
                  {row.relativeVolume.toFixed(1)}x
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{row.alert}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Flow</span><p>{formatCurrency(row.optionFlow)}</p></div>
                <div><span className="text-muted-foreground">Momentum</span><p>{row.momentumScore}</p></div>
              </div>
            </article>
          )}
        />
      </SectionCard>
    </div>
  );
}
