"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCampaign } from "@/lib/repositories/campaigns";
import { getFirstOrganizationMembership } from "@/lib/repositories/organizations";

export type CampaignActionState = { error?: string } | undefined;

export async function addCampaign(_state: CampaignActionState, formData: FormData): Promise<CampaignActionState> {
  const membership = await getFirstOrganizationMembership();
  if (!membership) return { error: "Create or join an organization first." };

  const name = String(formData.get("name") ?? "").trim();
  const position = String(formData.get("position") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const statusValue = String(formData.get("status") ?? "draft");
  const status = statusValue.toLowerCase() === "active" ? "active" : statusValue.toLowerCase() === "completed" ? "completed" : "draft";
  const startDate = String(formData.get("startDate") ?? "").trim() || undefined;
  const targetUniversities = String(formData.get("universities") ?? "").split(",").map((value) => value.trim()).filter(Boolean);
  const targetPrograms = String(formData.get("qualifications") ?? "").split(",").map((value) => value.trim()).filter(Boolean);

  if (!name) return { error: "Campaign name is required." };

  try {
    await createCampaign({ organizationId: membership.organization_id, name, position, description, status, startDate, targetUniversities, targetPrograms });
    revalidatePath("/dashboard/campaigns");
    redirect("/dashboard/campaigns");
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not create campaign." };
  }
}
