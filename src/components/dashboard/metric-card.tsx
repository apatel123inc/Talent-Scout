import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
  tone: string;
}

export default function MetricCard({ label, value, change, icon, tone }: MetricCardProps) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]"><div className="flex items-start justify-between"><div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{value}</p></div><span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>{icon}</span></div><p className="mt-4 text-xs font-semibold text-emerald-600"><span className="mr-1">↗</span>{change}<span className="font-normal text-slate-400"> from last month</span></p></article>;
}
