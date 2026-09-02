"use client";

import React, { useState } from "react";
import {
  Users,
  Building2,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Github,
  Linkedin,
  DollarSign,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Application, ApplicationStage, Job } from "@/types/job";
import { storage } from "@/lib/storage";
import { getVisaBadge, getContractBadge } from "@/lib/utils";

interface EmployerDashboardProps {
  applications: Application[];
  postedJobs: Job[];
  onOpenPostJob: () => void;
  onApplicationUpdate: () => void;
}

const STAGES: { id: ApplicationStage; label: string }[] = [
  { id: "SUBMITTED", label: "New / Submitted" },
  { id: "RECRUITER_SCREEN", label: "Recruiter Screen" },
  { id: "TECHNICAL_ASSESSMENT", label: "Tech Assessment" },
  { id: "SYSTEM_DESIGN_ONSITE", label: "System Design Onsite" },
  { id: "OFFER_EXTENDED", label: "Offer Extended" },
  { id: "OFFER_ACCEPTED", label: "Offer Accepted" },
  { id: "REJECTED", label: "Archived / Rejected" },
];

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({
  applications,
  postedJobs,
  onOpenPostJob,
  onApplicationUpdate,
}) => {
  const [selectedApp, setSelectedApp] = useState<Application | null>(applications[0] || null);
  const [activeTab, setActiveTab] = useState<"APPLICANTS" | "MY_JOBS">("APPLICANTS");
  const [editingNote, setEditingNote] = useState(false);
  const [noteText, setNoteText] = useState("");

  const handleStageChange = (appId: string, newStage: ApplicationStage) => {
    storage.updateApplicationStage(appId, newStage);
    if (selectedApp && selectedApp.id === appId) {
      setSelectedApp({ ...selectedApp, stage: newStage });
    }
    onApplicationUpdate();
  };

  const handleSaveNote = () => {
    if (!selectedApp) return;
    storage.updateApplicationStage(selectedApp.id, selectedApp.stage, noteText);
    setSelectedApp({ ...selectedApp, recruiterNotes: noteText });
    setEditingNote(false);
    onApplicationUpdate();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-indigo-200 bg-gradient-to-r from-slate-900 to-indigo-950 p-6 text-white shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-indigo-500/30 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-400/30">
              RECRUITER ATS PORTAL
            </span>
          </div>
          <h2 className="mt-1 text-2xl font-black">
            US IT Talent & Candidate Pipeline
          </h2>
          <p className="mt-0.5 text-xs text-indigo-200">
            Screen candidates, verify US visa/work eligibility, and advance interview stages.
          </p>
        </div>

        <button
          onClick={onOpenPostJob}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all"
        >
          <PlusCircle className="h-4 w-4" />
          Post New IT Role
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("APPLICANTS")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
            activeTab === "APPLICANTS"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Users className="h-4 w-4" />
          Candidate Pipeline ({applications.length})
        </button>

        <button
          onClick={() => setActiveTab("MY_JOBS")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
            activeTab === "MY_JOBS"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Building2 className="h-4 w-4" />
          Active Job Listings ({postedJobs.length})
        </button>
      </div>

      {/* View 1: Candidate Pipeline ATS */}
      {activeTab === "APPLICANTS" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Applicant List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Incoming Applicants ({applications.length})
            </h3>

            {applications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-400">
                No candidate submissions yet.
              </div>
            ) : (
              applications.map((app) => {
                const isSelected = selectedApp?.id === app.id;
                const visaBadge = getVisaBadge(app.visaSponsorship);
                return (
                  <div
                    key={app.id}
                    onClick={() => {
                      setSelectedApp(app);
                      setNoteText(app.recruiterNotes || "");
                    }}
                    className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/40 shadow-sm dark:border-blue-700 dark:bg-blue-950/30"
                        : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {app.candidateName}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Applying for: <span className="font-semibold text-slate-700 dark:text-slate-300">{app.jobTitle}</span>
                        </p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {app.stage.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-[10.5px] font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                        {visaBadge}
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10.5px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                        {app.location}
                      </span>
                      <span className="text-[10px] text-slate-400 ml-auto">
                        {app.appliedAt}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Candidate View & Stage Progression */}
          <div className="lg:col-span-7">
            {selectedApp ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                      {selectedApp.candidateName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {selectedApp.candidateEmail} • {selectedApp.candidatePhone || "No phone provided"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedApp.candidateGithub && (
                      <a
                        href={selectedApp.candidateGithub}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        title="GitHub Profile"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {selectedApp.candidateLinkedin && (
                      <a
                        href={selectedApp.candidateLinkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Stage Progression Selector */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Move Candidate Stage
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {STAGES.slice(0, 4).map((st) => (
                      <button
                        key={st.id}
                        onClick={() => handleStageChange(selectedApp.id, st.id)}
                        className={`rounded-xl py-2 px-2.5 text-xs font-bold transition-all text-center ${
                          selectedApp.stage === st.id
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                    {STAGES.slice(4).map((st) => (
                      <button
                        key={st.id}
                        onClick={() => handleStageChange(selectedApp.id, st.id)}
                        className={`rounded-xl py-2 px-2.5 text-xs font-bold transition-all text-center ${
                          selectedApp.stage === st.id
                            ? st.id.includes("OFFER")
                              ? "bg-emerald-600 text-white shadow-sm"
                              : "bg-red-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* US Work Auth & Compliance Details */}
                <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4 dark:border-blue-900/30 dark:bg-blue-950/20 space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold">
                    <ShieldCheck className="h-4 w-4" />
                    <span>US Work Authorization & Verification</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="text-slate-500 block">Status:</span>
                      <strong className="text-slate-900 dark:text-white">{getVisaBadge(selectedApp.visaSponsorship)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Security Clearance:</span>
                      <strong className="text-slate-900 dark:text-white">{selectedApp.securityClearance.replace("_", " ")}</strong>
                    </div>
                  </div>
                </div>

                {/* Attached Resume */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                    Attached Candidate Resume
                  </label>
                  <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center gap-2.5">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        {selectedApp.resumeFileName || "Candidate_Resume.pdf"}
                      </span>
                    </div>
                    <button
                      onClick={() => alert("Downloading parsed resume simulation")}
                      className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-blue-600 border border-slate-200 shadow-sm hover:bg-slate-50 dark:bg-slate-700 dark:text-blue-300 dark:border-slate-600"
                    >
                      Download PDF
                    </button>
                  </div>
                </div>

                {/* Cover Note */}
                {selectedApp.coverNote && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                      Candidate Pitch / Note
                    </label>
                    <p className="rounded-xl bg-slate-50 p-3 text-xs leading-relaxed text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      "{selectedApp.coverNote}"
                    </p>
                  </div>
                )}

                {/* Recruiter Evaluation Notes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Internal Recruiter & Team Notes
                    </label>
                    {!editingNote ? (
                      <button
                        onClick={() => {
                          setEditingNote(true);
                          setNoteText(selectedApp.recruiterNotes || "");
                        }}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Edit Notes
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveNote}
                        className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                      >
                        Save Note
                      </button>
                    )}
                  </div>

                  {editingNote ? (
                    <textarea
                      rows={3}
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Add technical assessment score, interview feedback, or compensation offer notes..."
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    />
                  ) : (
                    <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-400">
                      {selectedApp.recruiterNotes || "No internal notes added yet. Click 'Edit Notes' to record feedback."}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-slate-200 p-8 text-center text-slate-400">
                Select a candidate from the left list to view their technical profile and advance stages.
              </div>
            )}
          </div>
        </div>
      )}

      {/* View 2: Active Job Posts */}
      {activeTab === "MY_JOBS" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {postedJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-slate-500">
                      {job.city}, {job.state} • {job.contractType.replace(/_/g, " ")}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                      {job.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                    Active
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {job.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10.5px] text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800 text-xs">
                  <span className="font-bold text-emerald-600">
                    ${Math.round(job.salaryMin / 1000)}k - ${Math.round(job.salaryMax / 1000)}k / yr
                  </span>
                  <span className="text-slate-400">
                    {job.applicantCount} Total Applicants
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
