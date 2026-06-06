"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  CalendarClock,
  LayoutDashboard,
  Star,
  Zap
} from "lucide-react";

const links = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/premarket-movers", label: "Premarket Movers", icon: Activity },
  { href: "/earnings-calendar", label: "Earnings Calendar", icon: CalendarClock },
  { href: "/unusual-volume-scanner", label: "Unusual Volume Scanner", icon: Zap },
  { href: "/watchlists", label: "Watchlists", icon: Star }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-border bg-card/80 backdrop-blur xl:min-h-screen xl:w-72 xl:border-b-0 xl:border-r">
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/20 text-primary">
          <BarChart3 className="h-6 w-6" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">Options Scanner</p>
          <h1 className="text-lg font-semibold">Pro Dashboard</h1>
        </div>
      </div>
      <nav className="grid gap-2 px-4 pb-6 xl:px-6">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition",
                active
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-transparent bg-transparent text-muted-foreground hover:border-border hover:bg-secondary hover:text-foreground"
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
