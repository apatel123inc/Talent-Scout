"use client";

import { useState, type FormEvent } from "react";
import StatusBadge from "@/components/dashboard/status-badge";
import { PlusIcon } from "@/components/dashboard/dashboard-icons";
import { initialCampaigns, type Campaign } from "@/data/dashboard-data";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Campaign["status"]>("Draft");

  function createCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    setCampaigns((current) => [{ id: Date.now(), name: name.trim(), status, candidates: 0, contacted: 0, responseRate: 0, startDate: "Nov 19, 2026" }, ...current]);
    setName("");
    setStatus("Draft");
    setOpen(false);
  }

  return <div>
    <div className="mb-6 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-bold tracking-tight">Campaigns</h2><p className="mt-1 text-sm text-slate-500">Plan and monitor recruitment outreach</p></div><button type="button" onClick={() => setOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"><PlusIcon className="h-4 w-4" /><span className="hidden sm:inline">Create campaign</span><span className="sm:hidden">Create</span></button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{campaigns.map((campaign) => <article key={campaign.id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-start justify-between gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">{campaign.name.charAt(0)}</div><StatusBadge status={campaign.status} /></div><h3 className="mt-5 font-bold">{campaign.name}</h3><p className="mt-1 text-xs text-slate-400">Started {campaign.startDate}</p><dl className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4"><div><dt className="text-[10px] uppercase tracking-wider text-slate-400">Candidates</dt><dd className="mt-1 text-lg font-bold">{campaign.candidates}</dd></div><div><dt className="text-[10px] uppercase tracking-wider text-slate-400">Contacted</dt><dd className="mt-1 text-lg font-bold">{campaign.contacted}</dd></div><div><dt className="text-[10px] uppercase tracking-wider text-slate-400">Response</dt><dd className="mt-1 text-lg font-bold">{campaign.responseRate}%</dd></div></dl><button type="button" className="mt-5 h-9 w-full rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50">View campaign</button></article>)}</div>

    {open && <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="campaign-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><form onSubmit={createCampaign} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><h3 id="campaign-modal-title" className="text-lg font-bold">Create campaign</h3><p className="mt-1 text-sm text-slate-500">Changes remain in this demo session.</p></div><button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Close modal">×</button></div><label className="mt-6 block text-sm font-semibold">Campaign name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Spring chapter outreach" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></label><label className="mt-4 block text-sm font-semibold">Status<select value={status} onChange={(event) => setStatus(event.target.value as Campaign["status"])} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none"><option>Draft</option><option>Active</option><option>Completed</option></select></label><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setOpen(false)} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold">Cancel</button><button type="submit" className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white">Create campaign</button></div></form></div>}
  </div>;
}
