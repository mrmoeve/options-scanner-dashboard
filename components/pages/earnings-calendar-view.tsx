"use client";

import { startTransition, useDeferredValue, useState } from "react";

import { FilterPillGroup } from "@/components/ui/filter-pill-group";
import { LineChart } from "@/components/ui/line-chart";
import { PageHeader } from "@/components/ui/page-header";
import { SearchInput } from "@/components/ui/search-input";
import { SectionCard } from "@/components/ui/section-card";
import { SortableDataTable } from "@/components/ui/sortable-data-table";
import type { EarningsEvent } from "@/lib/types/market";
import { formatPercent } from "@/lib/utils";

interface EarningsCalendarViewProps {
  rows: EarningsEvent[];
}

const reportOptions = ["All", "AMC", "BMO"];
const sectorOptions = ["All", "Technology", "Semiconductors", "Consumer Defensive", "Financials", "Consumer Cyclical", "Software"];

export function EarningsCalendarView({ rows }: EarningsCalendarViewProps) {
  const [query, setQuery] = useState("");
  const [reportTime, setReportTime] = useState("All");
  const [sector, setSector] = useState("All");
  const deferredQuery = useDeferredValue(query);

  const filteredRows = rows.filter((row) => {
    const matchesQuery =
      deferredQuery.length === 0 ||
      `${row.symbol} ${row.company} ${row.sector} ${row.setup}`.toLowerCase().includes(deferredQuery.toLowerCase());
    const matchesReport = reportTime === "All" || row.reportTime === reportTime;
    const matchesSector = sector === "All" || row.sector === sector;
    return matchesQuery && matchesReport && matchesSector;
  });

  const focus = filteredRows[0] ?? rows[0];

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Event Risk"
        title="Earnings Calendar"
        description="Professional event tracking for high-liquidity names, with implied move context, timing filters, and setup quality."
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <SectionCard
          title="Featured Event"
          description="A closer look at the name drawing the most attention from event-driven traders."
        >
          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{focus.date}</p>
              <h3 className="mt-2 text-3xl font-semibold">{focus.symbol}</h3>
              <p className="text-sm text-muted-foreground">{focus.company}</p>
              <p className="mt-4 text-sm text-muted-foreground">{focus.setup}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">EPS Estimate</p>
                  <p className="mt-2 text-xl font-semibold">${focus.estimate.toFixed(2)}</p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/30 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Implied Move</p>
                  <p className="mt-2 text-xl font-semibold">{formatPercent(focus.impliedMovePercent)}</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-secondary/20 p-4">
              <LineChart data={focus.priceSeries} color={focus.sentiment === "risk-off" ? "#fb7185" : "#06b6d4"} />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Filter Deck"
          description="Search by ticker or narrative, then narrow by report timing and sector."
        >
          <div className="space-y-5">
            <SearchInput value={query} onChange={(value) => startTransition(() => setQuery(value))} placeholder="Search earnings names or setup notes..." />
            <FilterPillGroup label="Report Time" options={reportOptions} value={reportTime} onChange={(value) => startTransition(() => setReportTime(value))} />
            <FilterPillGroup label="Sector" options={sectorOptions} value={sector} onChange={(value) => startTransition(() => setSector(value))} />
            <div className="rounded-2xl border border-border bg-secondary/30 p-4 text-sm text-muted-foreground">
              {filteredRows.length} event names currently match the selected filter stack.
            </div>
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Sortable Event Calendar"
        description="Rank names by implied move, timing, and estimate sensitivity."
      >
        <SortableDataTable
          rows={filteredRows}
          initialSortKey="impliedMovePercent"
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
            { key: "date", header: "Date / Time", sortValue: (row) => row.date, render: (row) => `${row.date} · ${row.reportTime}` },
            { key: "estimate", header: "EPS", sortValue: (row) => row.estimate, render: (row) => `$${row.estimate.toFixed(2)}` },
            { key: "revenue", header: "Revenue", sortValue: (row) => row.revenueEstimate, render: (row) => row.revenueEstimate },
            {
              key: "impliedMovePercent",
              header: "Implied Move",
              sortValue: (row) => row.impliedMovePercent,
              render: (row) => <span className="text-cyan-300">{formatPercent(row.impliedMovePercent)}</span>
            }
          ]}
          mobileCard={(row) => (
            <article className="rounded-3xl border border-border bg-card p-4 shadow-panel">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-lg font-semibold">{row.symbol}</p>
                  <p className="text-sm text-muted-foreground">{row.company}</p>
                </div>
                <span className="text-cyan-300">{formatPercent(row.impliedMovePercent)}</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{row.setup}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Time</span><p>{row.reportTime}</p></div>
                <div><span className="text-muted-foreground">Revenue</span><p>{row.revenueEstimate}</p></div>
              </div>
            </article>
          )}
        />
      </SectionCard>
    </div>
  );
}
