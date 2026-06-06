import type { MarketSentimentIndicator } from "@/lib/types/market";

const trendStyles = {
  bullish: "from-emerald-400 to-cyan-400",
  neutral: "from-amber-400 to-yellow-300",
  bearish: "from-rose-400 to-orange-400"
} as const;

export function SentimentMeter({ label, score, trend, summary }: MarketSentimentIndicator) {
  return (
    <article className="rounded-3xl border border-border bg-card/85 p-5 shadow-panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-semibold">{score}</p>
        </div>
        <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {trend}
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${trendStyles[trend]} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{summary}</p>
    </article>
  );
}
