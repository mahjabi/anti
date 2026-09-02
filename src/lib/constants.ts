import { VisaSponsorshipType, ContractType, SecurityClearanceType, USTimezoneType } from "@/types/job";

export const US_STATES = [
  { code: "ALL", name: "All 50 States (USA)" },
  { code: "CA", name: "California (Silicon Valley / LA)" },
  { code: "NY", name: "New York (NYC)" },
  { code: "TX", name: "Texas (Austin / Dallas)" },
  { code: "WA", name: "Washington (Seattle)" },
  { code: "MA", name: "Massachusetts (Boston)" },
  { code: "IL", name: "Illinois (Chicago)" },
  { code: "CO", name: "Colorado (Denver / Boulder)" },
  { code: "NC", name: "North Carolina (Raleigh / Triangle)" },
  { code: "VA", name: "Virginia (NoVA / GovTech)" },
  { code: "DC", name: "Washington D.C." },
  { code: "GA", name: "Georgia (Atlanta)" },
  { code: "FL", name: "Florida (Miami / Tampa)" },
  { code: "AZ", name: "Arizona (Phoenix)" },
  { code: "OH", name: "Ohio (Columbus / Cleveland)" },
  { code: "NJ", name: "New Jersey" },
  { code: "PA", name: "Pennsylvania (Philadelphia / Pittsburgh)" },
  { code: "MN", name: "Minnesota (Minneapolis)" },
  { code: "UT", name: "Utah (Salt Lake City)" },
  { code: "OR", name: "Oregon (Portland)" },
];

export const TECH_STACK_TAGS = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PyTorch / AI",
  "Go (Golang)",
  "Rust",
  "Java / Spring Boot",
  "C# / .NET Core",
  "AWS",
  "Kubernetes",
  "Docker",
  "Terraform",
  "PostgreSQL",
  "Snowflake",
  "Kafka",
  "GraphQL",
  "Swift / iOS",
  "Kotlin / Android",
  "Cybersecurity",
  "Databricks",
];

export const VISA_SPONSORSHIP_OPTIONS: { id: VisaSponsorshipType; label: string; badge: string; description: string }[] = [
  {
    id: "H1B_SPONSOR",
    label: "H-1B Visa Sponsorship Available",
    badge: "H-1B Sponsor",
    description: "Employer will sponsor new H-1B lottery cap or active transfers.",
  },
  {
    id: "H1B_TRANSFER_ONLY",
    label: "H-1B Transfer Only",
    badge: "H-1B Transfer",
    description: "Accepts existing H-1B holders with immediate transfer readiness.",
  },
  {
    id: "OPT_CPT_STEM",
    label: "F1 OPT / CPT STEM Extension",
    badge: "OPT/CPT STEM",
    description: "Welcomes graduates on F1 OPT with up to 36-month STEM extension.",
  },
  {
    id: "TN_E3_O1_SUPPORT",
    label: "TN (Canada/Mexico) / E-3 / O-1",
    badge: "TN / E-3 Support",
    description: "Supports NAFTA/USMCA TN, Australian E-3, or O-1 talent visas.",
  },
  {
    id: "CITIZEN_OR_GC_ONLY",
    label: "US Citizen / Green Card Only",
    badge: "USC / GC Only",
    description: "Requires unconditioned US citizenship or permanent residency.",
  },
  {
    id: "ANY_AUTHORIZED",
    label: "Any Valid US Work Auth",
    badge: "Any US Auth",
    description: "Open to any candidate authorized to work in the United States.",
  },
];

export const CONTRACT_TYPE_OPTIONS: { id: ContractType; label: string; short: string; badgeColor: string }[] = [
  {
    id: "FULL_TIME_W2",
    label: "Full-Time W2 (FTE)",
    short: "Full-Time W2",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "CONTRACT_W2",
    label: "W2 Hourly Contract",
    short: "W2 Contract",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "C2C_CORP_TO_CORP",
    label: "Corp-to-Corp (C2C)",
    short: "C2C / 1099 Vendor",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "CONTRACT_1099",
    label: "1099 Independent Contractor",
    short: "1099 Contractor",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "CONTRACT_TO_HIRE",
    label: "Contract-to-Hire (C2H)",
    short: "Contract-to-Hire",
    badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  {
    id: "PART_TIME_W2",
    label: "Part-Time W2",
    short: "Part-Time W2",
    badgeColor: "bg-slate-50 text-slate-700 border-slate-200",
  },
];

export const SECURITY_CLEARANCE_OPTIONS: { id: SecurityClearanceType; label: string }[] = [
  { id: "NONE", label: "No Clearance Required (Commercial Tech)" },
  { id: "PUBLIC_TRUST", label: "Public Trust Clearance" },
  { id: "SECRET", label: "Secret Clearance" },
  { id: "TOP_SECRET", label: "Top Secret (TS)" },
  { id: "TS_SCI", label: "TS/SCI (GovTech / Defense)" },
  { id: "TS_SCI_POLYGRAPH", label: "TS/SCI with CI or Full Poly" },
];

export const TIMEZONE_OPTIONS: { id: USTimezoneType; label: string }[] = [
  { id: "ANY_US_TIMEZONE", label: "Any US Timezone" },
  { id: "US_EASTERN", label: "US Eastern (ET)" },
  { id: "US_CENTRAL", label: "US Central (CT)" },
  { id: "US_MOUNTAIN", label: "US Mountain (MT)" },
  { id: "US_PACIFIC", label: "US Pacific (PT)" },
];

export const EXPERIENCE_LEVELS = [
  "Entry-Level",
  "Junior",
  "Mid-Level",
  "Senior",
  "Staff",
  "Principal / Lead",
  "Director / VP",
];
