export function DashboardHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-primary/20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 p-6 text-white shadow-panel sm:p-8">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="relative max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-cyan-200/80">Trading Desk Overview</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Monitor premarket action, earnings risk, and unusual volume from one focused workspace.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
          This scaffold uses mock market data today, while keeping the repository organized for a future Polygon.io service layer.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Mobile responsive layout</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Dark mode enabled</span>
          <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">Scanner-ready architecture</span>
        </div>
      </div>
    </section>
  );
}
