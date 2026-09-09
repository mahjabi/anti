"use client";

import React, { useState } from "react";
import {
  Lock,
  Unlock,
  Upload,
  User,
  GraduationCap,
  Briefcase,
  BookOpen,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  FileText,
  RotateCcw,
} from "lucide-react";
import { CandidateProfile } from "@/types/job";
import { profileStore } from "@/lib/profile-store";

interface ProfileCardProps {
  profile: CandidateProfile;
  onProfileUpdated: (profile: CandidateProfile) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onProfileUpdated,
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCvUploadOpen, setIsCvUploadOpen] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [parsingStatus, setParsingStatus] = useState<"IDLE" | "PARSING" | "SUCCESS">("IDLE");
  const [lockState, setLockState] = useState(profile.isLocked);

  // Manual Edit State
  const [editedInterests, setEditedInterests] = useState(profile.researchInterests.join(", "));
  const [editedLanguages, setEditedLanguages] = useState(profile.skills.languages.join(", "));
  const [editedFrameworks, setEditedFrameworks] = useState(profile.skills.frameworks.join(", "));
  const [editedPreferredStates, setEditedPreferredStates] = useState(profile.softConstraints.preferredStates.join(", "));

  const handleToggleLock = () => {
    const updated = profileStore.toggleLock(!lockState);
    setLockState(updated.isLocked);
    onProfileUpdated(updated);
  };

  const handleSaveManualEdit = () => {
    const result = profileStore.updateProfile(
      {
        researchInterests: editedInterests.split(",").map((s) => s.trim()).filter(Boolean),
        skills: {
          ...profile.skills,
          languages: editedLanguages.split(",").map((s) => s.trim()).filter(Boolean),
          frameworks: editedFrameworks.split(",").map((s) => s.trim()).filter(Boolean),
        },
        softConstraints: {
          ...profile.softConstraints,
          preferredStates: editedPreferredStates.split(",").map((s) => s.trim().toUpperCase()).filter(Boolean),
        },
      },
      true // force override for manual modal save
    );

    if (result.success) {
      onProfileUpdated(result.profile);
      setIsEditModalOpen(false);
    }
  };

  const handleCvUploadAndParse = () => {
    if (!cvFile) return;
    setParsingStatus("PARSING");

    setTimeout(() => {
      const { updatedProfile } = profileStore.parseAndPopulateFromCV(cvFile.name);
      onProfileUpdated(updatedProfile);
      setParsingStatus("SUCCESS");
      setTimeout(() => {
        setIsCvUploadOpen(false);
        setParsingStatus("IDLE");
      }, 1200);
    }, 1000);
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-6">
      {/* Top Header: Candidate Name, Current PhD Standing & Lock Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-slate-800">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-xl font-extrabold text-white shadow-md shadow-blue-500/20">
            MH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {profile.fullName}
              </h2>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-bold text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300">
                PhD Candidate
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              {profile.degreeLevel} • {profile.currentInstitution} (<strong>{profile.currentLab}</strong>)
            </p>
            <p className="text-[11px] text-slate-400">
              Anticipated Graduation: {profile.anticipatedGraduation} | Started: {profile.phdStartYear}
            </p>
          </div>
        </div>

        {/* Lock Controls & CV Upload Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Lock Badge & Toggle */}
          <button
            onClick={handleToggleLock}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
              lockState
                ? "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                : "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
            }`}
            title={lockState ? "Profile is locked to prevent automatic overwrite" : "Profile is unlocked for editing"}
          >
            {lockState ? (
              <>
                <Lock className="h-3.5 w-3.5 text-emerald-600" />
                <span>Locked & Protected</span>
              </>
            ) : (
              <>
                <Unlock className="h-3.5 w-3.5 text-amber-600" />
                <span>Unlocked (Editing Allowed)</span>
              </>
            )}
          </button>

          {/* Manual Edit Button */}
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Manual Edit
          </button>

          {/* Upload CV Parser Button */}
          <button
            onClick={() => setIsCvUploadOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Upload className="h-3.5 w-3.5" />
            Upload & Parse CV
          </button>
        </div>
      </div>

      {/* Constraints Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Hard Constraint 1: Visa Status */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-3.5 dark:border-blue-900/40 dark:bg-blue-950/20">
          <span className="text-[10px] font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider block">
            🔒 Hard Constraint (Visa)
          </span>
          <div className="mt-1 flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
            <ShieldCheck className="h-4 w-4 text-blue-600" />
            <span>F-1 OPT / CPT Eligible Only</span>
          </div>
          <span className="text-[10.5px] text-slate-500 block mt-0.5">
            Excludes US-Citizen only defense roles
          </span>
        </div>

        {/* Hard Constraint 2: Role Level */}
        <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-3.5 dark:border-purple-900/40 dark:bg-purple-950/20">
          <span className="text-[10px] font-bold text-purple-800 dark:text-purple-300 uppercase tracking-wider block">
            🔒 Hard Constraint (Role)
          </span>
          <div className="mt-1 flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
            <GraduationCap className="h-4 w-4 text-purple-600" />
            <span>PhD Internships & Fellowships</span>
          </div>
          <span className="text-[10.5px] text-slate-500 block mt-0.5">
            Summer 2027 returning status
          </span>
        </div>

        {/* Soft Constraint: Preferred Locations */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-3.5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
            📍 Soft Preference (Locations)
          </span>
          <div className="mt-1 flex flex-wrap gap-1 font-bold text-xs text-slate-900 dark:text-white">
            {profile.softConstraints.preferredStates.map((st) => (
              <span key={st} className="rounded bg-emerald-100 px-1.5 py-0.2 text-[11px] font-bold text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">
                {st}
              </span>
            ))}
            <span className="text-[11px] font-normal text-slate-500">+ Remote US</span>
          </div>
          <span className="text-[10.5px] text-slate-500 block mt-0.5">
            Texas, California, Kansas/Missouri boosted
          </span>
        </div>

        {/* Data Sources */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-800/40">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            🌐 Monitored Career Feeds
          </span>
          <span className="mt-1 font-bold text-xs text-slate-800 dark:text-slate-200 block">
            USAJOBS, CareerOneStop
          </span>
          <span className="text-[10.5px] text-slate-500 block mt-0.5">
            Google, MSR, Meta FAIR, Anthropic
          </span>
        </div>
      </div>

      {/* Research Interests & Skill Badges */}
      <div className="space-y-3 pt-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
            Primary Research Focus & Expertise
          </span>
          <div className="flex flex-wrap gap-1.5">
            {profile.researchInterests.map((interest) => (
              <span
                key={interest}
                className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
            Core Languages, Frameworks & Tools
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[...profile.skills.languages, ...profile.skills.frameworks].map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Publications Summary */}
      <div className="border-t border-slate-100 pt-4 dark:border-slate-800">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Published Papers & Research Preprints ({profile.publications.length + profile.manuscriptsInPrep.length})
        </span>
        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
          {profile.publications.map((pub, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="font-bold text-blue-600">[{pub.year}]</span>
              <span><strong>{pub.title}</strong> — {pub.venue}</span>
            </div>
          ))}
          {profile.manuscriptsInPrep.map((m, idx) => (
            <div key={idx} className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
              <span className="font-bold text-amber-600">[In-Prep {m.year}]</span>
              <span><em>{m.title}</em></span>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Manual Profile Override (Protected)
            </h3>
            <p className="text-xs text-slate-500">
              Update your research interests, frameworks, or soft location preferences.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Research Interests (comma separated)
                </label>
                <textarea
                  rows={2}
                  value={editedInterests}
                  onChange={(e) => setEditedInterests(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Frameworks & Libraries (comma separated)
                </label>
                <input
                  type="text"
                  value={editedFrameworks}
                  onChange={(e) => setEditedFrameworks(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred US States (e.g. TX, CA, KS, MO)
                </label>
                <input
                  type="text"
                  value={editedPreferredStates}
                  onChange={(e) => setEditedPreferredStates(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveManualEdit}
                className="rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CV Upload Parser Modal */}
      {isCvUploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-900/40">
              <FileText className="h-6 w-6" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Upload CV / Resume to Re-populate Fields
            </h3>
            <p className="text-xs text-slate-500">
              Upload an updated PDF/Word resume. The CV parser will extract updated skills, publications, and lab experience without corrupting locked records.
            </p>

            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50">
              <input
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                className="text-xs text-slate-600 dark:text-slate-300 file:mr-2 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-white hover:file:bg-blue-700"
              />
              {cvFile && (
                <p className="mt-2 text-[11px] font-semibold text-emerald-600">
                  ✓ Selected: {cvFile.name} ({(cvFile.size / 1024).toFixed(1)} KB)
                </p>
              )}
            </div>

            {parsingStatus === "SUCCESS" && (
              <div className="rounded-xl bg-emerald-50 p-2.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
                ✓ Resume parsed successfully! Updated skills and publication records.
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setIsCvUploadOpen(false)}
                className="rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                disabled={!cvFile || parsingStatus === "PARSING"}
                onClick={handleCvUploadAndParse}
                className="rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {parsingStatus === "PARSING" ? "Parsing CV..." : "Parse & Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
