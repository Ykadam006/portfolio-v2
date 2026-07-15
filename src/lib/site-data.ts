export const site = {
    name: "Yogesh Kadam",
    role: "Frontend Engineer / Full-Stack Developer",
    location: "Chicago, IL",
    email: "y.kadam2026@outlook.com",
    phone: "+1 (312) 978-9696",
    links: {
        linkedin: "https://www.linkedin.com/in/yogi006/",
        github: "https://github.com/Ykadam006",
        resume: "/resume.pdf",
    },
    headline:
        "UI-focused full-stack developer crafting fast, polished, production-ready web experiences.",
    summary:
        "Illinois Tech, GPA 4.0, graduating May 2026. Three internships, six shipped products. I close the gap between design and production.",
    /** Sourced metric cards: number, label, source attribution */
    metricCards: [
        { value: 35, prefix: "", suffix: "%", label: "less repeated UI work", source: "Looks For Lease · typed REST + Zod across 6 admin modules" },
        { value: 30, prefix: "~", suffix: "%", label: "lower API latency", source: "ISCP · PostgreSQL indexes + query tuning" },
        { value: 0, prefix: "", suffix: "", label: "outages · AWS demo period", source: "ISCP · EC2 + RDS + S3 + CloudFront" },
        { value: 4.0, prefix: "", suffix: " / 4.0", label: "GPA", source: "Illinois Tech · M.A.S. ITM · May 2026" },
    ],
    replyNote: "I reply within 24 hours.",
    openToRoles: "Open to Frontend, Full-stack, and Web Developer roles.",
    /** 4-step process flow */
    processSteps: [
        { step: "01", title: "Research", desc: "Understand the user, the problem, and the constraints. I dig into context, map user flows, and ask the hard questions before touching Figma or code." },
        { step: "02", title: "Design", desc: "Wireframes, component hierarchy, and visual decisions in Figma. I prototype interactions, validate with real content, and stress-test edge cases before building." },
        { step: "03", title: "Build", desc: "Reusable TypeScript components with consistent states, typed APIs, accessibility baked in. Clean architecture that scales without rewrites." },
        { step: "04", title: "Measure", desc: "Lighthouse audits, user feedback, Playwright E2E, production metrics. I ship, then validate — and iterate based on what the data shows." },
    ],
    nowBuilding: {
        title: "Next.js + TypeScript UI systems",
        items: [
            "Next.js + TypeScript UI systems",
            "Case-study driven portfolio",
            "Performance + accessibility polish",
        ],
        chips: ["Minimal UI", "Performance", "Accessibility"],
        bonus: "Nature photography — I care about composition, spacing, and details.",
    },
    designPhilosophy: [
        {
            title: "Users first, pixels second",
            desc: "Every interface decision starts with the person using it. I research context, map real workflows, and design for clarity — not just aesthetics.",
            icon: "users",
        },
        {
            title: "Motion with purpose",
            desc: "Animation should guide attention, confirm actions, and smooth transitions — never distract. If it doesn't serve the user, it doesn't ship.",
            icon: "motion",
        },
        {
            title: "Accessibility is non-negotiable",
            desc: "ARIA labels, keyboard navigation, color contrast, reduced motion support. Inclusive design isn't a feature — it's the baseline.",
            icon: "accessibility",
        },
        {
            title: "Bridge design and code",
            desc: "I don't throw designs over the wall. I build what I design and design what I build — closing the gap between Figma and production.",
            icon: "bridge",
        },
    ],
    leadershipPreview:
        "Outstanding Student Award (ITM, 2025–26) · Elevate Cohort Manager · Project Talon GTM · PME Marketing Chair · PMI volunteer · ISA Photography.",
    /**
     * Testimonials from managers / collaborators.
     * Leave empty until LinkedIn recommendations come in.
     * Shape: { quote, name, title, company, companyDomain? }
     */
    testimonials: [] as {
        quote: string;
        name: string;
        title: string;
        company: string;
        companyDomain?: string;
    }[],
    /** Brand asset paths — files live in public/ */
    assets: {
        heroCartoon: "",       // "/hero-cartoon.png" — main hero illustration (half/3/4 body, needs real likeness)
        avatar: "/avatar.png", // 512×512 YK monogram avatar — swap for photo/cartoon when available
        stickerBuilding: "",   // "/sticker-building.png" — Now building card corner
        stickerContact: "/sticker-friendly.svg",
        sticker404: "/sticker-404.svg",
    },
} as const;

export type ProjectCategory = "Full-stack" | "Frontend" | "Research";

const projectsData = [
    {
        slug: "iscp",
        bentoLabel: "Full-Stack · AWS",
        title: "Industry–Student Collaboration Platform",
        subtitle: "Full-stack AWS platform connecting students and employers with workflow tracking, role-based access, and optimized PostgreSQL APIs.",
        date: "Dec 2025",
        category: "Full-stack" as ProjectCategory,
        stack: ["React", "Spring Boot", "PostgreSQL", "AWS Cognito", "EC2", "RDS", "CloudFront"],
        metrics: ["~30% faster APIs in testing", "~40% smaller payloads", "5+ PostgreSQL indexes", "AWS Cognito RBAC"],
        bullets: [
            "Built Spring Boot REST APIs in Java and React UI from Figma, enabling end-to-end student–employer workflows.",
            "Secured access via AWS Cognito role-based authentication and implemented server-side pagination, cutting payload size by ~40%.",
            "Tuned PostgreSQL with 5+ indexes and query refinement, reducing endpoint response times by ~30% during testing.",
            "Deployed on AWS EC2, RDS, S3, and CloudFront, validating end-to-end full-stack workflows before public demos.",
        ],
        problem:
            "Students and employers had no shared workflow platform — collaboration was manual, unreliable, and collapsed under realistic load. The platform needed to handle concurrent multi-user sessions with structured flows and visible status at every step.",
        whyItMatters:
            "Multi-role workflow platforms are the exact shape of real B2B software — this is the closest project to day-one industry work.",
        archFlow: [
            { label: "React", body: "Context API + TypeScript" },
            { label: "Spring Boot", body: "REST API (Java)" },
            { label: "PostgreSQL", body: "AWS RDS" },
            { label: "AWS", body: "EC2 · S3 · CloudFront · Cognito" },
        ],
        solution:
            "Translated Figma flows into React screens wired to Spring Boot APIs. Standardized reusable components, added role-based access with AWS Cognito, optimized PostgreSQL queries, and deployed to AWS for reliable multi-user performance.",
        architecture: {
            frontend: "React + Context API + TypeScript",
            backend: "Spring Boot REST API → PostgreSQL (RDS)",
            infra: "AWS: EC2 + RDS + S3 + CloudFront + Cognito",
        },
        keyFeatures: [
            "Student & employer role-based workflows via AWS Cognito",
            "Server-side pagination + filtering on all list views",
            "PostgreSQL index tuning — ~30% latency improvement",
            "Figma-to-React component pipeline with Context API state",
            "Full AWS infra: EC2, RDS, S3, CloudFront",
        ],
        challenges:
            "Balancing API responsiveness under concurrent load while keeping the UI snappy. Solved with PostgreSQL index additions, query rewrites, and pagination — validated with repeated endpoint timing tests in DevTools.",
        designNote:
            "Focused on consistent spacing (8px grid), clear hierarchy for workflow states, and enough whitespace so dense multi-user data felt scannable, not overwhelming.",
        impact: [
            "Tuned PostgreSQL with indexes and query refinement — repeat request timing improved across realistic testing cycles.",
            "Zero outages on AWS (EC2 + RDS + S3 + CloudFront) across the full demo period.",
            "Server-side pagination + filtering reduced payload transfers ~40%, improving UI rendering for large datasets.",
            "Role-based access secured with AWS Cognito — students and employers on fully separate, secure flows.",
            "One shared component library across both student and employer flows — 5+ list views built on the same table and pagination primitives.",
        ],
        techStack: [
            "React", "Context API", "TypeScript", "JavaScript (ES6+)",
            "Spring Boot", "REST APIs", "PostgreSQL", "SQL",
            "AWS Cognito", "AWS EC2", "AWS RDS", "AWS S3", "AWS CloudFront",
            "Figma", "Git / GitHub", "Postman", "Chrome DevTools",
        ],
        featured: true,
        improveNext:
            "Add deeper observability (metrics/tracing), caching/optimistic UI for perceived speed, and expand automated regression tests with Playwright.",
        links: {
            live: "",
            github: "",
            caseStudy: "/projects/iscp",
        },
    },
    {
        slug: "applyvibe",
        bentoLabel: "Full-Stack · SaaS",
        title: "ApplyVibe — Job Application Tracker",
        subtitle: "Free-first full-stack SaaS for job seekers — Kanban pipeline, analytics dashboard, smart insights, and Auth.js auth. Built with Next.js 16, Prisma, and Neon PostgreSQL.",
        date: "Feb 2026",
        category: "Full-stack" as ProjectCategory,
        stack: ["Next.js 16", "Auth.js v5", "Prisma", "Neon PostgreSQL", "Tailwind CSS", "Recharts", "dnd-kit"],
        metrics: ["8-page SaaS on Vercel", "6 REST API routes + Zod", "5-model Prisma schema", "11-stage Kanban + Recharts"],
        bullets: [
            "Built full-stack SaaS with Auth.js authentication, Kanban tracking, analytics dashboards, and CRUD workflows deployed on Vercel production.",
            "Engineered 6 REST API routes with Zod validation on a 5-model Prisma schema over Neon PostgreSQL — eliminating invalid payloads and resolving 4 critical bugs.",
            "Designed an 11-stage dnd-kit Kanban board with optimistic API sync on drag and Recharts analytics for daily job-search planning.",
            "Deployed on Vercel with strict TypeScript — 8 app pages, pipeline funnel, source performance, and smart insights from real application data.",
        ],
        problem:
            "Job seekers applying to hundreds of roles had no clean, free tool to track applications, visualize their pipeline, or understand what was and wasn't working. Existing tools were paid, overly complex, or just spreadsheets.",
        whyItMatters:
            "Job seekers lose offers to lost follow-ups — pipeline visibility is the product, not a feature.",
        archFlow: [
            { label: "Next.js 16", body: "App Router + RSC" },
            { label: "Auth + API", body: "Auth.js v5 + route handlers" },
            { label: "Prisma", body: "typed ORM · 5 models" },
            { label: "Neon", body: "serverless PostgreSQL" },
            { label: "Vercel", body: "CI + production deploys" },
        ],
        solution:
            "Built a purpose-built Next.js 16 full-stack app with server components, credentials auth, Prisma ORM, Neon PostgreSQL, and a full analytics + Kanban layer — all on the free tier, self-hostable, open-source.",
        architecture: {
            frontend: "Next.js 16 App Router — server components for dashboard, client hooks for Kanban/Analytics",
            backend: "Next.js API routes — 6 routes (register, applications CRUD, profile) with Zod validation",
            infra: "Neon PostgreSQL (serverless) + Prisma ORM + Vercel deploy + Auth.js JWT sessions",
        },
        keyFeatures: [
            "Auth.js v5 credentials auth with bcrypt + JWT + proxy.ts route protection",
            "Full application CRUD: company, role, source, stage, salary, visa, deadlines, recruiter info",
            "11-stage dnd-kit Kanban board with live API sync on drag",
            "Analytics: funnel chart, weekly trend, source performance, KPI cards",
            "Smart Insights engine — rule-based analysis surfacing actionable patterns",
            "Settings: profile form, theme switcher (light/dark/system) via next-themes",
        ],
        challenges:
            "Next.js 16 renamed middleware.ts to proxy.ts (breaking route protection), Turbopack crashing in dev (switched to --webpack), Prisma generate failing on Vercel due to env var timing (fixed with a DB_URL fallback in prisma.config.ts), and a dnd-kit duplicate ID bug in DragOverlay (split card into KanbanCard + KanbanCardOverlay).",
        designNote:
            "Forest green palette (#245501 → #aad576) to feel calm and growth-oriented — opposite of the anxiety that job hunting usually triggers. snake_case throughout frontend types with explicit dbToApp() mapping from Prisma's camelCase.",
        impact: [
            "0 TypeScript errors across the full codebase — strict mode throughout.",
            "Auth secured with bcrypt 12 rounds + JWT sessions + middleware route protection on all app pages.",
            "4 critical + 4 high + 6 medium bugs fixed during development — all documented with root cause and decision.",
            "~12s clean build on Vercel — server components keep dashboard data fresh at request time, no client loading flash.",
            "Analytics funnel correctly handles all 11 stages including terminal states (rejected/ghosted/withdrawn).",
        ],
        techStack: [
            "Next.js 16 (App Router)", "React", "TypeScript", "Tailwind CSS",
            "Auth.js v5", "bcrypt", "JWT",
            "Prisma ORM", "Neon PostgreSQL",
            "Recharts", "dnd-kit", "Radix UI", "Shadcn/UI",
            "Zod", "next-themes", "Vercel",
            "Git / GitHub",
        ],
        featured: true,
        improveNext:
            "Stage history via ApplicationEvent on every Kanban drag, rate limiting on /api/register (Upstash Redis), Reflections + Reminders (schema already exists), React Query cache layer, OAuth (GitHub/Google — PrismaAdapter already wired), CSV export, Prisma enums for currentStage/source fields.",
        links: {
            live: "https://inbox2-offer.vercel.app/",
            github: "",
            caseStudy: "/projects/applyvibe",
        },
    },
    {
        slug: "bridgecare",
        bentoLabel: "Full-Stack · Health",
        title: "BridgeCare",
        subtitle:
            "A calm, Gen Z-first AI health navigation app that helps young adults understand urgency, care options, cost direction, and next steps — without a diagnosis spiral.",
        date: "Apr 2026",
        category: "Full-stack" as ProjectCategory,
        stack: ["Next.js", "TypeScript", "FastAPI", "Supabase", "Tailwind CSS", "Leaflet", "Ollama"],
        metrics: [
            "Rules-first triage — 4 tiers",
            "7 languages incl. RTL",
            "4-tier AI fallback chain",
            "~$0/mo demo stack",
        ],
        bullets: [
            "Built a full-stack health navigation product for students: plain-language intake, structured care routes, and cost/coverage guidance — not symptom-diagnosis lists.",
            "Implemented a deterministic triage engine with critical/high/medium red-flag rules; LLMs only explain outcomes and ask follow-ups.",
            "Shipped ranked care options (telehealth, urgent care, PCP, pharmacy) with insurance-aware re-ranking and OSM-based provider discovery.",
            "Added multilingual check-in (7 langs), accessibility options (reduced motion, large text), and safety pages disclaiming non-clinical use.",
            "Persisted cases, reminders, and knowledge snippets in Supabase with RLS; pgvector ready for RAG-style coverage content.",
            "Monorepo: Next.js 16 web app, FastAPI API, shared @bridgecare/ui package; deploy target Vercel + hosted API.",
        ],
        problem:
            "Surveys consistently find young adults delay care because they don't know if it's \"bad enough.\" Googling symptoms causes anxiety, not action. Healthcare navigation is fragmented, jargon-heavy, and hard to afford.",
        whyItMatters:
            "The gap between \"Google it\" and \"go to the ER\" is where people get hurt — calm triage is a real accessibility problem.",
        archFlow: [
            { label: "Next.js web", body: "check-in · results · Leaflet maps" },
            { label: "FastAPI", body: "triage · providers · coverage" },
            { label: "Rules + LLM", body: "rules decide · AI explains" },
            { label: "Supabase", body: "Postgres · RLS · pgvector" },
        ],
        solution:
            "BridgeCare is the health front door for Gen Z: users describe symptoms in plain language, get a rules-based urgency level, see ranked care options with cost ranges, understand insurance in plain English, find nearby care via OpenStreetMap, and get follow-up reminders — all in one calm flow.",
        architecture: {
            frontend: "Next.js App Router (apps/web), Tailwind, Motion, Leaflet maps, Supabase Auth (email/Google), Recharts admin dashboard",
            backend: "FastAPI (apps/api) — triage, providers, coverage, follow-up routes; Pydantic schemas; provider-agnostic LLM service",
            infra: "Supabase (Postgres + Auth + RLS + pgvector), Vercel (web), API on Render/Railway; OSM/Nominatim/Overpass (no map API key)",
        },
        keyFeatures: [
            "Guided or quick check-in (age, ZIP, insurance, language, accessibility)",
            "Chat-style intake with LLM follow-ups; triage triggered from consolidated symptom text",
            "Results page: urgency card, score, explanation, warning signs, visit prep",
            "Care options page with ranked fits, cost ranges, map (Leaflet + OSM)",
            "Coverage explainer (parent plan, student plan, marketplace, uninsured)",
            "Dashboard (history/charts), follow-up reminders, admin analytics",
            "Marketing: safety, privacy, terms, about; WCAG-minded UX (reduced motion, calm palette)",
        ],
        challenges:
            "Safety vs. AI hype — separated \"rules decide urgency, AI explains\" so the model cannot downgrade emergencies; critical keywords surface 911/ER paths immediately. Cost without real-time eligibility — built deterministic coverage templates + LLM polish instead of pretending live payer APIs. Free maps at scale — Nominatim/Overpass + client-side Leaflet instead of paid Maps APIs for hackathon/demo budgets.",
        designNote:
            "Teal/mint health palette (#036666, #78c6a3), soft gradients, Motion reveals, one primary CTA per screen, hero triage preview on landing — designed to feel calm, not clinical. Arabic RTL supported in check flow.",
        impact: [
            "Clear alternative positioning vs. WebMD-style diagnosis lists → actionable care routes",
            "Sub-60s path from \"something feels off\" to urgency + next step (stated product goal)",
            "Demo runs on ~$0/mo stack (free map APIs, free-tier LLM fallbacks, local Ollama option)",
            "Built for student health plans / campus clinics as a plausible B2B wedge",
        ],
        techStack: [
            "Next.js 16", "React 18", "TypeScript", "Tailwind CSS", "Motion", "Leaflet", "Lucide", "Zustand", "Recharts",
            "FastAPI", "Python", "Pydantic", "httpx", "Supabase Python client", "sentence-transformers",
            "Supabase Postgres", "pgvector", "RLS",
            "Ollama", "OpenRouter", "Groq", "Google AI Studio",
            "OpenStreetMap", "Nominatim", "Overpass",
            "Vercel", "Git / GitHub",
        ],
        featured: true,
        improveNext:
            "Production HIPAA/BAA path and audited logging; real payer/eligibility APIs; deeper RAG on knowledge_snippets; consolidate legacy frontend/ + backend/ vs. apps/* monorepo.",
        links: {
            live: "",
            github: "https://github.com/Ykadam006/BridgeCare",
            caseStudy: "/projects/bridgecare",
        },
    },
    {
        slug: "skillforge",
        bentoLabel: "Full-Stack · Learning OS",
        title: "SkillForge (Yogesh OS)",
        subtitle:
            "Personal learning command center — structured skill paths, practice logging, build tracking, and analytics in one Next.js app, without LMS bloat.",
        date: "Apr 2026",
        category: "Full-stack" as ProjectCategory,
        stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Zustand", "Prisma", "Recharts"],
        metrics: ["9 app routes", "27 skills · 10 categories", "13 tests (Vitest + Playwright)", "Zustand persist + optional Neon sync"],
        bullets: [
            "Built a full learning OS: browse 27 skills with beginner→advanced paths, curated resources, and per-skill checklists with confidence + notes.",
            "Dashboard combines weekly goals, activity heatmap, goal-vs-actual minutes, auto-ranked today's focus, and Recharts insights (category completion, 14-day rhythm).",
            "Practice module logs DSA / SQL / system design / testing reps with difficulty, streaks, and optional skill-linked session minutes.",
            "Projects area tracks build work (idea → building → done) and links showcase repos (ApplyVibe, DailyHabitz, etc.) from each skill's Ship your proof panel.",
            "Certifications tracks exam readiness with checklist-driven progress %; Analytics adds radar chart vs job-description targets per axis.",
            "Quality bar: verify script (lint + Vitest + build); Playwright smoke covers landing → dashboard and skill detail flows.",
        ],
        problem:
            "Scattered learning (Notion, spreadsheets, NeetCode, cert courses, side projects) made it hard to see gaps, rhythm, and proof-of-work in one place. Generic LMS tools are heavy; a resume-driven guide needed to be trackable and actionable daily.",
        whyItMatters:
            "Learning without a system decays — making progress visible is what keeps it compounding.",
        archFlow: [
            { label: "Next.js 16", body: "App Router + React 19" },
            { label: "Zustand", body: "localStorage skillforge:v1" },
            { label: "Prisma snapshot", body: "optional /api/progress sync" },
            { label: "Neon", body: "serverless PostgreSQL" },
        ],
        solution:
            "SkillForge (Yogesh OS) is a single Next.js app: static master guide in JSON (skills.json → 10 categories, resources, levels) plus client state (Zustand + localStorage) for progress, sessions, practice, projects, and certs. Optional Prisma/Neon stores a JSON snapshot for future multi-device sync.",
        architecture: {
            frontend: "Next.js 16 App Router, React 19, Tailwind 4, shadcn/ui, Recharts (dynamic import, no SSR), collapsible sidebar + mobile nav",
            backend: "Route handlers stubbed (/api/progress, /api/db/health); Prisma SkillforgeState single-row JSON payload on Neon when DATABASE_URL is set",
            infra: "Vercel-ready; primary persistence today is browser localStorage (skillforge:v1); migrations via Prisma CLI",
        },
        keyFeatures: [
            "Skills library with status badges (have / need / cert), priority, hot flags, and /skills/[slug] learning paths",
            "Per-skill: 5-step default checklist, custom tasks, checklist + session sparklines, in-path study minute logger",
            "/now page from static snapshot (weekly focus, building tasks, learning queue, job-search pulse)",
            "Practice log with types (DSA, SQL, SYSTEM_DESIGN, TESTING), solved toggle, streak from study + practice days",
            "Analytics: completion %, resume-shape counts, radar vs editable JD targets, category bars",
            "Onboarding strip + accessible skip link; theme toggle; sidebar library progress %",
        ],
        challenges:
            "Hydration + charts: Recharts and Zustand persist require dynamic(..., { ssr: false }) and stable empty-array selectors to avoid useSyncExternalStore warnings. Two project models: showcase entries in projects.json vs Zustand tracker projects on /projects — unified in the skill panel via combinedProjects. Scale of static content: ~2.4k-line skills JSON transformed at build time via skills-stack-to-guide.",
        designNote:
            "Calm command center UI: rounded cards, primary-tinted active nav, hero typography tokens (sf-hero-title), muted helper text, heatmap + sparklines instead of gamified XP. Skill detail uses ring progress, dashed Ship your proof CTA, and clear hierarchy (path → checklist → artifacts). Dark mode via theme toggle.",
        impact: [
            "One place to run a new-grad SWE study plan (languages → cloud → DSA → certs) instead of 4+ tools",
            "Measurable weekly rhythm (minute target vs logged study + practice)",
            "Skills explicitly tied to shipped work (ApplyVibe, DailyHabitz, AWS collab, Ghumakkad) for interview storytelling",
            "Tested critical paths so refactors to the guide JSON don't break navigation or dashboard insights",
        ],
        techStack: [
            "Next.js 16 (App Router)", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "Zustand", "Recharts",
            "Prisma", "Neon PostgreSQL", "Vitest", "Playwright", "Git / GitHub",
        ],
        improveNext:
            "Wire /api/progress to read/write Prisma snapshot (true multi-device sync); lightweight auth; import job descriptions to auto-suggest radar targets and gap skills.",
        links: {
            live: "",
            github: "https://github.com/Ykadam006/skillforge",
            caseStudy: "/projects/skillforge",
        },
    },
    {
        slug: "safeshelf",
        bentoLabel: "Full-Stack · Microservices",
        title: "SafeShelf",
        subtitle:
            "A pantry tracker that cross-references your food inventory against live FDA recall data, built as a microservice system with a dedicated recall-adapter service.",
        date: "May 2025",
        category: "Full-stack" as ProjectCategory,
        stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Docker", "openFDA"],
        metrics: [
            "2-service microservice architecture",
            "50 FDA recalls fetched + risk-triaged per check",
            "14-day expiry window across pantry",
            "OpenAPI 3.0 + Swagger UI",
        ],
        bullets: [
            "Architected a split-service system: Express + Prisma API service orchestrates a second recall-adapter microservice that queries openFDA, normalizing YYYYMMDD dates and snake_case fields into clean camelCase DTOs.",
            "Built an atomic recall-check pipeline using Prisma transactions — audit record, recall upserts, and alert creation all succeed or roll back together.",
            "Implemented FDA classification risk triage (Class I → HIGH, II → MEDIUM, III → LOW) with regex ordering to avoid Class I/III substring collisions.",
            "Engineered search-phrase deduplication to prevent double-brand queries that yield zero openFDA matches.",
            "Deployed three independent Vercel projects (SPA + two serverless Express backends) backed by Neon PostgreSQL with GitHub Actions CI against ephemeral Postgres.",
            "Shipped Swagger UI on a Helmet-hardened Express app by surgically removing CSP headers only on the /api/docs route.",
        ],
        problem:
            "FDA food recalls are public but scattered across enforcement reports that consumers never see. There was no lightweight tool to map a personal pantry inventory against live recall signals and surface tiered risk alerts.",
        whyItMatters:
            "FDA recalls happen weekly, but nobody checks their pantry against them — automation closes a genuine safety gap.",
        archFlow: [
            { label: "React SPA", body: "Vite 6 + Tailwind" },
            { label: "api-service", body: "Express + Prisma + Neon" },
            { label: "recall-service", body: "openFDA adapter only" },
            { label: "openFDA", body: "risk triage → alerts" },
        ],
        solution:
            "SafeShelf pairs a pantry CRUD service with a dedicated FDA adapter microservice. Users track items by SKU (name, brand, expiry, barcode), run per-item or bulk recall checks, and receive risk-tiered alerts (HIGH/MEDIUM/LOW) with a full audit trail of every check — whether it succeeded or the upstream API failed.",
        architecture: {
            frontend: "React 18 / Vite 6 SPA (Tailwind, React Router 7, Axios)",
            backend: "Two Express + TypeScript services — api-service (Prisma + Postgres CRUD, orchestration) and recall-service (openFDA adapter only)",
            infra: "Vercel (3 projects, serverless Express), Neon PostgreSQL, Docker Compose for local dev, GitHub Actions CI",
        },
        keyFeatures: [
            "Per-item and bulk check all recall scans with openFDA phrase search",
            "Risk-tiered alert lifecycle: NEW → REVIEWED → DISMISSED → RESOLVED",
            "Dashboard aggregating expiring-soon count, category breakdown, recent checks, and latest alerts",
            "Interactive OpenAPI 3.0 docs (Swagger UI) shipped with the API",
            "Prisma seed with realistic demo data including a Jif Peanut Butter item for live recall demonstration",
            "Scope-user context in the SPA for multi-user demo without auth overhead",
        ],
        challenges:
            "openFDA returns HTTP 404 for zero results and 429 for rate limits — handled each status explicitly with sanitized Lucene query construction and user-facing messages rather than generic 5xx bubbles. Deploying two Express apps as Vercel serverless functions requires disabling Vercel's body parser so express.json() takes over, and wiring vercel.json rewrites — details that aren't documented well for Express specifically.",
        designNote:
            "Emerald/slate palette with Tailwind utility classes and custom design tokens (ss-card, ss-btn-*). Fixed sidebar + responsive navbar with a scope-user selector standing in for real auth. RiskBadge component makes HIGH/MEDIUM/LOW immediately scannable in dense alert tables.",
        impact: [
            "End-to-end system operational: live demo, Swagger docs, and Postman collection all publicly accessible",
            "Atomic transaction design means zero partial-write states even when openFDA times out (audit record still written with externalApiStatus: FAILED)",
            "CI pipeline catches regressions against real Postgres before every merge",
            "OpenAPI contract enables future mobile/third-party clients without reverse-engineering the API",
        ],
        techStack: [
            "React 18", "Vite 6", "TypeScript", "Tailwind CSS", "React Router 7", "Axios",
            "Node.js", "Express", "Prisma", "PostgreSQL", "Zod", "Neon",
            "Docker", "Docker Compose", "Vercel", "GitHub Actions", "openFDA API", "Swagger / OpenAPI 3.0", "Helmet",
        ],
        improveNext:
            "Replace scope-user picker with OAuth2 / JWT; parallelize bulk recall checks with Promise.allSettled + back-pressure; fuzzy brand/SKU matching; prisma migrate dev workflow; email/push notifications on HIGH-risk recalls.",
        links: {
            live: "https://safe-shelf.vercel.app",
            github: "https://github.com/Ykadam006/safeshelf",
            caseStudy: "/projects/safeshelf",
        },
    },
    {
        slug: "dailyhabitz",
        featured: true,
        bentoLabel: "Full-Stack · Next.js",
        title: "DailyHabitz — Habit Tracker",
        subtitle: "Full-stack habit tracker with 4 accessible Next.js screens, 11 Express routes, CI/CD automation, and 50+ reusable frontend modules.",
        date: "May 2025",
        category: "Full-stack" as ProjectCategory,
        stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB Atlas"],
        metrics: ["11 Express routes + JWT", "3 core dashboard modules", "100% green main-branch CI", "50+ reusable frontend modules"],
        bullets: [
            "Built a TypeScript Next.js dashboard with Tailwind CSS, delivering habit tracking and streaks across 3 core modules.",
            "Developed 11 Node/Express REST endpoints with JWT auth and MongoDB Atlas validation, securing credential-based access.",
            "Configured GitHub Actions CI/CD with lint, type, and build checks, ensuring release stability on main.",
            "Edge-case validation and retry handling on every write path — main branch has stayed green since CI landed.",
        ],
        problem:
            "Habit tracking fails when flows are complicated or progress feels invisible. Users need dead-simple CRUD with meaningful visual feedback on streaks and completions.",
        whyItMatters:
            "Habit apps live or die on trust — one lost check-in and users quit.",
        archFlow: [
            { label: "Next.js", body: "App Router UI" },
            { label: "Express API", body: "11 REST routes + JWT" },
            { label: "MongoDB Atlas", body: "Mongoose models" },
            { label: "CI / CD", body: "GitHub Actions → Render" },
        ],
        solution:
            "Built structured full-stack CRUD (Next.js + Express + MongoDB) with visual analytics (streaks, completion charts) and consistent, reusable UI components across all screens.",
        architecture: {
            frontend: "Next.js 15 App Router + TypeScript + Tailwind CSS",
            backend: "Node.js + Express.js (11 routes) + MongoDB Atlas",
            infra: "Render (backend) + GitHub Actions CI",
        },
        keyFeatures: [
            "4 responsive, ARIA-compliant screens (landing, login, signup, dashboard)",
            "11 Express routes: auth, CRUD habits, completion, refresh, logout",
            "3 Next.js API proxy routes for stable request handling",
            "50+ frontend modules + 20 backend modules with clear structure",
            "GitHub Actions CI: lint, type checks, build on every PR",
        ],
        challenges:
            "Keeping chart performance smooth with growing data. Used date-range filters to limit rendered data points. Also stabilized API calls during Render cold starts using Next.js proxy routes.",
        designNote:
            "Emphasized progress over punishment — charts use soft gradients and clear completion states to feel motivating rather than stressful.",
        impact: [
            "Shipped four responsive, ARIA-compliant screens translating Figma directly to production.",
            "11 Express routes delivering full auth + habit CRUD in a clean, structured API layer.",
            "50+ frontend + 20 backend modules organized for easy onboarding and future extension.",
            "GitHub Actions CI catches lint, type, and build failures before they hit production.",
        ],
        improveNext:
            "Add reminders/push notifications, onboarding flow, offline-first mode (PWA), and higher test coverage with Playwright E2E.",
        links: {
            live: "https://dailyhabitz-1.onrender.com/",
            github: "https://github.com/Ykadam006/dailyhabitz",
            caseStudy: "/projects/dailyhabitz",
        },
        techStack: [
            "Next.js 15 (App Router)", "React", "TypeScript", "Tailwind CSS",
            "Node.js", "Express.js", "MongoDB Atlas", "Mongoose",
            "JWT", "GitHub Actions",
            "Figma", "Postman", "Vitest", "Testing Library",
        ],
    },
    {
        slug: "ghumakad",
        bentoLabel: "Frontend · React",
        title: "Ghumakkad — Travel Planner",
        subtitle: "14-screen React travel planner with 4 external API integrations, Chart.js budget dashboards, Leaflet maps, and a full Vitest + MSW test suite.",
        date: "Jan 2025",
        category: "Frontend" as ProjectCategory,
        stack: ["React", "Vite", "Chart.js", "Leaflet", "Axios", "Vitest", "MSW"],
        metrics: ["14 routed screens", "4 external APIs", "Vitest + MSW suite", "9 feature modules"],
        bullets: [
            "Shipped 14 routed screens across nine feature modules — delivering itinerary, packing, budget, weather, and destination flows.",
            "Integrated four external APIs (OpenWeather, Nominatim, OpenTripMap, Wikipedia) with Axios, normalizing responses and handling loading and error states across every route.",
            "Delivered Chart.js budget dashboards, translating user inputs into interactive cost breakdowns and readable planning summaries.",
            "Added Leaflet maps plus GSAP/Lottie motion libraries for smooth transitions, improving navigation and engagement across pages.",
            "Tested UI using Vitest, Testing Library, and MSW — enforcing ESLint, Prettier, and Husky pre-commit hooks throughout.",
        ],
        problem:
            "Travel planning is scattered across tabs — weather in one browser tab, budget in another, itinerary in a notes app. Ghumakkad brings itinerary, packing lists, budget tracking, weather, and destination discovery into one responsive planner.",
        whyItMatters:
            "Trip planning happens across five tabs and a notes app — consolidation is the whole value.",
        archFlow: [
            { label: "React + Vite", body: "14 routed screens" },
            { label: "External APIs", body: "weather · maps · POI · Wikipedia" },
            { label: "Netlify", body: "static hosting + CDN" },
        ],
        solution:
            "Built a modular, API-first React frontend with 14 routed screens, 4 normalized API integrations, Chart.js budget visualization, and Leaflet interactive maps — all thoroughly tested with Vitest + MSW.",
        architecture: {
            frontend: "React + Vite + React Router + Chart.js + Leaflet",
            backend: "Client-side only — 4 external APIs via Axios",
            infra: "Netlify (static deploy)",
        },
        keyFeatures: [
            "14 routed screens across 9 modules: itinerary, packing, budget, weather, destinations",
            "4 API integrations: OpenWeather, Nominatim, OpenTripMap, Wikipedia",
            "Chart.js interactive budget dashboards from user inputs",
            "Leaflet maps for destination browsing + location discovery",
            "Vitest + Testing Library + MSW test suite with Husky pre-commit",
        ],
        challenges:
            "Integrating four external APIs with inconsistent response shapes and error states. Solved by normalizing all responses through shared Axios interceptors and building consistent loading/error UI components reused across all routes.",
        designNote:
            "Emphasized whitespace, card-based layouts, and clear hierarchy so dense travel data (budgets, itineraries, weather) remains scannable on any screen size.",
        impact: [
            "14 routed screens across 9 feature modules shipped with consistent UX.",
            "4 external APIs fully integrated with normalized error handling and loading states.",
            "Full Vitest + Testing Library + MSW test suite with ESLint, Prettier, and Husky enforced.",
            "Chart.js budget dashboards with interactive cost breakdowns from real user inputs.",
            "Leaflet maps + motion libraries delivering smooth navigation and engagement.",
        ],
        improveNext:
            "Add user accounts (auth + persistent trips), search/filter across destinations, and integrate booking APIs.",
        links: {
            live: "https://travelwithghumakkad.netlify.app",
            github: "",
            caseStudy: "/projects/ghumakad",
        },
        techStack: [
            "React", "Vite", "React Router", "JavaScript (ES6+)", "TypeScript",
            "Chart.js", "react-chartjs-2", "Leaflet", "react-leaflet",
            "Axios", "OpenWeather API", "Nominatim API", "OpenTripMap API", "Wikipedia API",
            "GSAP", "Lottie", "Vitest", "Testing Library", "MSW",
            "ESLint", "Prettier", "Husky", "Netlify",
        ],
    },
    {
        slug: "semantic-enrichment",
        title: "Semantic Enrichment for Biomedical Text Summarization",
        subtitle: "A semantic enrichment pipeline to improve biomedical text summarization using medical ontologies.",
        date: "Jan 2023",
        category: "Research" as ProjectCategory,
        stack: ["Python", "UMLS Metathesaurus", "SNOMED CT", "MetaMap"],
        metrics: ["Improved semantic coverage"],
        bullets: [
            "Built a Python pipeline to extract and normalize biomedical concepts using MetaMap + ontology mappings.",
            "Enriched summaries using UMLS/SNOMED CT concept linking.",
            "Improved semantic coverage for downstream summarization quality.",
        ],
        problem: "Biomedical summaries lacked grounding in structured medical ontologies.",
        whyItMatters:
            "Medical summaries that miss concepts mislead clinicians — ontology grounding makes them trustworthy.",
        solution:
            "Created a pipeline to link free text to UMLS/SNOMED CT concepts for richer semantic representation.",
        architecture: {
            frontend: "N/A",
            backend: "Python pipeline",
            infra: "Local / research environment",
        },
        keyFeatures: [
            "MetaMap-based concept extraction",
            "UMLS/SNOMED CT mapping",
            "Summarization enrichment",
        ],
        challenges: "Handling noisy MetaMap output and ontology alignment.",
        designNote: "N/A — research pipeline",
        impact: ["Improved semantic coverage for downstream summarization."],
        improveNext: "Extend to more ontologies, add evaluation metrics.",
        links: {
            live: "",
            github: "",
            caseStudy: "",
        },
        techStack: ["Python", "UMLS", "SNOMED CT", "MetaMap"],
        hideFromAll: true,
    },
] as const;

/** Display order — drives the /projects list, featured rail, and command palette. */
const PROJECT_ORDER = [
    "applyvibe",
    "iscp",
    "dailyhabitz",
    "ghumakad",
    "bridgecare",
    "safeshelf",
    "skillforge",
    "semantic-enrichment",
] as const;

export const projects = [...projectsData].sort(
    (a, b) => PROJECT_ORDER.indexOf(a.slug) - PROJECT_ORDER.indexOf(b.slug)
);

/** Core experience: internships / real professional work */
export const experienceCore = [
    {
        title: "Web Design & Development Manager Intern",
        org: "Council of International Programs (CIP Chicago)",
        meta: "Feb 2026 – May 2026 · Chicago, IL",
        roleType: "internship" as const,
        current: false,
        bullets: [
            "Refined navigation and content architecture across 2 WordPress sites, raising Lighthouse performance ~20%.",
            "Ran 3+ accessibility audit cycles (Lighthouse + ARIA), clearing regressions and clarifying nonprofit resources.",
            "Rebuilt responsive layouts, forms, and page structure across 30+ pages using HTML, CSS, and PHP theming.",
            "Authored a staff-facing maintenance guide enabling non-technical self-service updates.",
        ],
    },
    {
        title: "UI/UX Developer Intern",
        org: "Looks For Lease Technologies Inc.",
        meta: "Jun 2025 – Aug 2025 · Remote (California)",
        roleType: "internship" as const,
        current: false,
        bullets: [
            "Delivered 6 production admin modules in Next.js and TypeScript, powering CRUD for orders, products, and payments.",
            "Integrated typed REST APIs with Zod validation, cutting bulk-action form errors ~50% across dashboards.",
            "Built 10+ reusable components (tables, forms, modals) with loading and error states across 5 Agile sprints.",
            "Debugged 15+ production defects and reviewed 20+ pull requests with CI checks ahead of weekly releases.",
        ],
    },
    {
        title: "Web Developer Intern",
        org: "Abhyaz",
        meta: "Jan 2024 – Jul 2024 · Chennai, India",
        roleType: "internship" as const,
        current: false,
        bullets: [
            "Built 5+ responsive landing pages with HTML, CSS, and JavaScript across 3 marketing campaigns.",
            "Configured CRM workflows and reusable layout patterns on no-code platforms, cutting page rework time ~30%.",
            "Integrated heat-map analytics and a support chatbot, improving engagement insights and automated responses.",
            "Resolved UI bugs, broken links, and browser inconsistencies — fixes typically shipped within 24 hours.",
        ],
    },
] as const;

/** Additional experience: on-campus / TA / parallel work */
export const experienceAdditional = [
    {
        title: "Go-To-Market Associate — Project Talon",
        org: "Kaplan Institute, Illinois Institute of Technology",
        meta: "Feb 2026 – May 2026 · Chicago, IL",
        roleType: "part-time" as const,
        current: false,
        bullets: [
            "Onboarded 1,000+ students to Project Talon from 5,000+ contacts via outreach and reminder campaigns.",
            "Managed intake workflows and 5+ marketing assets supporting the campuswide launch.",
            "Created email campaigns, videos, flyers, and social posts explaining Talon's platform value to students.",
            "Connected 100+ students to technology workforce opportunities through Talon partnerships.",
        ],
    },
    {
        title: "Elevate Cohort Manager",
        org: "Illinois Tech Career Services / Elevate Program",
        meta: "Jul 2025 – May 2026 · Chicago, IL",
        roleType: "part-time" as const,
        current: false,
        bullets: [
            "Directed milestone tracking for 300+ undergraduates across academic and career requirements.",
            "Led 4 Student Success Coaches through outreach prioritization and learner-centered intervention cycles.",
            "Produced student communications and training resources expanding access to career and academic guidance.",
            "Built progress- and outreach-tracking systems that focused coach interventions using engagement patterns.",
        ],
    },
    {
        title: "Graduate Teaching Assistant — Business Innovation (ITMM-482/582)",
        org: "Illinois Institute of Technology",
        meta: "Aug 2025 – Dec 2025 · Chicago, IL",
        roleType: "part-time" as const,
        current: false,
        bullets: [
            "Coached 20+ students through prototyping, UX experimentation, and storytelling for innovation deliverables.",
            "Created reusable templates and checklists that cut iteration time and raised deliverable quality.",
            "Led office hours and feedback reviews, helping students resolve blockers and sharpen final presentations.",
            "Mentored diverse teams through demos, project reviews, and semester milestones.",
        ],
    },
] as const;

/** Education */
export const education = [
    {
        title: "M.A.S. Information Technology & Management (ITM)",
        org: "Illinois Institute of Technology (Illinois Tech)",
        meta: "Aug 2024 – May 2026 · GPA: 4.0/4.0 · Chicago, IL",
        bullets: [
            "Relevant coursework: Full-Stack Web Development, Front-End Web Development, Human-Computer Interaction, Database Management, Cloud Computing, Agile/Scrum",
        ],
    },
    {
        title: "B.Tech, Computer Science & Engineering",
        org: "MIT ADT University",
        meta: "Jan 2021 – Oct 2023 · Pune, India",
        bullets: [],
    },
] as const;

/** Awards & honors */
export const awardsAndHonors = [
    {
        title: "Outstanding Student Award",
        org: "Department of Information Technology & Management, Illinois Tech",
        meta: "2025–2026",
        current: false,
        bullets: [
            "Recognized for academic excellence and leadership across ITM program initiatives.",
        ],
    },
] as const;

/** Leadership & Activities */
export const leadershipActivities = [
    {
        title: "Marketing & Communications Chair",
        org: "Project Management Excellence (PME) Club, Illinois Tech",
        meta: "Nov 2024 – Present",
        current: true,
        bullets: [
            "Led marketing and communications for club initiatives, event promotion, and member engagement.",
        ],
    },
    {
        title: "Student Leadership (Volunteer)",
        org: "PMI Chicagoland",
        meta: "Sep 2025 – Present",
        current: true,
        bullets: [
            "Supported professional community events and student leadership initiatives.",
        ],
    },
    {
        title: "Photography Team Member",
        org: "Indian Student Association (ISA), Illinois Tech",
        meta: "Jan 2025 – Present",
        current: true,
        bullets: [
            "Captured and edited event photos/videos and helped improve social engagement through content.",
        ],
    },
] as const;

export const experience = [...experienceCore, ...experienceAdditional] as const;

export type SkillCategory = "Frontend" | "Backend" | "Testing" | "Cloud" | "Design";

export const skillCategories: SkillCategory[] = ["Frontend", "Backend", "Testing", "Cloud", "Design"];

/**
 * Curated skill tiles. tier 1 = Daily Drivers, tier 2 = Production Experience.
 * `hidden` entries sit behind the "Show more tools" expander; learning items
 * live in `currentlyLearning` chips, not tiles.
 */
export const skillsTiered = [
    // ─── Tier 1 — Daily Drivers ──────────────────────────────────────────
    { name: "React", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "Next.js", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "TypeScript", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "Tailwind CSS", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "UI Systems", tier: 1 as const, categories: ["Frontend" as const, "Design" as const] },
    { name: "Accessibility", tier: 1 as const, categories: ["Frontend" as const, "Design" as const] },
    { name: "Figma → code", tier: 1 as const, categories: ["Design" as const] },
    // ─── Tier 2 — Production Experience ──────────────────────────────────
    { name: "Node.js", tier: 2 as const, categories: ["Backend" as const] },
    { name: "Express", tier: 2 as const, categories: ["Backend" as const] },
    { name: "REST APIs", tier: 2 as const, categories: ["Backend" as const] },
    { name: "MongoDB", tier: 2 as const, categories: ["Backend" as const] },
    { name: "SQL / PostgreSQL", tier: 2 as const, categories: ["Backend" as const] },
    { name: "Spring Boot", tier: 2 as const, categories: ["Backend" as const] },
    { name: "GitHub", tier: 2 as const, categories: ["Backend" as const] },
    { name: "CI/CD (GitHub Actions)", tier: 2 as const, categories: ["Cloud" as const] },
    { name: "Postman", tier: 2 as const, categories: ["Testing" as const] },
    { name: "Vercel", tier: 2 as const, categories: ["Cloud" as const] },
    { name: "Render", tier: 2 as const, categories: ["Cloud" as const] },
    { name: "Netlify", tier: 2 as const, categories: ["Cloud" as const] },
    { name: "AWS", tier: 2 as const, categories: ["Cloud" as const] },
    { name: "Chrome DevTools", tier: 2 as const, categories: ["Testing" as const] },
    // ─── Hidden behind "Show more tools" ─────────────────────────────────
    { name: "Java", tier: 2 as const, categories: ["Backend" as const], hidden: true },
    { name: "Prisma", tier: 2 as const, categories: ["Backend" as const], hidden: true },
    { name: "Python / Flask", tier: 2 as const, categories: ["Backend" as const], hidden: true },
    { name: "JWT / Auth", tier: 2 as const, categories: ["Backend" as const], hidden: true },
    { name: "Zod", tier: 2 as const, categories: ["Backend" as const], hidden: true },
    { name: "AWS Cognito", tier: 2 as const, categories: ["Cloud" as const, "Backend" as const], hidden: true },
    { name: "Vite", tier: 2 as const, categories: ["Frontend" as const], hidden: true },
    { name: "React Router", tier: 2 as const, categories: ["Frontend" as const], hidden: true },
    { name: "Zustand", tier: 2 as const, categories: ["Frontend" as const], hidden: true },
    { name: "Framer Motion", tier: 2 as const, categories: ["Frontend" as const], hidden: true },
    { name: "GSAP", tier: 2 as const, categories: ["Frontend" as const], hidden: true },
    { name: "Chart.js", tier: 2 as const, categories: ["Frontend" as const], hidden: true },
    { name: "Leaflet", tier: 2 as const, categories: ["Frontend" as const], hidden: true },
    { name: "Shadcn/UI", tier: 2 as const, categories: ["Frontend" as const, "Design" as const], hidden: true },
    { name: "Vitest + Testing Library", tier: 2 as const, categories: ["Testing" as const], hidden: true },
    { name: "Playwright (E2E)", tier: 2 as const, categories: ["Testing" as const], hidden: true },
    { name: "MSW", tier: 2 as const, categories: ["Testing" as const], hidden: true },
    { name: "Jest / Supertest", tier: 2 as const, categories: ["Testing" as const], hidden: true },
    { name: "Lighthouse", tier: 2 as const, categories: ["Testing" as const], hidden: true },
    { name: "WordPress", tier: 2 as const, categories: ["Frontend" as const], hidden: true },
    { name: "Agile / Scrum / JIRA", tier: 2 as const, categories: ["Backend" as const], hidden: true },
] as const;

/** Legacy skills for homepage — keep for backward compatibility */
export const skills = {
    "Daily / strongest": ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", "HTML5 / CSS3", "Accessibility (ARIA/WCAG)", "Figma-to-code"],
    "Backend & Data": ["Node.js / Express", "Spring Boot", "REST APIs", "MongoDB Atlas", "PostgreSQL", "SQL", "JWT / Auth", "AWS Cognito"],
    "Testing & Tooling": ["Vitest", "Playwright", "MSW", "Jest", "Postman", "Lighthouse", "Chrome DevTools", "ESLint / Prettier / Husky"],
    "Cloud & DevOps": ["AWS (EC2, S3, RDS, CloudFront)", "GitHub Actions (CI/CD)", "Vite", "Vercel / Netlify / Render", "WordPress"],
    "Design & Motion": ["Figma / FigJam", "Framer Motion", "GSAP", "Lottie", "Lenis", "Shadcn/UI", "Chart.js", "Leaflet"],
} as const;

/** Signature strengths as mini cards with proof */
export const signatureStrengthCards = [
    {
        title: "Figma → production speed",
        proof: "Translated Figma into production admin UI at Looks For Lease — 6 modules, 10+ reusable components, and 20+ PR reviews across 5 sprint cycles.",
    },
    {
        title: "Component architecture",
        proof: "Built tables, forms, and modals with shared loading/error states at LFL — typed REST + Zod validation cut bulk-action form errors ~50% across 6 admin dashboards.",
    },
    {
        title: "API performance & database tuning",
        proof: "Cut ISCP endpoint response times ~30% with 5+ PostgreSQL indexes and server-side pagination — payload size down ~40%.",
    },
    {
        title: "Accessible, publisher-ready web",
        proof: "At CIP Chicago: 3+ Lighthouse/ARIA audit cycles across 2 WordPress sites — ~20% performance gains, plus staff maintenance docs enabling non-technical updates.",
    },
] as const;

export const signatureStrengths = [
    "Figma-to-code speed",
    "Component architecture",
    "Debugging + performance",
    "Accessibility & clean UX",
] as const;

/** Currently learning — update monthly */
export const currentlyLearning = ["tRPC", "Supabase", "Redis", "Golang", "Kubernetes", "React 19 patterns"] as const;
