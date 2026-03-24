export const site = {
    name: "Yogesh Kadam",
    role: "Frontend Engineer / Full-Stack (UI-focused)",
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
        "Graduating May 2026 from Illinois Tech (GPA 4.0). Three internships. Three deployed products. I care about the gap between Figma and production — and I close it fast.",
    /** Sourced metric cards: number, label, source attribution */
    metricCards: [
        { value: 35, prefix: "", suffix: "%", label: "less UI rework", source: "Looks For Lease, 2025 · component reuse across 6 modules" },
        { value: 30, prefix: "~", suffix: "%", label: "lower API latency", source: "ISCP project · AWS deployment" },
        { value: 99.9, prefix: "", suffix: "%", label: "uptime", source: "AWS demo period · EC2 + RDS + CloudFront" },
        { value: 4.0, prefix: "", suffix: " / 4.0", label: "GPA", source: "Illinois Tech · graduating May 2026" },
    ],
    replyNote: "I reply within 24 hours.",
    openToRoles: "Open to Frontend / Full-stack roles.",
    /** 4-step process flow */
    processSteps: [
        { step: "01", title: "Understand", desc: "I read the Figma, ask questions, map the component tree before writing a line of code." },
        { step: "02", title: "Build", desc: "Reusable TypeScript components, consistent loading/empty/error states, REST API integration." },
        { step: "03", title: "Test", desc: "Vitest unit tests, Playwright E2E, Postman for APIs, Lighthouse for accessibility." },
        { step: "04", title: "Ship", desc: "PR review, CI/CD checks, production validation, metrics documented." },
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
    leadershipPreview: "Leadership: PME Marketing Chair, PMI volunteer, ISA Photography.",
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
    /** Cartoon asset paths — add files to public/ and set paths when ready */
    assets: {
        heroCartoon: "",       // "/hero-cartoon.png" — main hero illustration (half/3/4 body)
        avatar: "",            // "/avatar.png" — header avatar 512×512
        stickerBuilding: "",   // "/sticker-building.png" — Now building card corner
        stickerContact: "",    // "/sticker-friendly.png" — Contact page "Let's build"
        sticker404: "",        // "/sticker-404.png" — 404 page
    },
} as const;

export type ProjectCategory = "Full-stack" | "Frontend" | "Research";

export const projects = [
    {
        slug: "iscp",
        bentoLabel: "Full-Stack · AWS",
        title: "Industry–Student Collaboration Platform",
        subtitle: "Full-stack AWS platform connecting students and employers with workflow tracking, role-based access, and optimized PostgreSQL APIs.",
        date: "Dec 2025",
        category: "Full-stack" as ProjectCategory,
        stack: ["React", "Spring Boot", "PostgreSQL", "AWS Cognito", "EC2", "RDS", "CloudFront"],
        metrics: ["~30% lower API latency", "~99.9% uptime", "~40% faster delivery", "Payload transfers reduced ~40%"],
        bullets: [
            "Developed responsive React components from Figma designs, implementing Context API for state management and wiring components to Spring Boot REST APIs.",
            "Secured role-based access with AWS Cognito authentication, controlling entry and actions across student and employer workflows.",
            "Scaled list pages with server-side pagination and filtering, reducing payload transfers ~40% and improving cross-browser load times.",
            "Tuned PostgreSQL with indexes and query refinement, improving repeat request timing during realistic endpoint testing cycles.",
            "Deployed on AWS using EC2, RDS, S3, and CloudFront, validating end-to-end flows before public demos.",
        ],
        problem:
            "Students and employers had no shared workflow platform — collaboration was manual, unreliable, and collapsed under realistic load. The platform needed to handle concurrent multi-user sessions with structured flows and visible status at every step.",
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
            "~99.9% uptime across demo period — zero outages on AWS (EC2 + RDS + S3 + CloudFront).",
            "Server-side pagination + filtering reduced payload transfers ~40%, improving UI rendering for large datasets.",
            "Role-based access secured with AWS Cognito — students and employers on fully separate, secure flows.",
            "Modular React architecture cut feature delivery time ~40% across sprint cycles.",
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
            github: "https://github.com/Ykadam006",
            caseStudy: "/projects/iscp",
        },
    },
    {
        slug: "applyvibe",
        bentoLabel: "Full-Stack · SaaS",
        title: "ApplyVibe — Job Application Tracker",
        subtitle: "Free-first full-stack SaaS for job seekers — Kanban pipeline, analytics dashboard, smart insights, and Auth.js auth. Built with Next.js 16, Prisma, and Neon PostgreSQL.",
        date: "Mar 2026",
        category: "Full-stack" as ProjectCategory,
        stack: ["Next.js 16", "Auth.js v5", "Prisma", "Neon PostgreSQL", "Tailwind CSS", "Recharts", "dnd-kit"],
        metrics: ["8 app pages + 6 API routes", "11 Kanban stages", "5 DB models", "0 TypeScript errors"],
        bullets: [
            "Built full Auth.js v5 authentication with bcrypt (12 rounds), JWT sessions, and Next.js 16 proxy middleware — protecting all routes with zero client-side flash.",
            "Implemented full CRUD for job applications with Zod validation on both client and server, optimistic UI updates, and toast notifications.",
            "Built a dnd-kit Kanban board across 11 stages (Saved → Offer) with PointerSensor drag, live PATCH API calls on drop, and a split KanbanCard/KanbanOverlay to fix dnd-kit duplicate ID bugs.",
            "Delivered an analytics dashboard with 6 KPI cards, pipeline funnel chart, weekly trend line, source performance bars, and work mode distribution — all via Recharts.",
            "Engineered a rule-based Smart Insights engine surfacing low response rate warnings, overdue follow-ups, referral vs. LinkedIn comparison, and OA bottleneck detection from real user data.",
        ],
        problem:
            "Job seekers applying to hundreds of roles had no clean, free tool to track applications, visualize their pipeline, or understand what was and wasn't working. Existing tools were paid, overly complex, or just spreadsheets.",
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
            github: "https://github.com/Ykadam006",
            caseStudy: "",
        },
    },
    {
        slug: "dailyhabitz",
        bentoLabel: "Full-Stack · Next.js",
        title: "DailyHabitz — Habit Tracker",
        subtitle: "Full-stack habit tracker with 4 accessible Next.js screens, 11 Express routes, CI/CD automation, and 50+ reusable frontend modules.",
        date: "May 2025",
        category: "Full-stack" as ProjectCategory,
        stack: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB Atlas"],
        metrics: ["11 Express routes", "50+ reusable modules", "CI/CD via GitHub Actions", "4 accessible screens"],
        bullets: [
            "Shipped four responsive and accessible frontend screens using Next.js (App Router), translating Figma prototypes into semantic HTML, Tailwind CSS, and client-side JavaScript interactions.",
            "Implemented 11 Express routes supporting authentication and habits — enabling CRUD, completion tracking, token refresh, and logout.",
            "Added three Next.js API routes for proxying and health checks, stabilizing requests during deployments and failures.",
            "Organized 50+ reusable frontend modules alongside 20 backend modules — structuring controllers, middleware, models, and UI components for maintainability.",
            "Automated CI with GitHub Actions lint, type, and build checks, preventing broken releases during frequent merges.",
        ],
        problem:
            "Habit tracking fails when flows are complicated or progress feels invisible. Users need dead-simple CRUD with meaningful visual feedback on streaks and completions.",
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
            github: "https://github.com/Ykadam006",
            caseStudy: "/projects/dailyhabitz",
        },
        techStack: [
            "Next.js 15 (App Router)", "React", "TypeScript", "Tailwind CSS",
            "Node.js", "Express.js", "MongoDB Atlas", "Mongoose",
            "JWT", "NextAuth concepts", "GitHub Actions",
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
            github: "https://github.com/Ykadam006",
            caseStudy: "",
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
            github: "https://github.com/Ykadam006",
            caseStudy: "",
        },
        techStack: ["Python", "UMLS", "SNOMED CT", "MetaMap"],
        hideFromAll: true,
    },
] as const;

/** Core experience: internships / real professional work */
export const experienceCore = [
    {
        title: "Web Design & Development Manager Intern",
        org: "Council of International Programs (CIP Chicago)",
        meta: "Feb 2026 – Present · Chicago, IL",
        current: true,
        bullets: [
            "Audited 30+ pages across two WordPress sites using a content-audit spreadsheet — identified unclear messaging, repetition, broken flow, and readability blockers, and provided recommendations that guided content revisions, enhancing semantic HTML and accessibility (ARIA/WCAG).",
            "Logged 12–15 issues in a centralized tracker with page links, priority, owner, and recommended fix — enabling the team to resolve high-priority items within two weeks.",
            "Executed WordPress updates to correct typos, adjust headings, fix spacing, refine menus, and improve CTAs, increasing consistency across key pages.",
            "Baseline-tested accessibility, performance, and SEO using Lighthouse — rerunning audits after changes to confirm measurable progress.",
            "Authored a staff-friendly maintenance guide for pages, blogs, and forms — reducing layout breaks during routine non-technical updates.",
        ],
    },
    {
        title: "UI/UX Developer Intern",
        org: "Looks For Lease Technologies Inc.",
        meta: "Jun 2025 – Aug 2025 · Remote (California)",
        current: false,
        bullets: [
            "Developed an internal admin panel in Next.js with TypeScript and JavaScript (ES6+), enabling operations teams to manage orders, products, and payments — streamlining workflows and reducing manual processing.",
            "Delivered 12 merged pull requests across sprint cycles, completing 1–3 tasks per week — accelerating feature rollout and reducing the development backlog.",
            "Crafted reusable tables, forms, and modals with standardized loading and error states, keeping six admin modules visually and functionally consistent.",
            "Wired UI to RESTful APIs using typed models and shared utilities — maintaining stability during frequent backend payload changes.",
            "Strengthened form submissions with validation, inline errors, and confirmations — reducing avoidable mistakes during bulk admin actions.",
            "Collaborated in Agile ceremonies using JIRA and Figma with engineers and designers — aligning work to tickets and acceptance criteria, ensuring timely delivery and reduced rework.",
        ],
    },
    {
        title: "Web Developer Intern",
        org: "Abhyaz",
        meta: "Jan 2024 – Jul 2024 · Chennai, India",
        current: false,
        bullets: [
            "Produced responsive landing pages using HTML, CSS, and JavaScript — ensuring consistent layouts across mobile, tablet, and desktop with cross-browser compatibility.",
            "Standardized reusable sections and styling patterns to accelerate page assembly and reduce rework across frequent iterations.",
            "Managed Zoho Sites, CRM, and chat updates with stakeholders — publishing accurate content under weekly approval deadlines.",
            "Traced UI bugs and broken links using browser developer tools — validating fixes and ensuring clean handoffs to teams.",
        ],
    },
] as const;

/** Additional experience: on-campus / TA / parallel work */
export const experienceAdditional = [
    {
        title: "Go-To-Market Associate — Project Talon",
        org: "Kaplan Institute, Illinois Tech",
        meta: "Feb 2026 – Present",
        current: true,
        bullets: [
            "Driving student adoption via campus outreach and peer campaigns.",
            "Tracking awareness → signup → profile completion funnel weekly.",
            "Supporting employer onboarding toward a 50-employer target.",
        ],
    },
    {
        title: "Elevate Cohort Manager",
        org: "Career Services, Illinois Tech",
        meta: "Jul 2025 – Present",
        current: true,
        bullets: [
            "Supporting academic and career outcomes for 100+ students.",
            "Mentored 2 Student Success Coaches.",
            "Improved engagement and retention ~35% through targeted follow-up strategies.",
        ],
    },
    {
        title: "Teaching Assistant — Business Innovation (ITMM-482/582)",
        org: "ITM Dept, Illinois Tech",
        meta: "Aug 2025 – Dec 2025",
        current: false,
        bullets: [
            "Mentored 20+ students on prototyping, UX experimentation, and solution demos.",
            "Created structured checklists that reduced iteration time by ~30%.",
        ],
    },
] as const;

/** Education */
export const education = [
    {
        title: "M.A.S. Information Technology & Management (ITM)",
        org: "Illinois Institute of Technology (Illinois Tech)",
        meta: "Expected May 2026 · GPA: 4.0/4.0 · Chicago, IL",
        bullets: [
            "Relevant Coursework: Full-Stack Web Development, Front-End Web Development, Web Application Foundations, Human-Computer Interaction, Object-Oriented App Dev, Database Management, Cloud Computing, Agile/Scrum",
        ],
    },
    {
        title: "B.Tech, Computer Science & Engineering",
        org: "MIT ADT University",
        meta: "Oct 2023 · Pune, India",
        bullets: [],
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

/** 3-tier pill system: 1=Daily Driver, 2=Strong, 3=Learning */
export const skillsTiered = [
    // ─── Tier 1 — Daily Driver ───────────────────────────────────────────
    { name: "React", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "Next.js (App Router)", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "TypeScript", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "Tailwind CSS", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "JavaScript (ES6+)", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "HTML5 / CSS3", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "Accessibility (ARIA/WCAG)", tier: 1 as const, categories: ["Frontend" as const, "Design" as const] },
    { name: "REST APIs", tier: 1 as const, categories: ["Backend" as const] },
    { name: "Git / GitHub", tier: 1 as const, categories: ["Backend" as const] },
    { name: "Figma → code", tier: 1 as const, categories: ["Design" as const] },
    // ─── Tier 2 — Strong ─────────────────────────────────────────────────
    { name: "Node.js / Express", tier: 2 as const, categories: ["Backend" as const] },
    { name: "MongoDB Atlas", tier: 2 as const, categories: ["Backend" as const] },
    { name: "PostgreSQL", tier: 2 as const, categories: ["Backend" as const] },
    { name: "Spring Boot", tier: 2 as const, categories: ["Backend" as const] },
    { name: "Java", tier: 2 as const, categories: ["Backend" as const] },
    { name: "SQL", tier: 2 as const, categories: ["Backend" as const] },
    { name: "JWT / Auth", tier: 2 as const, categories: ["Backend" as const] },
    { name: "AWS Cognito", tier: 2 as const, categories: ["Cloud" as const, "Backend" as const] },
    { name: "AWS (EC2, S3, RDS, CloudFront)", tier: 2 as const, categories: ["Cloud" as const] },
    { name: "GitHub Actions (CI/CD)", tier: 2 as const, categories: ["Cloud" as const] },
    { name: "Vite", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "React Router", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Framer Motion", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "GSAP", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Chart.js", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Leaflet / react-leaflet", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Axios", tier: 2 as const, categories: ["Frontend" as const, "Backend" as const] },
    { name: "Shadcn/UI", tier: 2 as const, categories: ["Frontend" as const, "Design" as const] },
    { name: "Responsive UI / Media Queries", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Vitest + Testing Library", tier: 2 as const, categories: ["Testing" as const] },
    { name: "Playwright (E2E)", tier: 2 as const, categories: ["Testing" as const] },
    { name: "MSW (Mock Service Worker)", tier: 2 as const, categories: ["Testing" as const] },
    { name: "Jest / Supertest", tier: 2 as const, categories: ["Testing" as const] },
    { name: "Postman", tier: 2 as const, categories: ["Testing" as const] },
    { name: "Lighthouse (a11y/perf/SEO)", tier: 2 as const, categories: ["Testing" as const] },
    { name: "Chrome DevTools", tier: 2 as const, categories: ["Testing" as const] },
    { name: "Agile / Scrum / JIRA", tier: 2 as const, categories: ["Design" as const] },
    // ─── Tier 3 — Learning ───────────────────────────────────────────────
    { name: "tRPC", tier: 3 as const, categories: ["Backend" as const] },
    { name: "Prisma", tier: 3 as const, categories: ["Backend" as const] },
    { name: "Supabase", tier: 3 as const, categories: ["Backend" as const] },
    { name: "Redis", tier: 3 as const, categories: ["Backend" as const] },
    { name: "Zustand", tier: 3 as const, categories: ["Frontend" as const] },
    { name: "React Query", tier: 3 as const, categories: ["Frontend" as const] },
    { name: "Vue.js", tier: 3 as const, categories: ["Frontend" as const] },
    { name: "Golang", tier: 3 as const, categories: ["Backend" as const] },
    { name: "Python / Flask", tier: 3 as const, categories: ["Backend" as const] },
    { name: "Kubernetes / OpenShift", tier: 3 as const, categories: ["Cloud" as const] },
    { name: "Edge Runtime", tier: 3 as const, categories: ["Cloud" as const] },
] as const;

/** Legacy skills for homepage — keep for backward compatibility */
export const skills = {
    "Daily / strongest": ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", "HTML5 / CSS3", "Accessibility (ARIA/WCAG)", "Figma-to-code"],
    "Backend & Data": ["Node.js / Express", "Spring Boot", "REST APIs", "MongoDB Atlas", "PostgreSQL", "SQL", "JWT / Auth", "AWS Cognito"],
    "Testing & Tooling": ["Vitest", "Playwright", "MSW", "Jest", "Postman", "Lighthouse", "Chrome DevTools", "ESLint / Prettier / Husky"],
    "Cloud & DevOps": ["AWS (EC2, S3, RDS, CloudFront)", "GitHub Actions (CI/CD)", "Vite", "Vercel / Netlify / Render"],
    "Design & Motion": ["Figma / FigJam", "Framer Motion", "GSAP", "Lottie", "Lenis", "Shadcn/UI", "Chart.js", "Leaflet"],
} as const;

/** Signature strengths as mini cards with proof */
export const signatureStrengthCards = [
    {
        title: "Figma → production speed",
        proof: "Translated Figma flows into fully wired React components at LFL — delivered 12 merged PRs across sprint cycles, cutting design-to-dev rework by ~35% across 6 admin modules.",
    },
    {
        title: "Component architecture",
        proof: "Built one reusable table/form/modal system at LFL reused across all 6 admin modules with standardized loading, empty, and error states — zero duplicated UI code.",
    },
    {
        title: "API performance & database tuning",
        proof: "Cut ISCP API latency ~30% by adding PostgreSQL indexes, refining queries, and implementing server-side pagination + filtering — reduced payload transfers ~40%.",
    },
    {
        title: "Accessible, tested UI",
        proof: "Lighthouse a11y audits on every project — semantic HTML, ARIA roles, keyboard nav. Full Vitest + Playwright + MSW test suites enforced via GitHub Actions CI on every PR.",
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
