"use client";

import React, { useState } from "react";
import {
  Sparkles,
  MapPin,
  Building2,
  DollarSign,
  Briefcase,
  ShieldCheck,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  Award,
  Eye,
} from "lucide-react";
import { Job, MatchScoreDetails } from "@/types/job";
import { formatSalary } from "@/lib/utils";

interface RankedJobCardProps {
  job: Job;
  rank: number;
  onSelectJob: (job: Job) => void;
  onApply: (job: Job) => void;
}

export const RankedJobCard: React.FC<RankedJobCardProps> = ({
  job,
  rank,
  onSelectJob,
  onApply,
}) => {
  const [expanded, setExpanded] = useState(false);
  const score = job.matchScore;

  // Pay badge configuration
  const renderPayBadge = () => {
    if (job.compensationType === "PAID") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800 shadow-xs">
          <DollarSign className="h-3.5 w-3.5" />
          PAID ({job.isSalaryDisclosed ? formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod) : "Verified Paid"})
        </span>
      );
    }
    if (job.compensationType === "UNPAID_FREE") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 border border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
          FREE / FELLOWSHIP ($5k Compute Grant & Mentorship)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800">
        <HelpCircle className="h-3.5 w-3.5" />
        UNKNOWN PAY / STIPEND
      </span>
    );
  };

  const renderSourceBadge = () => {
    const sourceMap: Record<string, { label: string; color: string }> = {
      GOOGLE_CAREERS: { label: "Google Careers", color: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300" },
      USAJOBS: { label: "USAJOBS (Federal)", color: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300" },
      CAREERONESTOP: { label: "CareerOneStop (DOL)", color: "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300" },
      MICROSOFT_RESEARCH: { label: "Microsoft Research", color: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300" },
      META_FAIR: { label: "Meta FAIR AI", color: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300" },
      OPENAI_ANTHROPIC: { label: "Anthropic / OpenAI", color: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300" },
      INDUSTRY_FEED: { label: "AI Safety Coalition", color: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300" },
    };
    const key = job.dataSource || "INDUSTRY_FEED";
    const s = sourceMap[key] || { label: key, color: "bg-slate-100 text-slate-700 border-slate-200" };
    return (
      <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold border ${s.color}`}>
        via {s.label}
      </span>
    );
  };

  return (
    <div
      className={`group rounded-3xl border bg-white p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl dark:bg-slate-900 ${
        rank === 1
          ? "border-blue-400 ring-2 ring-blue-500/20 dark:border-blue-700 shadow-md"
          : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
      }`}
    >
      {/* Top Row: Rank, Company Logo, Job Title, Source, Match Score */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          {/* Rank Number Badge */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-blue-900 text-white font-black text-lg shadow-md shadow-blue-950/20">
            #{rank}
          </div>

          {/* Company Logo */}
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-white p-1 dark:border-slate-800 dark:bg-slate-800">
            <img
              src={job.company.logo}
              alt={job.company.name}
              className="h-full w-full rounded-xl object-cover"
            />
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                {job.company.name}
              </span>
              {renderSourceBadge()}
              {job.deadline && (
                <span className="text-[11px] text-slate-400">
                  • Deadline: {job.deadline}
                </span>
              )}
            </div>

            <h3
              onClick={() => onSelectJob(job)}
              className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug cursor-pointer group-hover:text-blue-600 transition-colors"
            >
              {job.title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {job.city}, {job.state} {job.workLocation === "REMOTE_US_ONLY" ? "(100% US Remote)" : `(${job.workLocation})`}
              </span>
              {job.category === "PHD_INTERNSHIP" ? (
                <span className="font-bold text-purple-600 dark:text-purple-400">Summer 2027 PhD Internship</span>
              ) : (
                <span className="font-bold text-emerald-600 dark:text-emerald-400">Post-PhD Full-Time Career</span>
              )}
            </div>
          </div>
        </div>

        {/* Match Score & Action Buttons */}
        {score && (
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2.5">
            <div className="flex items-center gap-2 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-2 border border-blue-200 dark:from-blue-950/40 dark:to-indigo-950/40 dark:border-blue-800 shadow-xs">
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                  Weighted Match
                </span>
                <span className="text-2xl font-black text-blue-700 dark:text-blue-400">
                  {score.overallScore}%
                </span>
              </div>
              <Sparkles className="h-5 w-5 text-blue-600 fill-blue-600/30" />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onSelectJob(job)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors"
              >
                Details
              </button>
              <button
                onClick={() => onApply(job)}
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition-all"
              >
                Apply Now
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Badges Row: Paid/Free, OPT Status, Soft Location */}
      <div className="mt-4 flex flex-wrap items-center gap-2 pt-3.5 border-t border-slate-100 dark:border-slate-800">
        {renderPayBadge()}

        {/* F-1 OPT Status */}
        {job.optCptEligible === true && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            F-1 OPT/CPT Eligible
          </span>
        )}

        {job.optCptEligible === "UNKNOWN" && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300">
            <HelpCircle className="h-3.5 w-3.5 text-amber-600" />
            OPT Status Unknown
          </span>
        )}

        {/* Soft Constraint Match */}
        {["TX", "CA", "KS", "MO"].includes(job.state) && (
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-xs font-bold text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300">
            📍 Preferred Location Match ({job.state})
          </span>
        )}
      </div>

      {/* Tech Stack Chips */}
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {job.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Toggle Diagnostics Drawer */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 py-1"
        >
          <span>{expanded ? "▲ Hide Analytical Match Breakdown & Evidence" : "▼ View 7-Component Scorecard, Evidence & Gaps"}</span>
          <span className="text-[11px] font-normal text-slate-400">
            {expanded ? "Collapse details" : "Expand 7-factor diagnostics"}
          </span>
        </button>

        {/* Expanded Diagnostics Drawer */}
        {expanded && score && (
          <div className="mt-4 space-y-5 rounded-2xl bg-slate-50/90 p-5 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs animate-fadeIn">
            {/* 1. Component Scores Table */}
            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-2.5">
                1. 7-Component Weighted Match Scorecard
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center">
                <div className="rounded-xl bg-white p-3 shadow-xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Skills (35%)</span>
                  <span className="text-base font-black text-blue-600">{score.skillsScore}/100</span>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Research (25%)</span>
                  <span className="text-base font-black text-blue-600">{score.researchScore}/100</span>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Projects (15%)</span>
                  <span className="text-base font-black text-blue-600">{score.projectsScore}/100</span>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Education (10%)</span>
                  <span className="text-base font-black text-blue-600">{score.educationScore}/100</span>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Interest (10%)</span>
                  <span className="text-base font-black text-blue-600">{score.careerInterestScore}/100</span>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Location (3%)</span>
                  <span className="text-base font-black text-blue-600">{score.locationScore}/100</span>
                </div>
                <div className="rounded-xl bg-white p-3 shadow-xs border border-slate-200 dark:bg-slate-900 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 block font-bold">Salary (2%)</span>
                  <span className="text-base font-black text-blue-600">{score.salaryScore}/100</span>
                </div>
              </div>
            </div>

            {/* 2. Supporting Evidence */}
            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                2. Verified Supporting Evidence from Your Profile
              </h4>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                {score.supportingEvidence.map((ev, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Missing Qualifications */}
            {score.missingQualifications.length > 0 && (
              <div>
                <h4 className="font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1.5">
                  3. Identified Gaps & Missing Qualifications
                </h4>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                  {score.missingQualifications.map((gap, i) => (
                    <li key={i} className="flex items-start gap-2 text-amber-700 dark:text-amber-300">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Unknown Diagnostics & Action Plan */}
            {score.unknownFields.length > 0 && (
              <div className="rounded-xl bg-amber-50 p-4 border border-amber-200 dark:bg-amber-950/40 dark:border-amber-900 space-y-2">
                <h4 className="font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="h-4 w-4 text-amber-600" />
                  Unknown Data Diagnostics & Recruiter Verification Action
                </h4>
                {score.unknownFields.map((u, i) => (
                  <div key={i} className="space-y-0.5 text-xs text-amber-900 dark:text-amber-200">
                    <p><strong>Missing Field:</strong> {u.field}</p>
                    <p><strong>Reason:</strong> {u.reason}</p>
                    <p className="text-amber-800 dark:text-amber-300 font-medium"><strong>Suggested Inquiry:</strong> {u.suggestedAction}</p>
                  </div>
                ))}
              </div>
            )}

            {/* 5. Ranking Position Explanation */}
            <div>
              <h4 className="font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1">
                5. Ranking Position Rationale
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {score.rankingExplanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
