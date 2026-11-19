import type { CandidateStatus } from "@/data/dashboard-data";

const styles: Record<CandidateStatus | "Active" | "Draft" | "Completed", string> = {
  Discovered: "bg-slate-100 text-slate-600",
  "Under Review": "bg-amber-50 text-amber-700",
  "Approved for Outreach": "bg-violet-50 text-violet-700",
  Contacted: "bg-blue-50 text-blue-700",
  Responded: "bg-cyan-50 text-cyan-700",
  Interested: "bg-emerald-50 text-emerald-700",
  Application: "bg-orange-50 text-orange-700",
  "Chapter Launched": "bg-indigo-50 text-indigo-700",
  Active: "bg-emerald-50 text-emerald-700",
  Draft: "bg-slate-100 text-slate-600",
  Completed: "bg-indigo-50 text-indigo-700"
};

export default function StatusBadge({ status }: { status: CandidateStatus | "Active" | "Draft" | "Completed" }) {
  return <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status]}`}>{status}</span>;
}
