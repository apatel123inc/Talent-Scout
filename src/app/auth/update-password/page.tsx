"use client";

import { useActionState } from "react";
import { updatePassword, type AuthState } from "@/app/actions/auth";

export default function UpdatePasswordPage() {
  const [state, formAction, pending] = useActionState(updatePassword, undefined as AuthState);

  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4"><form action={formAction} className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h1 className="text-2xl font-bold">Choose a new password</h1>{state?.error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>}<label className="mt-6 block text-sm font-semibold">New password<input name="password" type="password" required minLength={8} autoComplete="new-password" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><label className="mt-4 block text-sm font-semibold">Confirm password<input name="confirmPassword" type="password" required minLength={8} autoComplete="new-password" className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 font-normal" /></label><button disabled={pending} className="mt-6 h-11 w-full rounded-lg bg-indigo-600 text-sm font-semibold text-white disabled:opacity-60">{pending ? "Saving…" : "Update password"}</button></form></main>;
}
