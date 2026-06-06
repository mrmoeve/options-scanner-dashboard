import { DashboardHero } from "@/components/market/dashboard-hero";
import { SignalBadge } from "@/components/market/signal-badge";
import { PageHeader } from "@/components/ui/page-header";
import { SectionCard } from "@/components/ui/section-card";
import { StatCard } from "@/components/ui/stat-card";
import { dashboardStats, premarketMovers, unusualVolumeRows, watchlists } from "@/lib/data/mock-market-data";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="A command-center view for intraday opportunities, catalyst risk, and watchlist execution planning."
      />

      <DashboardHero />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <SectionCard
          title="Premarket Snapshot"
          description="Names already moving into the opening bell."
        >
          <div className="space-y-3">
            {premarketMovers.slice(0, 4).map((mover) => (
              <div key={mover.symbol} className="flex flex-col gap-2 rounded-2xl border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{mover.symbol}</p>
                    <SignalBadge value={formatPercent(mover.changePercent)} positive={mover.changePercent >= 0} />
                  </div>
                  <p className="text-sm text-muted-foreground">{mover.company}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>{formatCurrency(mover.price)}</p>
                  <p>{formatCompactNumber(mover.volume)} shares</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard
          title="Watchlist Focus"
          description="Actionable names with a clear execution trigger."
        >
          <div className="space-y-4">
            {watchlists.slice(0, 3).map((item) => (
              <div key={item.symbol} className="rounded-2xl border border-border p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{item.symbol}</p>
                  <SignalBadge value={formatPercent(item.changePercent)} positive={item.changePercent >= 0} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{item.setup}</p>
                <p className="mt-3 text-sm">{item.nextTrigger}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <SectionCard
        title="Unusual Volume Radar"
        description="Symbols printing materially above normal participation."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {unusualVolumeRows.slice(0, 3).map((row) => (
            <article key={row.symbol} className="rounded-2xl border border-border p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{row.symbol}</h3>
                <SignalBadge value={`${row.relativeVolume.toFixed(1)}x RVOL`} />
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
    </div>
  );
}
