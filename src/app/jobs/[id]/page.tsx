"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Building2,
  DollarSign,
  Briefcase,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  Share2,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Job } from "@/types/job";
import { storage } from "@/lib/storage";
import { formatSalary, getVisaBadge, getContractBadge } from "@/lib/utils";
import { ApplyModal } from "@/components/jobs/ApplyModal";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  useEffect(() => {
    const jobs = storage.getJobs();
    const found = jobs.find((j) => j.id === params.id || j.slug === params.id);
    if (found) {
      setJob(found);
      setIsSaved(storage.getSavedJobIds().includes(found.id));
    }
  }, [params.id]);

  if (!job) {
    return (
      <div className="mx-auto max-w-4xl py-20 text-center">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">Job Posting Not Found</h2>
        <Link href="/" className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline">
          ← Back to All US IT Jobs
        </Link>
      </div>
    );
  }

  const contractBadge = getContractBadge(job.contractType);
  const visaBadgeText = getVisaBadge(job.visaSponsorship);

  const handleToggleSave = () => {
    const updated = storage.toggleSavedJob(job.id);
    setIsSaved(updated.includes(job.id));
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl space-y-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 dark:text-slate-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to US IT Job Board
        </Link>

        {/* Main Card */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 border-b border-slate-100 pb-6 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <img
                src={job.company.logo}
                alt={job.company.name}
                className="h-16 w-16 rounded-2xl object-cover border border-slate-100 dark:border-slate-800"
              />
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
                <h1 className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                  {job.title}
                </h1>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.city}, {job.state} {job.workLocation === "REMOTE_US_ONLY" ? "(100% US Remote)" : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Posted {job.postedAt}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleToggleSave}
                className="rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                title={isSaved ? "Saved" : "Save Job"}
              >
                {isSaved ? <BookmarkCheck className="h-5 w-5 text-blue-600 fill-blue-600" /> : <Bookmark className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsApplyOpen(true)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all"
              >
                Apply for this Role
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Pay Transparency Box */}
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider dark:text-emerald-300">
                  US Pay Transparency Compensation
                </span>
                <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
                  {formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod)}
                </p>
              </div>
              <span className="rounded-lg bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
                {contractBadge.label}
              </span>
            </div>

            {(job.equity || job.bonus) && (
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-emerald-200/60 pt-3 text-xs text-slate-700 dark:border-emerald-900/40 dark:text-slate-300">
                {job.equity && (
                  <div>
                    <strong>Equity / RSUs: </strong> {job.equity}
                  </div>
                )}
                {job.bonus && (
                  <div>
                    <strong>Annual Bonus: </strong> {job.bonus}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Visa & Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Visa Status</span>
              <span className="mt-1 font-bold text-blue-600 text-xs block">{visaBadgeText}</span>
            </div>
            <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Contract Model</span>
              <span className="mt-1 font-bold text-slate-800 text-xs block dark:text-slate-200">{contractBadge.label}</span>
            </div>
            <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40">
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Security Clearance</span>
              <span className="mt-1 font-bold text-slate-800 text-xs block dark:text-slate-200">{job.securityClearance.replace("_", " ")}</span>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Tech Stack & Skill Requirements
            </h3>
            <div className="flex flex-wrap gap-2">
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

          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Role Description
            </h3>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {job.description}
            </p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Key Responsibilities
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

          {/* Benefits */}
          {job.benefits.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-700 dark:bg-slate-800/50 dark:text-slate-300">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ApplyModal
        job={job}
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        onSuccess={() => {
          setIsApplyOpen(false);
          router.push("/dashboard");
        }}
      />
    </div>
  );
}
