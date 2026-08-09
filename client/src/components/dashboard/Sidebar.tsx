"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  History,
  FileText,
  ScanSearch,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "Overview",
    items: [{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Practice",
    items: [
      { label: "Mock Interviews", href: "/dashboard/interviews", icon: MessageSquare },
      { label: "Interview History", href: "/dashboard/interviews/history", icon: History },
    ],
  },
  {
    title: "Career",
    items: [
      { label: "Resumes", href: "/dashboard/resumes", icon: FileText },
      { label: "Resume Analysis", href: "/dashboard/resumes/analysis", icon: ScanSearch },
      { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    ],
  },
];

function NavLink({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate?: () => void }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-ev-indigo/10 text-white"
          : "text-ev-text-secondary hover:bg-white/5 hover:text-ev-text"
      )}
    >
      {active && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-ev-indigo"
        />
      )}
      <Icon
        className={cn("h-[18px] w-[18px] shrink-0", active ? "text-ev-indigo" : "text-ev-text-tertiary group-hover:text-ev-text-secondary")}
        strokeWidth={1.75}
      />
      <span className="truncate font-medium">{item.label}</span>
    </Link>
  );
}

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 px-4 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-ev-indigo to-ev-violet shadow-ev-card">
          <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-white">Elevexa</span>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-2">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-3 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-ev-text-tertiary">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={pathname === item.href}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-ev-border px-3 py-3">
        <NavLink
          item={{ label: "Settings", href: "/dashboard/settings", icon: Settings }}
          active={pathname === "/dashboard/settings"}
          onNavigate={onNavigate}
        />
        <button
          type="button"
          className="mt-0.5 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-ev-text-secondary transition-colors hover:bg-white/5 hover:text-ev-red"
        >
          <LogOut className="h-[18px] w-[18px] text-ev-text-tertiary" strokeWidth={1.75} />
          Logout
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] border-r border-ev-border bg-ev-bg-elevated md:flex">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Mobile trigger */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation menu"
        className="fixed left-4 top-4 z-40 flex h-9 w-9 items-center justify-center rounded-lg border border-ev-border bg-ev-surface text-ev-text-secondary md:hidden"
      >
        <Menu className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-y-0 left-0 w-[260px] border-r border-ev-border bg-ev-bg-elevated shadow-ev-elevated animate-[ev-fade-up_0.25s_ease-out]">
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-ev-text-secondary hover:bg-white/5"
            >
              <X className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </button>
            <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
