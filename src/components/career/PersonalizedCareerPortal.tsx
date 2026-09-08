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
} from "lucide-react";
import { CandidateProfile, Job } from "@/types/job";
import { profileStore } from "@/lib/profile-store";
import { careerEngine, RankedJobResult } from "@/lib/career-engine";
import { ProfileCard } from "./ProfileCard";
import { RankedJobCard } from "./RankedJobCard";
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

  // Apply Modal state
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);

  useEffect(() => {
    setProfile(profileStore.getProfile());
  }, []);

  const handleProfileUpdated = (updated: CandidateProfile) => {
    setProfile(updated);
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
      return true;
    });
  }, [profile, activeTab, searchQuery, optOnly, preferredStatesOnly, paidOnly, selectedSource]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page Title & Context Banner */}
      <div className="rounded-3xl border border-blue-200 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-300 border border-blue-400/30">
              <Sparkles className="h-3.5 w-3.5" />
              EVIDENCE-GROUNDED CAREER SEARCH & RERANKER
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Personalized PhD Career Engine
            </h1>
            <p className="max-w-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tailored for <strong>Mahjabin Hossain</strong> (PhD in CS @ UMKC Asset Lab). Constrained to <strong>F-1 OPT/CPT eligibility</strong>, featuring continuous live updates for Summer 2027 Research Internships and Post-PhD Career pipelines.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs space-y-1.5 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-2 font-bold text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Hard Constraint: F-1 OPT Active</span>
            </div>
            <div className="text-slate-300">
              Soft Hubs: <strong>TX, CA, KS, MO</strong> + Remote
            </div>
            <div className="text-slate-400 text-[11px]">
              Weights: Skills 35% | Research 25% | Projects 15%
            </div>
          </div>
        </div>
      </div>

      {/* 1. Candidate Profile View with Lock Protection */}
      <ProfileCard profile={profile} onProfileUpdated={handleProfileUpdated} />

      {/* 2. Navigation Tabs: Internships vs. Post-PhD Full-time */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
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
            Post-PhD Full-Time Career Pipeline
            <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-bold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
              Graduation 2029-2030
            </span>
          </button>
        </div>
      </div>

      {/* Search & Multi-Faceted Filter Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 w-full">
            <Search className="absolute inset-y-0 left-0 pl-3 flex items-center h-full w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by research topic, tech stack (PyTorch, LLM Security), or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-xs font-medium text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Data Source Selector */}
          <div className="w-full sm:w-auto">
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="ALL">All Data Feeds (USAJOBS, CareerOneStop, Google, MSR)</option>
              <option value="GOOGLE_CAREERS">Google Careers</option>
              <option value="USAJOBS">USAJOBS (Federal Trainee/Fellowships)</option>
              <option value="CAREERONESTOP">CareerOneStop (DOL)</option>
              <option value="MICROSOFT_RESEARCH">Microsoft Research</option>
              <option value="META_FAIR">Meta FAIR</option>
              <option value="OPENAI_ANTHROPIC">Anthropic / OpenAI</option>
            </select>
          </div>
        </div>

        {/* Toggle Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            {/* Hard Constraint: OPT Only */}
            <label className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={optOnly}
                onChange={(e) => setOptOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>🔒 Strict F-1 OPT/CPT Eligible Only</span>
            </label>

            {/* Soft Constraint: TX, CA, KS, MO */}
            <label className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={preferredStatesOnly}
                onChange={(e) => setPreferredStatesOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
              <span>📍 Preferred Locations Only (TX / CA / KS / MO)</span>
            </label>

            {/* Paid Only */}
            <label className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={paidOnly}
                onChange={(e) => setPaidOnly(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>💵 Paid Only (Disclosed Wage)</span>
            </label>
          </div>

          <span className="text-slate-500 font-medium">
            Showing <strong>{rankedOpportunities.length}</strong> ranked opportunities
          </span>
        </div>
      </div>

      {/* Ranked Job Opportunities List */}
      <div className="space-y-4">
        {rankedOpportunities.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Briefcase className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
              No matching opportunities found with current filters
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
              Try unchecking strict location filters or clearing search keywords.
            </p>
          </div>
        ) : (
          rankedOpportunities.map((result, index) => (
            <RankedJobCard
              key={result.job.id}
              job={result.job}
              rank={index + 1}
              onApply={(j) => setSelectedJobForApply(j)}
            />
          ))
        )}
      </div>

      {/* Application Modal */}
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
