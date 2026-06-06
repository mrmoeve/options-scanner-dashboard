import type { ChartPoint } from "@/lib/types/market";

interface VolumeChartProps {
  data: ChartPoint[];
  color?: string;
  labelFormatter?: (value: number) => string;
}

export function VolumeChart({
  data,
  color = "from-cyan-400 to-emerald-400",
  labelFormatter = (value) => `${value}`
}: VolumeChartProps) {
  const max = Math.max(...data.map((point) => point.value), 1);

  return (
    <div className="space-y-3">
      <div className="flex items-end gap-2">
        {data.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-32 w-full items-end">
              <div
                className={`w-full rounded-t-xl bg-gradient-to-t ${color} transition-all duration-700`}
                style={{ height: `${(point.value / max) * 100}%` }}
                aria-label={`${point.label} ${labelFormatter(point.value)}`}
              />
            </div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{point.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
