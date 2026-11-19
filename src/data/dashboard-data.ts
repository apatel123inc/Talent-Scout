export type CandidateStatus =
  | "Discovered"
  | "Under Review"
  | "Approved for Outreach"
  | "Contacted"
  | "Responded"
  | "Interested"
  | "Application"
  | "Chapter Launched";

export interface Candidate {
  id: number;
  name: string;
  initials: string;
  organization: string;
  role: string;
  leadership: string;
  skills: string[];
  status: CandidateStatus;
  match: number;
  location: string;
}

export interface Campaign {
  id: number;
  name: string;
  status: "Active" | "Draft" | "Completed";
  candidates: number;
  contacted: number;
  responseRate: number;
  startDate: string;
}

export const candidates: Candidate[] = [
  { id: 1, name: "Maya Chen", initials: "MC", organization: "University of Toronto", role: "Student Union Lead", leadership: "4 years", skills: ["Community", "Fundraising", "Youth programs"], status: "Interested", match: 94, location: "Toronto, ON" },
  { id: 2, name: "Jordan Ellis", initials: "JE", organization: "Ryerson Community Hub", role: "Volunteer Coordinator", leadership: "3 years", skills: ["Volunteer management", "Events", "Outreach"], status: "Contacted", match: 91, location: "Toronto, ON" },
  { id: 3, name: "Samira Patel", initials: "SP", organization: "York University", role: "Program Council Chair", leadership: "5 years", skills: ["Mentoring", "Operations", "Partnerships"], status: "Approved for Outreach", match: 88, location: "Vaughan, ON" },
  { id: 4, name: "Alex Morgan", initials: "AM", organization: "Centennial College", role: "Peer Support Lead", leadership: "2 years", skills: ["Peer support", "Wellness", "Facilitation"], status: "Under Review", match: 86, location: "Scarborough, ON" },
  { id: 5, name: "Taylor Brooks", initials: "TB", organization: "George Brown College", role: "Student Ambassador", leadership: "3 years", skills: ["Recruitment", "Social media", "Research"], status: "Responded", match: 84, location: "Toronto, ON" },
  { id: 6, name: "Riley Thompson", initials: "RT", organization: "Western University", role: "Campus Club Founder", leadership: "4 years", skills: ["Strategy", "Team building", "Communications"], status: "Application", match: 82, location: "London, ON" },
  { id: 7, name: "Priya Sharma", initials: "PS", organization: "McMaster University", role: "Community Mentor", leadership: "3 years", skills: ["Mentoring", "Curriculum", "Youth programs"], status: "Discovered", match: 79, location: "Hamilton, ON" },
  { id: 8, name: "Noah Williams", initials: "NW", organization: "Toronto Public Library", role: "Youth Advisory Member", leadership: "2 years", skills: ["Advisory", "Public speaking", "Research"], status: "Chapter Launched", match: 77, location: "Toronto, ON" }
];

export const initialCampaigns: Campaign[] = [
  { id: 1, name: "Youth leadership — GTA", status: "Active", candidates: 86, contacted: 62, responseRate: 38, startDate: "Nov 4, 2026" },
  { id: 2, name: "University ambassadors", status: "Active", candidates: 64, contacted: 48, responseRate: 31, startDate: "Oct 21, 2026" },
  { id: 3, name: "Community mentor network", status: "Draft", candidates: 35, contacted: 0, responseRate: 0, startDate: "Nov 18, 2026" },
  { id: 4, name: "Fall chapter founders", status: "Completed", candidates: 42, contacted: 42, responseRate: 44, startDate: "Sep 8, 2026" }
];

export const pipelineStages: CandidateStatus[] = [
  "Discovered",
  "Under Review",
  "Approved for Outreach",
  "Contacted",
  "Responded",
  "Interested",
  "Application",
  "Chapter Launched"
];

export const recentActivity = [
  { title: "Maya Chen changed to Interested", detail: "University of Toronto", time: "12 min ago", tone: "bg-violet-500" },
  { title: "Youth leadership campaign", detail: "8 new candidates added", time: "1 hr ago", tone: "bg-blue-500" },
  { title: "Taylor Brooks responded", detail: "University ambassadors", time: "3 hrs ago", tone: "bg-emerald-500" },
  { title: "New profile approved", detail: "Samira Patel", time: "Yesterday", tone: "bg-amber-500" }
];
