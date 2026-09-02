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
} from "lucide-react";
import { Job } from "@/types/job";
import { formatSalary, getVisaBadge, getContractBadge } from "@/lib/utils";

interface JobDetailsModalProps {
  job: Job | null;
  isOpen: boolean;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (jobId: string) => void;
  onApply: (job: Job) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  isOpen,
  isSaved,
  onClose,
  onToggleSave,
  onApply,
}) => {
  if (!isOpen || !job) return null;

  const contractBadge = getContractBadge(job.contractType);
  const visaBadgeText = getVisaBadge(job.visaSponsorship);

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
                <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                  {job.company.name}
                </span>
                {job.company.isAgency ? (
                  <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    Staffing Vendor
                  </span>
                ) : (
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Direct Employer
                  </span>
                )}
              </div>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
                {job.title}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {job.city}, {job.state} • {job.workLocation === "REMOTE_US_ONLY" ? "100% US Remote" : job.workLocation} • Posted {job.postedAt}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* US Pay Transparency & Compensation Breakdown Box */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                    US State Pay Transparency Rate
                  </span>
                  <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}
                  </p>
                </div>
              </div>
              <span className="rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                {contractBadge.short}
              </span>
            </div>

            {(job.equity || job.bonus) && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-emerald-200/60 pt-2.5 text-xs text-slate-700 dark:border-emerald-900/40 dark:text-slate-300">
                {job.equity && (
                  <div>
                    <span className="font-semibold text-emerald-900 dark:text-emerald-200">Equity / Stock: </span>
                    {job.equity}
                  </div>
                )}
                {job.bonus && (
                  <div>
                    <span className="font-semibold text-emerald-900 dark:text-emerald-200">Target Bonus: </span>
                    {job.bonus}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Visa & Authorization Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                Visa Support
              </span>
              <span className="mt-1 font-semibold text-blue-600 text-xs block dark:text-blue-400">
                {visaBadgeText}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                Contract Type
              </span>
              <span className="mt-1 font-semibold text-slate-800 text-xs block dark:text-slate-200">
                {contractBadge.label}
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                Clearance
              </span>
              <span className="mt-1 font-semibold text-slate-800 text-xs block dark:text-slate-200">
                {job.securityClearance.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Required Tech Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Required Tech Stack & Tools
            </h3>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {job.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-blue-50 px-3 py-1 font-mono text-xs font-semibold text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Job Description & Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Role Overview
            </h3>
            <div className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {job.description}
            </div>
          </div>

          {/* Responsibilities */}
          {job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Key Responsibilities
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold mt-0.5">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Qualifications */}
          {job.qualifications.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Qualifications & Technical Requirements
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                {job.qualifications.map((qual, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                    <span>{qual}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Benefits & Perks
              </h3>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
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

        {/* Modal Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-4 sm:px-6 dark:border-slate-800 dark:bg-slate-900/50">
          <button
            onClick={() => onToggleSave(job.id)}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
              isSaved
                ? "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-900/30"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            }`}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="h-4 w-4 fill-blue-600 text-blue-600" />
                Saved to Bookmarks
              </>
            ) : (
              <>
                <Bookmark className="h-4 w-4 text-slate-500" />
                Bookmark Listing
              </>
            )}
          </button>

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
