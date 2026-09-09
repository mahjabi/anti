"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Sparkles, ShieldCheck, Lock } from "lucide-react";

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Personalized Job Matching
              </span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                F-1 OPT Engine
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              PhD Career Matcher • AI Safety & Security
            </span>
          </div>
        </Link>

        {/* Right Status */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 text-xs font-bold text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Active Hard Constraint: F-1 OPT/CPT</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Lock className="h-3.5 w-3.5 text-slate-500" />
            <span>Profile Protected</span>
          </div>
        </div>
      </div>
    </header>
  );
};
