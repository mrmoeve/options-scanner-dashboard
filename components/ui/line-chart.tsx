import type { ChartPoint } from "@/lib/types/market";

interface LineChartProps {
  data: ChartPoint[];
  color?: string;
  height?: number;
  showArea?: boolean;
}

function toPath(points: Array<{ x: number; y: number }>) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");
}

export function LineChart({
  data,
  color = "#22c55e",
  height = 220,
  showArea = true
}: LineChartProps) {
  const width = 640;
  const padding = 20;
  const values = data.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1);

  const points = data.map((point, index) => ({
    x: padding + (index * (width - padding * 2)) / Math.max(data.length - 1, 1),
    y: height - padding - ((point.value - min) / range) * (height - padding * 2)
  }));

  const path = toPath(points);
  const areaPath = `${path} L ${points[points.length - 1]?.x ?? width - padding} ${height - padding} L ${points[0]?.x ?? padding} ${height - padding} Z`;

  return (
    <div className="relative h-full w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
        <defs>
          <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.32" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.2, 0.4, 0.6, 0.8].map((step) => (
          <line
            key={step}
            x1={padding}
            x2={width - padding}
            y1={padding + (height - padding * 2) * step}
            y2={padding + (height - padding * 2) * step}
            stroke="currentColor"
            strokeOpacity="0.08"
          />
        ))}
        {showArea ? <path d={areaPath} fill={`url(#gradient-${color.replace("#", "")})`} /> : null}
        <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {data.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>
    </div>
  );
}
