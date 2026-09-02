"use client";

import React, { useState } from "react";
import {
  X,
  Building2,
  DollarSign,
  Briefcase,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  Plus,
  Trash2,
} from "lucide-react";
import { Job, VisaSponsorshipType, ContractType, SecurityClearanceType, USTimezoneType, WorkLocationType } from "@/types/job";
import { storage } from "@/lib/storage";
import {
  US_STATES,
  TECH_STACK_TAGS,
  VISA_SPONSORSHIP_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
  SECURITY_CLEARANCE_OPTIONS,
  EXPERIENCE_LEVELS,
} from "@/lib/constants";

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (job: Job) => void;
}

export const PostJobModal: React.FC<PostJobModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isAgency, setIsAgency] = useState(false);
  const [city, setCity] = useState("Austin");
  const [stateCode, setStateCode] = useState("TX");
  const [workLocation, setWorkLocation] = useState<WorkLocationType>("REMOTE_US_ONLY");
  const [experienceLevel, setExperienceLevel] = useState<Job["experienceLevel"]>("Senior");
  const [contractType, setContractType] = useState<ContractType>("FULL_TIME_W2");
  const [visaSponsorship, setVisaSponsorship] = useState<VisaSponsorshipType>("H1B_SPONSOR");
  const [clearance, setClearance] = useState<SecurityClearanceType>("NONE");
  
  // Salary Transparency (Mandatory in CA, NY, WA, CO)
  const [salaryMin, setSalaryMin] = useState<number>(160000);
  const [salaryMax, setSalaryMax] = useState<number>(210000);
  const [salaryPeriod, setSalaryPeriod] = useState<"YEARLY" | "HOURLY">("YEARLY");
  const [equity, setEquity] = useState("$40,000 - $80,000 RSUs / yr");
  const [bonus, setBonus] = useState("15% Target Annual Bonus");

  const [selectedTech, setSelectedTech] = useState<string[]>(["React", "TypeScript", "Node.js", "AWS"]);
  const [customTechInput, setCustomTechInput] = useState("");
  const [description, setDescription] = useState(
    "We are seeking an experienced engineer to join our high-scale product team. You will lead system architecture, build resilient microservices, and optimize cloud telemetry."
  );
  const [responsibilities, setResponsibilities] = useState<string[]>([
    "Lead architectural design for high-scale distributed systems.",
    "Write modular, tested code with 90%+ test coverage.",
    "Participate in sprint planning and cross-functional team code reviews.",
  ]);
  const [benefits, setBenefits] = useState<string[]>([
    "100% Employer-paid Health, Dental & Vision insurance",
    "401(k) with 5% dollar-for-dollar match",
    "Comprehensive US Visa & Green Card Sponsorship support",
  ]);

  const [errorMsg, setErrorMsg] = useState("");

  const handleAddTech = () => {
    if (customTechInput.trim() && !selectedTech.includes(customTechInput.trim())) {
      setSelectedTech([...selectedTech, customTechInput.trim()]);
      setCustomTechInput("");
    }
  };

  const handleRemoveTech = (tech: string) => {
    setSelectedTech(selectedTech.filter((t) => t !== tech));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !companyName.trim()) {
      setErrorMsg("Please enter both the Job Title and Company / Agency Name.");
      return;
    }

    if (salaryMin <= 0 || salaryMax <= 0 || salaryMax < salaryMin) {
      setErrorMsg("Please specify a valid salary transparency range (Max >= Min).");
      return;
    }

    const newJob: Job = {
      id: "job-user-" + Date.now(),
      title: title.trim(),
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString().slice(-4),
      company: {
        id: "comp-" + Date.now(),
        name: companyName.trim(),
        slug: companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=128&h=128&fit=crop&q=80",
        website: "https://example.com",
        description: `${companyName} is an innovative US technology organization hiring top engineering talent.`,
        isAgency: isAgency,
        agencyName: isAgency ? companyName : undefined,
        headquarters: `${city}, ${stateCode}`,
      },
      description,
      responsibilities,
      qualifications: [
        `Demonstrated experience in ${selectedTech.slice(0, 3).join(", ")}.`,
        "Strong system design and problem-solving abilities.",
        "US work authorization matching the specified role criteria.",
      ],
      techStack: selectedTech,
      experienceLevel,
      contractType,
      visaSponsorship,
      securityClearance: clearance,
      workLocation,
      timezone: "US_EASTERN",
      city,
      state: stateCode,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      salaryPeriod,
      equity: equity.trim() || undefined,
      bonus: bonus.trim() || undefined,
      featured: true,
      urgent: false,
      benefits,
      postedAt: "Just now",
      applicantCount: 0,
    };

    storage.saveJobListing(newJob);
    onJobCreated(newJob);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-6 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                🇺🇸 US IT JOB POSTING
              </span>
            </div>
            <h2 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
              Post an IT Opening
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reach thousands of pre-vetted US software engineers, DevOps, and data specialists.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {errorMsg && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Role & Company info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Job Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Cloud DevOps Engineer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Company / Agency Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vertex Systems Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Employer Type Toggle (Direct vs Staffing Agency) */}
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/50">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Hiring Organization Type:
            </span>
            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="agencyType"
                  checked={!isAgency}
                  onChange={() => setIsAgency(false)}
                />
                <span>Direct Employer (FTE)</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="radio"
                  name="agencyType"
                  checked={isAgency}
                  onChange={() => setIsAgency(true)}
                />
                <span>Staffing Agency / Prime Vendor</span>
              </label>
            </div>
          </div>

          {/* US Location & Model */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                US State
              </label>
              <select
                value={stateCode}
                onChange={(e) => setStateCode(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {US_STATES.filter((s) => s.code !== "ALL").map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.code} - {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                City / Hub
              </label>
              <input
                type="text"
                placeholder="e.g. San Francisco or Austin"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Work Arrangement
              </label>
              <select
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value as WorkLocationType)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="REMOTE_US_ONLY">100% US Remote</option>
                <option value="HYBRID">Hybrid (US Office + Remote)</option>
                <option value="ONSITE">Onsite Only</option>
              </select>
            </div>
          </div>

          {/* Visa, Contract & Clearance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Visa Sponsorship
              </label>
              <select
                value={visaSponsorship}
                onChange={(e) => setVisaSponsorship(e.target.value as VisaSponsorshipType)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {VISA_SPONSORSHIP_OPTIONS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.badge}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Contract Type
              </label>
              <select
                value={contractType}
                onChange={(e) => setContractType(e.target.value as ContractType)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {CONTRACT_TYPE_OPTIONS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as Job["experienceLevel"])}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {EXPERIENCE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* US State Pay Transparency Salary Range */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <div className="flex items-center gap-2 mb-2 text-emerald-900 dark:text-emerald-300">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                US State Pay Transparency Compensation Band (Mandatory)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  Min Amount ($)
                </label>
                <input
                  type="number"
                  required
                  value={salaryMin}
                  onChange={(e) => setSalaryMin(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  Max Amount ($)
                </label>
                <input
                  type="number"
                  required
                  value={salaryMax}
                  onChange={(e) => setSalaryMax(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  Rate Frequency
                </label>
                <select
                  value={salaryPeriod}
                  onChange={(e) => setSalaryPeriod(e.target.value as "YEARLY" | "HOURLY")}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="YEARLY">Yearly Base ($/yr)</option>
                  <option value="HOURLY">Hourly ($/hr)</option>
                </select>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  Equity / RSUs (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. $50,000 RSUs / year or 0.15%"
                  value={equity}
                  onChange={(e) => setEquity(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  Bonus Structure (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15% Annual Target Bonus"
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Tech Stack Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Required Tech Stack & Skills
            </label>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selectedTech.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-mono font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(tech)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="mt-2 flex gap-2">
              <input
                type="text"
                placeholder="Add custom skill (e.g. Rust, Snowflake, Terraform)"
                value={customTechInput}
                onChange={(e) => setCustomTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="rounded-xl bg-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-white"
              >
                Add
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Job Description Overview
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              Publish Job Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
