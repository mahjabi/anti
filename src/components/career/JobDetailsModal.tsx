"use client";

import React from "react";
import {
  X,
  MapPin,
  Building2,
  DollarSign,
  Briefcase,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Bookmark,
  BookmarkCheck,
  Share2,
  ArrowRight,
  ExternalLink,
  Award,
  Sparkles,
  GraduationCap,
  HelpCircle,
} from "lucide-react";
import { Job } from "@/types/job";
import { formatSalary } from "@/lib/utils";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onApply: (job: Job) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  onClose,
  onApply,
}) => {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-6 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-start gap-4">
            <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 dark:border-slate-700 dark:bg-slate-800">
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="h-full w-full rounded-xl object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                  {job.company.name}
                </span>
                <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                  {job.dataSource || "Verified Feed"}
                </span>
              </div>
              <h2 className="mt-1 text-xl font-black text-slate-900 dark:text-white">
                {job.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {job.city}, {job.state} • {job.workLocation === "REMOTE_US_ONLY" ? "100% US Remote" : `(${job.workLocation})`} • Posted {job.postedAt}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Compensation & Transparency Banner */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                    Compensation & Research Stipend
                  </span>
                  <p className="text-lg font-black text-slate-900 dark:text-white">
                    {job.isSalaryDisclosed ? formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod) : "Undisclosed / Verification Required"}
                  </p>
                </div>
              </div>
              <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                {job.category === "PHD_INTERNSHIP" ? "PhD Internship" : "Post-PhD Full-Time"}
              </span>
            </div>

            {(job.equity || job.bonus) && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-emerald-200/60 pt-2.5 text-xs text-slate-700 dark:border-emerald-900/40 dark:text-slate-300">
                {job.equity && (
                  <div>
                    <span className="font-bold text-emerald-900 dark:text-emerald-200">Equity / Stock: </span>
                    {job.equity}
                  </div>
                )}
                {job.bonus && (
                  <div>
                    <span className="font-bold text-emerald-900 dark:text-emerald-200">Target Bonus: </span>
                    {job.bonus}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hard / Soft Constraint Status Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
                F-1 OPT/CPT Status
              </span>
              <span className="mt-1 font-bold text-blue-600 text-xs flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                {job.optCptEligible === true ? "Eligible on F-1 Student Status" : "Verification Required"}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Target Role Type
              </span>
              <span className="mt-1 font-bold text-slate-800 text-xs block dark:text-slate-200">
                {job.category === "PHD_INTERNSHIP" ? "Summer 2027 Internship" : "Post-PhD Full-Time"}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[10.5px] font-bold text-slate-500 uppercase tracking-wider block">
                Preferred Hub
              </span>
              <span className="mt-1 font-bold text-slate-800 text-xs block dark:text-slate-200">
                {["TX", "CA", "KS", "MO"].includes(job.state) ? `📍 ${job.state} (Preferred)` : `${job.city}, ${job.state}`}
              </span>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Required Tech Stack & Research Methodologies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {job.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Job Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Research Description & Scope
            </h3>
            <div className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {job.description}
            </div>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Core Responsibilities
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                {job.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualifications */}
          {job.qualifications && job.qualifications.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Qualifications & Doctoral Eligibility
              </h3>
              <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                {job.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Benefits, Compute & Mentorship
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 p-2.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4 sm:px-6 dark:border-slate-800 dark:bg-slate-900/50">
          <span className="text-xs text-slate-500">
            {job.applicantCount} candidates applied via {job.company.name}
          </span>

          <button
            onClick={() => onApply(job)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-98 transition-all"
          >
            Apply for this Role
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
