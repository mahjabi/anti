import React from "react";
import { GraduationCap, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-blue-600" />
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Personalized Job Matching & Career Engine
          </span>
          <span>• Tailored for Mahjabin Hossain (UMKC Asset Lab)</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <span>Feeds: USAJOBS • CareerOneStop • Google • Microsoft • Meta</span>
        </div>
      </div>
    </footer>
  );
};
