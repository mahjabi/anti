export type RoleType = "JOB_SEEKER" | "EMPLOYER_DIRECT" | "STAFFING_AGENCY" | "ADMIN";

export type VisaSponsorshipType =
  | "CITIZEN_OR_GC_ONLY"
  | "H1B_SPONSOR"
  | "H1B_TRANSFER_ONLY"
  | "OPT_CPT_STEM"
  | "TN_E3_O1_SUPPORT"
  | "ANY_AUTHORIZED";

export type ContractType =
  | "FULL_TIME_W2"
  | "PART_TIME_W2"
  | "CONTRACT_W2"
  | "C2C_CORP_TO_CORP"
  | "CONTRACT_1099"
  | "CONTRACT_TO_HIRE";

export type WorkLocationType = "REMOTE_US_ONLY" | "HYBRID" | "ONSITE";

export type USTimezoneType =
  | "US_EASTERN"
  | "US_CENTRAL"
  | "US_MOUNTAIN"
  | "US_PACIFIC"
  | "ANY_US_TIMEZONE";

export type SecurityClearanceType =
  | "NONE"
  | "PUBLIC_TRUST"
  | "SECRET"
  | "TOP_SECRET"
  | "TS_SCI"
  | "TS_SCI_POLYGRAPH";

export type ApplicationStage =
  | "SUBMITTED"
  | "RECRUITER_SCREEN"
  | "TECHNICAL_ASSESSMENT"
  | "SYSTEM_DESIGN_ONSITE"
  | "OFFER_EXTENDED"
  | "OFFER_ACCEPTED"
  | "REJECTED";

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  description: string;
  isAgency: boolean;
  agencyName?: string;
  headquarters: string;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  company: Company;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  techStack: string[];
  experienceLevel: "Entry-Level" | "Junior" | "Mid-Level" | "Senior" | "Staff" | "Principal / Lead" | "Director / VP";
  contractType: ContractType;
  visaSponsorship: VisaSponsorshipType;
  securityClearance: SecurityClearanceType;
  workLocation: WorkLocationType;
  timezone: USTimezoneType;
  city: string;
  state: string; // 2-letter US State code (CA, NY, TX, WA, etc.)
  
  // US State Salary Transparency Breakdown
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: "YEARLY" | "HOURLY";
  equity?: string;
  bonus?: string;
  
  featured?: boolean;
  urgent?: boolean;
  benefits: string[];
  postedAt: string;
  applicantCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  companyLogo: string;
  location: string;
  contractType: ContractType;
  salaryText: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateGithub?: string;
  candidateLinkedin?: string;
  candidatePortfolio?: string;
  visaSponsorship: VisaSponsorshipType;
  securityClearance: SecurityClearanceType;
  resumeFileName?: string;
  coverNote?: string;
  stage: ApplicationStage;
  appliedAt: string;
  updatedAt: string;
  recruiterNotes?: string;
}

export interface JobFilterState {
  searchQuery: string;
  locationQuery: string;
  techStacks: string[];
  visaTypes: VisaSponsorshipType[];
  contractTypes: ContractType[];
  workLocations: WorkLocationType[];
  experienceLevels: string[];
  clearances: SecurityClearanceType[];
  timezones: USTimezoneType[];
  minSalary: number;
  isHourly: boolean;
  employerType: "ALL" | "DIRECT_ONLY" | "AGENCY_ONLY";
  usState: string;
}
