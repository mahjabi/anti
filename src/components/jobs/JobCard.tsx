"use client";

import React from "react";
import {
  MapPin,
  Building2,
  DollarSign,
  Briefcase,
  ShieldAlert,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Job } from "@/types/job";
import { formatSalary, getVisaBadge, getContractBadge } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (jobId: string) => void;
  onSelectJob: (job: Job) => void;
  onApply: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  job,
  isSaved,
  onToggleSave,
  onSelectJob,
  onApply,
}) => {
  const contractBadge = getContractBadge(job.contractType);
  const visaBadgeText = getVisaBadge(job.visaSponsorship);

  return (
    <div
      onClick={() => onSelectJob(job)}
      className={`group relative flex flex-col justify-between rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-900 ${
        job.featured
          ? "border-blue-300 ring-1 ring-blue-500/20 dark:border-blue-800"
          : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
      } cursor-pointer`}
    >
      <div>
        {/* Top Header: Company info, badges, and Bookmark button */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3.5">
            {/* Company Logo */}
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-800">
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-medium text-slate-800 dark:text-slate-200 text-xs">
                  {job.company.name}
                </span>

                {/* Direct Employer vs Agency Badge */}
                {job.company.isAgency ? (
                  <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
                    Staffing Vendor / Agency
                  </span>
                ) : (
                  <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                    Direct Employer (FTE)
                  </span>
                )}

                {job.urgent && (
                  <span className="rounded bg-red-50 px-1.5 py-0.5 text-[10px] font-bold text-red-600 border border-red-200 animate-pulse">
                    🔥 Urgent Fill
                  </span>
                )}
              </div>

              <h2 className="mt-1 text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors dark:text-white">
                {job.title}
              </h2>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(job.id);
            }}
            className={`rounded-lg p-2 transition-colors ${
              isSaved
                ? "text-blue-600 bg-blue-50 dark:bg-blue-900/30"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
            }`}
            title={isSaved ? "Remove from saved" : "Save job"}
          >
            {isSaved ? <BookmarkCheck className="h-5 w-5 fill-blue-600" /> : <Bookmark className="h-5 w-5" />}
          </button>
        </div>

        {/* US Metadata: Location, Salary Transparency, Visa, Contract */}
        <div className="mt-3.5 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600 dark:text-slate-400">
          {/* Location & Remote */}
          <div className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-slate-400" />
            <span>
              {job.city}, {job.state}
              {job.workLocation === "REMOTE_US_ONLY" && (
                <span className="font-semibold text-blue-600 ml-1">(100% US Remote)</span>
              )}
              {job.workLocation === "HYBRID" && (
                <span className="text-slate-500 ml-1">(Hybrid)</span>
              )}
            </span>
          </div>

          {/* Salary Transparency Band */}
          <div className="flex items-center gap-1 font-semibold text-slate-900 dark:text-slate-100">
            <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
            <span>{formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}</span>
            {job.equity && (
              <span className="font-normal text-[11px] text-slate-500 hidden sm:inline">
                + Equity
              </span>
            )}
          </div>

          {/* Timezone / Posted */}
          <div className="flex items-center gap-1 text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{job.postedAt}</span>
          </div>
        </div>

        {/* US IT Badges Row */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {/* Contract / Tax Type */}
          <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold border ${contractBadge.badgeColor}`}>
            {contractBadge.short}
          </span>

          {/* Visa Sponsorship */}
          <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800">
            <CheckCircle2 className="h-3 w-3" />
            {visaBadgeText}
          </span>

          {/* Security Clearance */}
          {job.securityClearance !== "NONE" && (
            <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-semibold text-purple-700 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300">
              <ShieldAlert className="h-3 w-3" />
              {job.securityClearance.replace("_", " ")}
            </span>
          )}

          {/* Experience level */}
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {job.experienceLevel}
          </span>
        </div>

        {/* Tech Stack Chips */}
        <div className="mt-3.5 flex flex-wrap items-center gap-1">
          {job.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-slate-50 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-700 border border-slate-200/80 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Quick stats and Apply CTA */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800/80">
        <span className="text-[11px] text-slate-400">
          {job.applicantCount} applicants applied
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectJob(job);
            }}
            className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
          >
            Details
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onApply(job);
            }}
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
          >
            Apply Now
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
