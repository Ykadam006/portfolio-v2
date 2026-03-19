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
        subtitle: "Workflow-driven collaboration platform with scalable UI + optimized APIs.",
        date: "Dec 2025",
        category: "Full-stack" as ProjectCategory,
        stack: ["React", "Spring Boot", "PostgreSQL", "AWS"],
        metrics: ["~30% lower API latency", "~99.9% uptime", "~40% faster delivery"],
        bullets: [
            "Modular React UI integrated with REST APIs for multi-user workflows.",
            "Performance improvements under load (latency + reliability).",
            "Reusable UI patterns that accelerated module delivery.",
        ],
        problem:
            "Students and employers had no shared workflow platform — collaboration was manual, unreliable, and collapsed under realistic load. The platform needed to handle concurrent multi-user sessions with structured flows and visible status at every step.",
        solution:
            "Built a modular React UI integrated with REST APIs. Standardized reusable components and views to ship consistently and quickly.",
        architecture: {
            frontend: "React UI",
            backend: "Spring Boot REST API → PostgreSQL",
            infra: "AWS deployment (CloudFront/S3 or relevant infra)",
        },
        keyFeatures: [
            "Multi-user workflow tracking with real-time status",
            "Charts and visual summaries for activity visibility",
            "Reusable UI patterns for rapid module delivery",
        ],
        challenges:
            "Balancing API responsiveness under concurrent load while keeping the UI snappy. Chose to optimize query paths and add caching layers.",
        designNote:
            "Focused on consistent spacing (8px grid), clear hierarchy for workflow states, and enough whitespace so dense data felt scannable.",
        impact: [
            "Reduced API latency ~30% via PostgreSQL indexes, query rewriting, pagination, server-side filtering, and DTO payload trimming.",
            "~99.9% uptime across demo period — zero outages on AWS (EC2 + RDS + S3 + CloudFront).",
            "Modular React architecture cut feature delivery time ~40% across sprint cycles.",
            "Role-based access secured with AWS Cognito — students and employers on separate flows.",
        ],
        techStack: ["React", "Spring Boot", "PostgreSQL", "AWS", "Cognito", "EC2", "RDS", "CloudFront"],
        featured: true,
        improveNext:
            "Add deeper observability (metrics/tracing), caching/optimistic UI for perceived speed, expand automated regression tests.",
        links: {
            live: "https://dj3eozung04ja.cloudfront.net/",
            github: "https://github.com/Ykadam006",
            caseStudy: "/projects/iscp",
        },
        image: "/projects/iscp.webp",
    },
    {
        slug: "dailyhabitz",
        bentoLabel: "Full-Stack · Next.js",
        title: "DailyHabitz — Habit Tracker",
        subtitle: "Habit tracker with clean CRUD flows, progress analytics, and CI/CD automation.",
        date: "May 2025",
        category: "Full-stack" as ProjectCategory,
        stack: ["Next.js (App Router)", "TypeScript", "Tailwind", "MongoDB", "Chart.js"],
        metrics: ["3× faster iterations", "100% CRUD flows"],
        bullets: [
            "Full CRUD habit workflows with validation-focused UX.",
            "Progress charts (streaks + completion history).",
            "CI/CD pipeline for faster, safer releases.",
        ],
        problem:
            "Habit tracking fails without simple flows and meaningful progress feedback.",
        solution:
            "Built structured CRUD with visual analytics (charts + streaks) and consistent UI components.",
        architecture: {
            frontend: "Next.js App Router + TypeScript + Tailwind",
            backend: "API routes/handlers → MongoDB",
            infra: "Deployed (Vercel/Render)",
        },
        keyFeatures: [
            "Full CRUD for habits with reactive state",
            "Progress charts for streaks and completion",
            "Automated deployments via GitHub Actions",
        ],
        challenges:
            "Keeping chart performance smooth with growing data. Used virtualization and date-range filters to limit rendered points.",
        designNote:
            "Emphasized progress over punishment — charts use soft gradients and clear completion states to feel motivating.",
        impact: [
            "Delivered 100% CRUD flows for habits.",
            "Enabled 3× faster iteration cycles via CI/CD automation.",
        ],
        improveNext:
            "Reminders/notifications, onboarding, offline-first mode, higher test coverage.",
        links: {
            live: "https://dailyhabitz-1.onrender.com/",
            github: "https://github.com/Ykadam006",
            caseStudy: "/projects/dailyhabitz",
        },
        image: "/projects/dailyhabitz.webp",
        techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind", "MongoDB Atlas", "JWT", "GitHub Actions"],
    },
    {
        slug: "ghumakad",
        bentoLabel: "Frontend · React",
        title: "Ghumakad — Travel Planner",
        subtitle: "All-in-one travel planner — itinerary, budget, weather, and destinations in one responsive app.",
        date: "Dec 2024",
        category: "Frontend" as ProjectCategory,
        stack: ["React", "Vite", "Chart.js", "Leaflet", "Axios"],
        metrics: ["14 routed screens", "4 external APIs", "Vitest + MSW"],
        bullets: [
            "14 routed screens across 9 feature modules — itinerary, packing, budget, weather, destinations.",
            "4 external APIs (OpenWeather, Nominatim, OpenTripMap, Wikipedia) integrated via Axios with full error handling.",
            "Vitest + Testing Library + MSW test suite — ESLint, Prettier, Husky pre-commit hooks.",
            "Chart.js budget dashboards from user inputs — interactive cost breakdowns.",
        ],
        problem:
            "Travel planning is scattered across tabs — weather in one, budget in another, itinerary somewhere else. Ghumakkad brings all of it into one responsive planner.",
        solution:
            "Built a responsive travel planner with integrated weather, budget tracking, and destination discovery.",
        architecture: {
            frontend: "React + Vite + Chart.js + Leaflet",
            backend: "Static / client-side + 4 external APIs",
            infra: "Netlify",
        },
        keyFeatures: [
            "Itinerary, packing, budget, weather, destinations",
            "4 API integrations with error handling",
            "Chart.js budget dashboards",
        ],
        challenges: "Integrating multiple APIs with consistent error handling and loading states.",
        designNote: "Emphasized whitespace and clear hierarchy for scannable content.",
        impact: [
            "14 routed screens across 9 feature modules.",
            "4 external APIs integrated with full error handling.",
            "Vitest + Testing Library + MSW test suite.",
            "Chart.js budget dashboards with interactive cost breakdowns.",
        ],
        improveNext: "Add search/filters, booking flow integration.",
        links: {
            live: "https://travelwithghumakkad.netlify.app",
            github: "https://github.com/Ykadam006",
            caseStudy: "",
        },
        image: "/projects/ghumakad.webp",
        techStack: ["React", "Vite", "Chart.js", "Leaflet", "Axios", "4 APIs", "Vitest", "MSW"],
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
        meta: "Feb 2026 – Present · Chicago, IL (Remote)",
        current: true,
        bullets: [
            "Audited 30+ pages across 2 WordPress sites — documented navigation gaps, readability blockers, and broken flows in a centralized tracker with page links and priority ratings.",
            "Delivered improvement roadmap with Lighthouse-tracked benchmarks (performance, a11y, SEO) — ran before/after audits to confirm measurable progress after each sprint.",
            "Authored staff-facing maintenance guide covering pages, blogs, and forms — reduced developer support cycles for non-technical updates.",
        ],
    },
    {
        title: "UI/UX Developer Intern",
        org: "Looks For Lease Technologies Inc.",
        meta: "Jun 2025 – Aug 2025 · Remote",
        current: false,
        bullets: [
            "Built reusable React/Next.js UI components and templates, reducing repetitive UI work by ~35%.",
            "Translated Figma designs into responsive production UI, improving alignment by ~40% and reducing rework.",
            "Implemented data-driven forms and validation improvements, increasing successful completion by ~25–30%.",
            "Integrated front-end workflows with REST APIs and improved overall UX quality.",
        ],
    },
    {
        title: "Web Developer Intern",
        org: "Abhyaz",
        meta: "Jan 2024 – Jul 2024 · Chennai, India",
        current: false,
        bullets: [
            "Delivered multiple responsive web pages/features and improved cross-browser UI consistency.",
            "Resolved UI bugs and supported stable deployments/maintenance.",
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
    { name: "React", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "Next.js 15 (App Router)", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "TypeScript", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "Tailwind CSS", tier: 1 as const, categories: ["Frontend" as const] },
    { name: "REST APIs", tier: 1 as const, categories: ["Backend" as const] },
    { name: "Git / GitHub", tier: 1 as const, categories: ["Backend" as const] },
    { name: "Figma → code", tier: 1 as const, categories: ["Design" as const] },
    { name: "Node.js / Express", tier: 2 as const, categories: ["Backend" as const] },
    { name: "MongoDB Atlas", tier: 2 as const, categories: ["Backend" as const] },
    { name: "PostgreSQL", tier: 2 as const, categories: ["Backend" as const] },
    { name: "Framer Motion", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Lenis", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Chart.js", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Leaflet", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Vitest", tier: 2 as const, categories: ["Testing" as const] },
    { name: "Playwright", tier: 2 as const, categories: ["Testing" as const] },
    { name: "MSW", tier: 2 as const, categories: ["Testing" as const] },
    { name: "GitHub Actions", tier: 2 as const, categories: ["Cloud" as const] },
    { name: "AWS (EC2, S3, RDS)", tier: 2 as const, categories: ["Cloud" as const] },
    { name: "Shadcn/UI", tier: 2 as const, categories: ["Frontend" as const] },
    { name: "Spring Boot", tier: 2 as const, categories: ["Backend" as const] },
    { name: "JWT", tier: 2 as const, categories: ["Backend" as const] },
    { name: "Axios", tier: 2 as const, categories: ["Frontend" as const, "Backend" as const] },
    { name: "tRPC", tier: 3 as const, categories: ["Backend" as const] },
    { name: "Prisma", tier: 3 as const, categories: ["Backend" as const] },
    { name: "Supabase", tier: 3 as const, categories: ["Backend" as const] },
    { name: "Zustand", tier: 3 as const, categories: ["Frontend" as const] },
    { name: "React Query", tier: 3 as const, categories: ["Frontend" as const] },
    { name: "Vercel AI SDK", tier: 3 as const, categories: ["Frontend" as const, "Backend" as const] },
    { name: "Edge Runtime", tier: 3 as const, categories: ["Cloud" as const] },
] as const;

/** Legacy skills for homepage — keep for backward compatibility */
export const skills = {
    "Daily / strongest": ["React", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "HTML/CSS", "UI/UX (Figma-to-code)", "Accessibility (WCAG/ARIA)"],
    "Backend & Data": ["Node.js / Express", "REST APIs", "MongoDB", "SQL / PostgreSQL", "Spring Boot"],
    "Tools / workflow": ["Git & GitHub", "CI/CD (GitHub Actions)", "Postman", "Vercel / Netlify / Render", "AWS fundamentals"],
} as const;

/** Signature strengths as mini cards with proof */
export const signatureStrengthCards = [
    {
        title: "Figma → production speed",
        proof: "Built a shared component library at LFL matched to Figma specs — cut design-to-dev rework by ~35% across 6 admin modules.",
    },
    {
        title: "Component architecture",
        proof: "Built one table/form/modal system reused across all 6 LFL modules — zero duplicated UI code across the entire admin panel.",
    },
    {
        title: "Debugging & performance",
        proof: "Cut ISCP API latency ~30% by adding PostgreSQL indexes, rewriting joins, implementing pagination, and trimming DTO payloads.",
    },
    {
        title: "Accessible UI",
        proof: "Run Lighthouse a11y audits as standard practice — semantic HTML, ARIA roles, keyboard navigation, screen-reader testing on all major flows.",
    },
] as const;

export const signatureStrengths = [
    "Figma-to-code speed",
    "Component architecture",
    "Debugging + performance",
    "Accessibility & clean UX",
] as const;

/** Currently learning — update monthly */
export const currentlyLearning = ["tRPC", "Supabase", "Vercel AI SDK", "React 19 patterns"] as const;
