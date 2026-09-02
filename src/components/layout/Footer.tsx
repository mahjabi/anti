import React from "react";
import Link from "next/link";
import { Code2, ShieldCheck, Heart, Flag } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Code2 className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                TechJobs<span className="text-blue-600">.US</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              The premier marketplace connecting software engineers, cloud architects, and data specialists with US employers, direct clients, and vetted staffing agencies.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Flag className="h-3.5 w-3.5 text-red-500" />
              <span>Compliant with US State Pay Transparency Laws</span>
            </div>
          </div>

          {/* IT Roles */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Tech Roles & Specializations
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/?stack=Go%20(Golang)" className="hover:text-blue-600">Backend Distributed Systems</Link></li>
              <li><Link href="/?stack=React" className="hover:text-blue-600">Frontend & Fullstack (React / Next.js)</Link></li>
              <li><Link href="/?stack=Kubernetes" className="hover:text-blue-600">DevOps, Cloud & SRE (AWS/K8s)</Link></li>
              <li><Link href="/?stack=PyTorch%20/%20AI" className="hover:text-blue-600">AI & Machine Learning Ops</Link></li>
              <li><Link href="/?stack=Cybersecurity" className="hover:text-blue-600">Cybersecurity & GovTech Clearances</Link></li>
            </ul>
          </div>

          {/* Visa & Contract Models */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              US Visa & Contract Models
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/?visa=H1B_SPONSOR" className="hover:text-blue-600">H-1B Visa Sponsorship Jobs</Link></li>
              <li><Link href="/?visa=OPT_CPT_STEM" className="hover:text-blue-600">F1 OPT / CPT STEM Opportunities</Link></li>
              <li><Link href="/?contract=C2C_CORP_TO_CORP" className="hover:text-blue-600">Corp-to-Corp (C2C) Contracts</Link></li>
              <li><Link href="/?contract=CONTRACT_W2" className="hover:text-blue-600">W2 Hourly Consulting</Link></li>
              <li><Link href="/calculator" className="hover:text-blue-600">W2 vs. C2C Tax Calculator</Link></li>
            </ul>
          </div>

          {/* US Tech Hubs */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Top US Tech Hubs
            </h3>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li><Link href="/?state=CA" className="hover:text-blue-600">Silicon Valley & San Francisco, CA</Link></li>
              <li><Link href="/?state=NY" className="hover:text-blue-600">New York City & Silicon Alley, NY</Link></li>
              <li><Link href="/?state=TX" className="hover:text-blue-600">Austin & Dallas, TX</Link></li>
              <li><Link href="/?state=WA" className="hover:text-blue-600">Seattle & Bellevue, WA</Link></li>
              <li><Link href="/?state=VA" className="hover:text-blue-600">Northern Virginia & Washington D.C.</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400 dark:border-slate-800">
          <p>© {new Date().getFullYear()} TechJobs.US — Designed specifically for the United States Information Technology workforce.</p>
        </div>
      </div>
    </footer>
  );
};
