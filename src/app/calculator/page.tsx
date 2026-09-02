"use client";

import React from "react";
import { TaxCalculator } from "@/components/tools/TaxCalculator";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 dark:bg-slate-950">
      <TaxCalculator />
    </div>
  );
}
