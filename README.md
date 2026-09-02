# 💻 TechJobs US — Premier IT & Tech Recruitment Platform (USA)

A dedicated, high-performance job board and talent platform tailored specifically for the **United States Information Technology & Software Engineering market**. Built with first-class support for **US Visa & Work Authorization** (H-1B, OPT/CPT, Green Card, US Citizen), **US Employment Types** (W2, C2C, 1099), **State Pay Transparency Laws**, **Security Clearance**, and **Tech Stack Matching**.

---

## 📑 Table of Contents

- [🇺🇸 US IT-Specific Features](#-us-it-specific-features)
  - [For IT Job Seekers & Engineers](#for-it-job-seekers--engineers)
  - [For US Tech Employers & Staffing Agencies](#for-us-tech-employers--staffing-agencies)
  - [Compliance & US Market Specializations](#compliance--us-market-specializations)
- [Tech Stack](#-tech-stack)
- [Architecture & System Design](#-architecture--system-design)
- [Project Directory Structure](#-project-directory-structure)
- [Database Schema (Prisma ORM with US IT Attributes)](#-database-schema)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Core API Endpoints](#-core-api-endpoints)
- [Roadmap for US Tech Market](#-roadmap-for-us-tech-market)
- [License](#-license)

---

## 🇺🇸 US IT-Specific Features

### For IT Job Seekers & Engineers
- **Work Authorization & Visa Filtering**:
  - Filter listings by sponsorship status: *H-1B Sponsor Friendly*, *H-1B Transfer Only*, *OPT/CPT STEM Eligible*, *TN / E-3 / O-1 Support*, or *US Citizen / Green Card Only*.
- **Tech Stack & Specialization Matcher**:
  - Filter by precise tech stacks (e.g., `React + Node.js + AWS`, `Go + Kubernetes + gRPC`, `Python + PyTorch + Snowflake`).
  - GitHub & LeetCode profile integrations to highlight technical proficiency.
- **US Tax & Contract Types**:
  - Filter by **Full-Time W2**, **W2 Hourly Contract**, **1099 Independent Contractor**, **Corp-to-Corp (C2C)**, and **Contract-to-Hire (C2H)**.
- **US Timezone & Remote Preferences**:
  - Filter by US Timezones (`EST`, `CST`, `MST`, `PST`) and major tech hubs (Silicon Valley, NYC, Austin, Seattle, Boston, Denver, Research Triangle, etc.).
- **Security Clearance Filtering**:
  - For GovTech & Defense IT roles (*Public Trust*, *Secret*, *Top Secret*, *TS/SCI with Polygraph*).
- **Interactive Kanban Application Tracker**:
  - Monitor recruitment pipelines: *Applied* ➔ *Recruiter Screen* ➔ *Technical Screen / Take-home* ➔ *Onsite / System Design* ➔ *Offer & Negotiation*.

### For US Tech Employers & Staffing Agencies
- **Direct Employer vs. Staffing / Prime Vendor Tagging**:
  - Clearly distinguish between direct hires (FTE) and third-party staffing/consultancy roles.
- **US State Pay Transparency Compliance**:
  - Automatic salary range validator enforcing compliant compensation bands for states like CA, NY, WA, CO, and NYC.
- **Compensation Breakdown Builder**:
  - Structure offers by **Base Salary ($/yr)**, **Equity / RSUs ($ or %)**, **Target Bonus (%)**, and **Sign-on Bonus ($)**, or **Hourly Rate ($/hr W2 or C2C)**.
- **Candidate Skill & Resume Parser**:
  - Automated extraction of tech stacks, years of experience with specific frameworks, and GitHub repositories.
- **Direct Recruiter Messaging**:
  - Real-time chat with engineers, scheduling automated calendar invitations for technical screens.

---

## 🛠 Tech Stack

| Layer | Technology | Details / Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | [Next.js 15+](https://nextjs.org/) (App Router, React 19, TypeScript) | Server Components for SEO-optimized US job search indexing |
| **Styling & UI Components** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Accessible, modern dark/light mode interface |
| **Backend & Server Logic** | Next.js Server Actions + Route Handlers | Type-safe RPC with Zod validation |
| **Database & ORM** | [PostgreSQL](https://www.postgresql.org/) + [Prisma ORM](https://www.prisma.io/) | Relational integrity for complex candidate-job matching |
| **Search & Filtering** | PostgreSQL Trigram Full-Text Search (or Meilisearch) | Sub-millisecond queries for skills, locations, and titles |
| **Authentication** | [Auth.js / NextAuth.js](https://authjs.dev/) | GitHub, LinkedIn, Google OAuth + Magic Links |
| **File Storage** | [Uploadthing](https://uploadthing.com/) / AWS S3 (US-East-1) | Secure resume PDF and company logo uploads |
| **Email & Alerts** | [Resend](https://resend.com/) + React Email | Instant job alert digests and application status updates |

---

## 🏗 Architecture & System Design

```mermaid
graph TD
    subgraph Client Layer
        Web[Next.js 15 Web App]
        MobileWeb[Responsive Mobile View]
    end

    subgraph Auth & Security
        NextAuth[Auth.js - GitHub / LinkedIn / Google]
        RBAC[Role-Based Middleware: SEEKER | RECRUITER | AGENCY]
    end

    subgraph Core Application Server
        ServerActions[Server Actions - Job Matcher & ATS Pipeline]
        SearchEngine[Full-Text Search & Tech Filter Engine]
        WageValidator[US Pay Transparency Validator]
    end

    subgraph Data & Storage Layer
        Postgres[(PostgreSQL: Users, Jobs, Visa, Contracts)]
        S3Bucket[(AWS S3 / Uploadthing - PDF Resumes)]
        EmailService[Resend API - US Job Alerts]
    end

    Web --> NextAuth
    Web --> ServerActions
    ServerActions --> RBAC
    ServerActions --> WageValidator
    ServerActions --> SearchEngine
    SearchEngine --> Postgres
    ServerActions --> Postgres
    ServerActions --> S3Bucket
    ServerActions --> EmailService
```

---

## 📁 Project Directory Structure

```text
techjobs-us/
├── public/                     # Static assets (logos, badges, icons)
├── prisma/
│   ├── schema.prisma           # Prisma schema with US IT attributes
│   └── seed.ts                 # Seed script with realistic US tech jobs
├── src/
│   ├── app/
│   │   ├── (auth)/             # Login, Signup (Seeker, Employer, Recruiter)
│   │   ├── (dashboard)/
│   │   │   ├── seeker/         # Applications, Saved Jobs, Visa Status, Profile
│   │   │   └── employer/       # Post IT Job, ATS Pipeline, Team Notes
│   │   ├── jobs/               # Public US IT Job Search & Filter directory
│   │   │   ├── [slug]/         # Individual Job Posting Details
│   │   │   └── page.tsx        # Search page with US state & visa filters
│   │   ├── companies/          # Tech company profiles & active listings
│   │   ├── api/                # Webhooks, export APIs, RSS feeds
│   │   └── layout.tsx          # Root layout with theme provider
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (Dialog, Select, Badge, etc.)
│   │   ├── jobs/               # Job card, Visa badge, Tech stack chips, Salary pill
│   │   ├── filters/            # US State, Timezone, Clearance, Visa, Contract filters
│   │   └── ats/                # Drag-and-Drop Kanban candidate review pipeline
│   ├── lib/
│   │   ├── db.ts               # Prisma client singleton
│   │   ├── auth.ts             # Auth.js configuration
│   │   ├── constants/          # US States, IT Domains, Tech Stacks, Visa types
│   │   └── validators/         # Zod schemas for jobs, profiles & salary ranges
│   ├── server/                 # Server actions for jobs, applications, and search
│   └── types/                  # Shared TypeScript interfaces
├── .env.example                # Sample environment variables
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗄 Database Schema

Here is the tailored Prisma schema supporting US IT recruitment:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  JOB_SEEKER
  EMPLOYER_DIRECT      // Direct Tech Company (e.g., Stripe, Google, Startups)
  STAFFING_AGENCY      // Third-party US IT Staffing / Recruiting firm
  ADMIN
}

enum VisaSponsorship {
  CITIZEN_OR_GC_ONLY   // US Citizens and Green Card holders only
  H1B_SPONSOR          // Will sponsor new H-1B or transfer
  H1B_TRANSFER_ONLY    // Only transfers existing active H-1B
  OPT_CPT_STEM         // F1 OPT / CPT STEM extension eligible
  TN_E3_O1_SUPPORT     // TN (Canada/Mexico), E-3 (Australia), O-1
  ANY_AUTHORIZED       // Any valid US work authorization
}

enum ContractType {
  FULL_TIME_W2
  PART_TIME_W2
  CONTRACT_W2
  C2C_CORP_TO_CORP
  CONTRACT_1099
  CONTRACT_TO_HIRE
}

enum WorkLocation {
  REMOTE_US_ONLY
  HYBRID
  ONSITE
}

enum USTimezone {
  US_EASTERN
  US_CENTRAL
  US_MOUNTAIN
  US_PACIFIC
  ANY_US_TIMEZONE
}

enum SecurityClearance {
  NONE
  PUBLIC_TRUST
  SECRET
  TOP_SECRET
  TS_SCI
  TS_SCI_POLYGRAPH
}

enum ApplicationStatus {
  SUBMITTED
  RECRUITER_SCREEN
  TECHNICAL_ASSESSMENT
  SYSTEM_DESIGN_ONSITE
  OFFER_EXTENDED
  OFFER_ACCEPTED
  REJECTED
}

model User {
  id            String         @id @default(cuid())
  name          String?
  email         String         @unique
  emailVerified DateTime?
  image         String?
  role          Role           @default(JOB_SEEKER)
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  profile       Profile?
  company       Company?       @relation(fields: [companyId], references: [id])
  companyId     String?
  applications  Application[]
  savedJobs     SavedJob[]
}

model Profile {
  id                String            @id @default(cuid())
  userId            String            @unique
  user              User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  headline          String?           // e.g., "Senior Backend Engineer (Go / AWS / K8s)"
  bio               String?
  resumeUrl         String?
  primarySkills     String[]          // e.g., ["TypeScript", "Next.js", "PostgreSQL", "AWS"]
  yearsExperience   Int               @default(0)
  visaSponsorship   VisaSponsorship   @default(ANY_AUTHORIZED)
  clearance         SecurityClearance @default(NONE)
  preferredContract ContractType[]
  preferredTimezone USTimezone[]
  githubUrl         String?
  linkedinUrl       String?
  portfolioUrl      String?
  city              String?
  state             String?           // e.g., "CA", "NY", "TX", "WA"
}

model Company {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  logo        String?
  website     String?
  description String?
  isAgency    Boolean  @default(false)
  headquarters String  // e.g., "San Francisco, CA"
  members     User[]
  jobs        Job[]
  createdAt   DateTime @default(now())
}

model Job {
  id               String            @id @default(cuid())
  title            String            // e.g., "Senior Cloud / DevOps Engineer"
  slug             String            @unique
  description      String            // Markdown formatted job description
  techStack        String[]          // e.g., ["Kubernetes", "Terraform", "AWS", "Go"]
  experienceLevel  String            // "Junior", "Mid", "Senior", "Staff", "Principal"
  contractType     ContractType      @default(FULL_TIME_W2)
  visaSponsorship  VisaSponsorship   @default(ANY_AUTHORIZED)
  securityClearance SecurityClearance @default(NONE)
  workLocation     WorkLocation      @default(REMOTE_US_ONLY)
  timezone         USTimezone        @default(ANY_US_TIMEZONE)
  city             String?           // e.g., "Austin"
  state            String?           // e.g., "TX"
  
  // US State Salary Transparency
  salaryMin        Int               // e.g., 140000 ($/yr) or 75 ($/hr)
  salaryMax        Int               // e.g., 185000 ($/yr) or 95 ($/hr)
  salaryPeriod     String            @default("YEARLY") // "YEARLY" or "HOURLY"
  equity           String?           // e.g., "0.05% - 0.15% RSUs"
  bonus            String?           // e.g., "15% Target Annual Bonus"

  companyId        String
  company          Company           @relation(fields: [companyId], references: [id], onDelete: Cascade)
  isActive         Boolean           @default(true)
  createdAt        DateTime          @default(now())
  updatedAt        DateTime          @updatedAt
  
  applications     Application[]
  savedBy          SavedJob[]
}

model Application {
  id          String            @id @default(cuid())
  jobId       String
  job         Job               @relation(fields: [jobId], references: [id], onDelete: Cascade)
  userId      String
  user        User              @relation(fields: [userId], references: [id], onDelete: Cascade)
  resumeUrl   String
  coverNote   String?
  status      ApplicationStatus @default(SUBMITTED)
  interviewerNotes String?
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt

  @@unique([jobId, userId])
}

model SavedJob {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  jobId     String
  job       Job      @relation(fields: [jobId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())

  @@unique([userId, jobId])
}
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v20.x or higher
- **Package Manager**: `npm`, `pnpm`, or `bun`
- **PostgreSQL**: Local database or cloud instance (e.g., Neon.tech, Supabase, AWS RDS)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/techjobs-us.git
   cd techjobs-us
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   ```bash
   cp .env.example .env
   ```

4. **Initialize Database Schema**:
   ```bash
   npx prisma db push
   ```

5. **Seed Demo US IT Jobs & Tech Companies**:
   ```bash
   npm run seed
   ```

### Environment Variables

Configure `.env` with your secrets and credentials:

```env
# PostgreSQL Database (US region recommended, e.g., us-east-1)
DATABASE_URL="postgresql://postgres:password@localhost:5432/techjobs_us?schema=public"

# Auth.js / NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-32-char-random-secret-key"

# OAuth Providers (Engineers prefer GitHub & LinkedIn)
GITHUB_ID="your-github-oauth-client-id"
GITHUB_SECRET="your-github-oauth-client-secret"
LINKEDIN_CLIENT_ID="your-linkedin-client-id"
LINKEDIN_CLIENT_SECRET="your-linkedin-client-secret"

# AWS S3 / Uploadthing (Resume PDFs & Profiles)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Email Alerts (Resend)
RESEND_API_KEY="re_your_api_key_here"
EMAIL_FROM="TechJobs US <alerts@techjobsus.com>"
```

### Running the App

```bash
# Start local development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

---

## 🔌 Core API Endpoints

| Method | Route | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/jobs` | Query & filter US IT jobs (visa, stack, state, rate, clearance) | No |
| `GET` | `/api/jobs/[slug]` | Retrieve full job listing & salary transparency breakdown | No |
| `POST` | `/api/jobs` | Post new IT job listing with wage compliance checks | Yes (Direct / Agency) |
| `POST` | `/api/jobs/[id]/apply` | Submit resume & tech profile for screening | Yes (Job Seeker) |
| `GET` | `/api/seeker/applications` | Candidate's application tracker & stage pipeline | Yes (Job Seeker) |
| `PATCH`| `/api/ats/applications/[id]` | Update candidate interview stage & recruiter notes | Yes (Direct / Agency) |
| `GET` | `/api/analytics/salaries` | US IT compensation benchmarks by tech stack & state | No |

---

## 🗺 Roadmap for US Tech Market

- [ ] **Automated US Salary Transparency Enforcement**: Real-time validation checking required wage disclosures for CA, NY, WA, and CO postings.
- [ ] **AI Technical Resume Screening**: Semantic scoring comparing candidate GitHub/resume tech stacks with job requirements.
- [ ] **1-Click C2C Vendor Onboarding**: Streamlined profile creation for IT consultancy staffing firms and subcontractors.
- [ ] **Blind Tech Screening Mode**: Option to hide personal identifying details during initial resume review to reduce hiring bias.
- [ ] **Automated US Tax / Rate Calculator**: Interactive tool showing take-home comparison between `$160k W2` vs. `$95/hr 1099` vs. `$110/hr C2C`.

---

## 📄 License

Distributed under the [MIT License](LICENSE).
