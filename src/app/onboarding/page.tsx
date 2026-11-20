"use client";

import { useActionState } from "react";
import { createOrganization, type OrganizationState } from "@/app/actions/organization";

export default function OnboardingPage() {
  const [state, formAction, pending] = useActionState(createOrganization, undefined as OrganizationState);

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4"><form action={formAction} className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold">Create your organization</h1><p className="mt-1 text-sm text-slate-500">You will become the owner of this workspace.</p>{state?.error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}<label className="mt-6 block text-sm font-semibold">Organization name<input name="name" required placeholder="Bright Beginnings Canada" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><label className="mt-4 block text-sm font-semibold">Region<input name="region" placeholder="Canada" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><label className="mt-4 block text-sm font-semibold">Website<input name="website" type="url" placeholder="https://example.org" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><button disabled={pending} className="mt-6 h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Creating…" : "Create organization"}</button></form></main>;
}
