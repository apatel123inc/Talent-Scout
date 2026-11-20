"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, type AuthState } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined as AuthState);

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4"><form action={formAction} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold">Sign in</h1><p className="mt-1 text-sm text-slate-500">Access your TalentScout workspace.</p>{state?.error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}<label className="mt-6 block text-sm font-semibold">Email<input name="email" type="email" required autoComplete="email" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><label className="mt-4 block text-sm font-semibold">Password<input name="password" type="password" required autoComplete="current-password" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><button disabled={pending} className="mt-6 h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Signing in…" : "Sign in"}</button><div className="mt-5 flex justify-between text-sm"><Link className="text-indigo-600" href="/auth/signup">Create account</Link><Link className="text-slate-500" href="/auth/reset-password">Forgot password?</Link></div></form></main>;
}
