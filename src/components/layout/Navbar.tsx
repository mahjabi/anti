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
                  My Applications & Saved
                  {savedCount > 0 && (
                    <span className="ml-1 rounded-full bg-blue-600 px-1.5 py-0.2 text-[10px] font-bold text-white">
                      {savedCount}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Recruiter ATS Portal
                </>
              )}
            </Link>
          </nav>
        </div>

        {/* Right side controls (Role switcher & Post Job) */}
        <div className="hidden items-center gap-3 md:flex">
          {/* View Mode Toggle (Seeker vs Recruiter) */}
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
              Engineer
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
              Recruiter / Agency
            </button>
          </div>

          {/* Post an IT Job CTA */}
          <button
            onClick={onPostJobClick}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            <PlusCircle className="h-4 w-4" />
            Post IT Job
            <span className="hidden lg:inline text-[11px] font-normal text-blue-200">
              (Pay Compliant)
            </span>
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
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col space-y-3">
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
              Dashboard & ATS Tracker
            </Link>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs font-semibold text-slate-400 mb-2">Switch View Mode:</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    handleRoleToggle("JOB_SEEKER");
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-lg py-1.5 text-xs font-medium text-center border ${
                    role === "JOB_SEEKER" ? "border-blue-600 bg-blue-50 text-blue-700" : "border-slate-200"
                  }`}
                >
                  Candidate View
                </button>
                <button
                  onClick={() => {
                    handleRoleToggle("EMPLOYER_DIRECT");
                    setMobileMenuOpen(false);
                  }}
                  className={`rounded-lg py-1.5 text-xs font-medium text-center border ${
                    role !== "JOB_SEEKER" ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-slate-200"
                  }`}
                >
                  Recruiter ATS
                </button>
              </div>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onPostJobClick) onPostJobClick();
              }}
              className="w-full rounded-xl bg-blue-600 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              + Post an IT Job
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
