"use client";

import React, { useState } from "react";
import {
  X,
  Upload,
  CheckCircle2,
  FileText,
  Github,
  Linkedin,
  Globe,
  AlertCircle,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Job, Application, VisaSponsorshipType, SecurityClearanceType } from "@/types/job";
import { storage } from "@/lib/storage";
import { VISA_SPONSORSHIP_OPTIONS, SECURITY_CLEARANCE_OPTIONS } from "@/lib/constants";
import { formatSalary } from "@/lib/utils";

interface ApplyModalProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (app: Application) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  job,
  isOpen,
  onClose,
  onSuccess,
}) => {
  if (!isOpen || !job) return null;

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [visaStatus, setVisaStatus] = useState<VisaSponsorshipType>("ANY_AUTHORIZED");
  const [clearance, setClearance] = useState<SecurityClearanceType>("NONE");
  const [isAuthorizedInUS, setIsAuthorizedInUS] = useState("YES");
  const [requiresSponsorship, setRequiresSponsorship] = useState("NO");
  const [coverNote, setCoverNote] = useState("");
  const [resumeName, setResumeName] = useState("Senior_Software_Engineer_Resume_2026.pdf");
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setErrorMsg("Please enter your full name and email address.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    setTimeout(() => {
      const newApp: Application = {
        id: "app-" + Date.now(),
        jobId: job.id,
        jobTitle: job.title,
        companyName: job.company.name,
        companyLogo: job.company.logo,
        location: `${job.city}, ${job.state}`,
        contractType: job.contractType,
        salaryText: formatSalary(job.salaryMin, job.salaryMax, job.salaryPeriod),
        candidateName: fullName,
        candidateEmail: email,
        candidatePhone: phone || undefined,
        candidateGithub: githubUrl || undefined,
        candidateLinkedin: linkedinUrl || undefined,
        candidatePortfolio: portfolioUrl || undefined,
        visaSponsorship: visaStatus,
        securityClearance: clearance,
        resumeFileName: resumeName,
        coverNote: coverNote || undefined,
        stage: "SUBMITTED",
        appliedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        updatedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        recruiterNotes: "Application submitted via TechJobs US. Automated skill parsing completed.",
      };

      storage.addApplication(newApp);
      setSubmitting(false);
      setSubmittedSuccess(true);
      onSuccess(newApp);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-6 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                1-Click US Tech Application
              </span>
            </div>
            <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              Apply to {job.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {job.company.name} • {job.city}, {job.state}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submittedSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Application Submitted Successfully!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Your profile and work authorization information have been transmitted to the recruiting team at <strong>{job.company.name}</strong>.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
              >
                Done & View Tracker
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
            {errorMsg && (
              <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-700 border border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-900">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Candidate Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex.chen@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                />
              </div>
            </div>

            {/* US Work Authorization & Visa Compliance */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 space-y-3.5 dark:border-blue-900/40 dark:bg-blue-950/20">
              <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  US Work Authorization & Visa Compliance
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Current US Work Status
                  </label>
                  <select
                    value={visaStatus}
                    onChange={(e) => setVisaStatus(e.target.value as VisaSponsorshipType)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {VISA_SPONSORSHIP_OPTIONS.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.badge} — {v.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Security Clearance (if any)
                  </label>
                  <select
                    value={clearance}
                    onChange={(e) => setClearance(e.target.value as SecurityClearanceType)}
                    className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {SECURITY_CLEARANCE_OPTIONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Standard US Questionnaire */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 block">
                    Legally authorized to work in the US?
                  </span>
                  <div className="mt-1 flex gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="authorized"
                        value="YES"
                        checked={isAuthorizedInUS === "YES"}
                        onChange={() => setIsAuthorizedInUS("YES")}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="authorized"
                        value="NO"
                        checked={isAuthorizedInUS === "NO"}
                        onChange={() => setIsAuthorizedInUS("NO")}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 block">
                    Will you require sponsorship now/future?
                  </span>
                  <div className="mt-1 flex gap-3">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="sponsorship"
                        value="YES"
                        checked={requiresSponsorship === "YES"}
                        onChange={() => setRequiresSponsorship("YES")}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="sponsorship"
                        value="NO"
                        checked={requiresSponsorship === "NO"}
                        onChange={() => setRequiresSponsorship("NO")}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Engineer Links (GitHub, LinkedIn, Portfolio) */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Technical Profiles & Portfolio
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                  <Github className="h-4 w-4 text-slate-500 shrink-0" />
                  <input
                    type="url"
                    placeholder="github.com/username"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-900 focus:outline-none dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                  <Linkedin className="h-4 w-4 text-blue-600 shrink-0" />
                  <input
                    type="url"
                    placeholder="linkedin.com/in/..."
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-900 focus:outline-none dark:text-white"
                  />
                </div>

                <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 dark:border-slate-700 dark:bg-slate-800">
                  <Globe className="h-4 w-4 text-emerald-600 shrink-0" />
                  <input
                    type="url"
                    placeholder="portfolio.dev"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-900 focus:outline-none dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* Resume Upload Simulator */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Resume Attachment (PDF)
              </label>
              <div className="mt-1.5 flex items-center justify-between rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/60">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">
                      {resumeName}
                    </span>
                    <span className="text-[10px] text-slate-400">PDF • 142 KB</span>
                  </div>
                </div>
                <label className="cursor-pointer rounded-lg bg-white px-3 py-1 text-xs font-semibold text-blue-600 shadow-sm border border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-700 dark:text-blue-300">
                  Replace
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setResumeName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Note to Recruiter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Pitch / Note to US Recruiter (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Highlight your key achievements with the required tech stack..."
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            {/* Footer Submission Button */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-60 transition-all"
              >
                {submitting ? "Transmitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
