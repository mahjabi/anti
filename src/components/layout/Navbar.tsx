"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Briefcase,
  Calculator,
  Bookmark,
  PlusCircle,
  ShieldCheck,
  User,
  Building2,
  Menu,
  X,
  Code2,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { storage } from "@/lib/storage";
import { RoleType } from "@/types/job";

interface NavbarProps {
  onPostJobClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPostJobClick }) => {
  const pathname = usePathname();
  const [role, setRole] = useState<RoleType>("JOB_SEEKER");
  const [savedCount, setSavedCount] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setRole(storage.getUserRole());
    setSavedCount(storage.getSavedJobIds().length);

    const handleStorageUpdate = () => {
      setSavedCount(storage.getSavedJobIds().length);
      setRole(storage.getUserRole());
    };

    window.addEventListener("storage", handleStorageUpdate);
    return () => window.removeEventListener("storage", handleStorageUpdate);
  }, [pathname]);

  const handleRoleToggle = (newRole: RoleType) => {
    storage.setUserRole(newRole);
    setRole(newRole);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20">
              <Code2 className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  TechJobs<span className="text-blue-600">.US</span>
                </span>
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                  🇺🇸 IT ONLY
                </span>
              </div>
              <span className="text-[10.5px] text-slate-500 dark:text-slate-400">
                US Visa, W2/C2C & Tech Stacks
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <Briefcase className="h-4 w-4" />
              IT Jobs
            </Link>

            {/* Personalized PhD Career Matcher Link */}
            <Link
              href="/phd-matcher"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${
                pathname === "/phd-matcher"
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 ring-1 ring-blue-500/30"
                  : "text-blue-600 hover:bg-blue-50/50 dark:text-blue-400"
              }`}
            >
              <GraduationCap className="h-4 w-4 text-blue-600" />
              PhD Career Matcher (OPT)
              <span className="rounded bg-blue-600 px-1.5 py-0.2 text-[9.5px] font-bold text-white">
                NEW
              </span>
            </Link>

            <Link
              href="/calculator"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/calculator"
                  ? "bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              <Calculator className="h-4 w-4" />
              US Tax & C2C Calculator
            </Link>

            <Link
              href="/dashboard"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === "/dashboard"
                  ? "bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {role === "JOB_SEEKER" ? (
                <>
                  <Bookmark className="h-4 w-4" />
                  Applications & Saved
                  {savedCount > 0 && (
                    <span className="ml-1 rounded-full bg-blue-600 px-1.5 py-0.2 text-[10px] font-bold text-white">
                      {savedCount}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Recruiter ATS
                </>
              )}
            </Link>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-700 dark:bg-slate-800">
            <button
              onClick={() => handleRoleToggle("JOB_SEEKER")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                role === "JOB_SEEKER"
                  ? "bg-white text-blue-600 shadow-sm dark:bg-slate-700 dark:text-blue-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <User className="h-3.5 w-3.5" />
              PhD / Engineer
            </button>
            <button
              onClick={() => handleRoleToggle("EMPLOYER_DIRECT")}
              className={`flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                role !== "JOB_SEEKER"
                  ? "bg-white text-indigo-600 shadow-sm dark:bg-slate-700 dark:text-indigo-400"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              <Building2 className="h-3.5 w-3.5" />
              Recruiter / ATS
            </button>
          </div>

          <button
            onClick={onPostJobClick}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            Post IT Job
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <Link
            href="/phd-matcher"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-md p-2 text-sm font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40"
          >
            <GraduationCap className="h-4 w-4" />
            PhD Career Matcher (OPT)
          </Link>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200"
          >
            <Briefcase className="h-4 w-4 text-blue-600" />
            Browse IT Jobs
          </Link>
          <Link
            href="/calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200"
          >
            <Calculator className="h-4 w-4 text-emerald-600" />
            US Tax & C2C Calculator
          </Link>
          <Link
            href="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 rounded-md p-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200"
          >
            <Bookmark className="h-4 w-4 text-purple-600" />
            Applications & ATS Tracker
          </Link>
        </div>
      )}
    </header>
  );
};
