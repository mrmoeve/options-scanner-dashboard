import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/85 px-4 py-4 backdrop-blur sm:px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Live Workflow</p>
        <h2 className="text-xl font-semibold">Options Scanner Dashboard</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground sm:block">
          Mock market data ready for Polygon.io integration
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
