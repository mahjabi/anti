import { Job, Application, ApplicationStage, RoleType } from "@/types/job";
import { INITIAL_JOBS } from "./data/sample-jobs";

const STORAGE_KEYS = {
  JOBS: "techjobs_us_jobs",
  APPLICATIONS: "techjobs_us_applications",
  SAVED_JOBS: "techjobs_us_saved",
  USER_ROLE: "techjobs_us_role",
};

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: "app-1",
    jobId: "job-us-101",
    jobTitle: "Senior Distributed Systems Engineer (Go / Kubernetes)",
    companyName: "Nexus Payments Inc.",
    companyLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=128&h=128&fit=crop&q=80",
    location: "San Francisco, CA",
    contractType: "FULL_TIME_W2",
    salaryText: "$185k - $235k / yr",
    candidateName: "Alex Chen",
    candidateEmail: "alex.chen.dev@example.com",
    candidatePhone: "+1 (415) 555-0192",
    candidateGithub: "https://github.com/alexchen-cloud",
    candidateLinkedin: "https://linkedin.com/in/alexchen-swe",
    visaSponsorship: "H1B_SPONSOR",
    securityClearance: "NONE",
    resumeFileName: "Alex_Chen_Staff_Backend_Resume.pdf",
    coverNote: "Over 6 years of experience building high-throughput Go microservices on Kubernetes. Looking forward to discussing consensus protocol designs!",
    stage: "TECHNICAL_ASSESSMENT",
    appliedAt: "Aug 28, 2026",
    updatedAt: "Aug 30, 2026",
    recruiterNotes: "Strong candidate. Completed take-home system design task with 98% score. Scheduling live architecture round.",
  },
  {
    id: "app-2",
    jobId: "job-us-102",
    jobTitle: "Staff Cloud & Platform Engineer (Terraform / AWS / AI Infra)",
    companyName: "HyperFlow AI Systems",
    companyLogo: "https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=128&h=128&fit=crop&q=80",
    location: "Austin, TX (Remote)",
    contractType: "FULL_TIME_W2",
    salaryText: "$200k - $250k / yr",
    candidateName: "Priya Sharma",
    candidateEmail: "priya.sharma@example.com",
    candidateGithub: "https://github.com/priyasharma-k8s",
    candidateLinkedin: "https://linkedin.com/in/priyasharma-devops",
    visaSponsorship: "OPT_CPT_STEM",
    securityClearance: "NONE",
    resumeFileName: "Priya_Sharma_Cloud_Architect.pdf",
    stage: "SYSTEM_DESIGN_ONSITE",
    appliedAt: "Aug 25, 2026",
    updatedAt: "Sep 01, 2026",
    recruiterNotes: "Panel interview scheduled for Thursday at 2 PM CT. Focus on GPU cluster orchestrations.",
  },
  {
    id: "app-3",
    jobId: "job-us-103",
    jobTitle: "Senior Fullstack React & Node.js Developer (C2C Corp-to-Corp)",
    companyName: "Apex Tech Staffing & Solutions",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&h=128&fit=crop&q=80",
    location: "Chicago, IL (Remote)",
    contractType: "C2C_CORP_TO_CORP",
    salaryText: "$85 - $105 / hr",
    candidateName: "Marcus Brody",
    candidateEmail: "marcus@brodytechsolutions.com",
    candidateGithub: "https://github.com/mbrody-fullstack",
    visaSponsorship: "CITIZEN_OR_GC_ONLY",
    securityClearance: "NONE",
    resumeFileName: "Brody_Tech_LLC_Marcus_Resume.pdf",
    stage: "OFFER_EXTENDED",
    appliedAt: "Aug 20, 2026",
    updatedAt: "Aug 31, 2026",
    recruiterNotes: "Contract agreement sent to candidate's LLC at $100/hr billing rate. Awaiting signed COI and SOW.",
  },
];

export const storage = {
  getJobs(): Job[] {
    if (typeof window === "undefined") return INITIAL_JOBS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.JOBS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(INITIAL_JOBS));
        return INITIAL_JOBS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_JOBS;
    }
  },

  saveJobListing(job: Job): Job[] {
    const current = this.getJobs();
    const updated = [job, ...current];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(updated));
    }
    return updated;
  },

  getApplications(): Application[] {
    if (typeof window === "undefined") return INITIAL_APPLICATIONS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
        return INITIAL_APPLICATIONS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_APPLICATIONS;
    }
  },

  addApplication(app: Application): Application[] {
    const current = this.getApplications();
    const updated = [app, ...current];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
    }
    return updated;
  },

  updateApplicationStage(id: string, stage: ApplicationStage, notes?: string): Application[] {
    const current = this.getApplications();
    const updated = current.map((app) => {
      if (app.id === id) {
        return {
          ...app,
          stage,
          recruiterNotes: notes !== undefined ? notes : app.recruiterNotes,
          updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        };
      }
      return app;
    });
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(updated));
    }
    return updated;
  },

  getSavedJobIds(): string[] {
    if (typeof window === "undefined") return ["job-us-101", "job-us-104"];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      if (!stored) {
        const initial = ["job-us-101", "job-us-104"];
        localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(stored);
    } catch {
      return ["job-us-101", "job-us-104"];
    }
  },

  toggleSavedJob(jobId: string): string[] {
    const current = this.getSavedJobIds();
    const exists = current.includes(jobId);
    const updated = exists ? current.filter((id) => id !== jobId) : [...current, jobId];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(updated));
    }
    return updated;
  },

  getUserRole(): RoleType {
    if (typeof window === "undefined") return "JOB_SEEKER";
    return (localStorage.getItem(STORAGE_KEYS.USER_ROLE) as RoleType) || "JOB_SEEKER";
  },

  setUserRole(role: RoleType): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
    }
  },
};
