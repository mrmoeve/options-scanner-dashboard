import type { DashboardStat } from "@/lib/types/market";

const trendClasses: Record<DashboardStat["trend"], string> = {
  bullish: "text-success",
  bearish: "text-danger",
  neutral: "text-warning"
};

export function StatCard({ title, value, change, trend, detail }: DashboardStat) {
  return (
    <article className="rounded-3xl border border-border bg-card/90 p-5 shadow-panel backdrop-blur transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-3 text-3xl font-semibold">{value}</p>
        </div>
        <span className={`rounded-full bg-secondary px-3 py-1 text-xs font-medium ${trendClasses[trend]}`}>
          {change}
        </span>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{detail}</p>
    </article>
  );
}
