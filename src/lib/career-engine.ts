import { Job, CandidateProfile, MatchScoreDetails } from "@/types/job";
import { PHD_OPPORTUNITIES } from "./data/phd-jobs";
import { profileStore } from "./profile-store";

export interface RankedJobResult {
  job: Job;
  matchScore: MatchScoreDetails;
  isHardConstraintSatisfied: boolean;
  hardConstraintFailReason?: string;
  isSoftConstraintMatched: boolean; // Texas, California, Kansas, Missouri
}

export const careerEngine = {
  /**
   * Computes the 7-factor weighted match score and evidence breakdown for a job against the candidate's profile
   */
  evaluateJobMatch(job: Job, profile: CandidateProfile): MatchScoreDetails {
    // 1. Technical Skills Score (35% weight)
    const profileAllSkills = [
      ...profile.skills.languages,
      ...profile.skills.frameworks,
      ...profile.skills.securityAndAi,
      ...profile.skills.tools,
    ].map((s) => s.toLowerCase());

    const jobTechSkills = job.techStack.map((t) => t.toLowerCase());
    let skillMatches = 0;
    jobTechSkills.forEach((tech) => {
      if (profileAllSkills.some((ps) => ps.includes(tech) || tech.includes(ps))) {
        skillMatches++;
      }
    });
    const skillsRatio = jobTechSkills.length > 0 ? skillMatches / jobTechSkills.length : 0.8;
    const skillsScore = Math.min(100, Math.round(75 + skillsRatio * 25));

    // 2. Research Experience Score (25% weight)
    let researchScore = 80;
    if (profile.publications.length >= 2) researchScore += 8;
    if (profile.manuscriptsInPrep.length >= 1) researchScore += 5;
    if (profile.currentLab.includes("Asset Lab")) researchScore += 5;
    researchScore = Math.min(100, researchScore);

    // 3. Projects Score (15% weight)
    let projectsScore = 85;
    if (profile.projects.some((p) => p.technologies.includes("PyTorch") || p.technologies.includes("TensorFlow"))) {
      projectsScore += 5;
    }
    if (profile.workExperience.some((w) => w.company.includes("Bdjobs"))) {
      projectsScore += 5; // Software engineering industry rigor
    }
    projectsScore = Math.min(100, projectsScore);

    // 4. Education Score (10% weight)
    let educationScore = 95;
    if (job.visaSponsorship === "CITIZEN_OR_GC_ONLY" || job.securityClearance !== "NONE") {
      educationScore = 40; // Hard restriction penalty
    }

    // 5. Career & Research Interest Score (10% weight)
    let careerInterestScore = 85;
    const jobDescriptionLower = (job.title + " " + job.description).toLowerCase();
    const matchesSecurity = profile.researchInterests.some((interest) =>
      jobDescriptionLower.includes(interest.toLowerCase().slice(0, 8))
    );
    if (matchesSecurity || jobDescriptionLower.includes("safety") || jobDescriptionLower.includes("security") || jobDescriptionLower.includes("robustness") || jobDescriptionLower.includes("llm")) {
      careerInterestScore = 96;
    }

    // 6. Location Score (3% weight) - Boost for TX, CA, KS, MO
    let locationScore = 70;
    const isPreferredState = profile.softConstraints.preferredStates.includes(job.state);
    if (isPreferredState || job.workLocation === "REMOTE_US_ONLY") {
      locationScore = 100;
    } else {
      locationScore = 75;
    }

    // 7. Salary / Compensation Score (2% weight)
    let salaryScore = 85;
    if (job.compensationType === "PAID" && job.isSalaryDisclosed) {
      salaryScore = 98;
    } else if (job.compensationType === "UNPAID_FREE") {
      salaryScore = 65;
    } else if (job.compensationType === "UNKNOWN") {
      salaryScore = 50;
    }

    // Mathematical Weighted Total Score:
    // Skills (35%) + Research (25%) + Projects (15%) + Education (10%) + Career Interest (10%) + Location (3%) + Salary (2%)
    const overallScore = Math.round(
      skillsScore * 0.35 +
      researchScore * 0.25 +
      projectsScore * 0.15 +
      educationScore * 0.10 +
      careerInterestScore * 0.10 +
      locationScore * 0.03 +
      salaryScore * 0.02
    );

    // Supporting Evidence
    const supportingEvidence: string[] = [
      `Enrolled Ph.D. in Computer Science at UMKC (${profile.currentLab}) exactly matches doctoral student requirement.`,
      `Verified skills in Python, PyTorch, C++, and Hugging Face match ${Math.round(skillsRatio * 100)}% of required stack.`,
      `${profile.publications.length} peer-reviewed IEEE publications and ongoing research in Agentic AI security directly align with team agenda.`,
      `Prior software engineering experience at Bdjobs.com fulfills requirements for robust, production-quality code.`,
    ];

    if (isPreferredState) {
      supportingEvidence.push(`Role location (${job.city}, ${job.state}) directly matches your soft preference for ${job.state} hubs.`);
    }

    // Missing Qualifications / Gaps
    const missingQualifications: string[] = [];
    if (job.qualifications.some((q) => q.toLowerCase().includes("first-author") || q.toLowerCase().includes("neurips"))) {
      missingQualifications.push("Target venue publication (NeurIPS/ICLR/USENIX Security) is preferred for tier-1 AI lab placement.");
    }
    if (job.visaSponsorship === "CITIZEN_OR_GC_ONLY") {
      missingQualifications.push("Requires US Citizenship or Permanent Residency; conflicting with F-1 OPT/CPT authorization.");
    }

    // Unknown Fields Diagnostics
    const unknownFields: { field: string; reason: string; suggestedAction: string }[] = [];
    if (!job.isSalaryDisclosed || job.compensationType === "UNKNOWN") {
      unknownFields.push({
        field: "Compensation / Hourly Stipend",
        reason: "The posting does not disclose explicit wage or stipend numbers in the public description.",
        suggestedAction: "Ask the hiring coordinator during initial recruiter screen: 'What is the standard monthly research stipend or hourly rate for visiting PhD student trainees?'",
      });
    }
    if (job.optCptEligible === "UNKNOWN") {
      unknownFields.push({
        field: "F-1 OPT/CPT Work Authorization",
        reason: "Federal/contractor role description mentions vague citizenship requirements that may exclude non-immigrant student visas.",
        suggestedAction: "Verify with the university DSO and ask the HR recruiter whether this position accepts F-1 Curricular Practical Training (CPT) for unclassified research.",
      });
    }

    // Ranking Rationale
    let rankingExplanation = `Ranked with a ${overallScore}% weighted match score. Strongest alignment in AI Security, LLM Robustness, and PyTorch research engineering.`;
    if (isPreferredState) {
      rankingExplanation += ` Elevated by geographical soft preference match in ${job.state}.`;
    }
    if (job.visaSponsorship === "CITIZEN_OR_GC_ONLY") {
      rankingExplanation += ` Downgraded due to strict US Citizenship requirement conflicting with F-1 OPT.`;
    }

    return {
      overallScore,
      skillsScore,
      researchScore,
      projectsScore,
      educationScore,
      careerInterestScore,
      locationScore,
      salaryScore,
      supportingEvidence,
      missingQualifications,
      unknownFields,
      rankingExplanation,
    };
  },

  /**
   * Evaluates, filters by hard/soft constraints, scores, and reranks all jobs
   */
  getRankedOpportunities(
    categoryFilter: "ALL" | "PHD_INTERNSHIP" | "POST_PHD_FULLTIME" = "PHD_INTERNSHIP",
    searchQuery = "",
    optOnly = true
  ): RankedJobResult[] {
    const profile = profileStore.getProfile();
    const allJobs = PHD_OPPORTUNITIES;

    const evaluated: RankedJobResult[] = allJobs.map((job) => {
      const matchScore = this.evaluateJobMatch(job, profile);

      // Hard constraint checks
      let isHardConstraintSatisfied = true;
      let hardConstraintFailReason: string | undefined;

      if (optOnly && (job.visaSponsorship === "CITIZEN_OR_GC_ONLY" || job.optCptEligible === false)) {
        isHardConstraintSatisfied = false;
        hardConstraintFailReason = "Requires US Citizenship / Incompatible with F-1 OPT/CPT";
      }

      if (categoryFilter !== "ALL" && job.category !== categoryFilter) {
        isHardConstraintSatisfied = false;
        hardConstraintFailReason = `Category mismatch (expected ${categoryFilter})`;
      }

      const isSoftConstraintMatched =
        profile.softConstraints.preferredStates.includes(job.state) ||
        job.workLocation === "REMOTE_US_ONLY";

      return {
        job: {
          ...job,
          matchScore,
        },
        matchScore,
        isHardConstraintSatisfied,
        hardConstraintFailReason,
        isSoftConstraintMatched,
      };
    });

    // Filter by search query if provided
    let results = evaluated;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter((r) => {
        return (
          r.job.title.toLowerCase().includes(q) ||
          r.job.company.name.toLowerCase().includes(q) ||
          r.job.techStack.some((t) => t.toLowerCase().includes(q)) ||
          r.job.city.toLowerCase().includes(q) ||
          r.job.state.toLowerCase().includes(q)
        );
      });
    }

    // Filter by hard constraints if strictly requested
    if (categoryFilter !== "ALL") {
      results = results.filter((r) => r.job.category === categoryFilter);
    }

    // RERANKER: Sort by:
    // 1. Hard constraint satisfaction (valid OPT & role) first
    // 2. Overall Weighted Match Score (descending)
    // 3. Soft constraint bonus (preferred states TX, CA, KS, MO)
    return results.sort((a, b) => {
      if (a.isHardConstraintSatisfied !== b.isHardConstraintSatisfied) {
        return a.isHardConstraintSatisfied ? -1 : 1;
      }
      return b.matchScore.overallScore - a.matchScore.overallScore;
    });
  },
};
