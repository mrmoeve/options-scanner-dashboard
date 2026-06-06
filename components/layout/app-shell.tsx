import type { PropsWithChildren } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen xl:grid xl:grid-cols-[18rem_1fr]">
      <Sidebar />
      <div className="min-w-0">
        <Topbar />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
