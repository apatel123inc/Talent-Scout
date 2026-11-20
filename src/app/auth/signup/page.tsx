"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup, type AuthState } from "@/app/actions/auth";

export default function SignupPage() {
  const [state, formAction, pending] = useActionState(signup, undefined as AuthState);

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4"><form action={formAction} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold">Create account</h1><p className="mt-1 text-sm text-slate-500">Start your TalentScout workspace.</p>{state?.error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}<label className="mt-6 block text-sm font-semibold">Name<input name="name" required autoComplete="name" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><label className="mt-4 block text-sm font-semibold">Email<input name="email" type="email" required autoComplete="email" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><label className="mt-4 block text-sm font-semibold">Password<input name="password" type="password" required minLength={8} autoComplete="new-password" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><button disabled={pending} className="mt-6 h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Creating account…" : "Create account"}</button><p className="mt-5 text-center text-sm text-slate-500">Already have an account? <Link className="text-indigo-600" href="/auth/login">Sign in</Link></p></form></main>;
}
