import type { ReactNode } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopNavbar } from "@/components/dashboard/TopNavbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ev-shell-bg min-h-screen">
      <Sidebar />
      <div className="md:pl-[248px]">
        <TopNavbar />
        <main className="px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto max-w-[1400px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
