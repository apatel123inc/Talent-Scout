"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCandidate } from "@/lib/repositories/candidates";
import { getFirstOrganizationMembership } from "@/lib/repositories/organizations";

export type CandidateActionState = { error?: string } | undefined;

export async function addCandidate(_state: CandidateActionState, formData: FormData): Promise<CandidateActionState> {
  const membership = await getFirstOrganizationMembership();
  if (!membership) return { error: "Create or join an organization first." };

  const name = String(formData.get("name") ?? "").trim();
  const organizationName = String(formData.get("organization") ?? "").trim();
  const role = String(formData.get("role") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const skills = String(formData.get("skills") ?? "").split(",").map((value) => value.trim()).filter(Boolean);

  if (!name) return { error: "Candidate name is required." };

  try {
    await createCandidate({ organizationId: membership.organization_id, name, organizationName, role, location, skills });
    revalidatePath("/dashboard/candidates");
    redirect("/dashboard/candidates");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not add candidate." };
  }
}
