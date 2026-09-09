# 🎓 Personalized Job Matching — PhD Career Matcher & Reranker

An evidence-grounded career search and reranking platform tailored specifically for **Mahjabin Hossain** (Ph.D. Student in Computer Science at University of Missouri–Kansas City, Asset Lab).

The platform continuously evaluates, filters, and ranks doctoral research opportunities and future post-PhD career pipelines based on strict **F-1 OPT/CPT eligibility**, **Summer 2027 internship timelines**, **multi-source public career feeds (USAJOBS, CareerOneStop, Google, Microsoft, Meta, Anthropic)**, and a **7-factor weighted match scoring engine**.

---

## 📑 Key Features

### 1. 🔒 Profile Protection & CV Parser
- **Locked Candidate Profile**: Pre-loaded with verified academic and engineering credentials (UMKC Asset Lab, KUET, Bdjobs.com, IEEE publications, PyTorch/C++/LLM security expertise).
- **Accidental Edit Guard**: Profile fields are locked against accidental modifications.
- **Manual Override & CV Parser**: Supports manual edits upon unlocking or uploading a PDF/Word CV to parse and repopulate updated skills and publications without corrupting core data.

### 2. ⚙️ Constraint Enforcement
- **🔒 Hard Constraint 1 (Visa / Work Authorization)**: **F-1 OPT / CPT Eligible Only** (automatically filters out positions requiring US Citizenship or active security clearances).
- **🔒 Hard Constraint 2 (Role Standing)**: **PhD Research Internships & Visiting Fellowships** for Summer 2027.
- **📍 Soft Constraint (Preferred Hubs)**: Prioritizes roles located in **Texas (TX)**, **California (CA)**, and **Kansas / Missouri (KS/MO)**, along with Remote US opportunities.

### 3. 🌐 Multi-Source Data Feeds
- Integrates and monitors postings across:
  - **USAJOBS** (Federal visiting student trainee & open science fellowships)
  - **CareerOneStop** (U.S. Department of Labor career database)
  - **Google Careers / Google Research**
  - **Microsoft Research (MSR)**
  - **Meta FAIR (Fundamental AI Research)**
  - **Anthropic / OpenAI & Industry AI Safety Coalitions**

### 4. 🧮 7-Factor Weighted Match Scorer & Reranker
Every opportunity is scored using the mathematical formula:
$$\text{Score} = (\text{Skills} \times 35\%) + (\text{Research} \times 25\%) + (\text{Projects} \times 15\%) + (\text{Education} \times 10\%) + (\text{Career Interest} \times 10\%) + (\text{Location} \times 3\%) + (\text{Salary} \times 2\%)$$

- **Supporting Evidence**: Directly cites publications, lab projects, and engineering experience.
- **Missing Qualifications**: Identifies concrete gaps (e.g. tier-1 venue first-author papers).
- **Unknown Diagnostics**: Flags missing wage or citizenship data as `'UNKNOWN'` and provides actionable inquiry questions for recruiters.

### 5. 💵 Compensation & Pay Transparency
- **🟢 PAID INTERNSHIP**: Transparent hourly rate or annualized salary band (e.g., $118k - $157k USD or $58 - $78/hr).
- **🔵 UNPAID / FREE FELLOWSHIP**: Explicitly tagged with compute credits and mentorship benefits.
- **🟡 UNKNOWN**: Flagged with explicit diagnostics on what information is missing and how to obtain it.

### 6. 🚀 Post-PhD Full-Time Career Pipeline
- Dedicated tab featuring frequently updated full-time positions matching post-doctoral graduation (2029–2030):
  - *Google DeepMind — Research Scientist (AI Safety & Robustness)*
  - *Anthropic / OpenAI — Member of Technical Staff (Agent Security & Red Teaming)*
  - *AWS AI Security — Senior Applied Scientist (Generative AI Guardrails)*

---

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS, Lucide Icons
- **State Management & Storage**: LocalStorage persistent profile & ranking engine
- **Search & Scoring**: BM25 + Semantic 7-factor weighted hybrid reranker

---

## ⚡ Getting Started

### 1. Install dependencies:
```bash
npm install
```

### 2. Run the application:
```bash
npm run dev
```

### 3. Open in browser:
Open [http://localhost:3000](http://localhost:3002) 

---

## 📄 License

MIT License.
