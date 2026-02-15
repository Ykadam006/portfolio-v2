export const site = {
    name: "Yogesh Kadam",
    role: "Frontend Engineer / Full-Stack (UI-focused)",
    location: "Chicago, IL",
    email: "ykadam1@hawk.illinoistech.edu",
    phone: "+1 (312) 978-9696",
    links: {
        linkedin: "https://www.linkedin.com/in/yogi006/",
        github: "https://github.com/Ykadam006",
        resume: "/resume.pdf",
    },
    headline:
        "UI-focused full-stack developer crafting fast, polished, production-ready web experiences.",
    summary:
        "I build responsive, accessible interfaces using Next.js (App Router), React, TypeScript, and Tailwind, integrating clean frontends with REST APIs and shipping features through structured PR + CI workflows.",
    proofChips: [
        "35% less repeated UI work",
        "40% less rework (design → dev alignment)",
        "25–30% higher completion rate",
        "30% lower API latency",
        "99.9% uptime",
        "3× faster iterations",
    ],
    replyNote: "I reply within 24 hours.",
    openToRoles: "Open to Frontend / Full-stack roles.",
    howIWork: [
        "Figma → production UI systems",
        "API integration + debugging + performance checks",
        "Accessibility + clean component architecture",
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
            "Multi-user workflows were slow and hard to track, especially under load. Teams needed clear, fast, reliable status visibility and structured flows.",
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
            "Reduced API latency by ~30% under load.",
            "Maintained ~99.9% uptime (demo/production period).",
            "Improved delivery speed by ~40% through reusable patterns.",
        ],
        improveNext:
            "Add deeper observability (metrics/tracing), caching/optimistic UI for perceived speed, expand automated regression tests.",
        links: {
            live: "https://dj3eozung04ja.cloudfront.net/",
            github: "https://github.com/Ykadam006",
            caseStudy: "/projects/iscp",
        },
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
    },
    {
        slug: "ghumakad",
        bentoLabel: "Frontend · React",
        title: "Ghumakad — Travel Website",
        subtitle: "Responsive travel website with dynamic UI components and clean UX polish.",
        date: "Dec 2024",
        category: "Frontend" as ProjectCategory,
        stack: ["React", "CSS", "JavaScript"],
        metrics: ["Responsive UI + UX polish"],
        bullets: [
            "Mobile-first responsive layout with modern UI sections.",
            "Interactive components for better exploration and engagement.",
            "Clean design system for consistent spacing & readability.",
        ],
        problem: "Travel sites often feel cluttered and hard to navigate on mobile.",
        solution:
            "Built a responsive UI with dynamic components and clear visual hierarchy.",
        architecture: {
            frontend: "React + HTML/CSS/JavaScript",
            backend: "Static / client-side",
            infra: "Deployed",
        },
        keyFeatures: [
            "Responsive layout",
            "Interactive exploration",
            "Consistent design system",
        ],
        challenges: "Balancing visual richness with load performance on mobile.",
        designNote: "Emphasized whitespace and clear hierarchy for scannable content.",
        impact: ["Clean, responsive UI that works across devices."],
        improveNext: "Add search/filters, booking flow integration.",
        links: {
            live: "#",
            github: "https://github.com/Ykadam006",
            caseStudy: "",
        },
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
    },
] as const;

/** Core experience: internships / real professional work */
export const experienceCore = [
    {
        title: "UI/UX Developer Intern",
        org: "Looks For Lease Technologies Inc.",
        meta: "Jun 2025 – Aug 2025 · Remote",
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
        meta: "Jan 2024 – Apr 2024 · Chennai, India",
        bullets: [
            "Delivered multiple responsive web pages/features and improved cross-browser UI consistency.",
            "Resolved UI bugs and supported stable deployments/maintenance.",
        ],
    },
] as const;

/** Additional experience: on-campus / TA / parallel work */
export const experienceAdditional = [
    {
        title: "Elevate Cohort Manager",
        org: "Career Services, Illinois Tech",
        meta: "Jul 2025 – Present · Chicago, IL",
        bullets: [
            "Supported student engagement programs and operational workflows for cohort success.",
            "Coordinated communications and follow-ups to improve participation consistency.",
        ],
    },
    {
        title: "Teaching Assistant – Business Innovation (ITMM-482/582)",
        org: "Illinois Institute of Technology",
        meta: "Aug 2025 – Dec 2025 · Chicago, IL",
        bullets: [
            "Mentored student teams on innovation, pitch structure, and iteration.",
            "Built templates/checklists to reduce repeated work and improve delivery consistency.",
        ],
    },
    {
        title: "Go-To-Market Associate",
        org: "Project Talon (Kaplan Institute Agent Hub)",
        meta: "Feb 2026 – Present",
        bullets: [
            "Created outreach templates, flyers, and intake form workflows to support student adoption.",
            "Coordinated communication loops between stakeholders to improve clarity and execution.",
        ],
    },
] as const;

/** Leadership & Activities */
export const leadershipActivities = [
    {
        title: "Marketing & Communications Chair",
        org: "Project Management Excellence (PME) Club, Illinois Tech",
        meta: "Nov 2024 – Present",
        bullets: [
            "Led marketing and communications for club initiatives, event promotion, and member engagement.",
        ],
    },
    {
        title: "Student Leadership (Volunteer)",
        org: "PMI Chicagoland",
        meta: "Sep 2025 – Present",
        bullets: [
            "Supported professional community events and student leadership initiatives.",
        ],
    },
    {
        title: "Photography Team Member",
        org: "Indian Student Association (ISA), Illinois Tech",
        meta: "Jan 2025 – Present",
        bullets: [
            "Captured and edited event photos/videos and helped improve social engagement through content.",
        ],
    },
] as const;

export const experience = [...experienceCore, ...experienceAdditional] as const;

export const skills = {
    "Daily / strongest": [
        "React",
        "Next.js (App Router)",
        "TypeScript",
        "Tailwind CSS",
        "HTML/CSS",
        "UI/UX (Figma-to-code)",
        "Accessibility (WCAG/ARIA)",
    ],
    "Backend & Data": [
        "Node.js / Express",
        "REST APIs",
        "MongoDB",
        "SQL / PostgreSQL",
        "Spring Boot",
    ],
    "Tools / workflow": [
        "Git & GitHub",
        "CI/CD (GitHub Actions)",
        "Postman",
        "Vercel / Netlify / Render",
        "AWS fundamentals",
    ],
} as const;

export const signatureStrengths = [
    "Figma-to-code speed",
    "Component architecture",
    "Debugging + performance",
    "Accessibility & clean UX",
] as const;
