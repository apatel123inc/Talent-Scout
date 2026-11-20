"use client";

import { useEffect, useState } from "react";
import { candidates as initialCandidates, pipelineStages, type Candidate, type CandidateStatus } from "@/data/dashboard-data";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function PipelinePage() {
  const [candidates, setCandidates] = useState(initialCandidates);
  const [relations, setRelations] = useState<Record<string, string>>({});
  const [stageIds, setStageIds] = useState<Record<string, string>>({});

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();

    supabase
      .from("pipeline_stages")
      .select("id, name, stage_key")
      .then(({ data }) => {
        const map: Record<string, string> = {};
        (data ?? []).forEach((stage) => { map[stage.name] = stage.id; });
        setStageIds(map);
      });

    supabase
      .from("campaign_candidates")
      .select("id, candidate_id")
      .then(({ data }) => {
        const map: Record<string, string> = {};
        (data ?? []).forEach((relation) => { map[relation.candidate_id] = relation.id; });
        setRelations(map);
      });
  }, []);

  async function moveCandidate(id: string, status: CandidateStatus) {
    const supabase = createSupabaseBrowserClient();
    const stageId = stageIds[status];
    const relationId = relations[id];

    if (stageId && relationId) {
      const { error } = await supabase.rpc("move_campaign_candidate_stage", {
        p_campaign_candidate_id: relationId,
        p_pipeline_stage_id: stageId,
        p_note: `Moved to ${status}`,
      });
      if (error) return;
    }

    setCandidates((current) => current.map((candidate) => candidate.id === id ? { ...candidate, status } : candidate));
  }

  return <div>
    <div className="mb-6"><h2 className="text-2xl font-bold tracking-tight">Recruitment pipeline</h2><p className="mt-1 text-sm text-slate-500">Move fictional candidates using the stage menu on each card</p></div>
    <div className="flex gap-4 overflow-x-auto pb-4" aria-label="Recruitment pipeline stages">{pipelineStages.map((stage) => {
      const stageCandidates = candidates.filter((candidate) => candidate.status === stage);
      return <section key={stage} className="w-72 shrink-0 rounded-2xl border border-slate-200 bg-slate-100/70 p-3"><header className="flex items-center justify-between px-1 py-2"><h3 className="text-sm font-bold">{stage}</h3><span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-2 text-xs font-bold text-slate-500">{stageCandidates.length}</span></header><div className="mt-2 space-y-3">{stageCandidates.map((candidate: Candidate) => <article key={candidate.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">{candidate.initials}</span><div className="min-w-0"><p className="truncate text-sm font-bold">{candidate.name}</p><p className="mt-0.5 truncate text-xs text-slate-400">{candidate.role}</p></div></div><div className="mt-4 flex items-center justify-between"><span className="text-xs font-semibold text-indigo-600">{candidate.match}% match</span><label><span className="sr-only">Move {candidate.name} to another stage</span><select aria-label={`Move ${candidate.name} to another stage`} value={stage} onChange={(event) => moveCandidate(candidate.id, event.target.value as CandidateStatus)} className="h-8 max-w-32 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold outline-none"><option value={candidate.status}>{candidate.status}</option>{pipelineStages.filter((option) => option !== candidate.status).map((option) => <option key={option} value={option}>{option}</option>)}</select></label></div></article>)}</div>{stageCandidates.length === 0 && <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-xs text-slate-400">No candidates</p>}</section>;
    })}</div>
  </div>;
}
