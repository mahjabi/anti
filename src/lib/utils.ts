import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { VisaSponsorshipType, ContractType } from "@/types/job";
import { VISA_SPONSORSHIP_OPTIONS, CONTRACT_TYPE_OPTIONS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(
  min: number,
  max: number,
  period: "YEARLY" | "HOURLY" = "YEARLY",
  currency = "USD"
): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  });

  if (period === "HOURLY") {
    return `${formatter.format(min)} - ${formatter.format(max)} / hr`;
  }

  // Format in $150k - $190k / yr format
  const formatK = (val: number) => {
    if (val >= 1000) {
      return `$${Math.round(val / 1000)}k`;
    }
    return formatter.format(val);
  };

  return `${formatK(min)} - ${formatK(max)} / yr`;
}

export function getVisaBadge(visaType: VisaSponsorshipType) {
  const found = VISA_SPONSORSHIP_OPTIONS.find((v) => v.id === visaType);
  return found ? found.badge : "Visa Supported";
}

export function getContractBadge(contractType: ContractType) {
  const found = CONTRACT_TYPE_OPTIONS.find((c) => c.id === contractType);
  return found || {
    id: contractType,
    label: contractType,
    short: contractType,
    badgeColor: "bg-gray-100 text-gray-800 border-gray-200",
  };
}

/**
 * Calculates comparative US IT take-home rates between W2, 1099, and C2C.
 * Factors in FICA (7.65% employer side for 1099/C2C), corporate pass-through, benefits overhead, and business write-offs.
 */
export function calculateITRateComparison(
  inputAmount: number,
  inputType: "W2_SALARY" | "HOURLY_W2" | "HOURLY_1099" | "HOURLY_C2C",
  stateCode = "CA"
) {
  const ANNUAL_HOURS = 2000; // Standard 40 hrs/week * 50 weeks

  let annualW2Salary = 0;
  if (inputType === "W2_SALARY") {
    annualW2Salary = inputAmount;
  } else if (inputType === "HOURLY_W2") {
    annualW2Salary = inputAmount * ANNUAL_HOURS;
  } else if (inputType === "HOURLY_1099") {
    // 1099 typically requires a ~15-20% discount for self-employment tax + self-paid healthcare
    annualW2Salary = (inputAmount * ANNUAL_HOURS) / 1.2;
  } else if (inputType === "HOURLY_C2C") {
    // C2C incorporates S-Corp distribution tax savings but requires corporate insurance and accounting
    annualW2Salary = (inputAmount * ANNUAL_HOURS) / 1.25;
  }

  const hourlyW2 = annualW2Salary / ANNUAL_HOURS;
  const equivalent1099Hourly = hourlyW2 * 1.22;
  const equivalentC2CHourly = hourlyW2 * 1.3;

  // Approximate state tax adjustments
  const stateTaxRateMap: Record<string, number> = {
    CA: 0.093,
    NY: 0.088,
    TX: 0.0,
    WA: 0.0,
    MA: 0.05,
    IL: 0.0495,
    CO: 0.044,
    NC: 0.0475,
    VA: 0.0575,
    FL: 0.0,
  };

  const stateTax = stateTaxRateMap[stateCode] ?? 0.05;
  const federalEffectiveTax = 0.22;
  const ficaTax = 0.0765;

  const totalTaxRateW2 = federalEffectiveTax + stateTax + ficaTax;
  const estimatedTakeHomeW2 = annualW2Salary * (1 - totalTaxRateW2);

  return {
    annualW2Salary: Math.round(annualW2Salary),
    hourlyW2: Math.round(hourlyW2),
    equivalent1099Hourly: Math.round(equivalent1099Hourly),
    equivalentC2CHourly: Math.round(equivalentC2CHourly),
    estimatedTakeHomeW2: Math.round(estimatedTakeHomeW2),
    estimatedTakeHomeMonthly: Math.round(estimatedTakeHomeW2 / 12),
    effectiveTaxRatePercentage: Math.round(totalTaxRateW2 * 100),
    benefitsEstimateValue: Math.round(annualW2Salary * 0.18), // Healthcare 401k match PTO
  };
}
