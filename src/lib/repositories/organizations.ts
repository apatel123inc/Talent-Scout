import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getFirstOrganizationMembership() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("organization_memberships")
    .select("organization_id, role, organizations(id, name, region, website)")
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data;
}
