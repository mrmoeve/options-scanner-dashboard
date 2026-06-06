"use client";

import { startTransition, useDeferredValue, useState } from "react";

import { FilterPillGroup } from "@/components/ui/filter-pill-group";
import { HeatMap } from "@/components/ui/heat-map";
import { LineChart } from "@/components/ui/line-chart";
import { PageHeader } from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-input";
import { SectionCard } from "@/components/ui/section-card";
import { SortableDataTable } from "@/components/ui/sortable-data-table";
import type { HeatMapCell, WatchlistItem } from "@/lib/types/market";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface WatchlistsViewProps {
  rows: WatchlistItem[];
}

const sectorOptions = ["All", "Software", "Consumer", "Internet", "Cybersecurity"];
const tagOptions = ["All", "Trend", "Breakout", "Momentum", "AI", "Growth"];

export function WatchlistsView({ rows }: WatchlistsViewProps) {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");
  const [tag, setTag] = useState("All");
  const deferredQuery = useDeferredValue(query);

  const filteredRows = rows.filter((row) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      `${row.symbol} ${row.company} ${row.sector} ${row.thesis} ${row.setup} ${row.tags.join(" ")}`.toLowerCase().includes(deferredQuery.toLowerCase());
    const matchesSector = sector === "All" || row.sector === sector;
    const matchesTag = tag === "All" || row.tags.includes(tag);
    return matchesQuery && matchesSector && matchesTag;
  });

  const heatMapCells: HeatMapCell[] = filteredRows.map((row) => ({
    symbol: row.symbol,
    sector: row.sector,
    changePercent: row.changePercent,
    flowScore: row.conviction,
    marketCap: row.riskReward
  }));

  const focus = filteredRows[0] ?? rows[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Execution Layer"
        title="Watchlists"
        description="A decision-ready workspace for curated setups, conviction scoring, and fast trade plan review across devices."
      />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <SectionCard
          title="Featured Trade Plan"
          description="The most actionable watchlist idea based on conviction, trend quality, and timing."
        >
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{focus.sector}</p>
              <h3 className="mt-2 text-3xl font-semibold">{focus.symbol}</h3>
              <p className="text-sm text-muted-foreground">{focus.company}</p>
              <p className="mt-4 text-sm text-muted-foreground">{focus.thesis}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Conviction</p>
                  <p className="mt-2 text-xl font-semibold">{focus.conviction}</p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Risk / Reward</p>
                  <p className="mt-2 text-xl font-semibold">{focus.riskReward}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {focus.tags.map((value) => (
                  <span key={value} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                    {value}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/20 p-4">
              <LineChart data={focus.priceSeries} color="#06b6d4" />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Search and Filters"
          description="Slice the watchlist by sector, style, or keyword to focus on the right setup faster."
        >
          <div className="space-y-5">
            <SearchInput value={query} onChange={(value) => startTransition(() => setQuery(value))} placeholder="Search thesis, setup, symbol, or tag..." />
            <FilterPillGroup label="Sector" options={sectorOptions} value={sector} onChange={(value) => startTransition(() => setSector(value))} />
            <FilterPillGroup label="Style" options={tagOptions} value={tag} onChange={(value) => startTransition(() => setTag(value))} />
            <div className="rounded-2xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
              {filteredRows.length} active watchlist entries remain after filters.
            </div>
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Watchlist Heat Map"
        description="A quick visual read on where conviction and daily performance are concentrated."
      >
        <HeatMap cells={heatMapCells} />
      </SectionCard>

      <SectionCard
        title="Sortable Watchlist Table"
        description="Review plan quality, current price, conviction score, and next trigger in one responsive grid."
      >
        <SortableDataTable
          rows={filteredRows}
          initialSortKey="conviction"
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
            { key: "setup", header: "Setup", sortValue: (row) => row.setup, render: (row) => row.setup },
            { key: "lastPrice", header: "Price", sortValue: (row) => row.lastPrice, render: (row) => formatCurrency(row.lastPrice) },
            {
              key: "changePercent",
              header: "Change",
              sortValue: (row) => row.changePercent,
              render: (row) => <span className={row.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"}>{formatPercent(row.changePercent)}</span>
            },
            { key: "conviction", header: "Conviction", sortValue: (row) => row.conviction, render: (row) => row.conviction },
            { key: "riskReward", header: "R/R", sortValue: (row) => row.riskReward, render: (row) => row.riskReward }
          ]}
          mobileCard={(row) => (
            <article className="rounded-3xl border border-border bg-card p-4 shadow-panel">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{row.symbol}</p>
                  <p className="text-sm text-muted-foreground">{row.company}</p>
                </div>
                <span className="text-cyan-300">{row.conviction}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{row.setup}</p>
              <p className="mt-2 text-sm">{row.nextTrigger}</p>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span>{formatCurrency(row.lastPrice)}</span>
                <span className="text-muted-foreground">R/R {row.riskReward}</span>
              </div>
            </article>
          )}
        />
      </SectionCard>
    </div>
  );
}
