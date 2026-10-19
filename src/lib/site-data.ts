/**
 * Content source of truth. Mirrors the master resume (Part 1) — when the
 * resume changes, change it here, and nowhere else.
 */
export const site = {
    name: "Yogesh Kadam",
    role: "Full-Stack Software Engineer",
    location: "Chicago, IL",
    relocation: "Open to relocation anywhere in the US",
    email: "y.kadam2026@outlook.com",
    phone: "(312) 978-9696",
    links: {
        linkedin: "https://www.linkedin.com/in/yogi006/",
        /* Withheld until repo remediation is done (see master resume, Part 2 §5).
           Set back to "https://github.com/Ykadam006" to restore it site-wide. */
        github: "",
        resume: "/resume.pdf",
    },
    /* In Yogesh's own words (his About text). The home page leads with the first sentence. */
    summary:
        "I came in through the frontend, matching designs pixel for pixel, and kept going down the stack until I was writing the APIs, schemas, and event pipelines behind the screen. What I'm good at is getting productive in a stack I haven't used, and I learn one by building something real in it. Java, Go, and Kafka never came up at work, so I built ClaimForge and SentinelMesh.",
    now: {
        title: "Junior Full-Stack Developer",
        org: "Looks For Lease",
        since: "06/2026",
    },
    openTo: "Open to full-stack, frontend, and backend roles anywhere in the US.",
    /** Engineering principles, each tied to the project that proves it. */
    principles: [
        {
            title: "Rules decide, models explain",
            body: "In BridgeCare, a rules engine with 389 red-flag phrases in 7 languages decides urgency. The LLM only explains the result. Odd phrasing can raise urgency, but never lower it.",
            proof: "bridgecare",
        },
        {
            title: "Retries should be harmless",
            body: "ClaimForge commits each Kafka event in the same transaction as its MySQL change, and its consumers are idempotent. At work, the same idea keeps a repeated or out-of-order event from scrambling someone's appointment.",
            proof: "claimforge",
        },
        {
            title: "Fast, with a way back",
            body: "OrbitDesk moves a card the moment you drag it, and rolls it back from a snapshot if the server says no. At work, every upload is previewed and validated before it touches production.",
            proof: "orbitdesk",
        },
        {
            title: "Accessible is part of done",
            body: "axe-core checks 10 ClaimForge screens against WCAG 2.1 AA, on desktop and on a phone. BridgeCare announces its results to screen readers and respects reduced motion.",
            proof: "claimforge",
        },
    ],
} as const;

export type ProjectCategory = "Full-stack" | "Microservices" | "Frontend";

export type FlowNode = { label: string; body: string };

export type Project = {
    slug: string;
    title: string;
    /** Two-to-four-word description, shown above the title. */
    kind: string;
    category: ProjectCategory;
    featured?: boolean;
    summary: string;
    stack: readonly string[];
    /** Short, verified, mono-set facts — the numbers a reviewer scans for. */
    facts: readonly string[];
    /** Resume bullets — the canonical "what I built". */
    bullets: readonly string[];
    /** Architecture as a request path, rendered as a trace. */
    archFlow: readonly FlowNode[];
    problem: string;
    whyItMatters: string;
    improveNext: string;
    /** A real screenshot exists at /projects/<slug>.webp. */
    shot?: boolean;
    /** A short muted screen recording of the live demo exists at /projects/footage/<slug>.(webm|mp4). */
    footage?: boolean;
    links: { live: string; github: string; caseStudy: string };
};

export const projects: readonly Project[] = [
    {
        slug: "orbitdesk",
        title: "OrbitDesk",
        kind: "Real-time team workspace",
        category: "Full-stack",
        featured: true,
        summary:
            "A real-time team workspace with boards, presence, and AI summaries. I built it solo on Next.js, Prisma, PostgreSQL, Socket.IO, and Redis.",
        stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Socket.IO", "Redis"],
        facts: ["283 tests · 51 files", "46 HTTP handlers", "3-tier RBAC, API + sockets", "10-model schema"],
        bullets: [
            "Solo build. 46 HTTP handlers over 30 route modules on a 10-model Postgres schema with 4 Prisma migrations.",
            "Separate Socket.IO service with short-lived JWTs; membership is re-checked from the database on every event, and 3-tier RBAC applies at both API and socket layers.",
            "Drag-and-drop with dnd-kit and Zustand is optimistic and rolls back from a snapshot if the server rejects a move.",
            "Auth hardening: bcrypt cost 12, lockout after 5 failed attempts, single-use reset tokens, CSRF origin checks, CSP headers, Redis rate limits.",
            "Claude API summaries with a 30s timeout, per-user throttling, and a plain fallback summary when the model is slow.",
            "Wrote 283 tests across 51 files with Jest, React Testing Library, and Playwright, and shipped it with a multi-stage Docker build and a 9-step GitHub Actions pipeline.",
        ],
        archFlow: [
            { label: "Next.js", body: "App Router · 46 handlers" },
            { label: "Socket.IO", body: "short-lived JWT · per-event membership check" },
            { label: "Prisma", body: "10 models · 4 migrations" },
            { label: "PostgreSQL", body: "boards, members, roles" },
            { label: "Redis", body: "rate limits" },
        ],
        problem:
            "A shared board only works if everyone sees the same thing. A card one person drags has to move for everyone else, a member who is removed has to lose access right away, and the server can't take the client's word for either.",
        whyItMatters:
            "Real-time apps fail quietly. A stale board or a permission that lingers does more damage than a slow page.",
        improveNext:
            "Load-test the socket service with many concurrent rooms, and push line coverage past today's 60%.",
        links: { live: "", github: "", caseStudy: "/projects/orbitdesk" },
    },
    {
        slug: "bridgecare",
        title: "BridgeCare",
        kind: "AI health navigation",
        category: "Full-stack",
        featured: true,
        summary:
            "An AI health navigation app. A deterministic rules engine sets urgency, the LLM only explains it, and questions about your own records are answered with page citations.",
        stack: ["Next.js", "TypeScript", "FastAPI", "Python", "Supabase", "pgvector"],
        facts: ["389 red-flag phrases · 7 languages", "4-provider LLM fallback", "15 tables · 20 RLS policies", "14 pages · 14 endpoints"],
        bullets: [
            "Built BridgeCare, an AI health navigation web app in Next.js 16, TypeScript, FastAPI, and Supabase, with 14 pages and 14 REST endpoints.",
            "Urgency comes from a deterministic rules engine with 389 red-flag phrases in 7 languages; the LLM only explains the result.",
            "Wrote a 4-provider LLM fallback chain (Ollama, Claude, Groq, Gemini) with Claude spend logged in Postgres and cut off at a USD budget.",
            "Document Q&A over uploaded health records: pypdf, page-bounded chunks, local MiniLM embeddings, pgvector HNSW, answers cited by page.",
            "Designed 15 Postgres tables with row-level security and 20 policies; the API reads user identity from the token and ignores the body.",
            "Built a care-options map with Leaflet, OpenStreetMap, Overpass, and OSRM routes, plus ARIA live regions and reduced-motion support.",
        ],
        archFlow: [
            { label: "Next.js 16", body: "14 pages · Leaflet maps" },
            { label: "FastAPI", body: "14 REST endpoints" },
            { label: "Rules engine", body: "389 phrases set urgency" },
            { label: "LLM chain", body: "Ollama → Claude → Groq → Gemini" },
            { label: "Supabase", body: "Postgres · RLS · pgvector HNSW" },
        ],
        problem:
            "Young adults often can't tell whether a symptom needs the ER, a clinic, or nothing at all. Searching symptoms produces anxiety instead of a decision, and the care system is fragmented and hard to read.",
        whyItMatters:
            "In health, an AI that guesses urgency is a liability. The safe design lets rules decide and the model explain.",
        improveNext:
            "Add an audited-logging path for real clinical deployments and wire live insurance eligibility data in place of the plain-language templates.",
        links: { live: "", github: "https://github.com/Ykadam006/BridgeCare", caseStudy: "/projects/bridgecare" },
    },
    {
        slug: "sentinelmesh",
        title: "SentinelMesh",
        kind: "Incident management platform",
        category: "Microservices",
        featured: true,
        summary:
            "An incident management platform. Five Go microservices turn raw service metrics into SLOs, alerts, and incidents, with a live React dashboard on top.",
        stack: ["Go", "gRPC", "Kafka", "Elasticsearch", "Prometheus", "React"],
        facts: ["5 Go microservices", "5 Kafka topics + gRPC", "13 Compose containers", "K8s probes · limits · HPA"],
        bullets: [
            "Built SentinelMesh, an incident management platform of 5 Go microservices that turns raw service metrics into alerts and incidents.",
            "Connected the services over 5 Kafka topics and gRPC; a stream processor indexes every event into Elasticsearch for search in Kibana.",
            "Wrote the Go SLO engine: availability and error budget for 5 services as Prometheus gauges, with alerts escalated at 2x threshold.",
            "Repeat alerts attach to the open incident's timeline, so a noisy service can't flood on-call with duplicate incidents.",
            "Built the React, TypeScript, and Redux Toolkit dashboard: live SLO cards on a 5s poll, plus acknowledge and resolve actions.",
            "Packaged the full stack as 13 Docker Compose containers and wrote Kubernetes manifests with health probes, resource limits, and an HPA.",
        ],
        archFlow: [
            { label: "Ingest", body: "service.metric.received" },
            { label: "SLO engine", body: "error budgets as Prometheus gauges" },
            { label: "Alerts", body: "escalate at 2x threshold" },
            { label: "Incidents", body: "PostgreSQL · GORM · timeline" },
            { label: "Search", body: "Elasticsearch + Kibana" },
        ],
        problem:
            "When a service degrades, on-call needs one incident with a clear timeline: not a flood of duplicate alerts, and not a metric they have to go and find.",
        whyItMatters:
            "Alert fatigue is how real outages get missed. Folding repeat alerts into one incident matters more than any dashboard.",
        improveNext:
            "Grow the Go test suite around the SLO engine and run the manifests against a managed cluster instead of a local one.",
        links: { live: "", github: "https://github.com/Ykadam006/SentinelMesh", caseStudy: "/projects/sentinelmesh" },
    },
    {
        slug: "claimforge",
        title: "ClaimForge",
        kind: "Insurance claims platform",
        category: "Microservices",
        featured: true,
        summary:
            "An insurance claims platform: five Spring Boot microservices, a 9-state claim lifecycle that refuses illegal moves, and Kafka events that are never lost or applied twice.",
        stack: ["Java 21", "Spring Boot", "Kafka", "MySQL", "Redis", "Angular"],
        facts: ["9-state lifecycle · 409 on conflict", "Transactional outbox", "24 REST endpoints + GraphQL", "70 backend + 35 UI tests"],
        bullets: [
            "Built ClaimForge, an insurance claims platform with 5 Spring Boot microservices, Kafka, MySQL, Redis, and an Angular 22 UI.",
            "Modeled the claim lifecycle as a 9-state machine in Java, so an illegal transition or a stale update returns 409 Conflict.",
            "A transactional outbox commits each Kafka event with its MySQL change, and idempotent consumers make redelivery harmless.",
            "Secured 24 REST endpoints and a GraphQL API with RS256 JWTs, 12 role checks, and a Redis lockout after 5 failed logins.",
            "Wrote 70 backend tests with JUnit 5, Mockito, Testcontainers, and Cucumber, plus 24 Vitest and 11 Playwright tests.",
            "Angular 22 UI for 4 roles with signals and lazy routes; axe-core checks 10 screens for WCAG 2.1 AA on desktop and phone.",
        ],
        archFlow: [
            { label: "Angular 22", body: "4 roles · signals · lazy routes" },
            { label: "nginx", body: "single entry point" },
            { label: "Spring Boot ×5", body: "RS256 JWT · 12 role checks" },
            { label: "MySQL + outbox", body: "event committed with the change" },
            { label: "Kafka", body: "idempotent consumers" },
        ],
        problem:
            "A claim passes through many states and many hands, and every step fires events that other services depend on. If two people act on a stale claim, or an event is lost or delivered twice, money moves the wrong way.",
        whyItMatters:
            "Claims are money. The system has to refuse an illegal transition and shrug off a redelivered event, every time.",
        improveNext:
            "Add consumer-lag and outbox-backlog metrics, and a dead-letter view so operators can replay a failed event by hand.",
        links: { live: "", github: "https://github.com/Ykadam006/ClaimForge", caseStudy: "/projects/claimforge" },
    },
    {
        slug: "ghumakad",
        title: "Ghumakkad",
        kind: "Travel planner",
        category: "Frontend",
        shot: true,
        footage: true,
        summary:
            "A travel planner in React and TypeScript, with a serverless weather proxy, two layers of caching, and a lazy-loaded, tested route tree.",
        stack: ["React", "TypeScript", "Vite", "Netlify Functions"],
        facts: ["62 components · 15 routes", "13 lazy routes → 26 chunks", "43 tests", "25 Storybook stories"],
        bullets: [
            "8,841-line React and TypeScript SPA: 62 components, 15 routes, 13 of them lazy-loaded into 26 Vite chunks.",
            "Netlify serverless weather proxy with a 10-minute CDN cache, plus a two-tier client cache (in-memory map and 24h localStorage).",
            "43 tests (33 Vitest, 10 Playwright) with MSW mocks, 25 Storybook stories, and CI on GitHub Actions.",
        ],
        archFlow: [
            { label: "React SPA", body: "15 routes · 13 lazy-loaded" },
            { label: "Client cache", body: "memory map + 24h localStorage" },
            { label: "Netlify Function", body: "weather proxy · 10-min CDN cache" },
            { label: "Upstream APIs", body: "weather · Nominatim geocoding" },
        ],
        problem:
            "Trip planning is scattered across tabs: weather in one, budget in another, the itinerary in a notes app. Ghumakkad puts the itinerary, budget, weather, and destination ideas in one planner.",
        whyItMatters:
            "When planning happens across five tabs, putting it in one place is most of the value.",
        improveNext:
            "Add accounts so trips persist across devices, and move the itinerary generator behind the same proxy pattern as weather.",
        links: { live: "https://travelwithghumakkad.netlify.app", github: "", caseStudy: "/projects/ghumakad" },
    },
    {
        slug: "iscp",
        title: "Industry–Student Collaboration Platform",
        kind: "Collaboration platform",
        category: "Full-stack",
        summary:
            "A platform where students and employers run projects together: Spring Boot REST services in Java behind a React frontend, on PostgreSQL, deployed to AWS.",
        stack: ["Java", "Spring Boot", "React", "PostgreSQL", "AWS"],
        facts: ["Spring Boot REST services", "AWS EC2 · RDS · S3", "Indexed, tuned SQL"],
        bullets: [
            "Spring Boot REST services in Java behind a React frontend, with PostgreSQL for persistence.",
            "Deployed on AWS (EC2, RDS, S3) and tuned SQL with indexing and query optimization.",
        ],
        archFlow: [
            { label: "React", body: "student + employer flows" },
            { label: "Spring Boot", body: "REST services in Java" },
            { label: "PostgreSQL", body: "on AWS RDS" },
            { label: "AWS", body: "EC2 · S3" },
        ],
        problem:
            "Students and employers had no shared place to run projects together. Coordination happened over email and spreadsheets, with no visible status for anyone.",
        whyItMatters:
            "Most real B2B software is multi-role workflow software, so this was the closest thing to day-one industry work.",
        improveNext:
            "Add request tracing and automated regression tests so performance work can be measured release over release.",
        links: { live: "", github: "", caseStudy: "/projects/iscp" },
    },
    {
        slug: "applyvibe",
        title: "ApplyVibe",
        kind: "Job application tracker",
        category: "Full-stack",
        shot: true,
        footage: true,
        summary:
            "A job-search tracker with an 11-stage drag-and-drop pipeline, analytics, and ownership checks on every write. Built on Next.js, Prisma, and PostgreSQL.",
        stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Auth.js", "Recharts"],
        facts: ["8 models · 76 fields", "9 REST handlers", "11-stage pipeline", "7 charts · 11 KPI cards"],
        bullets: [
            "Designed an 8-model Prisma schema (76 fields, 7 cascading foreign keys) on PostgreSQL, served by 9 REST handlers in 5 route files.",
            "Guarded every write with ownership checks, shared Zod schemas, and a 21-field whitelist against IDOR and mass assignment, behind 3 auth layers.",
            "Built an 11-stage drag-and-drop pipeline with dnd-kit, plus 7 Recharts charts and 11 KPI cards.",
            "Built the UI from 72 components on 12 Radix primitives and 40 design tokens.",
        ],
        archFlow: [
            { label: "Next.js 16", body: "App Router · server components" },
            { label: "Auth.js", body: "sessions · route protection" },
            { label: "Route handlers", body: "9 handlers · Zod · ownership checks" },
            { label: "Prisma", body: "8 models · 7 cascading FKs" },
            { label: "PostgreSQL", body: "applications, stages, profile" },
        ],
        problem:
            "Job seekers applying to hundreds of roles had no free tool that tracked applications, showed the pipeline, or explained what was and wasn't working. The options were paid, heavy, or a spreadsheet.",
        whyItMatters:
            "Offers get lost to missed follow-ups. Seeing the whole pipeline at once is what prevents that.",
        improveNext:
            "Add a test suite and CI before anything else, then record stage history on every drag so the funnel can show real conversion.",
        links: { live: "https://inbox2-offer.vercel.app/", github: "", caseStudy: "/projects/applyvibe" },
    },
    {
        slug: "dailyhabitz",
        title: "DailyHabitz",
        kind: "Habit tracker",
        category: "Full-stack",
        shot: true,
        footage: true,
        summary:
            "A habit tracker with an Express API on MongoDB: opaque rotating sessions, ownership checks on every route, and check-ins keyed to the user's local date.",
        stack: ["Next.js", "TypeScript", "Express", "MongoDB Atlas", "TanStack Query"],
        facts: ["11 REST endpoints", "256-bit opaque sessions", "Optimistic UI · 4 mutations", "11 tests"],
        bullets: [
            "Built 11 REST endpoints on 3 Mongoose models, with ownership checks that return 403 on anyone else's data.",
            "Sessions are 256-bit opaque tokens stored with a MongoDB TTL, rotated every 50 minutes against a 60-minute expiry.",
            "Made check-ins idempotent by keying them on the user's local date, and kept 4 TanStack Query mutations optimistic.",
            "Added a health endpoint (200/503), request-ID tracing, and structured JSON logs that redact 9 key patterns.",
            "Wrote 11 tests with Jest, Supertest, mongodb-memory-server, and Playwright.",
        ],
        archFlow: [
            { label: "Next.js", body: "dashboard · proxy routes" },
            { label: "Express API", body: "11 endpoints · 403 ownership" },
            { label: "Sessions", body: "opaque · TTL · rotated" },
            { label: "MongoDB Atlas", body: "3 Mongoose models" },
        ],
        problem:
            "Habit tracking fails when the flow is fiddly or progress feels invisible. One lost check-in and people stop trusting the app.",
        whyItMatters:
            "A habit app runs on trust. A double-counted or missing check-in ends the habit, and the app goes with it.",
        improveNext:
            "Add CI around the existing tests, and reminders so the app brings people back instead of waiting for them.",
        links: { live: "https://dailyhabitz-1.onrender.com/", github: "", caseStudy: "/projects/dailyhabitz" },
    },
    {
        slug: "skillforge",
        title: "SkillForge",
        kind: "Learning tracker",
        category: "Frontend",
        shot: true,
        summary:
            "A personal learning dashboard with skill paths, practice logs, and progress analytics. All state lives in a persisted Zustand store.",
        stack: ["Next.js", "React", "TypeScript", "Zustand", "Recharts"],
        facts: ["9 routes · 38 components", "16 actions · 8 persisted slices", "8 analytics functions", "42 tests"],
        bullets: [
            "Built 9 routes and 38 components in 8,370 lines of TypeScript.",
            "Kept all state in Zustand (16 actions across 8 persisted slices), so progress survives a reload without a backend.",
            "Wrote the 8 analytics functions behind the dashboard's progress and rhythm views.",
            "Covered it with 42 tests, and shipped a skip link and 40 ARIA attributes.",
        ],
        archFlow: [
            { label: "Next.js", body: "9 routes · 38 components" },
            { label: "Zustand", body: "16 actions · 8 persisted slices" },
            { label: "Analytics", body: "8 functions · Recharts" },
        ],
        problem:
            "Learning spread across notes, spreadsheets, practice sites, and side projects made it hard to see gaps, rhythm, and proof of work in one place.",
        whyItMatters:
            "Learning without a system fades. Seeing your progress is what keeps you going.",
        improveNext:
            "Sync the persisted store to a database so progress follows you across devices.",
        links: { live: "", github: "https://github.com/Ykadam006/skillforge", caseStudy: "/projects/skillforge" },
    },
    {
        slug: "safeshelf",
        title: "SafeShelf",
        kind: "Food recall tracker",
        category: "Microservices",
        shot: true,
        footage: true,
        summary:
            "A pantry tracker that checks your food against live FDA recall data. The backend is split into an API service and a separate recall-adapter service.",
        stack: ["React", "TypeScript", "Express", "Prisma", "PostgreSQL", "Docker"],
        facts: ["2 services", "FDA class → risk tier", "OpenAPI 3.0 docs"],
        bullets: [
            "Split the backend into an Express + Prisma API service and a recall-adapter service that queries openFDA and normalizes its responses.",
            "Wrote recall checks as Prisma transactions, so the audit record, recall upserts, and alerts succeed or roll back together.",
            "Mapped FDA classifications to risk tiers (Class I → high, II → medium, III → low), with match ordering that avoids Class I/III substring collisions.",
            "Shipped interactive OpenAPI 3.0 docs with Swagger UI alongside the API.",
        ],
        archFlow: [
            { label: "React SPA", body: "Vite · Tailwind" },
            { label: "api-service", body: "Express · Prisma" },
            { label: "recall-service", body: "openFDA adapter" },
            { label: "PostgreSQL", body: "items · checks · alerts" },
        ],
        problem:
            "FDA food recalls are public but buried in enforcement reports nobody reads. There was no lightweight way to check a personal pantry against them.",
        whyItMatters:
            "Recalls happen every week, and almost nobody checks their pantry against them. Doing that check automatically closes a real safety gap.",
        improveNext:
            "Replace the demo user picker with real auth, and run bulk recall checks in parallel with back-pressure.",
        links: { live: "https://safe-shelf.vercel.app", github: "https://github.com/Ykadam006/safeshelf", caseStudy: "/projects/safeshelf" },
    },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)!;

export type Role = {
    title: string;
    org: string;
    dates: string;
    place: string;
    /** Descriptor line under the title (master resume). */
    focus?: string;
    current?: boolean;
    bullets: readonly string[];
};

/** Engineering roles. Titles are official — never add "Intern". */
export const experienceCore: readonly Role[] = [
    {
        title: "Junior Full-Stack Developer",
        org: "Looks For Lease Technologies Inc.",
        dates: "06/2026 – Present",
        place: "Los Angeles, CA (Remote)",
        focus: "Frontend & Product Engineering",
        current: true,
        bullets: [
            "Connected third-party scheduling and payments so customers book and pay in one flow, without a separate checkout step.",
            "Added safeguards so a repeated or out-of-order booking event can't scramble someone's appointment.",
            "Designed a 4-stage import workflow (parse, preview, validate, insert), so every upload is checked before it touches production.",
            "Built an internal admin app on Postgres with CRUD, search, filters, and status management.",
            "Turned Figma designs into React, Next.js, and TypeScript across 10+ customer-facing pages during a design-system migration.",
            "Did the SEO and speed work: metadata, Open Graph, server-rendered routes, code splitting, dynamic imports, image optimization, and caching.",
            "Made the booking UI work by keyboard and screen reader, with reduced motion and clear loading and error states.",
            "Wrote booking QA checks covering scheduling, availability, payments, notifications, and responsive layouts.",
            "Planned the production handoff (source control, hosting, environment config, and access), so it's clear who owns deployment.",
        ],
    },
    {
        title: "Web Design & Development Manager",
        org: "Council of International Programs Chicago",
        dates: "02/2026 – 05/2026",
        place: "Chicago, IL",
        focus: "Frontend, Accessibility & CMS",
        bullets: [
            "Audited 30+ pages across two WordPress sites and tracked every issue by page, priority, owner, fix, and status.",
            "Rebuilt layouts, typography, menus, and forms through WordPress theming in HTML, CSS, and PHP, and restructured the navigation.",
            "Ran Lighthouse and ARIA audits for accessibility, performance, and SEO over 3+ release cycles, re-testing after every fix.",
        ],
    },
    {
        title: "UI/UX Developer",
        org: "Looks For Lease Technologies Inc.",
        dates: "06/2025 – 08/2025",
        place: "Los Angeles, CA (Remote)",
        focus: "Frontend Engineering",
        bullets: [
            "Built 5+ Next.js admin modules: record management, media handling, approvals, comment threads, and pagination.",
            "Made 10+ reusable Tailwind CSS components, so responsive layouts and loading, empty, and error states looked the same everywhere.",
            "Typed the REST APIs and added server-side validation across 5+ modules.",
            "Fixed 15+ bugs with Chrome DevTools, Postman, and app logs, and shipped through agile sprints, Git reviews, and CI.",
        ],
    },
    {
        title: "Web Developer",
        org: "Abhyaz",
        dates: "01/2024 – 07/2024",
        place: "Chennai, India",
        focus: "Frontend Development",
        bullets: [
            "Built 5+ responsive landing pages in HTML, CSS, and JavaScript for three marketing campaigns.",
            "Set up CRM workflows, site analytics, and a support chatbot.",
        ],
    },
];

/** Campus roles outside engineering. */
export const experienceAdditional: readonly Role[] = [
    {
        title: "Go-To-Market Associate, Project Talon",
        org: "Kaplan Institute, Illinois Tech",
        dates: "02/2026 – 05/2026",
        place: "Chicago, IL",
        bullets: ["Onboarded 1,000+ students from 5,000+ contacts through a 3-stage outreach funnel."],
    },
    {
        title: "Elevate Cohort Manager",
        org: "Illinois Tech Career Services",
        dates: "07/2025 – 05/2026",
        place: "Chicago, IL",
        bullets: ["Tracked undergraduate milestones across academic and career requirements, and coordinated Student Success Coaches."],
    },
    {
        title: "Graduate Teaching Assistant, Business Innovation",
        org: "Illinois Institute of Technology",
        dates: "08/2025 – 12/2025",
        place: "Chicago, IL",
        bullets: ["Coached 20+ students through prototyping, UX experiments, and storytelling."],
    },
];

export const leadershipActivities: readonly Role[] = [
    {
        title: "PMI Chapter Student Club – Student Leadership",
        org: "PMI Chicagoland Chapter",
        dates: "09/2025 – 08/2026",
        place: "Chicago, IL",
        bullets: [
            "Supported professional community events and student leadership initiatives.",
            "Received the chapter's Certificate of Volunteer Service and Certificate of Appreciation.",
        ],
    },
    {
        title: "Marketing and Communications Chair",
        org: "Project Management Excellence Club, Illinois Tech",
        dates: "11/2024 – 05/2026",
        place: "Chicago, IL",
        bullets: ["Ran marketing and communications for club events and member engagement."],
    },
    {
        title: "ISA Photography Team Member",
        org: "Indian Student Association, Illinois Tech",
        dates: "01/2025 – 05/2026",
        place: "Chicago, IL",
        bullets: ["Shot and edited event photos and video for the association's channels."],
    },
];

export const education: readonly Role[] = [
    {
        title: "Master of Applied Science, Information Technology & Management",
        org: "Illinois Institute of Technology",
        dates: "05/2026",
        place: "Chicago, IL",
        focus: "GPA 4.0 / 4.0 · Web Design and Application Development",
        bullets: ["Outstanding Student Award, Department of Information Technology & Management."],
    },
    {
        title: "Bachelor of Technology, Computer Science & Engineering",
        org: "MIT ADT University",
        dates: "10/2023",
        place: "Pune, India",
        bullets: [],
    },
];

/** The career as steps — Kadam is Marathi for "a step". Oldest first. */
export const journey = [
    { when: "10/2023", what: "B.Tech, Computer Science", where: "MIT ADT University, Pune" },
    { when: "01/2024", what: "Web Developer", where: "Abhyaz, Chennai" },
    { when: "08/2024", what: "Moved to Chicago", where: "MAS at Illinois Tech" },
    { when: "06/2025", what: "UI/UX Developer", where: "Looks For Lease" },
    { when: "02/2026", what: "Web Design & Development Manager", where: "CIP Chicago" },
    { when: "05/2026", what: "Finished my MAS, 4.0 GPA", where: "Outstanding Student Award" },
    { when: "06/2026", what: "Junior Full-Stack Developer", where: "Looks For Lease, now" },
] as const;

/** Training line — never "certified". */
export const training = [
    { title: "AWS Academy Graduate, Cloud Foundations", org: "AWS Training and Certification" },
    {
        title: "Google Cloud skill badges",
        org: "DevOps Workflows · Secure Networks · Firebase Serverless Apps · BigQuery Data Warehouse · Eventarc",
    },
] as const;

/** Where a skill was used. Project slugs resolve to case studies. */
export const proofLinks: Record<string, { label: string; href?: string }> = {
    ...Object.fromEntries(projects.map((p) => [p.slug, { label: p.title.split(" ")[0], href: p.links.caseStudy }])),
    iscp: { label: "ISCP", href: "/projects/iscp" },
    l4l: { label: "Looks For Lease", href: "/experience" },
    cip: { label: "CIP Chicago", href: "/experience" },
    abhyaz: { label: "Abhyaz", href: "/experience" },
    daily: { label: "Daily use" },
};

export type SkillGroup = {
    id: string;
    label: string;
    /** Hero trace row: short layer name, span start/width in %, and the headline tools. */
    trace?: { layer: string; span: readonly [number, number]; top: string };
    /** [skill, space-separated proof keys] — every skill names where it was used. */
    items: readonly (readonly [string, string])[];
};

/** Skills exactly as the master resume lists them. */
export const skillGroups: readonly SkillGroup[] = [
    {
        id: "languages",
        label: "Languages",
        items: [
            ["TypeScript", "l4l orbitdesk bridgecare"],
            ["JavaScript", "abhyaz"],
            ["Python", "bridgecare"],
            ["Java", "claimforge iscp"],
            ["Go", "sentinelmesh"],
            ["SQL", "orbitdesk iscp"],
            ["PHP", "cip"],
            ["HTML", "cip abhyaz"],
            ["CSS", "cip abhyaz"],
        ],
    },
    {
        id: "frontend",
        label: "Frontend",
        trace: { layer: "ui", span: [0, 44], top: "React · Next.js · Angular · Tailwind" },
        items: [
            ["React", "l4l orbitdesk sentinelmesh"],
            ["Next.js", "l4l orbitdesk bridgecare"],
            ["Angular", "claimforge"],
            ["Redux Toolkit", "sentinelmesh"],
            ["Zustand", "orbitdesk"],
            ["Tailwind CSS", "l4l"],
            ["dnd-kit", "orbitdesk"],
            ["Leaflet", "bridgecare"],
            ["Figma to code", "l4l"],
            ["WCAG 2.1 AA", "claimforge"],
            ["ARIA", "bridgecare cip"],
            ["axe-core", "claimforge"],
        ],
    },
    {
        id: "backend",
        label: "Backend & APIs",
        trace: { layer: "api", span: [14, 44], top: "Node.js · FastAPI · Spring Boot · gRPC" },
        items: [
            ["Node.js", "orbitdesk"],
            ["FastAPI", "bridgecare"],
            ["Spring Boot", "claimforge iscp"],
            ["REST APIs", "l4l claimforge bridgecare"],
            ["GraphQL", "claimforge"],
            ["gRPC", "sentinelmesh"],
            ["Socket.IO", "orbitdesk"],
            ["JWT", "orbitdesk claimforge"],
            ["RBAC", "orbitdesk claimforge"],
            ["Zod", "orbitdesk"],
            ["Microservices", "sentinelmesh claimforge"],
            ["Transactional outbox", "claimforge"],
        ],
    },
    {
        id: "data",
        label: "Data & Messaging",
        trace: { layer: "data", span: [30, 40], top: "PostgreSQL · Redis · Kafka · pgvector" },
        items: [
            ["PostgreSQL", "l4l orbitdesk bridgecare"],
            ["MySQL", "claimforge"],
            ["Supabase", "bridgecare"],
            ["Prisma", "orbitdesk"],
            ["GORM", "sentinelmesh"],
            ["Redis", "orbitdesk claimforge"],
            ["pgvector", "bridgecare"],
            ["Elasticsearch", "sentinelmesh"],
            ["Kafka", "sentinelmesh claimforge"],
        ],
    },
    {
        id: "ai",
        label: "AI & LLM",
        trace: { layer: "llm", span: [44, 24], top: "Claude API · RAG · LLM fallback" },
        items: [
            ["Anthropic Claude API", "orbitdesk bridgecare"],
            ["RAG", "bridgecare"],
            ["Embeddings", "bridgecare"],
            ["Ollama", "bridgecare"],
            ["Groq", "bridgecare"],
            ["Gemini", "bridgecare"],
            ["LLM fallback and budget controls", "bridgecare"],
            ["Claude Code", "daily"],
            ["Codex", "daily"],
            ["Cursor", "daily"],
        ],
    },
    {
        id: "devops",
        label: "Cloud & DevOps",
        trace: { layer: "ops", span: [58, 42], top: "Docker · Kubernetes · GitHub Actions · Prometheus" },
        items: [
            ["AWS (EC2, RDS, S3)", "iscp"],
            ["Docker", "orbitdesk claimforge"],
            ["Docker Compose", "sentinelmesh claimforge"],
            ["Kubernetes (manifests)", "sentinelmesh"],
            ["nginx", "claimforge"],
            ["GitHub Actions", "orbitdesk claimforge ghumakad"],
            ["Prometheus", "sentinelmesh"],
            ["Kibana", "sentinelmesh"],
        ],
    },
    {
        id: "testing",
        label: "Testing",
        items: [
            ["Jest", "orbitdesk"],
            ["Vitest", "claimforge ghumakad"],
            ["React Testing Library", "orbitdesk"],
            ["Playwright", "orbitdesk claimforge ghumakad"],
            ["MSW", "ghumakad"],
            ["JUnit 5", "claimforge"],
            ["Mockito", "claimforge"],
            ["Testcontainers", "claimforge"],
            ["Cucumber", "claimforge"],
        ],
    },
];
