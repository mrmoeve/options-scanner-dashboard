import type { HeatMapCell } from "@/lib/types/market";
import { formatPercent } from "@/lib/utils";

interface HeatMapProps {
  cells: HeatMapCell[];
}

function tileClasses(changePercent: number) {
  if (changePercent >= 3) {
    return "bg-emerald-500/25 border-emerald-400/30";
  }
  if (changePercent >= 0) {
    return "bg-emerald-500/12 border-emerald-300/20";
  }
  if (changePercent <= -2) {
    return "bg-rose-500/25 border-rose-400/30";
  }
  return "bg-rose-500/12 border-rose-300/20";
}

export function HeatMap({ cells }: HeatMapProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
      {cells.map((cell) => (
        <article
          key={cell.symbol}
          className={`rounded-2xl border p-4 transition duration-300 hover:-translate-y-0.5 ${tileClasses(cell.changePercent)}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold">{cell.symbol}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{cell.sector}</p>
            </div>
            <div className={cell.changePercent >= 0 ? "text-emerald-300" : "text-rose-300"}>
              {formatPercent(cell.changePercent)}
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
            <span>Flow {cell.flowScore}</span>
            <span>{cell.marketCap}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
