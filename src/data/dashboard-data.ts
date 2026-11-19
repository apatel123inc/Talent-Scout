export type CandidateStatus =
  | "Discovered"
  | "Under Review"
  | "Approved for Outreach"
  | "Contacted"
  | "Responded"
  | "Interested"
  | "Application"
  | "Interview"
  | "Selected"
  | "Rejected"
  | "Archived"
  | "Chapter Launched";
export interface CandidateExperience {
  title: string;
  organization: string;
  period: string;
  summary: string;
}

export interface CandidateSource {
  label: string;
  type: "Profile" | "Public event" | "Application" | "Referral";
  evidence: string;
}

export interface CandidateNote {
  id: number;
  author: string;
  text: string;
  createdAt: string;
}

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
  program?: string;
  graduationYear?: number;
  campaignId?: number;
  reviewStatus?: "Pending" | "Approved" | "Needs review";
  achievements?: string[];
  experience?: CandidateExperience[];
  sources?: CandidateSource[];
  notes?: CandidateNote[];
}

export interface Campaign {
  id: number;
  name: string;
  status: "Active" | "Draft" | "Completed";
  candidates: number;
  contacted: number;
  responseRate: number;
  startDate: string;
  organization?: string;
  position?: string;
  targetUniversities?: string[];
  targetQualifications?: string[];
  description?: string;
  creationDate?: string;
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
  { id: 1, name: "Youth leadership — GTA", organization: "Bright Beginnings Canada", position: "University Chapter Founder", targetUniversities: ["University of Toronto", "TMU", "York University"], targetQualifications: ["Student leadership", "Youth programs"], description: "Recruit student leaders to establish GTA university chapters.", status: "Active", candidates: 86, contacted: 62, responseRate: 38, startDate: "Nov 4, 2026", creationDate: "Nov 2, 2026" },
  { id: 2, name: "University ambassadors", organization: "Bright Beginnings Canada", position: "Campus Ambassador", targetUniversities: ["George Brown College", "Centennial College"], targetQualifications: ["Community outreach", "Peer engagement"], description: "Build an ambassador network for campus awareness and outreach.", status: "Active", candidates: 64, contacted: 48, responseRate: 31, startDate: "Oct 21, 2026", creationDate: "Oct 19, 2026" },
  { id: 3, name: "Community mentor network", organization: "Bright Beginnings Canada", position: "Community Mentor", targetUniversities: ["McMaster University", "Centennial College"], targetQualifications: ["Mentoring", "Early childhood interest"], description: "Identify mentors for family education and youth programming.", status: "Draft", candidates: 35, contacted: 0, responseRate: 0, startDate: "Nov 18, 2026", creationDate: "Nov 18, 2026" },
  { id: 4, name: "Fall chapter founders", organization: "Bright Beginnings Canada", position: "Chapter Founder", targetUniversities: ["Western University", "Toronto Metropolitan University"], targetQualifications: ["Team building", "Operations"], description: "Support the launch of a fall chapter founder cohort.", status: "Completed", candidates: 42, contacted: 42, responseRate: 44, startDate: "Sep 8, 2026", creationDate: "Sep 5, 2026" }
];

export const pipelineStages: CandidateStatus[] = [
  "Discovered",
  "Under Review",
  "Approved for Outreach",
  "Contacted",
  "Responded",
  "Interested",
  "Application",
  "Interview",
  "Selected",
  "Rejected",
  "Archived",
  "Chapter Launched"
];

export interface Organization {
  id: number;
  name: string;
  region: string;
  website?: string;
}

export interface OutreachMessage {
  id: number;
  candidateId: number;
  campaignId: number;
  subject: string;
  sentAt: string;
  status: "Draft" | "Sent" | "Opened" | "Responded";
}

export const organizations: Organization[] = [
  { id: 1, name: "Bright Beginnings Canada", region: "Canada", website: "https://example.org" }
];

export const outreachMessages: OutreachMessage[] = [
  { id: 1, candidateId: 1, campaignId: 1, subject: "Chapter leadership opportunity", sentAt: "Nov 18, 2026", status: "Responded" },
  { id: 2, candidateId: 2, campaignId: 1, subject: "Community leadership at Bright Beginnings", sentAt: "Nov 17, 2026", status: "Opened" },
  { id: 3, candidateId: 5, campaignId: 2, subject: "Campus ambassador opportunity", sentAt: "Nov 16, 2026", status: "Responded" }
];

export const recentActivity = [
  { title: "Maya Chen changed to Interested", detail: "University of Toronto", time: "12 min ago", tone: "bg-violet-500" },
  { title: "Youth leadership campaign", detail: "8 new candidates added", time: "1 hr ago", tone: "bg-blue-500" },
  { title: "Taylor Brooks responded", detail: "University ambassadors", time: "3 hrs ago", tone: "bg-emerald-500" },
  { title: "New profile approved", detail: "Samira Patel", time: "Yesterday", tone: "bg-amber-500" }
];
