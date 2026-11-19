import Link from "next/link";
import MetricCard from "@/components/dashboard/metric-card";
import StatusBadge from "@/components/dashboard/status-badge";
import { ChartIcon, MegaphoneIcon, PipelineIcon, UsersIcon } from "@/components/dashboard/dashboard-icons";
import { candidates, initialCampaigns, pipelineStages, recentActivity } from "@/data/dashboard-data";

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Monday, November 19</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">Good morning, Aatman</h2>
        <p className="mt-1 text-sm text-slate-500">Here is what is happening across your recruitment workspace.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5" aria-label="Recruitment metrics">
        <MetricCard label="Total candidates" value="248" change="18.2%" icon={<UsersIcon className="h-5 w-5 text-indigo-600" />} tone="bg-indigo-50" />
        <MetricCard label="Candidates this week" value="32" change="11.8%" icon={<UsersIcon className="h-5 w-5 text-sky-600" />} tone="bg-sky-50" />
        <MetricCard label="Active campaigns" value="12" change="8.1%" icon={<MegaphoneIcon className="h-5 w-5 text-blue-600" />} tone="bg-blue-50" />
        <MetricCard label="Candidates contacted" value="186" change="24.6%" icon={<PipelineIcon className="h-5 w-5 text-violet-600" />} tone="bg-violet-50" />
        <MetricCard label="Interested candidates" value="36" change="12.4%" icon={<ChartIcon className="h-5 w-5 text-emerald-600" />} tone="bg-emerald-50" />
      </section>

      <section className="grid gap-3 sm:grid-cols-3" aria-label="Quick actions">
        <Link href="/dashboard/candidates" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700">Review candidates →</Link>
        <Link href="/dashboard/campaigns" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700">Create campaign →</Link>
        <Link href="/dashboard/pipeline" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:border-indigo-200 hover:text-indigo-700">Update pipeline →</Link>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,.8fr)]">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div><h3 className="font-bold">Recruitment pipeline</h3><p className="mt-1 text-sm text-slate-500">Candidate distribution by stage</p></div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">248 total</span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pipelineStages.slice(0, 4).map((stage, index) => {
              const count = [72, 48, 36, 28][index];
              return (
                <div key={stage} className="rounded-xl bg-slate-50 p-4">
                  <p className="min-h-8 text-xs font-medium leading-4 text-slate-500">{stage}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-950">{count}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-indigo-500" style={{ width: `${100 - index * 18}%` }} /></div>
                </div>
              );
            })}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {pipelineStages.slice(4).map((stage, index) => {
              const count = [24, 18, 12, 10][index];
              return <div key={stage} className="rounded-xl border border-slate-100 p-4"><p className="min-h-8 text-xs font-medium leading-4 text-slate-500">{stage}</p><p className="mt-2 text-xl font-bold text-slate-950">{count}</p></div>;
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between"><h3 className="font-bold">Recent activity</h3><span className="text-xs font-medium text-slate-400">Today</span></div>
          <div className="mt-5 space-y-5">
            {recentActivity.map((activity) => (
              <div key={activity.title} className="flex gap-3">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${activity.tone}`} />
                <div className="min-w-0 flex-1"><p className="text-sm font-semibold text-slate-800">{activity.title}</p><p className="mt-0.5 text-xs text-slate-400">{activity.detail}</p></div>
                <time className="shrink-0 text-[11px] text-slate-400">{activity.time}</time>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,.8fr)]">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div><h3 className="font-bold">Recent candidates</h3><p className="mt-1 text-sm text-slate-500">Fictional profiles added to the workspace</p></div>
            <Link href="/dashboard/candidates" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">View all</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {candidates.slice(0, 4).map((candidate) => (
              <div key={candidate.id} className="flex items-center gap-3 px-5 py-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">{candidate.initials}</span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-900">{candidate.name}</p><p className="mt-0.5 truncate text-xs text-slate-400">{candidate.organization}</p></div>
                <StatusBadge status={candidate.status} />
                <span className="hidden w-12 text-right text-sm font-bold text-slate-700 sm:block">{candidate.match}%</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between"><h3 className="font-bold">Active campaigns</h3><Link href="/dashboard/campaigns" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">View all</Link></div>
          <div className="mt-5 divide-y divide-slate-100">
            {initialCampaigns.filter((campaign) => campaign.status === "Active").map((campaign) => (
              <div key={campaign.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-slate-900">{campaign.name}</p><p className="mt-1 text-xs text-slate-400">{campaign.candidates} candidates · {campaign.contacted} contacted</p></div><StatusBadge status={campaign.status} /></div>
                <div className="mt-3 flex items-center gap-3"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${campaign.responseRate}%` }} /></div><span className="text-xs font-bold text-slate-700">{campaign.responseRate}%</span></div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
