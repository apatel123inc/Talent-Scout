type IconProps = { className?: string };

function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" strokeLinecap="round" /></svg>;
}

function SparklesIcon({ className = "h-5 w-5" }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M12 3l1.35 4.65L18 9l-4.65 1.35L12 15l-1.35-4.65L6 9l4.65-1.35L12 3Z" strokeLinejoin="round" /><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" strokeLinejoin="round" /></svg>;
}

function CampaignIcon({ className = "h-5 w-5" }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 14.5V9.5l12-4v13l-12-4Z" strokeLinejoin="round" /><path d="M7 15l1.5 5H12l-1.5-4" strokeLinecap="round" /></svg>;
}

function PipelineIcon({ className = "h-5 w-5" }: IconProps) {
  return <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="4" width="5" height="16" rx="1.5" /><rect x="10" y="4" width="5" height="16" rx="1.5" /><rect x="17" y="4" width="4" height="16" rx="1.5" /></svg>;
}

function ArrowIcon({ className = "h-4 w-4" }: IconProps) {
  return <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label="TalentScout home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-white shadow-[0_8px_24px_rgba(79,70,229,0.22)]"><SearchIcon className="h-5 w-5" /></span>
      <span className="text-[17px] font-bold tracking-tight text-slate-950">TalentScout</span>
    </a>
  );
}

function Navigation() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="Main navigation">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-700">Platform</a>
          <a href="#discovery" className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-700">Solutions</a>
          <a href="#footer" className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-700">Company</a>
        </div>
        <a href="#features" className="inline-flex h-10 items-center justify-center rounded-lg bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700">Explore platform</a>
      </nav>
    </header>
  );
}

const candidates = [
  { name: "Maya Chen", role: "Community Leadership", initials: "MC", score: "94", color: "bg-violet-100 text-violet-700" },
  { name: "Jordan Ellis", role: "Student Initiative", initials: "JE", score: "91", color: "bg-blue-100 text-blue-700" },
  { name: "Samira Patel", role: "Youth Programs", initials: "SP", score: "88", color: "bg-amber-100 text-amber-700" },
];

function DashboardMockup() {
  return (
    <div className="relative mx-auto mt-16 max-w-5xl px-2 sm:px-5" aria-label="Fictional TalentScout dashboard preview">
      <div className="absolute inset-x-12 -bottom-6 h-20 rounded-[40px] bg-indigo-200/40 blur-3xl" />
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_28px_80px_-24px_rgba(15,23,42,0.28)]">
        <div className="flex h-11 items-center gap-1.5 border-b border-slate-100 px-4"><span className="h-2.5 w-2.5 rounded-full bg-slate-200" /><span className="h-2.5 w-2.5 rounded-full bg-slate-200" /><span className="h-2.5 w-2.5 rounded-full bg-slate-200" /></div>
        <div className="flex min-h-[420px]">
          <aside className="hidden w-[150px] shrink-0 border-r border-slate-100 bg-slate-50/80 p-4 sm:block">
            <div className="mb-7 flex items-center gap-2 px-1"><span className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-600 text-white"><SearchIcon className="h-3.5 w-3.5" /></span><span className="text-xs font-bold text-slate-800">TalentScout</span></div>
            <div className="space-y-1 text-[11px] font-medium">{["Overview", "Candidates", "Campaigns", "Pipeline"].map((item, index) => <div key={item} className={`flex h-9 items-center rounded-md px-2.5 ${index === 1 ? "bg-white text-indigo-700 shadow-sm ring-1 ring-slate-200/70" : "text-slate-500"}`}>{item}</div>)}</div>
          </aside>
          <div className="min-w-0 flex-1 p-4 sm:p-6">
            <div className="mb-5 flex items-center justify-between"><div><p className="text-[11px] font-medium text-slate-400">Bright Beginnings Canada</p><h2 className="mt-1 text-lg font-bold text-slate-900">Candidate discovery</h2></div><div className="hidden h-9 items-center gap-2 rounded-lg bg-indigo-600 px-3 text-xs font-semibold text-white sm:flex"><span className="text-base leading-none">+</span> Add candidate</div></div>
            <div className="mb-5 grid grid-cols-3 gap-2 sm:gap-3">{[["Active candidates", "248"], ["Strong matches", "36"], ["In pipeline", "18"]].map(([label, value]) => <div key={label} className="rounded-xl border border-slate-100 p-3 sm:p-4"><p className="text-[9px] font-medium text-slate-400 sm:text-[10px]">{label}</p><p className="mt-1.5 text-lg font-bold text-slate-900 sm:text-xl">{value}</p></div>)}</div>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <div className="grid grid-cols-[1fr_76px] border-b border-slate-100 bg-slate-50/70 px-3 py-2.5 text-[9px] font-semibold uppercase tracking-wider text-slate-400 sm:grid-cols-[1fr_120px_76px]"><span>Candidate</span><span className="hidden sm:block">Experience</span><span className="text-right">Match</span></div>
              {candidates.map((candidate) => <div key={candidate.name} className="grid grid-cols-[1fr_76px] items-center px-3 py-3 sm:grid-cols-[1fr_120px_76px]"><div className="flex min-w-0 items-center gap-2.5"><span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[10px] font-bold ${candidate.color}`}>{candidate.initials}</span><div className="min-w-0"><p className="truncate text-xs font-semibold text-slate-800">{candidate.name}</p><p className="mt-0.5 truncate text-[10px] text-slate-400">{candidate.role}</p></div></div><p className="hidden text-[10px] text-slate-500 sm:block">4 years</p><div className="flex items-center justify-end gap-1.5"><span className="h-1.5 w-8 overflow-hidden rounded-full bg-slate-100"><span className="block h-full w-[92%] rounded-full bg-emerald-500" /></span><span className="text-xs font-bold text-slate-700">{candidate.score}%</span></div></div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  { id: "discovery", icon: SearchIcon, eyebrow: "Candidate discovery", title: "Find candidates aligned with your mission.", description: "Build clearer searches around the skills, experience and values your organization needs, with relevant candidates organized in one place.", bullets: ["Mission-aware candidate profiles", "Flexible search criteria", "Fictional demonstration results"] },
  { id: "evaluation", icon: SparklesIcon, eyebrow: "Evidence-based AI evaluation", title: "Turn candidate evidence into a clearer review.", description: "Support human review with structured summaries and explicit evidence, designed to keep recruiters in control of every decision.", bullets: ["Skills and experience summaries", "Traceable supporting evidence", "Human review stays in the loop"] },
  { id: "campaigns", icon: CampaignIcon, eyebrow: "Recruitment campaigns", title: "Plan outreach around each recruitment goal.", description: "Create and manage focused campaigns while keeping audience segments, messages and next steps easy to coordinate.", bullets: ["Campaign organization", "Personalized outreach drafts", "Centralized recruitment context"] },
  { id: "pipeline", icon: PipelineIcon, eyebrow: "Recruitment pipeline", title: "Move promising candidates forward with clarity.", description: "Bring every stage of recruitment into a shared view so teams can understand progress, ownership and upcoming actions.", bullets: ["Visual candidate stages", "Clear follow-up ownership", "Progress you can report"] },
];

type Feature = (typeof features)[number];

function DiscoveryPreview() {
  return <div><div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-400"><SearchIcon className="h-4 w-4" /> University students with leadership experience</div><div className="mt-4 grid grid-cols-3 gap-2">{["Community", "Fundraising", "Program"].map((tag) => <span key={tag} className="rounded-md bg-indigo-50 px-2 py-2 text-center text-[10px] font-semibold text-indigo-700">{tag}</span>)}</div><div className="mt-5 space-y-2">{candidates.map((candidate) => <div key={candidate.name} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2.5"><div className="flex items-center gap-2"><span className={`grid h-7 w-7 place-items-center rounded-full text-[9px] font-bold ${candidate.color}`}>{candidate.initials}</span><span className="text-xs font-semibold text-slate-700">{candidate.name}</span></div><span className="text-xs font-bold text-emerald-600">{candidate.score}%</span></div>)}</div></div>;
}

function EvaluationPreview() {
  return <div><div className="flex items-center justify-between"><div><p className="text-[10px] text-slate-400">Evidence review</p><p className="mt-1 text-sm font-bold text-slate-800">Maya Chen</p></div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">Strong match</span></div><div className="mt-5 space-y-3">{[["Leadership", "92%"], ["Community impact", "88%"], ["Communication", "85%"]].map(([label, value]) => <div key={label}><div className="mb-1.5 flex justify-between text-[10px] font-medium"><span className="text-slate-600">{label}</span><span className="text-slate-800">{value}</span></div><div className="h-1.5 rounded-full bg-slate-100"><div className="h-full w-[88%] rounded-full bg-indigo-500" /></div></div>)}</div></div>;
}

function CampaignPreview() {
  return <div><div className="mb-5 flex items-start justify-between"><div><p className="text-[10px] text-slate-400">Campaign</p><p className="mt-1 text-sm font-bold text-slate-800">Founding Chapter Presidents</p></div><span className="rounded-md border border-slate-200 px-2 py-1 text-[9px] font-semibold text-slate-500">Draft</span></div><div className="grid grid-cols-2 gap-3">{[["Candidates", "248"], ["Contacted", "42"]].map(([label, value]) => <div key={label} className="rounded-lg bg-slate-50 p-3"><p className="text-[9px] text-slate-400">{label}</p><p className="mt-1 text-lg font-bold text-slate-800">{value}</p></div>)}</div><div className="mt-3 rounded-lg border border-indigo-100 bg-indigo-50/50 p-3 text-[10px] leading-5 text-indigo-900">Personalized outreach is ready for a human to review and send.</div></div>;
}

function PipelinePreview() {
  return <div className="grid grid-cols-3 gap-2">{[["New", "12"], ["Review", "8"], ["Contacted", "5"]].map(([stage, count]) => <div key={stage} className="rounded-lg bg-slate-50 p-2.5"><div className="mb-3 flex items-center justify-between"><span className="text-[9px] font-bold text-slate-600">{stage}</span><span className="text-[9px] text-slate-400">{count}</span></div><div className="space-y-2"><div className="h-10 rounded-md border border-slate-100 bg-white p-2"><div className="h-1.5 w-8 rounded bg-slate-200" /><div className="mt-2 h-1.5 w-12 rounded bg-slate-100" /></div><div className="h-10 rounded-md border border-slate-100 bg-white p-2"><div className="h-1.5 w-8 rounded bg-slate-200" /><div className="mt-2 h-1.5 w-12 rounded bg-slate-100" /></div></div></div>)}</div>;
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;
  const reversed = index % 2 === 1;
  return (
    <article id={feature.id} className="grid items-center gap-10 border-t border-slate-200 py-16 md:grid-cols-2 md:gap-16 lg:py-20">
      <div className={reversed ? "md:order-2" : ""}><div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-700"><Icon /></div><p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">{feature.eyebrow}</p><h3 className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-[38px]">{feature.title}</h3><p className="mt-5 max-w-xl text-base leading-7 text-slate-600">{feature.description}</p><ul className="mt-7 space-y-3">{feature.bullets.map((bullet) => <li key={bullet} className="flex items-center gap-3 text-sm font-medium text-slate-700"><span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-50 text-emerald-600"><svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M2.5 6.3l2.1 2.1 4.9-5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>{bullet}</li>)}</ul></div>
      <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7 ${reversed ? "md:order-1" : ""}`}><div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_16px_40px_-28px_rgba(15,23,42,0.28)]">{index === 0 && <DiscoveryPreview />}{index === 1 && <EvaluationPreview />}{index === 2 && <CampaignPreview />}{index === 3 && <PipelinePreview />}</div></div>
    </article>
  );
}

export default function LandingPage() {
  return (
    <div id="top" className="min-h-screen overflow-hidden bg-white text-slate-900">
      <Navigation />
      <main>
        <section className="relative px-5 pb-16 pt-32 sm:px-8 sm:pt-36 lg:px-10 lg:pb-24">
          <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-indigo-100/35 blur-[90px]" />
          <div className="relative mx-auto max-w-5xl text-center">
            <p className="mx-auto inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50/70 px-3 py-1.5 text-xs font-semibold text-indigo-700">Built for mission-driven recruitment</p>
            <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-bold leading-[1.02] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-[72px]">Find the people who move your mission forward.</h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">TalentScout is an AI-assisted recruitment platform that helps organizations discover relevant candidates, evaluate experience and organize meaningful outreach.</p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><a href="#features" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white shadow-[0_12px_28px_-10px_rgba(79,70,229,0.55)] transition-colors hover:bg-indigo-700">Get Started <ArrowIcon /></a><a href="#discovery" className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50">Learn More</a></div>
          </div>
          <DashboardMockup />
        </section>
        <section id="features" className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20"><div className="max-w-2xl pb-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">One connected platform</p><h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 sm:text-[44px]">Recruitment, from first discovery to final follow-up.</h2></div>{features.map((feature, index) => <FeatureCard key={feature.id} feature={feature} index={index} />)}</section>
        <section className="px-5 pb-20 sm:px-8 lg:px-10"><div className="mx-auto max-w-6xl rounded-3xl bg-slate-950 px-6 py-12 text-center sm:px-12 sm:py-16"><p className="text-xs font-bold uppercase tracking-[0.16em] text-indigo-300">Start with a clearer process</p><h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Bring your strongest candidates into focus.</h2><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-300">Explore a more organized, evidence-minded approach to recruitment for your organization.</p><a href="#top" className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-slate-950 transition-colors hover:bg-indigo-50">Explore TalentScout <ArrowIcon /></a></div></section>
      </main>
      <footer id="footer" className="border-t border-slate-200"><div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10"><Logo /><p className="text-xs text-slate-500">© 2026 TalentScout. Built for mission-driven organizations.</p><div className="flex gap-5 text-xs font-medium text-slate-500"><a href="#features" className="hover:text-indigo-700">Platform</a><a href="#footer" className="hover:text-indigo-700">Privacy</a></div></div></footer>
    </div>
  );
}
