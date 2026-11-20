"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type OrganizationState = { error?: string } | undefined;

export async function createOrganization(_state: OrganizationState, formData: FormData): Promise<OrganizationState> {
  const name = String(formData.get("name") ?? "").trim();
  const region = String(formData.get("region") ?? "").trim() || null;
  const website = String(formData.get("website") ?? "").trim() || null;

  if (!name) return { error: "Organization name is required." };

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { error } = await supabase.rpc("create_organization", {
    p_name: name,
    p_region: region,
    p_website: website,
  });

  if (error) return { error: error.message };
  redirect("/dashboard");
}
