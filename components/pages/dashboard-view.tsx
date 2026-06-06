import { Activity, CandlestickChart, Gauge, Radar } from "lucide-react";

import { SentimentMeter } from "@/components/market/sentiment-meter";
import { HeatMap } from "@/components/ui/heat-map";
import { LineChart } from "@/components/ui/line-chart";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { StatCard } from "@/components/ui/stat-card";
import { VolumeChart } from "@/components/ui/volume-chart";
import {
  dashboardStats,
  marketSentiment,
  marketSnapshot,
  sectorHeatMap,
  unusualVolumeRows,
  watchlists
} from "@/lib/data/mock-market-data";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";

const iconMap = [Gauge, Radar, CandlestickChart, Activity];

export function DashboardView() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Trading Intelligence"
        title="Fintech Command Center"
        description="A multi-surface market workspace for premarket momentum, tape sentiment, unusual participation, and event-driven execution."
      />

      <section className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.16),transparent_28%),linear-gradient(140deg,#030712_0%,#0f172a_42%,#071f2d_100%)] p-6 text-white shadow-panel sm:p-8">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.18),transparent_45%)] lg:block" />
        <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">{marketSnapshot.marketStatus}</p>
              <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
                {marketSnapshot.headline}
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">{marketSnapshot.summary}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {marketSnapshot.majorIndices.map((index) => (
                <article key={index.symbol} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-300">{index.symbol}</p>
                    <span className={index.changePercent >= 0 ? "text-emerald-300" : "text-rose-300"}>
                      {formatPercent(index.changePercent)}
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold">{formatCurrency(index.price)}</p>
                  <div className="mt-3 h-16">
                    <LineChart data={index.series} color={index.changePercent >= 0 ? "#22c55e" : "#fb7185"} height={64} />
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <SectionCard
              title="Breadth Pulse"
              description={marketSnapshot.marketStatusDetail}
            >
              <div className="h-48">
                <LineChart data={marketSnapshot.breadthSeries} color="#06b6d4" />
              </div>
            </SectionCard>
            <SectionCard
              title="Volume Leaders"
              description="Top premarket participation in millions of shares."
            >
              <VolumeChart
                data={marketSnapshot.volumeLeaders}
                color="from-cyan-400 via-sky-400 to-emerald-400"
                labelFormatter={(value) => `${value.toFixed(1)}M`}
              />
            </SectionCard>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => {
          const Icon = iconMap[index] ?? Gauge;

          return (
            <div key={stat.title} className="animate-rise">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Icon className="h-4 w-4" />
                <span>Desk Metric</span>
              </div>
              <StatCard {...stat} />
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard
          title="Market Sentiment"
          description="Composite indicators translating tape action, options flow, and breadth into a fast decision layer."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {marketSentiment.map((indicator) => (
              <SentimentMeter key={indicator.label} {...indicator} />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Priority Watchlist"
          description="High-conviction names with clean triggers, defined entry zones, and attractive tape context."
        >
          <div className="space-y-4">
            {watchlists.slice(0, 4).map((item) => (
              <article key={item.symbol} className="rounded-2xl border border-border bg-secondary/30 p-4 transition duration-300 hover:-translate-y-0.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">{item.symbol}</p>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                  <span className={item.changePercent >= 0 ? "text-emerald-400" : "text-rose-400"}>
                    {formatPercent(item.changePercent)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{item.setup}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span>Entry {item.entryZone}</span>
                  <span className="text-muted-foreground">R/R {item.riskReward}</span>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard
          title="Sector Heat Map"
          description="Cross-sector leadership and weakness mapped by price change and flow intensity."
        >
          <HeatMap cells={sectorHeatMap} />
        </SectionCard>

        <SectionCard
          title="Unusual Participation"
          description="Symbols with the sharpest acceleration in flow, volume, and momentum quality."
        >
          <div className="space-y-4">
            {unusualVolumeRows.slice(0, 4).map((row) => (
              <article key={row.symbol} className="rounded-2xl border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{row.symbol}</p>
                    <p className="text-sm text-muted-foreground">{row.company}</p>
                  </div>
                  <span className="rounded-full bg-cyan-500/12 px-3 py-1 text-xs text-cyan-300">
                    {row.relativeVolume.toFixed(1)}x RVOL
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{row.alert}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span>{formatCurrency(row.price)}</span>
                  <span className="text-muted-foreground">{formatCompactNumber(row.currentVolume)} shares</span>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
