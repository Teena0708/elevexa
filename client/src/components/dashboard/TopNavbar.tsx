"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

export function TopNavbar({ userName = "Teena Yadav" }: { userName?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const initials = userName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-ev-border bg-ev-bg/80 px-4 backdrop-blur-md md:px-6">
      <div className="ml-10 flex-1 md:ml-0">
        <label htmlFor="ev-search" className="sr-only">
          Search
        </label>
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ev-text-tertiary" strokeWidth={1.75} />
          <input
            id="ev-search"
            type="search"
            placeholder="Search interviews, resumes…"
            className="w-full rounded-lg border border-ev-border bg-ev-surface py-2 pl-9 pr-3 text-sm text-ev-text placeholder:text-ev-text-tertiary transition-colors focus:border-ev-indigo/50 focus:outline-none focus:ring-2 focus:ring-ev-indigo/20"
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg text-ev-text-secondary transition-colors hover:bg-white/5 hover:text-ev-text"
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-ev-violet" aria-hidden />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-white/5"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-ev-indigo to-ev-violet text-[11px] font-semibold text-white">
            {initials}
          </div>
          <span className="hidden text-sm font-medium text-ev-text sm:inline">{userName}</span>
          <ChevronDown className="h-3.5 w-3.5 text-ev-text-tertiary" strokeWidth={2} />
        </button>

        {menuOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 w-44 origin-top-right rounded-lg border border-ev-border bg-ev-surface p-1 shadow-ev-elevated ev-animate-in"
          >
            <a href="/dashboard/settings" role="menuitem" className="block rounded-md px-3 py-2 text-sm text-ev-text-secondary hover:bg-white/5 hover:text-ev-text">
              Profile
            </a>
            <a href="/dashboard/settings" role="menuitem" className="block rounded-md px-3 py-2 text-sm text-ev-text-secondary hover:bg-white/5 hover:text-ev-text">
              Settings
            </a>
            <button role="menuitem" className="block w-full rounded-md px-3 py-2 text-left text-sm text-ev-red hover:bg-ev-red/10">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
