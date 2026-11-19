"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { BellIcon, ChartIcon, ChevronDownIcon, GridIcon, MegaphoneIcon, MenuIcon, PipelineIcon, SearchIcon, SettingsIcon, UsersIcon } from "./dashboard-icons";

const navigation = [
  { label: "Overview", href: "/dashboard", icon: GridIcon },
  { label: "Candidates", href: "/dashboard/candidates", icon: UsersIcon },
  { label: "Campaigns", href: "/dashboard/campaigns", icon: MegaphoneIcon },
  { label: "Pipeline", href: "/dashboard/pipeline", icon: PipelineIcon },
  { label: "Analytics", href: "/dashboard/analytics", icon: ChartIcon },
  { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon }
];

function LogoMark() {
  return <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-[0_8px_20px_rgba(79,70,229,0.24)]"><SearchIcon className="h-5 w-5" /></span>;
}

export default function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const current = navigation.find((item) => item.href === pathname) ?? navigation[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {mobileOpen && <button aria-label="Close navigation overlay" className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" onClick={() => setMobileOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-20 items-center px-6"><Link href="/dashboard" className="flex items-center gap-3" aria-label="TalentScout dashboard"><LogoMark /><span className="text-lg font-bold tracking-tight">TalentScout</span></Link></div>
        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Dashboard navigation">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} aria-current={active ? "page" : undefined} className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition-colors ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}><Icon className="h-5 w-5" /><span>{item.label}</span></Link>;
          })}
        </nav>
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-xl bg-slate-950 p-4 text-white"><p className="text-xs font-medium text-slate-300">Workspace</p><p className="mt-1 text-sm font-semibold">Bright Beginnings</p><p className="mt-3 text-xs text-slate-400">Demo workspace</p></div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <button type="button" className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-600 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><MenuIcon className="h-5 w-5" /></button>
          <h1 className="w-32 text-base font-bold sm:w-44 sm:text-lg">{current.label}</h1>
          <div className="ml-auto hidden max-w-md flex-1 md:block"><label className="relative block"><span className="sr-only">Search the dashboard</span><SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="search" placeholder="Search candidates, campaigns..." className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100" /></label></div>
          <button type="button" className="relative grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" aria-label="Notifications"><BellIcon className="h-5 w-5" /><span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-indigo-600" /></button>
          <div className="relative"><button type="button" onClick={() => setProfileOpen((open) => !open)} className="flex h-10 items-center gap-2 rounded-lg px-1.5 hover:bg-slate-50" aria-expanded={profileOpen} aria-label="Open profile menu"><span className="grid h-8 w-8 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">AP</span><span className="hidden text-left sm:block"><span className="block text-xs font-bold">Aatman Patel</span><span className="block text-[10px] text-slate-400">Administrator</span></span><ChevronDownIcon className="hidden h-4 w-4 text-slate-400 sm:block" /></button>{profileOpen && <div className="absolute right-0 top-12 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"><Link href="/dashboard/settings" onClick={() => setProfileOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-50">Profile settings</Link><button type="button" onClick={() => setProfileOpen(false)} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-50">Demo account</button></div>}</div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
