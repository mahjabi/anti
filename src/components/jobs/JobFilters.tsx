"use client";

import React from "react";
import {
  Filter,
  RotateCcw,
  Search,
  MapPin,
  DollarSign,
  ShieldCheck,
  Check,
  Globe2,
  Building,
} from "lucide-react";
import { JobFilterState, VisaSponsorshipType, ContractType } from "@/types/job";
import {
  US_STATES,
  TECH_STACK_TAGS,
  VISA_SPONSORSHIP_OPTIONS,
  CONTRACT_TYPE_OPTIONS,
  EXPERIENCE_LEVELS,
  SECURITY_CLEARANCE_OPTIONS,
} from "@/lib/constants";

interface JobFiltersProps {
  filters: JobFilterState;
  onFilterChange: (newFilters: Partial<JobFilterState>) => void;
  onResetFilters: () => void;
  totalCount: number;
}

export const JobFilters: React.FC<JobFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalCount,
}) => {
  const toggleTech = (tech: string) => {
    const exists = filters.techStacks.includes(tech);
    const updated = exists
      ? filters.techStacks.filter((t) => t !== tech)
      : [...filters.techStacks, tech];
    onFilterChange({ techStacks: updated });
  };

  const toggleVisa = (visa: VisaSponsorshipType) => {
    const exists = filters.visaTypes.includes(visa);
    const updated = exists
      ? filters.visaTypes.filter((v) => v !== visa)
      : [...filters.visaTypes, visa];
    onFilterChange({ visaTypes: updated });
  };

  const toggleContract = (contract: ContractType) => {
    const exists = filters.contractTypes.includes(contract);
    const updated = exists
      ? filters.contractTypes.filter((c) => c !== contract)
      : [...filters.contractTypes, contract];
    onFilterChange({ contractTypes: updated });
  };

  const hasActiveFilters =
    filters.searchQuery !== "" ||
    filters.locationQuery !== "" ||
    filters.techStacks.length > 0 ||
    filters.visaTypes.length > 0 ||
    filters.contractTypes.length > 0 ||
    filters.usState !== "ALL" ||
    filters.employerType !== "ALL" ||
    filters.minSalary > 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-blue-600" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            US IT Job Filters
          </h2>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {totalCount} Active
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <RotateCcw className="h-3 w-3" />
            Reset All
          </button>
        )}
      </div>

      <div className="mt-4 space-y-6">
        {/* 1. US State & Metro Hub */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            📍 US State / Metro Hub
          </label>
          <div className="mt-2">
            <select
              value={filters.usState}
              onChange={(e) => onFilterChange({ usState: e.target.value })}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {US_STATES.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name}
                </option>
              ))}
            </select>
          </div>

          {/* 100% US Remote Toggle */}
          <div className="mt-2.5 flex items-center">
            <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
              <input
                type="checkbox"
                checked={filters.workLocations.includes("REMOTE_US_ONLY")}
                onChange={(e) => {
                  const updated = e.target.checked
                    ? [...filters.workLocations, "REMOTE_US_ONLY" as const]
                    : filters.workLocations.filter((l) => l !== "REMOTE_US_ONLY");
                  onFilterChange({ workLocations: updated });
                }}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>100% US Remote Only</span>
            </label>
          </div>
        </div>

        {/* 2. Visa & Work Authorization */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              🛂 US Visa & Work Auth
            </label>
          </div>
          <div className="mt-2 space-y-2">
            {VISA_SPONSORSHIP_OPTIONS.map((visa) => {
              const checked = filters.visaTypes.includes(visa.id);
              return (
                <label
                  key={visa.id}
                  className={`flex cursor-pointer items-start gap-2 rounded-lg p-2 text-xs transition-colors ${
                    checked
                      ? "bg-blue-50 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
                      : "hover:bg-slate-50 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleVisa(visa.id)}
                    className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-semibold block">{visa.badge}</span>
                    <span className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-tight block">
                      {visa.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* 3. Contract & Tax Model (W2 vs C2C vs 1099) */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            📑 Contract & Tax Model
          </label>
          <div className="mt-2 space-y-1.5">
            {CONTRACT_TYPE_OPTIONS.map((c) => {
              const checked = filters.contractTypes.includes(c.id);
              return (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 text-xs text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleContract(c.id)}
                      className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{c.label}</span>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* 4. Employer Category (Direct FTE vs Staffing / Prime Vendor) */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            🏢 Employer Type
          </label>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => onFilterChange({ employerType: "ALL" })}
              className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                filters.employerType === "ALL"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              All
            </button>
            <button
              onClick={() => onFilterChange({ employerType: "DIRECT_ONLY" })}
              className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                filters.employerType === "DIRECT_ONLY"
                  ? "bg-white text-emerald-700 shadow-sm dark:bg-slate-700 dark:text-emerald-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              Direct FTE
            </button>
            <button
              onClick={() => onFilterChange({ employerType: "AGENCY_ONLY" })}
              className={`rounded-lg py-1.5 text-xs font-semibold transition-all ${
                filters.employerType === "AGENCY_ONLY"
                  ? "bg-white text-amber-700 shadow-sm dark:bg-slate-700 dark:text-amber-400"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400"
              }`}
            >
              Agencies
            </button>
          </div>
        </div>

        {/* 5. Tech Stack Filter Chips */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ⚡ Tech Stacks & Tools
            </label>
            {filters.techStacks.length > 0 && (
              <button
                onClick={() => onFilterChange({ techStacks: [] })}
                className="text-[11px] text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TECH_STACK_TAGS.map((tech) => {
              const active = filters.techStacks.includes(tech);
              return (
                <button
                  key={tech}
                  onClick={() => toggleTech(tech)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono font-medium transition-all ${
                    active
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. US Salary Transparency Minimum */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              💵 Min Salary / Comp
            </label>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              {filters.minSalary > 0
                ? `$${Math.round(filters.minSalary / 1000)}k+/yr`
                : "Any Salary"}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="250000"
            step="10000"
            value={filters.minSalary}
            onChange={(e) => onFilterChange({ minSalary: Number(e.target.value) })}
            className="mt-2 w-full accent-blue-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>$0</span>
            <span>$150k</span>
            <span>$250k+</span>
          </div>
        </div>
      </div>
    </div>
  );
};
