"use client";

import { useEffect, useState, useActionState } from "react";
import StatusBadge from "@/components/dashboard/status-badge";
import { PlusIcon } from "@/components/dashboard/dashboard-icons";
import { initialCampaigns, type Campaign } from "@/data/dashboard-data";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { addCampaign, type CampaignActionState } from "@/app/actions/campaigns";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Campaign["status"]>("Draft");
  const [organization, setOrganization] = useState("Bright Beginnings Canada");
  const [position, setPosition] = useState("University Chapter Founder");
  const [universities, setUniversities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [description, setDescription] = useState("");
  const [campaignState, campaignAction, campaignPending] = useActionState(addCampaign, undefined as CampaignActionState);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("campaigns")
      .select("id, name, position, description, status, start_date, target_universities, target_programs")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data) return;
        const mapped = data.map((campaign) => ({
          id: campaign.id,
          name: campaign.name,
          position: campaign.position ?? undefined,
          description: campaign.description ?? undefined,
          status: campaign.status === "active" ? "Active" : campaign.status === "completed" ? "Completed" : "Draft",
          candidates: 0,
          contacted: 0,
          responseRate: 0,
          startDate: campaign.start_date ?? "Not started",
          creationDate: campaign.start_date ?? undefined,
          organization: "Bright Beginnings Canada",
          targetUniversities: campaign.target_universities ?? [],
          targetQualifications: campaign.target_programs ?? [],
        })) as Campaign[];
        setCampaigns(mapped);
      });
  }, []);

  useEffect(() => {
    if (!campaignState || campaignState.error) return;
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("campaigns")
      .select("id, name, position, description, status, start_date, target_universities, target_programs")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error || !data) return;
        const mapped = data.map((campaign) => ({
          id: campaign.id,
          name: campaign.name,
          position: campaign.position ?? undefined,
          description: campaign.description ?? undefined,
          status: campaign.status === "active" ? "Active" : campaign.status === "completed" ? "Completed" : "Draft",
          candidates: 0,
          contacted: 0,
          responseRate: 0,
          startDate: campaign.start_date ?? "Not started",
          creationDate: campaign.start_date ?? undefined,
          organization: "Bright Beginnings Canada",
          targetUniversities: campaign.target_universities ?? [],
          targetQualifications: campaign.target_programs ?? [],
        })) as Campaign[];
        setCampaigns(mapped);
      });
  }, [campaignState]);

  return <div>
    <div className="mb-6 flex items-end justify-between gap-4"><div><h2 className="text-2xl font-bold tracking-tight">Campaigns</h2><p className="mt-1 text-sm text-slate-500">Plan and monitor recruitment outreach</p></div><button type="button" onClick={() => setOpen(true)} className="inline-flex h-10 items-center gap-2 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"><PlusIcon className="h-4 w-4" /><span className="hidden sm:inline">Create campaign</span><span className="sm:hidden">Create</span></button></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{campaigns.map((campaign) => <article key={campaign.id} className="rounded-2xl border border-slate-200 bg-white p-5"><div className="flex items-start justify-between gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-50 text-sm font-bold text-indigo-700">{campaign.name.charAt(0)}</div><StatusBadge status={campaign.status} /></div><h3 className="mt-5 font-bold">{campaign.name}</h3><p className="mt-1 text-xs text-slate-500">{campaign.position}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">{campaign.description}</p><p className="mt-2 text-xs text-slate-400">Started {campaign.startDate}</p><dl className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4"><div><dt className="text-[10px] uppercase tracking-wider text-slate-400">Candidates</dt><dd className="mt-1 text-lg font-bold">{campaign.candidates}</dd></div><div><dt className="text-[10px] uppercase tracking-wider text-slate-400">Contacted</dt><dd className="mt-1 text-lg font-bold">{campaign.contacted}</dd></div><div><dt className="text-[10px] uppercase tracking-wider text-slate-400">Response</dt><dd className="mt-1 text-lg font-bold">{campaign.responseRate}%</dd></div></dl><button type="button" onClick={() => setSelectedCampaign(campaign)} className="mt-5 h-9 w-full rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50">View campaign</button></article>)}</div>

    {open && <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="campaign-modal-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}><form action={campaignAction} className="my-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><h3 id="campaign-modal-title" className="text-lg font-bold">Create campaign</h3><p className="mt-1 text-sm text-slate-500">The campaign is saved to your organization.</p></div><button type="button" onClick={() => setOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Close modal">×</button></div>
      {campaignState?.error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{campaignState.error}</p>}
      <div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold sm:col-span-2">Campaign name<input required value={name} onChange={(event) => setName(event.target.value)} name="name" placeholder="e.g. Spring chapter outreach" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></label><label className="text-sm font-semibold">Organization<input name="organization" value={organization} onChange={(event) => setOrganization(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold">Position<input name="position" value={position} onChange={(event) => setPosition(event.target.value)} className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold">Target universities<input name="universities" value={universities} onChange={(event) => setUniversities(event.target.value)} placeholder="Toronto, York, McMaster" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold">Target qualifications<input name="qualifications" value={qualifications} onChange={(event) => setQualifications(event.target.value)} placeholder="Leadership, youth programs" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold sm:col-span-2">Description<textarea name="description" value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 font-normal outline-none" /></label><label className="text-sm font-semibold sm:col-span-2">Status<select name="status" value={status.toLowerCase()} onChange={(event) => setStatus(event.target.value === "active" ? "Active" : event.target.value === "completed" ? "Completed" : "Draft")} className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 font-normal outline-none"><option value="draft">Draft</option><option value="active">Active</option><option value="completed">Completed</option></select></label></div>
      <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setOpen(false)} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold">Cancel</button><button type="submit" disabled={campaignPending} className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white disabled:opacity-60">{campaignPending ? "Creating…" : "Create campaign"}</button></div></form></div>}

    {selectedCampaign && <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="campaign-detail-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedCampaign(null); }}><section className="my-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Campaign</p><h3 id="campaign-detail-title" className="mt-1 text-lg font-bold">{selectedCampaign.name}</h3></div><button type="button" onClick={() => setSelectedCampaign(null)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Close campaign details">×</button></div><div className="mt-5 flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="text-xs text-slate-400">Status</p><p className="mt-1"><StatusBadge status={selectedCampaign.status} /></p></div><div className="text-right"><p className="text-xs text-slate-400">Started</p><p className="mt-1 text-sm font-semibold">{selectedCampaign.startDate}</p></div></div><dl className="mt-5 grid gap-4 sm:grid-cols-2"><div><dt className="text-xs text-slate-400">Organization</dt><dd className="mt-1 text-sm font-semibold">{selectedCampaign.organization ?? "Not specified"}</dd></div><div><dt className="text-xs text-slate-400">Position</dt><dd className="mt-1 text-sm font-semibold">{selectedCampaign.position ?? "Not specified"}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-400">Target universities</dt><dd className="mt-1 text-sm text-slate-700">{selectedCampaign.targetUniversities?.join(", ") || "Not specified"}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-400">Target qualifications</dt><dd className="mt-1 text-sm text-slate-700">{selectedCampaign.targetQualifications?.join(", ") || "Not specified"}</dd></div><div className="sm:col-span-2"><dt className="text-xs text-slate-400">Description</dt><dd className="mt-1 text-sm leading-6 text-slate-600">{selectedCampaign.description || "No description provided."}</dd></div></dl><div className="mt-6 flex justify-end"><button type="button" onClick={() => setSelectedCampaign(null)} className="h-10 rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white">Close</button></div></section></div>}
  </div>;
}
