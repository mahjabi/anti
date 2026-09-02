"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Bookmark,
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  ExternalLink,
  ChevronRight,
  FileText,
  Github,
  Linkedin,
  MapPin,
  TrendingUp,
  Award,
} from "lucide-react";
import { Application, Job, ApplicationStage } from "@/types/job";
import { getVisaBadge, getContractBadge } from "@/lib/utils";

interface SeekerDashboardProps {
  applications: Application[];
  savedJobs: Job[];
  onSelectJob: (job: Job) => void;
  onApplyJob: (job: Job) => void;
}

const STAGES: { id: ApplicationStage; label: string; color: string }[] = [
  { id: "SUBMITTED", label: "Submitted", color: "border-blue-500 bg-blue-50/50 text-blue-700" },
  { id: "RECRUITER_SCREEN", label: "Recruiter Screen", color: "border-amber-500 bg-amber-50/50 text-amber-700" },
  { id: "TECHNICAL_ASSESSMENT", label: "Tech Assessment", color: "border-purple-500 bg-purple-50/50 text-purple-700" },
  { id: "SYSTEM_DESIGN_ONSITE", label: "System Design / Onsite", color: "border-indigo-500 bg-indigo-50/50 text-indigo-700" },
  { id: "OFFER_EXTENDED", label: "Offer Extended 🎉", color: "border-emerald-500 bg-emerald-50/50 text-emerald-700" },
];

export const SeekerDashboard: React.FC<SeekerDashboardProps> = ({
  applications,
  savedJobs,
  onSelectJob,
  onApplyJob,
}) => {
  const [activeTab, setActiveTab] = useState<"KANBAN" | "SAVED" | "PROFILE">("KANBAN");

  const totalApplied = applications.length;
  const inInterviews = applications.filter((a) =>
    ["RECRUITER_SCREEN", "TECHNICAL_ASSESSMENT", "SYSTEM_DESIGN_ONSITE"].includes(a.stage)
  ).length;
  const offersCount = applications.filter((a) =>
    ["OFFER_EXTENDED", "OFFER_ACCEPTED"].includes(a.stage)
  ).length;

  return (
    <div className="space-y-6">
      {/* Top Header & Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Applications Sent
            </span>
            <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/40">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {totalApplied}
          </p>
          <span className="text-[11px] text-slate-400">Tracked in live US pipeline</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              In Interview Rounds
            </span>
            <div className="rounded-xl bg-amber-100 p-2 text-amber-600 dark:bg-amber-900/40">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {inInterviews}
          </p>
          <span className="text-[11px] text-amber-600 font-medium">Screens & Onsites active</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Job Offers
            </span>
            <div className="rounded-xl bg-emerald-100 p-2 text-emerald-600 dark:bg-emerald-900/40">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-emerald-600">
            {offersCount}
          </p>
          <span className="text-[11px] text-emerald-600 font-medium">Compensation pending review</span>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Saved IT Roles
            </span>
            <div className="rounded-xl bg-purple-100 p-2 text-purple-600 dark:bg-purple-900/40">
              <Bookmark className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
            {savedJobs.length}
          </p>
          <span className="text-[11px] text-slate-400">Ready for tailored applications</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("KANBAN")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
            activeTab === "KANBAN"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          Kanban Stage Pipeline ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab("SAVED")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
            activeTab === "SAVED"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Bookmark className="h-4 w-4" />
          Saved Bookmarks ({savedJobs.length})
        </button>

        <button
          onClick={() => setActiveTab("PROFILE")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
            activeTab === "PROFILE"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <FileText className="h-4 w-4" />
          Engineer Profile & US Visa Info
        </button>
      </div>

      {/* Tab 1: Kanban Pipeline */}
      {activeTab === "KANBAN" && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {STAGES.map((stage) => {
            const stageApps = applications.filter((a) => a.stage === stage.id);
            return (
              <div
                key={stage.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-900/50"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-2.5">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {stage.label}
                  </span>
                  <span className="rounded-full bg-white px-2 py-0.5 text-[11px] font-bold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
                    {stageApps.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="mt-2 space-y-3 flex-1 overflow-y-auto min-h-[300px]">
                  {stageApps.length === 0 ? (
                    <div className="flex h-32 items-center justify-center rounded-xl border border-dashed border-slate-200 p-4 text-center text-xs text-slate-400 dark:border-slate-800">
                      No applications in this stage
                    </div>
                  ) : (
                    stageApps.map((app) => (
                      <div
                        key={app.id}
                        className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start gap-2.5">
                          <img
                            src={app.companyLogo}
                            alt={app.companyName}
                            className="h-8 w-8 rounded-lg object-cover"
                          />
                          <div>
                            <span className="text-[11px] font-semibold text-slate-500 block">
                              {app.companyName}
                            </span>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                              {app.jobTitle}
                            </h4>
                          </div>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                          <span className="font-semibold text-emerald-600">
                            {app.salaryText}
                          </span>
                          <span>{app.appliedAt}</span>
                        </div>

                        {app.recruiterNotes && (
                          <div className="mt-2 rounded-lg bg-blue-50/80 p-2 text-[10.5px] text-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
                            <strong>Recruiter Note:</strong> {app.recruiterNotes}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Saved Jobs */}
      {activeTab === "SAVED" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedJobs.length === 0 ? (
            <div className="col-span-2 rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
              No bookmarked jobs yet. Browse the IT Jobs directory to bookmark roles!
            </div>
          ) : (
            savedJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold text-slate-500">
                        {job.company.name} • {job.city}, {job.state}
                      </span>
                      <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                        {job.title}
                      </h3>
                    </div>
                    <img
                      src={job.company.logo}
                      alt={job.company.name}
                      className="h-10 w-10 rounded-xl object-cover"
                    />
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {job.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10.5px] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <span className="text-xs font-bold text-emerald-600">
                    ${Math.round(job.salaryMin / 1000)}k - ${Math.round(job.salaryMax / 1000)}k / yr
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onSelectJob(job)}
                      className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onApplyJob(job)}
                      className="rounded-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Profile */}
      {activeTab === "PROFILE" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xl font-extrabold text-white">
                AC
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Alex Chen
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Senior Backend & Distributed Systems Engineer • San Francisco, CA
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 font-semibold text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300">
                    H-1B Holder (Transfer Ready)
                  </span>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300">
                    Open to W2 & C2C Contracts
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-slate-50 dark:border-slate-700 dark:text-blue-300"
              >
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Core Tech Stack & Competencies
            </h4>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {["Go (Golang)", "Kubernetes", "AWS", "PostgreSQL", "Kafka", "Docker", "Terraform", "gRPC", "Distributed Systems"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
