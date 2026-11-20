"use client";

import { useActionState } from "react";
import Link from "next/link";
import { resetPassword, type AuthState } from "@/app/actions/auth";

export default function ResetPasswordPage() {
  const [state, formAction, pending] = useActionState(resetPassword, undefined as AuthState);

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4"><form action={formAction} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold">Reset password</h1><p className="mt-1 text-sm text-slate-500">We’ll email you a secure reset link.</p>{state?.error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}{state?.message && <p role="status" className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{state.message}</p>}<label className="mt-6 block text-sm font-semibold">Email<input name="email" type="email" required autoComplete="email" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><button disabled={pending} className="mt-6 h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Sending…" : "Send reset link"}</button><Link className="mt-5 block text-center text-sm text-indigo-600" href="/auth/login">Back to sign in</Link></form></main>;
}
