"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Sparkles,
  ShieldCheck,
  Code2,
  DollarSign,
  TrendingUp,
  PlusCircle,
  SlidersHorizontal,
} from "lucide-react";
import { Job, JobFilterState } from "@/types/job";
import { storage } from "@/lib/storage";
import { JobCard } from "@/components/jobs/JobCard";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobDetailsModal } from "@/components/jobs/JobDetailsModal";
import { ApplyModal } from "@/components/jobs/ApplyModal";
import { PostJobModal } from "@/components/dashboard/PostJobModal";

const INITIAL_FILTER_STATE: JobFilterState = {
  searchQuery: "",
  locationQuery: "",
  techStacks: [],
  visaTypes: [],
  contractTypes: [],
  workLocations: [],
  experienceLevels: [],
  clearances: [],
  timezones: [],
  minSalary: 0,
  isHourly: false,
  employerType: "ALL",
  usState: "ALL",
  category: "ALL",
  compensationType: "ALL",
  optCptOnly: false,
  preferredStatesOnly: false,
};

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<JobFilterState>(INITIAL_FILTER_STATE);

  // Modals state
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setJobs(storage.getJobs());
    setSavedJobIds(storage.getSavedJobIds());
  }, []);

  const handleToggleSave = (jobId: string) => {
    const updated = storage.toggleSavedJob(jobId);
    setSavedJobIds(updated);
  };

  const handleFilterChange = (newFilters: Partial<JobFilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTER_STATE);
  };

  // Filtered jobs evaluation
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Search query (title, company, description, tech)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesCompany = job.company.name.toLowerCase().includes(query);
        const matchesTech = job.techStack.some((t) => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCompany && !matchesTech) return false;
      }

      // 2. US State
      if (filters.usState !== "ALL" && job.state !== filters.usState) {
        return false;
      }

      // 3. Work Location (e.g. Remote US)
      if (filters.workLocations.length > 0 && !filters.workLocations.includes(job.workLocation)) {
        return false;
      }

      // 4. Visa Sponsorship
      if (filters.visaTypes.length > 0 && !filters.visaTypes.includes(job.visaSponsorship)) {
        return false;
      }

      // 5. Contract & Tax Type
      if (filters.contractTypes.length > 0 && !filters.contractTypes.includes(job.contractType)) {
        return false;
      }

      // 6. Employer Type (Direct FTE vs Agency)
      if (filters.employerType === "DIRECT_ONLY" && job.company.isAgency) return false;
      if (filters.employerType === "AGENCY_ONLY" && !job.company.isAgency) return false;

      // 7. Tech Stack match
      if (filters.techStacks.length > 0) {
        const hasMatchingTech = filters.techStacks.some((selectedTech) =>
          job.techStack.includes(selectedTech)
        );
        if (!hasMatchingTech) return false;
      }

      // 8. Min Salary
      if (filters.minSalary > 0) {
        if (job.salaryPeriod === "YEARLY" && job.salaryMax < filters.minSalary) {
          return false;
        }
      }

      return true;
    });
  }, [jobs, filters]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 px-4 py-16 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-5xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
            🇺🇸 The United States IT & Tech Career Portal
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white">
            Land Top <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">US IT Roles</span> With Total Transparency
          </h1>

          <p className="mx-auto max-w-2xl text-sm sm:text-base text-slate-300 leading-relaxed">
            Filter by <strong>H-1B & OPT Visa Sponsorship</strong>, <strong>W2 vs. C2C Contracts</strong>, <strong>US State Pay Transparency</strong>, and precise <strong>Tech Stacks</strong>.
          </p>

          {/* Search Header Bar */}
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-slate-700/80 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex flex-1 items-center gap-2.5 px-3 py-2 w-full">
                <Search className="h-5 w-5 text-blue-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search role (e.g. Distributed Systems, Kubernetes, React, Go)..."
                  value={filters.searchQuery}
                  onChange={(e) => handleFilterChange({ searchQuery: e.target.value })}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <div className="hidden sm:block h-8 w-[1px] bg-slate-700" />

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleFilterChange({ workLocations: ["REMOTE_US_ONLY"] })}
                  className={`rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                    filters.workLocations.includes("REMOTE_US_ONLY")
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  Remote US
                </button>

                <button
                  onClick={() => setIsPostJobOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-blue-500 active:scale-95 transition-all"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  Post Job
                </button>
              </div>
            </div>
          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Trending US IT Tags:</span>
            {[
              { label: "H-1B Sponsor Friendly", key: "visaTypes", val: ["H1B_SPONSOR"] },
              { label: "Corp-to-Corp (C2C)", key: "contractTypes", val: ["C2C_CORP_TO_CORP"] },
              { label: "Go (Golang)", key: "techStacks", val: ["Go (Golang)"] },
              { label: "Kubernetes & AWS", key: "techStacks", val: ["Kubernetes", "AWS"] },
              { label: "OPT / STEM Eligible", key: "visaTypes", val: ["OPT_CPT_STEM"] },
            ].map((pill, i) => (
              <button
                key={i}
                onClick={() => handleFilterChange({ [pill.key]: pill.val })}
                className="rounded-full border border-slate-700/80 bg-slate-800/60 px-3 py-1 text-slate-300 hover:border-blue-500 hover:text-white transition-all text-[11px]"
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content: Filters + Job Cards Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Mobile Filter Toggle */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <SlidersHorizontal className="h-4 w-4 text-blue-600" />
            {mobileFilterOpen ? "Hide Filters" : "Filter US IT Jobs"}
          </button>
          <span className="text-xs font-medium text-slate-500">
            {filteredJobs.length} Jobs Found
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Sidebar: Filter Panel */}
          <div
            className={`lg:col-span-4 ${
              mobileFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="sticky top-20">
              <JobFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalCount={filteredJobs.length}
              />
            </div>
          </div>

          {/* Right Main Column: Job Feed */}
          <div className="lg:col-span-8 space-y-4">
            {/* Header info */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Available IT & Software Engineering Openings
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {filteredJobs.length} verified listings across the United States
                </p>
              </div>

              <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900">
                ✓ Pay Transparency Compliant
              </div>
            </div>

            {/* Job Cards */}
            {filteredJobs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Briefcase className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                  No US IT Jobs match your exact criteria
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  Try broadening your Visa selection, switching states, or clearing specific tech stack tags.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSaved={savedJobIds.includes(job.id)}
                    onToggleSave={handleToggleSave}
                    onSelectJob={(j) => setSelectedJobForDetails(j)}
                    onApply={(j) => setSelectedJobForApply(j)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modals */}
      <JobDetailsModal
        job={selectedJobForDetails}
        isOpen={Boolean(selectedJobForDetails)}
        isSaved={selectedJobForDetails ? savedJobIds.includes(selectedJobForDetails.id) : false}
        onClose={() => setSelectedJobForDetails(null)}
        onToggleSave={handleToggleSave}
        onApply={(job) => {
          setSelectedJobForDetails(null);
          setSelectedJobForApply(job);
        }}
      />

      <ApplyModal
        job={selectedJobForApply}
        isOpen={Boolean(selectedJobForApply)}
        onClose={() => setSelectedJobForApply(null)}
        onSuccess={() => {
          setJobs(storage.getJobs());
        }}
      />

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        onJobCreated={(newJob) => {
          setJobs(storage.getJobs());
        }}
      />
    </div>
  );
}
