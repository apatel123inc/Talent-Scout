"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, useActionState } from "react";
import StatusBadge from "@/components/dashboard/status-badge";
import { candidates as initialCandidates, pipelineStages, type Candidate, type CandidateStatus } from "@/data/dashboard-data";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { addCandidate as persistCandidate, type CandidateActionState } from "@/app/actions/candidates";

export default function CandidatesPage() {
  const [candidateList, setCandidateList] = useState(initialCandidates);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [sort, setSort] = useState("Match: high to low");
  const [selected, setSelected] = useState<Candidate>(initialCandidates[0]);
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newOrganization, setNewOrganization] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newSkills, setNewSkills] = useState("");
  const [candidateState, candidateAction, candidatePending] = useActionState(persistCandidate, undefined as CandidateActionState);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("candidates")
      .select("id, name, initials, organization_name, role, location, leadership, program, graduation_year, match_score, review_status, candidate_skills(name)")
      .order("name")
      .then(({ data, error }) => {
        if (error || !data) return;
        const mapped = data.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          initials: candidate.initials ?? candidate.name.split(/\s+/).slice(0, 2).map((part: string) => part[0]).join("").toUpperCase(),
          organization: candidate.organization_name ?? "Not specified",
          role: candidate.role ?? "Recruitment candidate",
          leadership: candidate.leadership ?? "Not specified",
          skills: (candidate.candidate_skills ?? []).map((skill: { name: string }) => skill.name),
          status: "Discovered" as CandidateStatus,
          match: candidate.match_score ?? 50,
          location: candidate.location ?? "Not specified",
          program: candidate.program ?? undefined,
          graduationYear: candidate.graduation_year ?? undefined,
          reviewStatus: candidate.review_status === "approved" ? "Approved" : candidate.review_status === "needs_review" ? "Needs review" : "Pending",
        })) as Candidate[];
        setCandidateList(mapped);
        if (mapped[0]) setSelected(mapped[0]);
      });
  }, []);

  useEffect(() => {
    if (!candidateState || candidateState.error) return;
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("candidates")
      .select("id, name, initials, organization_name, role, location, leadership, program, graduation_year, match_score, review_status, candidate_skills(name)")
      .order("name")
      .then(({ data, error }) => {
        if (error || !data) return;
        const mapped = data.map((candidate) => ({
          id: candidate.id,
          name: candidate.name,
          initials: candidate.initials ?? candidate.name.split(/\s+/).slice(0, 2).map((part: string) => part[0]).join("").toUpperCase(),
          organization: candidate.organization_name ?? "Not specified",
          role: candidate.role ?? "Recruitment candidate",
          leadership: candidate.leadership ?? "Not specified",
          skills: (candidate.candidate_skills ?? []).map((skill: { name: string }) => skill.name),
          status: "Discovered" as CandidateStatus,
          match: candidate.match_score ?? 50,
          location: candidate.location ?? "Not specified",
          program: candidate.program ?? undefined,
          graduationYear: candidate.graduation_year ?? undefined,
          reviewStatus: candidate.review_status === "approved" ? "Approved" : candidate.review_status === "needs_review" ? "Needs review" : "Pending",
        })) as Candidate[];
        setCandidateList(mapped);
        if (mapped[0]) setSelected(mapped[0]);
      });
  }, [candidateState]);

  const filtered = useMemo(() => {
    const matches = candidateList.filter((candidate) => {
      const matchesQuery = [candidate.name, candidate.organization, candidate.role, candidate.program, ...candidate.skills].join(" ").toLowerCase().includes(query.toLowerCase());
      return matchesQuery && (status === "All statuses" || candidate.status === status);
    });

    return [...matches].sort((a, b) => {
      if (sort === "Name: A to Z") return a.name.localeCompare(b.name);
      if (sort === "Match: low to high") return a.match - b.match;
      return b.match - a.match;
    });
  }, [candidateList, query, status, sort]);

  return <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
    <section className="min-w-0">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-2xl font-bold tracking-tight">Candidates</h2><p className="mt-1 text-sm text-slate-500">{filtered.length} of {candidateList.length} fictional profiles</p></div><button type="button" onClick={() => setAddOpen(true)} className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700">Add candidate</button></div>
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:flex-row"><label className="flex-1"><span className="sr-only">Search candidates</span><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search name, organization, or skill..." className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></label><label><span className="sr-only">Filter by status</span><select value={status} onChange={(event) => setStatus(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none sm:w-44"><option>All statuses</option>{pipelineStages.map((stage) => <option key={stage}>{stage}</option>)}</select></label><label><span className="sr-only">Sort candidates</span><select value={sort} onChange={(event) => setSort(event.target.value)} className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none sm:w-44"><option>Match: high to low</option><option>Match: low to high</option><option>Name: A to Z</option></select></label></div>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white"><div className="hidden grid-cols-[minmax(180px,1.4fr)_minmax(130px,.8fr)_minmax(170px,1fr)_120px_90px] border-b border-slate-100 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:grid"><span>Candidate</span><span>Organization</span><span>Skills</span><span>Status</span><span className="text-right">Match</span></div><div className="divide-y divide-slate-100">{filtered.map((candidate) => <button type="button" key={candidate.id} onClick={() => setSelected(candidate)} className={`grid w-full gap-3 px-4 py-4 text-left transition hover:bg-slate-50 lg:grid-cols-[minmax(180px,1.4fr)_minmax(130px,.8fr)_minmax(170px,1fr)_120px_90px] lg:items-center ${selected.id === candidate.id ? "bg-indigo-50/40" : ""}`}><span className="flex items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{candidate.initials}</span><span><span className="block text-sm font-bold">{candidate.name}</span><span className="mt-0.5 block text-xs text-slate-400 lg:hidden">{candidate.organization}</span></span></span><span className="hidden text-sm text-slate-600 lg:block">{candidate.organization}</span><span className="flex flex-wrap gap-1">{candidate.skills.slice(0, 2).map((skill) => <span key={skill} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600">{skill}</span>)}</span><span><StatusBadge status={candidate.status} /></span><span className="text-right text-sm font-bold">{candidate.match}%</span></button>)}</div>{filtered.length === 0 && <div className="p-10 text-center text-sm text-slate-500">No candidates match this search.</div>}</div>
    </section>

    <aside className="rounded-2xl border border-slate-200 bg-white p-5 xl:sticky xl:top-28 xl:h-fit"><div className="flex items-center justify-between"><h3 className="font-bold">Profile preview</h3><span className="text-sm font-bold text-indigo-600">{selected.match}% match</span></div><div className="mt-6 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-violet-100 text-lg font-bold text-violet-700">{selected.initials}</span><h4 className="mt-3 text-lg font-bold">{selected.name}</h4><p className="mt-1 text-sm text-slate-500">{selected.role}</p></div><dl className="mt-6 space-y-4 border-t border-slate-100 pt-5 text-sm"><div className="flex justify-between gap-4"><dt className="text-slate-400">Organization</dt><dd className="text-right font-semibold">{selected.organization}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-400">Location</dt><dd className="font-semibold">{selected.location}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-400">Leadership</dt><dd className="font-semibold">{selected.leadership}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-400">Status</dt><dd><StatusBadge status={selected.status} /></dd></div></dl><div className="mt-5"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Relevant skills</p><div className="mt-2 flex flex-wrap gap-2">{selected.skills.map((skill) => <span key={skill} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600">{skill}</span>)}</div></div><Link href={`/dashboard/candidates/${selected.id}`} className="mt-6 flex h-10 w-full items-center justify-center rounded-lg bg-slate-950 text-sm font-semibold text-white hover:bg-indigo-700">Open full profile</Link></aside>

    {addOpen && <div className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-slate-950/40 p-4" role="dialog" aria-modal="true" aria-labelledby="add-candidate-title" onMouseDown={(event) => { if (event.target === event.currentTarget) setAddOpen(false); }}><form action={candidateAction} className="my-4 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-start justify-between"><div><h3 id="add-candidate-title" className="text-lg font-bold">Add fictional candidate</h3><p className="mt-1 text-sm text-slate-500">The profile is saved to your organization.</p></div><button type="button" onClick={() => setAddOpen(false)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100" aria-label="Close modal">×</button></div>{candidateState?.error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{candidateState.error}</p>}<div className="mt-6 grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold sm:col-span-2">Full name<input required value={newName} onChange={(event) => setNewName(event.target.value)} name="name" placeholder="e.g. Jamie Taylor" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100" /></label><label className="text-sm font-semibold">University or organization<input required value={newOrganization} onChange={(event) => setNewOrganization(event.target.value)} name="organization" placeholder="Example University" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold">Role<input value={newRole} onChange={(event) => setNewRole(event.target.value)} name="role" placeholder="Student leader" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold">Location<input value={newLocation} onChange={(event) => setNewLocation(event.target.value)} name="location" placeholder="Toronto, ON" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label><label className="text-sm font-semibold">Skills<input value={newSkills} onChange={(event) => setNewSkills(event.target.value)} name="skills" placeholder="Leadership, Mentoring" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal outline-none" /></label></div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setAddOpen(false)} className="h-10 rounded-lg border border-slate-200 px-4 text-sm font-semibold">Cancel</button><button type="submit" className="h-10 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white" disabled={candidatePending}>{candidatePending ? "Adding…" : "Add candidate"}</button></div></form></div>}
  </div>;
}
