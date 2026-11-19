import Link from "next/link";
import { notFound } from "next/navigation";
import StatusBadge from "@/components/dashboard/status-badge";
import { candidates, outreachMessages } from "@/data/dashboard-data";

export function generateStaticParams() {
  return candidates.map((candidate) => ({ id: String(candidate.id) }));
}

export default async function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const candidate = candidates.find((item) => item.id === Number(id));

  if (!candidate) notFound();

  const outreach = outreachMessages.filter((message) => message.candidateId === candidate.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/dashboard/candidates" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">← Back to candidates</Link>
          <h2 className="mt-2 text-2xl font-bold tracking-tight">{candidate.name}</h2>
          <p className="mt-1 text-sm text-slate-500">{candidate.role} · {candidate.organization}</p>
        </div>
        <div className="flex items-center gap-3"><StatusBadge status={candidate.status} /><span className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-bold text-indigo-700">{candidate.match}% match</span></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="font-bold">Profile and evidence</h3>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div><dt className="text-xs text-slate-400">University / organization</dt><dd className="mt-1 text-sm font-semibold">{candidate.organization}</dd></div>
              <div><dt className="text-xs text-slate-400">Program</dt><dd className="mt-1 text-sm font-semibold">{candidate.program ?? "Not specified"}</dd></div>
              <div><dt className="text-xs text-slate-400">Graduation year</dt><dd className="mt-1 text-sm font-semibold">{candidate.graduationYear ?? "Not specified"}</dd></div>
              <div><dt className="text-xs text-slate-400">Location</dt><dd className="mt-1 text-sm font-semibold">{candidate.location}</dd></div>
              <div><dt className="text-xs text-slate-400">Leadership experience</dt><dd className="mt-1 text-sm font-semibold">{candidate.leadership}</dd></div>
              <div><dt className="text-xs text-slate-400">Recruiter review</dt><dd className="mt-1 text-sm font-semibold">{candidate.reviewStatus ?? "Pending"}</dd></div>
            </dl>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="font-bold">Relevant experience</h3>
            <div className="mt-5 space-y-4">
              {(candidate.experience ?? [{ title: candidate.role, organization: candidate.organization, period: "Current", summary: "Fictional profile evidence remains available for recruiter review." }]).map((item) => (
                <article key={`${item.title}-${item.period}`} className="rounded-xl border border-slate-100 p-4">
                  <div className="flex flex-wrap justify-between gap-2"><p className="text-sm font-bold">{item.title}</p><p className="text-xs text-slate-400">{item.period}</p></div>
                  <p className="mt-1 text-xs font-medium text-indigo-600">{item.organization}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="font-bold">Achievements and skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">{candidate.skills.map((skill) => <span key={skill} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">{skill}</span>)}</div>
            <ul className="mt-5 space-y-2 text-sm text-slate-600">{(candidate.achievements ?? ["Evidence summary requires recruiter follow-up."]).map((achievement) => <li key={achievement} className="flex gap-2"><span className="text-indigo-500">•</span><span>{achievement}</span></li>)}</ul>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold">Sources and evidence</h3>
            <div className="mt-4 space-y-3">{(candidate.sources ?? [{ label: "Fictional profile", type: "Profile", evidence: "Demo data; no external source claim is made." }]).map((source) => <article key={source.label} className="rounded-xl bg-slate-50 p-4"><p className="text-xs font-bold text-slate-700">{source.label}</p><p className="mt-1 text-[11px] text-indigo-600">{source.type}</p><p className="mt-2 text-xs leading-5 text-slate-500">{source.evidence}</p></article>)}</div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold">Recruiter notes</h3>
            <div className="mt-4 space-y-3">{(candidate.notes ?? []).length ? candidate.notes?.map((note) => <article key={note.id} className="rounded-xl border border-slate-100 p-3"><p className="text-xs leading-5 text-slate-600">{note.text}</p><p className="mt-2 text-[10px] text-slate-400">{note.author} · {note.createdAt}</p></article>) : <p className="text-sm text-slate-400">No notes yet.</p>}</div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="font-bold">Outreach history</h3>
            <div className="mt-4 space-y-3">{outreach.length ? outreach.map((message) => <article key={message.id} className="border-b border-slate-100 pb-3 last:border-0"><p className="text-xs font-semibold">{message.subject}</p><p className="mt-1 text-[11px] text-slate-400">{message.status} · {message.sentAt}</p></article>) : <p className="text-sm text-slate-400">No outreach sent.</p>}</div>
          </section>
        </aside>
      </div>
    </div>
  );
}
