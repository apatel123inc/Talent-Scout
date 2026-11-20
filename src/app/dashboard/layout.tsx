import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const instant = false;

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await connection();
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  await supabase.rpc("ensure_application_user");
  const { data: memberships } = await supabase
    .from("organization_memberships")
    .select("organization_id, role, organizations(name)")
    .limit(1);

  if (!memberships?.length) redirect("/onboarding");

  return <DashboardShell>{children}</DashboardShell>;
}
