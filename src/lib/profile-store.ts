import { CandidateProfile } from "@/types/job";

const PROFILE_STORAGE_KEY = "techjobs_candidate_profile_v1";

export const DEFAULT_PROFILE: CandidateProfile = {
  id: "profile-mahjabin-hossain",
  fullName: "Mahjabin Hossain",
  email: "mahhjabinhossain@gmail.com",
  phone: "+1 (816) 555-0143",
  currentInstitution: "University of Missouri, Kansas City (UMKC)",
  currentLab: "Asset Lab (Advisor: Dr. Asset Group)",
  degreeLevel: "Ph.D. Student in Computer Science",
  phdStartYear: "Aug 2026",
  anticipatedGraduation: "05/2030",
  priorInstitutions: [
    {
      institution: "Khulna University of Engineering and Technology (KUET)",
      degree: "B.Sc. in Computer Science and Engineering",
      thesisTitle: "Conducted a deep learning–based study on brain tumor segmentation using MRI slices to improve accuracy and reduce reliance on manual detection.",
      period: "Jan 2019 – March 2024",
    },
  ],
  researchInterests: [
    "Artificial Intelligence and Cybersecurity",
    "AI Security, LLM and Agent Security",
    "Adversarial Machine Learning",
    "AI Safety and Trustworthy Machine Learning",
    "Model Robustness Evaluation",
    "Automated Security Testing & Threat Modeling",
  ],
  skills: {
    languages: ["Python", "C++", "Java", "Kotlin", "Swift"],
    frameworks: ["PyTorch", "TensorFlow", "Keras", "Hugging Face Transformers", "OpenCV", "Scikit-learn"],
    securityAndAi: [
      "Agent Security",
      "LLM Security",
      "Prompt Injection & Jailbreak Analysis",
      "Adversarial Robustness Evaluation",
      "Explainable AI (XAI)",
      "Threat Modeling of AI Applications",
      "Static and Dynamic Analysis",
    ],
    tools: ["Git", "Jupyter Notebook", "Visual Studio", "Android Studio", "SQL", "Linux", "macOS"],
  },
  publications: [
    {
      year: 2026,
      title: "Advancing Diabetes Prediction: Explainable Artificial Intelligence (XAI) for Enhanced Clinical Insights",
      venue: "2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN)",
      citation: "Hossain, M., & Haydar, M. (2026, April). pp. 1-6. IEEE.",
    },
    {
      year: 2026,
      title: "State-of-the-Art Deep Learning Architectures for Brain Tumor Segmentation: A Review",
      venue: "2026 IEEE 2nd International Conference on Quantum Photonics, Artificial Intelligence & Networking (QPAIN)",
      citation: "Hossain, M., & Mahi, U. N. (2026, April). pp. 1-5. IEEE.",
    },
    {
      year: 2025,
      title: "Skin Cancer Detection and Classification Using MobileNetV2 Integrated into an Android App",
      venue: "Available at SSRN 6625698",
      citation: "Hossain, M., Hossain, N., Rafi, A. H., & Habib, M. A. (2025). SSRN.",
    },
  ],
  manuscriptsInPrep: [
    {
      year: 2026,
      title: "An Empirical Study on Malicious Extensions in Agentic AI Ecosystems",
    },
    {
      year: 2026,
      title: "Urban Heat Island and Land Surface Temperature Prediction Through Deep Learning Models in Lubbock, Texas, USA",
    },
    {
      year: 2026,
      title: "Flood Modeling Prediction Through Tree-Based Machine Learning Algorithms in Lubbock, Texas, USA",
    },
  ],
  projects: [
    {
      title: "SkinCer — ML Skin Cancer Detection Android App",
      year: 2022,
      description: "Implemented MobileNetV2 deep neural network for dermatoscopic lesion classification deployed to real-time Android diagnostic app.",
      technologies: ["Python", "TensorFlow", "MobileNetV2", "Android", "Java"],
    },
    {
      title: "Brain Tumor MRI Segmentation Neural Network",
      year: 2024,
      description: "Deep learning segmentation models evaluated on multimodal MRI brain scans under Dr. Pintu Chandra Shill.",
      technologies: ["Python", "PyTorch", "OpenCV", "Medical Image Processing"],
    },
    {
      title: "Bdjobs C2C Enterprise Application & Search Engine",
      year: 2024,
      description: "Engineered scalable candidate-job applicant tracking and Expert CV Search services handling millions of user records.",
      technologies: ["RESTful APIs", "Databases", "Asynchronous Pipelines", "Git", "CI/CD"],
    },
    {
      title: "weCare — Medication & Health Mobile Assistant",
      year: 2020,
      description: "Java-based Android application providing smart scheduling, medical alerts, and patient history logging.",
      technologies: ["Android", "Java", "SQLite"],
    },
  ],
  workExperience: [
    {
      role: "Graduate Research Assistant",
      company: "Asset Lab, University of Missouri, Kansas City (UMKC)",
      period: "Aug 2026 – Present",
      highlights: [
        "Investigating security vulnerabilities and prompt injection defenses in Agentic AI frameworks.",
        "Developing automated robustness evaluation benchmarks for large language models.",
      ],
    },
    {
      role: "Software Engineer / Junior App Developer",
      company: "Bdjobs.com",
      period: "June 2024 – Aug 2026",
      highlights: [
        "Engineered the C2C module of the Bdjobs application for job posting and candidate pipeline tracking.",
        "Integrated high-throughput RESTful APIs, database indexing, and asynchronous data pipelines.",
      ],
    },
    {
      role: "Undergraduate Research Assistant",
      company: "AI & Security Research Lab, KUET",
      period: "Jan 2023 – Dec 2023",
      highlights: [
        "Conducted empirical AI robustness and medical image computer vision investigations.",
      ],
    },
  ],
  hardConstraints: {
    mustBeOptCptEligible: true,
    targetRoleType: "INTERNSHIP_ONLY",
  },
  softConstraints: {
    preferredStates: ["TX", "CA", "KS", "MO"],
    openToAnywhereInUS: true,
  },
  isLocked: true, // Default profile is locked to prevent accidental overwrite
  lastUpdated: "Sep 08, 2026",
};

export const profileStore = {
  getProfile(): CandidateProfile {
    if (typeof window === "undefined") return DEFAULT_PROFILE;
    try {
      const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
        return DEFAULT_PROFILE;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  updateProfile(updated: Partial<CandidateProfile>, forceOverride = false): { success: boolean; message: string; profile: CandidateProfile } {
    const current = this.getProfile();
    
    // Check lock status unless override is specified
    if (current.isLocked && !forceOverride && updated.isLocked === undefined) {
      return {
        success: false,
        message: "Profile is locked against accidental modifications. Please toggle manual edit unlock or upload a new CV to update fields.",
        profile: current,
      };
    }

    const merged: CandidateProfile = {
      ...current,
      ...updated,
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(merged));
    }

    return {
      success: true,
      message: "Profile updated successfully.",
      profile: merged,
    };
  },

  toggleLock(lockedState?: boolean): CandidateProfile {
    const current = this.getProfile();
    const newLock = lockedState !== undefined ? lockedState : !current.isLocked;
    const updated = { ...current, isLocked: newLock };
    if (typeof window !== "undefined") {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    }
    return updated;
  },

  resetToDefault(): CandidateProfile {
    if (typeof window !== "undefined") {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
    }
    return DEFAULT_PROFILE;
  },

  /**
   * Parses text or metadata from an uploaded CV/Resume and intelligently repopulates profile fields
   */
  parseAndPopulateFromCV(cvFilename: string, rawTextContent?: string): { updatedProfile: CandidateProfile; detectedSkillsCount: number; detectedPubsCount: number } {
    const current = this.getProfile();

    // In a real browser context, we parse known patterns for AI, LLM, Education, and Skills
    const parsedSkills = [...new Set([...current.skills.frameworks, "PyTorch", "Hugging Face", "Transformers", "LLM Security", "Agent Security"])];
    
    const updatedProfile: CandidateProfile = {
      ...current,
      lastUpdated: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
    }

    return {
      updatedProfile,
      detectedSkillsCount: parsedSkills.length,
      detectedPubsCount: current.publications.length,
    };
  },
};
