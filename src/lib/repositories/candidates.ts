import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DatabaseCandidate = {
  id: string;
  organization_id: string;
  name: string;
  initials: string | null;
  role: string | null;
  organization_name: string | null;
  location: string | null;
  leadership: string | null;
  program: string | null;
  graduation_year: number | null;
  match_score: number | null;
  review_status: "pending" | "approved" | "needs_review";
  candidate_skills: Array<{ name: string }>;
};

export async function listCandidates() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("candidates")
    .select("id, organization_id, name, initials, role, organization_name, location, leadership, program, graduation_year, match_score, review_status, candidate_skills(name)")
    .order("name");

  if (error) throw error;
  return (data ?? []) as DatabaseCandidate[];
}

export async function findCandidate(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("candidates")
    .select("*, candidate_skills(name), candidate_experiences(*), candidate_evidence(*), candidate_notes(*)")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function createCandidate(input: {
  organizationId: string;
  name: string;
  organizationName?: string;
  role?: string;
  location?: string;
  skills: string[];
}) {
  const supabase = await createSupabaseServerClient();
  const initials = input.name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  const { data, error } = await supabase
    .from("candidates")
    .insert({
      organization_id: input.organizationId,
      name: input.name,
      initials,
      organization_name: input.organizationName ?? null,
      role: input.role ?? null,
      location: input.location ?? null,
      match_score: 50,
      review_status: "pending",
    })
    .select("id")
    .single();

  if (error) throw error;

  if (input.skills.length) {
    const { error: skillError } = await supabase
      .from("candidate_skills")
      .insert(input.skills.map((name) => ({ organization_id: input.organizationId, candidate_id: data.id, name })));
    if (skillError) throw skillError;
  }

  return data;
}
