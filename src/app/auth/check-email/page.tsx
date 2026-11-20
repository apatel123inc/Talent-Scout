import Link from "next/link";

export default function CheckEmailPage() {
  return <main className="grid min-h-screen place-items-center bg-slate-50 px-4"><section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"><h1 className="text-2xl font-bold">Check your email</h1><p className="mt-2 text-sm leading-6 text-slate-500">Confirm your account using the link sent to your email address.</p><Link href="/auth/login" className="mt-6 inline-flex h-11 items-center rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white">Return to sign in</Link></section></main>;
}
