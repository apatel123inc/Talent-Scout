import {
  candidates,
  initialCampaigns,
  organizations,
  outreachMessages,
  pipelineStages,
  recentActivity,
  type Candidate,
  type CandidateStatus,
  type Campaign,
  type Organization,
  type OutreachMessage,
} from "@/data/dashboard-data";

export const mockRepository = {
  listCandidates: (): Candidate[] => candidates,
  findCandidate: (id: number): Candidate | undefined => candidates.find((candidate) => candidate.id === id),
  searchCandidates: (query: string, status: "All statuses" | CandidateStatus = "All statuses"): Candidate[] => {
    const normalized = query.trim().toLowerCase();
    return candidates.filter((candidate) => {
      const searchable = [candidate.name, candidate.organization, candidate.role, candidate.program, ...candidate.skills]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return searchable.includes(normalized) && (status === "All statuses" || candidate.status === status);
    });
  },
  moveCandidate: (candidateId: number, status: CandidateStatus): Candidate | undefined => {
    const candidate = candidates.find((item) => item.id === candidateId);
    return candidate ? { ...candidate, status } : undefined;
  },
  listCampaigns: (): Campaign[] => initialCampaigns,
  listOrganizations: (): Organization[] => organizations,
  listPipelineStages: (): CandidateStatus[] => pipelineStages,
  listActivity: () => recentActivity,
  listOutreach: (candidateId?: number): OutreachMessage[] => candidateId
    ? outreachMessages.filter((message) => message.candidateId === candidateId)
    : outreachMessages,
};
