import MetricCard from "@/components/dashboard/metric-card";
import StatusBadge from "@/components/dashboard/status-badge";
import { ChartIcon, MegaphoneIcon, PipelineIcon, UsersIcon } from "@/components/dashboard/dashboard-icons";
import { candidates, pipelineStages, recentActivity } from "@/data/dashboard-data";

export default function OverviewPage() {
  return <div className="space-y-6">
    <div><p className="text-sm font-medium text-slate-500">Monday, November 19</p><h2 className="mt-1 text-2xl font-bold tracking-tight">Good morning, Aatman</h2></div>
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Recruitment metrics">
      <MetricCard label="Total candidates" value="248" change="18.2%" icon={<UsersIcon className="h-5 w-5 text-indigo-600" />} tone="bg-indigo-50" />
      <MetricCard label="Active campaigns" value="12" change="8.1%" icon={<MegaphoneIcon className="h-5 w-5 text-blue-600" />} tone="bg-blue-50" />
      <MetricCard label="Candidates contacted" value="186" change="24.6%" icon={<PipelineIcon className="h-5 w-5 text-violet-600" />} tone="bg-violet-50" />
      <MetricCard label="Interested candidates" value="36" change="12.4%" icon={<ChartIcon className="h-5 w-5 text-emerald-600" />} tone="bg-emerald-50" />
    </section>

    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,.8fr)]">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><div><h3 className="font-bold">Recruitment pipeline</h3><p className="mt-1 text-sm text-slate-500">Candidate distribution by stage</p></div><span className="text-sm font-semibold text-indigo-600">248 total</span></div><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{pipelineStages.slice(0, 4).map((stage, index) => { const count = [72, 48, 36, 28][index]; return <div key={stage} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-medium text-slate-500">{stage}</p><p className="mt-2 text-2xl font-bold">{count}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${100 - index * 18}%` }} /></div></div>; })}</div><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{pipelineStages.slice(4).map((stage, index) => { const count = [24, 18, 12, 10][index]; return <div key={stage} className="rounded-xl border border-slate-100 p-4"><p className="truncate text-xs font-medium text-slate-500" title={stage}>{stage}</p><p className="mt-2 text-xl font-bold">{count}</p></div>; })}</div></article>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><h3 className="font-bold">Recent activity</h3><button type="button" className="text-xs font-semibold text-indigo-600">View all</button></div><div className="mt-5 space-y-5">{recentActivity.map((activity) => <div key={activity.title} className="flex gap-3"><span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${activity.tone}`} /><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-800">{activity.title}</p><p className="mt-0.5 text-xs text-slate-400">{activity.detail}</p></div><time className="shrink-0 text-[11px] text-slate-400">{activity.time}</time></div>)}</div></article>
    </section>

    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,.8fr)]">
      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h3 className="font-bold">Candidate pipeline</h3><p className="mt-1 text-sm text-slate-500">Recently moved candidates</p></div><a href="/dashboard/candidates" className="text-xs font-semibold text-indigo-600">View candidates</a></div><div className="divide-y divide-slate-100">{candidates.slice(0, 4).map((candidate) => <div key={candidate.id} className="flex items-center gap-3 px-5 py-4"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">{candidate.initials}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{candidate.name}</p><p className="mt-0.5 truncate text-xs text-slate-400">{candidate.organization}</p></div><StatusBadge status={candidate.status} /><span className="hidden text-sm font-bold text-slate-700 sm:block">{candidate.match}%</span></div>)}</div></article>
      <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"><div className="flex items-center justify-between"><h3 className="font-bold">Campaign performance</h3><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">38% response</span></div><div className="mt-7 flex h-36 items-end gap-3" aria-label="Illustrative campaign response chart">{[42,58,48,72,64,82,76,92].map((height, index) => <div key={index} className="flex h-full flex-1 items-end"><div className="w-full rounded-t-md bg-indigo-200" style={{ height: `${height}%` }} /></div>)}</div><div className="mt-3 flex justify-between text-[11px] text-slate-400"><span>Oct 1</span><span>Oct 15</span><span>Nov 1</span><span>Today</span></div></article>
    </section>
  </div>;
}
