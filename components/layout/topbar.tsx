import { ThemeToggle } from "@/components/theme-toggle";

export function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/80 px-4 py-4 backdrop-blur-xl sm:px-6">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-emerald-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span>Market Connected</span>
        </div>
        <h2 className="mt-3 truncate text-xl font-semibold sm:text-2xl">Options Scanner Intelligence</h2>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-border bg-card/80 px-4 py-2 text-sm text-muted-foreground lg:block">
          Premarket flow, sentiment, and watchlist execution in one responsive workspace
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
