"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Sparkles,
  Search,
  Filter,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Building,
  RotateCcw,
  PlusCircle,
  Clock,
  Layers,
  CheckCircle2,
  Lock,
  DollarSign,
  MapPin,
  SlidersHorizontal,
} from "lucide-react";
import { CandidateProfile, Job } from "@/types/job";
import { profileStore } from "@/lib/profile-store";
import { careerEngine, RankedJobResult } from "@/lib/career-engine";
import { ProfileCard } from "./ProfileCard";
import { RankedJobCard } from "./RankedJobCard";
import { JobDetailsModal } from "./JobDetailsModal";
import { ApplyModal } from "@/components/jobs/ApplyModal";

export const PersonalizedCareerPortal: React.FC = () => {
  const [profile, setProfile] = useState<CandidateProfile>(profileStore.getProfile());
  const [activeTab, setActiveTab] = useState<"PHD_INTERNSHIPS" | "POST_PHD_FULLTIME">("PHD_INTERNSHIPS");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filters
  const [optOnly, setOptOnly] = useState(true);
  const [preferredStatesOnly, setPreferredStatesOnly] = useState(false);
  const [paidOnly, setPaidOnly] = useState(false);
  const [selectedSource, setSelectedSource] = useState<string>("ALL");
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modals state
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  useEffect(() => {
    setProfile(profileStore.getProfile());
  }, []);

  const handleProfileUpdated = (updated: CandidateProfile) => {
    setProfile(updated);
  };

  const toggleTech = (tech: string) => {
    const exists = selectedTechStack.includes(tech);
    const updated = exists
      ? selectedTechStack.filter((t) => t !== tech)
      : [...selectedTechStack, tech];
    setSelectedTechStack(updated);
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setOptOnly(true);
    setPreferredStatesOnly(false);
    setPaidOnly(false);
    setSelectedSource("ALL");
    setSelectedTechStack([]);
  };

  // Compute ranked opportunities using the 7-factor hybrid matching & reranker engine
  const rankedOpportunities: RankedJobResult[] = useMemo(() => {
    const category = activeTab === "PHD_INTERNSHIPS" ? "PHD_INTERNSHIP" : "POST_PHD_FULLTIME";
    const allRanked = careerEngine.getRankedOpportunities(category, searchQuery, optOnly);

    return allRanked.filter((r) => {
      // Preferred states filter
      if (preferredStatesOnly && !r.isSoftConstraintMatched) {
        return false;
      }
      // Paid only filter
      if (paidOnly && r.job.compensationType !== "PAID") {
        return false;
      }
      // Data source filter
      if (selectedSource !== "ALL" && r.job.dataSource !== selectedSource) {
        return false;
      }
      // Tech stack filter
      if (selectedTechStack.length > 0) {
        const matches = selectedTechStack.some((t) => r.job.techStack.includes(t));
        if (!matches) return false;
      }
      return true;
    });
  }, [profile, activeTab, searchQuery, optOnly, preferredStatesOnly, paidOnly, selectedSource, selectedTechStack]);

  const popularTags = [
    "PyTorch",
    "LLM Security",
    "AI Safety",
    "Agent Security",
    "Adversarial Machine Learning",
    "Computer Vision",
    "C++",
    "Python",
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-900/60 bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 p-6 sm:p-10 text-white shadow-2xl">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold text-blue-300 backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 animate-ping" />
            🎓 EVIDENCE-GROUNDED PHD CAREER SEARCH & RERANKER
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-5xl text-white">
            Personalized <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">PhD Career Engine</span>
          </h1>

          <p className="mx-auto max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
            Tailored specifically for <strong>Mahjabin Hossain</strong> (PhD in CS @ UMKC Asset Lab). Constrained to <strong>F-1 OPT/CPT eligibility</strong>, featuring continuous live feeds from <strong>USAJOBS</strong>, <strong>CareerOneStop</strong>, and premier AI research labs.
          </p>

          {/* Quick Search Bar */}
          <div className="mx-auto mt-6 max-w-2xl rounded-2xl border border-slate-700/80 bg-slate-900/90 p-2 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2.5 px-3 py-2">
                <Search className="h-5 w-5 text-blue-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search research focus (e.g. LLM Security, PyTorch, Agent Safety, Austin TX)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="rounded-lg p-1 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Quick Tags:</span>
            {popularTags.map((tech) => (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-all ${
                  selectedTechStack.includes(tech)
                    ? "border-blue-400 bg-blue-600 text-white"
                    : "border-slate-700/80 bg-slate-800/60 text-slate-300 hover:border-blue-500 hover:text-white"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 1. Candidate Profile View with Lock Protection & CV Parser */}
      <ProfileCard profile={profile} onProfileUpdated={handleProfileUpdated} />

      {/* 2. Main Two-Column Layout (Filters Sidebar + Ranked Opportunity Feed) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Filter Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-20 space-y-6">
            {/* Filter Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Constraints & Filters
                  </h3>
                </div>
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <RotateCcw className="h-3 w-3" />
                  Reset
                </button>
              </div>

              {/* Hard Constraint: OPT/CPT Only */}
              <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-3.5 dark:border-blue-900/40 dark:bg-blue-950/30">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={optOnly}
                    onChange={(e) => setOptOnly(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200 block">
                      🔒 Strict F-1 OPT/CPT Only
                    </span>
                    <span className="text-[11px] text-blue-700 dark:text-blue-300 leading-tight block mt-0.5">
                      Hard constraint filtering out roles requiring US Citizenship or active clearances.
                    </span>
                  </div>
                </label>
              </div>

              {/* Soft Constraint: Preferred Locations */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  📍 Soft Location Preferences
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer rounded-xl border border-slate-200 p-3 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800/60">
                  <input
                    type="checkbox"
                    checked={preferredStatesOnly}
                    onChange={(e) => setPreferredStatesOnly(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                      Preferred Hubs (TX, CA, KS, MO)
                    </span>
                    <span className="text-[10.5px] text-slate-500 block mt-0.5">
                      Texas, California, Kansas City / Missouri + Remote US
                    </span>
                  </div>
                </label>
              </div>

              {/* Compensation Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  💵 Compensation Model
                </label>
                <label className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paidOnly}
                    onChange={(e) => setPaidOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Paid Positions Only (Disclosed Wage)</span>
                </label>
              </div>

              {/* Data Feeds Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                  🌐 Monitored Career Feeds
                </label>
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="ALL">All Feeds (USAJOBS, CareerOneStop, Google, MSR)</option>
                  <option value="GOOGLE_CAREERS">Google Careers</option>
                  <option value="USAJOBS">USAJOBS (Federal Fellowships)</option>
                  <option value="CAREERONESTOP">CareerOneStop (DOL)</option>
                  <option value="MICROSOFT_RESEARCH">Microsoft Research</option>
                  <option value="META_FAIR">Meta FAIR</option>
                  <option value="OPENAI_ANTHROPIC">Anthropic / OpenAI</option>
                </select>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    ⚡ Research Skills & Frameworks
                  </label>
                  {selectedTechStack.length > 0 && (
                    <button
                      onClick={() => setSelectedTechStack([])}
                      className="text-[11px] text-blue-600 hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {popularTags.map((tech) => {
                    const active = selectedTechStack.includes(tech);
                    return (
                      <button
                        key={tech}
                        onClick={() => toggleTech(tech)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-mono font-semibold transition-all ${
                          active
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {tech}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Column: Feed & Tab Selector */}
        <div className="lg:col-span-8 space-y-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("PHD_INTERNSHIPS")}
              className={`flex items-center gap-2 border-b-2 px-5 py-3.5 text-sm font-black transition-all ${
                activeTab === "PHD_INTERNSHIPS"
                  ? "border-blue-600 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              Summer 2027 PhD Internships
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                Active Focus
              </span>
            </button>

            <button
              onClick={() => setActiveTab("POST_PHD_FULLTIME")}
              className={`flex items-center gap-2 border-b-2 px-5 py-3.5 text-sm font-black transition-all ${
                activeTab === "POST_PHD_FULLTIME"
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              Post-PhD Full-Time Pipeline
              <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                2029-2030
              </span>
            </button>
          </div>

          {/* Feed Header info */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                {activeTab === "PHD_INTERNSHIPS" ? "Ranked PhD Research Internships" : "Post-PhD Full-Time Career Opportunities"}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing <strong>{rankedOpportunities.length}</strong> opportunities ranked by your 7-component formula
              </p>
            </div>

            <div className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>OPT Verified</span>
            </div>
          </div>

          {/* Job Feed Cards */}
          <div className="space-y-4">
            {rankedOpportunities.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <Briefcase className="mx-auto h-12 w-12 text-slate-400" />
                <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                  No matching opportunities found
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                  Try relaxing the location filter or clearing selected tech stack chips.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              rankedOpportunities.map((result, index) => (
                <RankedJobCard
                  key={result.job.id}
                  job={result.job}
                  rank={index + 1}
                  onSelectJob={(j) => setSelectedJobForDetails(j)}
                  onApply={(j) => setSelectedJobForApply(j)}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <JobDetailsModal
        job={selectedJobForDetails}
        isOpen={Boolean(selectedJobForDetails)}
        onClose={() => setSelectedJobForDetails(null)}
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
          setSelectedJobForApply(null);
        }}
      />
    </div>
  );
};
