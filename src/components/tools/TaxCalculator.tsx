"use client";

import React, { useState } from "react";
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Building,
  ShieldCheck,
  CheckCircle2,
  Info,
  HelpCircle,
  ArrowRightLeft,
} from "lucide-react";
import { US_STATES } from "@/lib/constants";
import { calculateITRateComparison } from "@/lib/utils";

export const TaxCalculator: React.FC = () => {
  const [inputType, setInputType] = useState<"W2_SALARY" | "HOURLY_W2" | "HOURLY_1099" | "HOURLY_C2C">("W2_SALARY");
  const [amount, setAmount] = useState<number>(165000);
  const [selectedState, setSelectedState] = useState("CA");

  const results = calculateITRateComparison(amount, inputType, selectedState);

  const stateName = US_STATES.find((s) => s.code === selectedState)?.name || selectedState;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
          <Calculator className="h-3.5 w-3.5" />
          US IT COMPENSATION & TAX ENGINE
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
          W2 vs. 1099 vs. C2C Rate Calculator
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400">
          Compare take-home pay, self-employment taxes, and equivalent hourly billing rates for US software engineers, tech consultants, and contractors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Box */}
        <div className="lg:col-span-5 space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            1. Select Contract & Compensation Model
          </h2>

          {/* Type Selector Tabs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setInputType("W2_SALARY");
                setAmount(165000);
              }}
              className={`rounded-xl p-3 text-left transition-all border ${
                inputType === "W2_SALARY"
                  ? "border-blue-600 bg-blue-50/70 text-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              <span className="text-xs font-bold block">W2 Annual Salary</span>
              <span className="text-[11px] text-slate-500">Full-Time FTE ($/yr)</span>
            </button>

            <button
              onClick={() => {
                setInputType("HOURLY_W2");
                setAmount(85);
              }}
              className={`rounded-xl p-3 text-left transition-all border ${
                inputType === "HOURLY_W2"
                  ? "border-emerald-600 bg-emerald-50/70 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              <span className="text-xs font-bold block">W2 Hourly Rate</span>
              <span className="text-[11px] text-slate-500">Hourly Contract ($/hr)</span>
            </button>

            <button
              onClick={() => {
                setInputType("HOURLY_C2C");
                setAmount(110);
              }}
              className={`rounded-xl p-3 text-left transition-all border ${
                inputType === "HOURLY_C2C"
                  ? "border-purple-600 bg-purple-50/70 text-purple-900 dark:bg-purple-950/40 dark:text-purple-200"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              <span className="text-xs font-bold block">Corp-to-Corp (C2C)</span>
              <span className="text-[11px] text-slate-500">LLC / S-Corp ($/hr)</span>
            </button>

            <button
              onClick={() => {
                setInputType("HOURLY_1099");
                setAmount(95);
              }}
              className={`rounded-xl p-3 text-left transition-all border ${
                inputType === "HOURLY_1099"
                  ? "border-amber-600 bg-amber-50/70 text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
              }`}
            >
              <span className="text-xs font-bold block">1099 Contractor</span>
              <span className="text-[11px] text-slate-500">Sole Proprietor ($/hr)</span>
            </button>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Enter Amount {inputType === "W2_SALARY" ? "($ / Year)" : "($ / Hour)"}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-bold">
                $
              </span>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-8 pr-4 text-base font-extrabold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* State Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              US State (State Income Tax Calculation)
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {US_STATES.filter((s) => s.code !== "ALL").map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} {["TX", "WA", "FL"].includes(s.code) ? "(0% State Tax)" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/40 text-xs space-y-1.5 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <Info className="h-4 w-4 text-blue-600" />
              <span>Standard Baseline Assumptions:</span>
            </div>
            <p>• 2,000 billable hours per year (40 hrs/wk × 50 weeks)</p>
            <p>• Incorporates Federal, FICA (7.65%), and {selectedState} State taxes</p>
            <p>• C2C/1099 incorporates self-employment taxes and S-Corp tax pass-throughs</p>
          </div>
        </div>

        {/* Right Output Dashboard */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Take Home Card */}
          <div className="rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Estimated Net Take-Home ({selectedState})
              </span>
              <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold">
                ~{results.effectiveTaxRatePercentage}% Est. Total Tax
              </span>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-baseline gap-2">
              <span className="text-4xl font-black tracking-tight">
                ${results.estimatedTakeHomeW2.toLocaleString()}
              </span>
              <span className="text-sm text-blue-200 font-medium">
                / year (net)
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/20 pt-4 text-xs">
              <div>
                <span className="text-blue-200 block">Est. Monthly Take-Home:</span>
                <span className="text-lg font-extrabold">
                  ${results.estimatedTakeHomeMonthly.toLocaleString()} / mo
                </span>
              </div>
              <div>
                <span className="text-blue-200 block">Estimated Annual Gross:</span>
                <span className="text-lg font-extrabold">
                  ${results.annualW2Salary.toLocaleString()} / yr
                </span>
              </div>
            </div>
          </div>

          {/* Break-Even Equivalent Rates Across All Models */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRightLeft className="h-4 w-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Equivalent Break-Even Billing Rates
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-900/30 dark:bg-blue-950/20">
                <span className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase block">
                  Full-Time W2 FTE
                </span>
                <div className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
                  ${results.annualW2Salary.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> / yr</span>
                </div>
                <span className="mt-1 text-[11px] text-slate-500 block">
                  ~${results.hourlyW2}/hr base rate
                </span>
              </div>

              <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-4 dark:border-purple-900/30 dark:bg-purple-950/20">
                <span className="text-xs font-bold text-purple-800 dark:text-purple-300 uppercase block">
                  C2C (Corp-to-Corp)
                </span>
                <div className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
                  ${results.equivalentC2CHourly}
                  <span className="text-xs font-normal text-slate-500"> / hr</span>
                </div>
                <span className="mt-1 text-[11px] text-slate-500 block">
                  For your LLC / S-Corp
                </span>
              </div>

              <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-950/20">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase block">
                  1099 Contractor
                </span>
                <div className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">
                  ${results.equivalent1099Hourly}
                  <span className="text-xs font-normal text-slate-500"> / hr</span>
                </div>
                <span className="mt-1 text-[11px] text-slate-500 block">
                  Independent billing
                </span>
              </div>
            </div>

            {/* Benefit comparison note */}
            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400">
              <span className="font-semibold text-slate-900 dark:text-white">Why C2C & 1099 rates are higher: </span>
              In full-time W2 roles, employers pay for 7.65% FICA taxes, health insurance subsidies (~$8k-$15k/yr), 401(k) matching, and paid time off (PTO). On C2C or 1099, contractors must cover these costs independently.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
