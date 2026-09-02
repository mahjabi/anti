"use client";

import React, { useState, useEffect } from "react";
import { storage } from "@/lib/storage";
import { Application, Job, RoleType } from "@/types/job";
import { SeekerDashboard } from "@/components/dashboard/SeekerDashboard";
import { EmployerDashboard } from "@/components/dashboard/EmployerDashboard";
import { JobDetailsModal } from "@/components/jobs/JobDetailsModal";
import { ApplyModal } from "@/components/jobs/ApplyModal";
import { PostJobModal } from "@/components/dashboard/PostJobModal";
import { User, Building2, Sparkles } from "lucide-react";

export default function DashboardPage() {
  const [role, setRole] = useState<RoleType>("JOB_SEEKER");
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobIds, setSavedJobIds] = useState<string[]>([]);

  // Modals
  const [selectedJobForDetails, setSelectedJobForDetails] = useState<Job | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<Job | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  useEffect(() => {
    setRole(storage.getUserRole());
    setApplications(storage.getApplications());
    setJobs(storage.getJobs());
    setSavedJobIds(storage.getSavedJobIds());
  }, []);

  const handleRoleChange = (newRole: RoleType) => {
    storage.setUserRole(newRole);
    setRole(newRole);
  };

  const handleToggleSave = (jobId: string) => {
    const updated = storage.toggleSavedJob(jobId);
    setSavedJobIds(updated);
  };

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));

  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Top Switcher Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {role === "JOB_SEEKER" ? "Candidate Portal & Application Tracker" : "Recruiter & Staffing ATS Workspace"}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {role === "JOB_SEEKER"
                ? "Track submitted resumes, interview schedules, and bookmarked roles."
                : "Manage candidate pipeline, screen US work eligibility, and post new openings."}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => handleRoleChange("JOB_SEEKER")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                role === "JOB_SEEKER"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-300"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <User className="h-3.5 w-3.5" />
              Candidate View
            </button>
            <button
              onClick={() => handleRoleChange("EMPLOYER_DIRECT")}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                role !== "JOB_SEEKER"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-300"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              Recruiter ATS View
            </button>
          </div>
        </div>

        {/* Dynamic Portal View */}
        {role === "JOB_SEEKER" ? (
          <SeekerDashboard
            applications={applications}
            savedJobs={savedJobs}
            onSelectJob={(j) => setSelectedJobForDetails(j)}
            onApplyJob={(j) => setSelectedJobForApply(j)}
          />
        ) : (
          <EmployerDashboard
            applications={applications}
            postedJobs={jobs}
            onOpenPostJob={() => setIsPostJobOpen(true)}
            onApplicationUpdate={() => {
              setApplications(storage.getApplications());
            }}
          />
        )}
      </div>

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
          setApplications(storage.getApplications());
        }}
      />

      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        onJobCreated={() => {
          setJobs(storage.getJobs());
        }}
      />
    </div>
  );
}
