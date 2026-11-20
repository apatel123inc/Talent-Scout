import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function listCampaigns() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("campaigns")
    .select("id, organization_id, name, position, description, status, start_date, end_date, target_universities, target_programs, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createCampaign(input: {
  organizationId: string;
  name: string;
  position?: string;
  description?: string;
  status: "draft" | "active" | "completed";
  startDate?: string;
  targetUniversities: string[];
  targetPrograms: string[];
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("campaigns")
    .insert({
      organization_id: input.organizationId,
      name: input.name,
      position: input.position ?? null,
      description: input.description ?? null,
      status: input.status,
      start_date: input.startDate ?? null,
      target_universities: input.targetUniversities,
      target_programs: input.targetPrograms,
    })
    .select("id")
    .single();

  if (error) throw error;
  return data;
}
