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
  | "CONTRACT_TO_HIRE"
  | "INTERNSHIP_PAID"
  | "INTERNSHIP_UNPAID";

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

export type JobOpportunityCategory =
  | "PHD_INTERNSHIP"
  | "POST_PHD_FULLTIME"
  | "STUDENT_RESEARCHER_FELLOWSHIP";

export type CompensationType = "PAID" | "UNPAID_FREE" | "UNKNOWN";

export type DataSourceOrigin =
  | "GOOGLE_CAREERS"
  | "USAJOBS"
  | "CAREERONESTOP"
  | "MICROSOFT_RESEARCH"
  | "META_FAIR"
  | "OPENAI_ANTHROPIC"
  | "INDUSTRY_FEED";

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

export interface MatchScoreDetails {
  overallScore: number;
  skillsScore: number; // 35%
  researchScore: number; // 25%
  projectsScore: number; // 15%
  educationScore: number; // 10%
  careerInterestScore: number; // 10%
  locationScore: number; // 3%
  salaryScore: number; // 2%
  supportingEvidence: string[];
  missingQualifications: string[];
  unknownFields: {
    field: string;
    reason: string;
    suggestedAction: string;
  }[];
  rankingExplanation: string;
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
  experienceLevel: "Entry-Level" | "Junior" | "Mid-Level" | "Senior" | "Staff" | "Principal / Lead" | "Director / VP" | "PhD Intern / Researcher";
  contractType: ContractType;
  visaSponsorship: VisaSponsorshipType;
  securityClearance: SecurityClearanceType;
  workLocation: WorkLocationType;
  timezone: USTimezoneType;
  city: string;
  state: string; // 2-letter US State code (CA, TX, KS, MO, NY, WA, etc.)
  
  // Opportunity Classification
  category?: JobOpportunityCategory;
  compensationType?: CompensationType;
  dataSource?: DataSourceOrigin;
  optCptEligible?: boolean | "UNKNOWN";
  
  // Salary details
  salaryMin: number;
  salaryMax: number;
  salaryPeriod: "YEARLY" | "HOURLY" | "MONTHLY" | "STIPEND";
  isSalaryDisclosed?: boolean;
  equity?: string;
  bonus?: string;
  
  featured?: boolean;
  urgent?: boolean;
  benefits: string[];
  postedAt: string;
  applicantCount: number;
  deadline?: string;
  matchScore?: MatchScoreDetails;
}

export interface CandidateProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  currentInstitution: string;
  currentLab: string;
  degreeLevel: string; // "Ph.D. in Computer Science"
  phdStartYear: string; // "Aug 2026"
  anticipatedGraduation: string; // "05/2030"
  priorInstitutions: {
    institution: string;
    degree: string;
    thesisTitle: string;
    period: string;
  }[];
  researchInterests: string[];
  skills: {
    languages: string[];
    frameworks: string[];
    securityAndAi: string[];
    tools: string[];
  };
  publications: {
    year: number;
    title: string;
    venue: string;
    citation: string;
  }[];
  manuscriptsInPrep: {
    year: number;
    title: string;
  }[];
  projects: {
    title: string;
    year: number;
    description: string;
    technologies: string[];
  }[];
  workExperience: {
    role: string;
    company: string;
    period: string;
    highlights: string[];
  }[];
  hardConstraints: {
    mustBeOptCptEligible: boolean;
    targetRoleType: "INTERNSHIP_ONLY" | "ALL";
  };
  softConstraints: {
    preferredStates: string[]; // ["TX", "CA", "KS", "MO"]
    openToAnywhereInUS: boolean;
  };
  isLocked: boolean; // Protects profile from accidental edits without manual unlock or CV upload
  lastUpdated: string;
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
  category: "ALL" | JobOpportunityCategory;
  compensationType: "ALL" | CompensationType;
  optCptOnly: boolean;
  preferredStatesOnly: boolean;
}
