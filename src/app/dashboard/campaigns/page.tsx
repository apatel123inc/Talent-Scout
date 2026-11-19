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
  const [organization, setOrganization] = useState("Bright Beginnings Canada");
  const [position, setPosition] = useState("University Chapter Founder");
  const [universities, setUniversities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [description, setDescription] = useState("");

  function createCampaign(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;
    setCampaigns((current) => [{
      id: Date.now(), name: name.trim(), organization: organization.trim(), position: position.trim(),
      targetUniversities: universities.split(",").map((value) => value.trim()).filter(Boolean),
      targetQualifications: qualifications.split(",").map((value) => value.trim()).filter(Boolean),
      description: description.trim(), status, candidates: 0, contacted: 0, responseRate: 0,
      startDate: "Nov 19, 2026", creationDate: "Nov 19, 2026"
    }, ...current]);
    setName("");
    setStatus("Draft");
    setOrganization("Bright Beginnings Canada");
    setPosition("University Chapter Founder");
    setUniversities("");
    setQualifications("");
    setDescription("");
    setOpen(false);
  }

  return <div>
    <div className="mb-6 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-bold tracking-tight">Campaigns</h2><p className="mt-1 text-sm text-slate-500">Plan and monitor recruitment outreach</p></div><button type="button" onClick={() => setOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"><PlusIcon className="h-4 w-4" /><span className="hidden sm:inline">Create campaign</span><span className="sm:hidden">Create</span></button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{campaigns.map((campaign) => <article key={campaign.id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-start justify-between gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">{campaign.name.charAt(0)}</div><StatusBadge status={campaign.status} /></div><h3 className="mt-5 font-bold">{campaign.name}</h3><p className="mt-1 text-xs text-slate-500">{campaign.position}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{campaign.description}</p><p className="mt-2 text-xs text-slate-400">Started {campaign.startDate}</p><dl className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4"><div><dt className="text-[10px] uppercase tracking-wider text-slate-400">Candidates</dt><dd className="mt-1 text-lg font-bold">{campaign.candidates}</dd></div><div><dt className="text-[10px] uppercase tracking-wider text-slate-400">Contacted</dt><dd className="mt-1 text-lg font-bold">{campaign.contacted}</dd></div><div><dt className="text-[10px] uppercase tracking-wider text-slate-400">Response</dt><dd className="mt-1 text-lg font-bold">{campaign.responseRate}%</dd></div></dl><button type="button" className="mt-5 h-9 w-full rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50">View campaign</button></article>)}</div>

    {open && <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="campaign-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><form onSubmit={createCampaign} className="my-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><h3 id="campaign-modal-title" className="text-lg font-bold">Create campaign</h3><p className="mt-1 text-sm text-slate-500">Changes remain in this demo session.</p></div><button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Close modal">×</button></div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold sm:col-span-2">Campaign name<input required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Spring chapter outreach" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></label><label className="text-sm font-semibold">Organization<input value={organization} onChange={(event) => setOrganization(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold">Position<input value={position} onChange={(event) => setPosition(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold">Target universities<input value={universities} onChange={(event) => setUniversities(event.target.value)} placeholder="Toronto, York, McMaster" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold">Target qualifications<input value={qualifications} onChange={(event) => setQualifications(event.target.value)} placeholder="Leadership, youth programs" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold sm:col-span-2">Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal outline-none" /></label><label className="text-sm font-semibold sm:col-span-2">Status<select value={status} onChange={(event) => setStatus(event.target.value as Campaign["status"])} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none"><option>Draft</option><option>Active</option><option>Completed</option></select></label></div>
      <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setOpen(false)} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold">Cancel</button><button type="submit" className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white">Create campaign</button></div></form></div>}
  </div>;
}
