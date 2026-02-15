
export const site = {
    name: "Yogesh Kadam",
    role: "Full-Stack / Front-End Developer",
    location: "Chicago, IL",
    email: "ykadam1@hawk.illinoistech.edu",
    phone: "+1 (312) 978-9696",
    links: {
        linkedin: "https://www.linkedin.com/in/yogi006/",
        github: "https://github.com/Ykadam006",
        resume: "/resume.pdf",
    },
    summary:
        "Front-end developer with 1+ year internship experience and 2+ years hands-on project experience building responsive, accessible web interfaces. Skilled in translating Figma into production UIs, integrating front ends with REST APIs, and improving user outcomes through performance-minded development, debugging, and testing.",
    proofChips: [
        "35% faster UI delivery",
        "40% less design-to-dev rework",
        "25–30% higher completion",
        "30% lower API latency",
        "99.9% uptime",
        "3× faster iterations",
    ],
} as const;

export const projects = [
    {
        slug: "iscp",
        title: "Industry–Student Collaboration Platform",
        subtitle: "Multi-user collaboration UI + workflows",
        date: "Dec 2025",
        stack: ["React", "Spring Boot", "PostgreSQL", "AWS"],
        metrics: ["-30% latency", "99.9% uptime", "+40% delivery speed"],
        bullets: [
            "Built multi-user workflow UI in React integrated with REST APIs for dynamic collaboration.",
            "Optimized backend/query paths to reduce API latency by 30% under load and maintain 99.9% uptime.",
            "Designed reusable UI patterns that accelerated module delivery by 40%.",
            "Added charts/visual summaries to improve visibility into activity and workflow status.",
        ],
        links: {
            live: "https://dj3eozung04ja.cloudfront.net/",
            github: "https://github.com/Ykadam006",
            caseStudy: "/projects/iscp",
        },
    },
    {
        slug: "dailyhabitz",
        title: "DailyHabitz",
        subtitle: "Habit tracker with charts + CI/CD",
        date: "May 2025",
        stack: ["Next.js", "TypeScript", "Tailwind", "MongoDB", "Chart.js"],
        metrics: ["100% CRUD flows", "3× faster iterations"],
        bullets: [
            "Built modular UI and reactive form/state patterns to support full CRUD habit workflows.",
            "Integrated progress charts for streaks and completion history.",
            "Automated CI/CD via GitHub Actions enabling faster iteration cycles and reliable deployments.",
        ],
        links: {
            live: "https://dailyhabitz-1.onrender.com/",
            github: "https://github.com/Ykadam006",
            caseStudy: "/projects/dailyhabitz",
        },
    },
] as const;

export const experience = [
    {
        title: "UI/UX Developer Intern",
        org: "Looks For Lease Technologies Inc.",
        meta: "Jun 2025 – Aug 2025 · Remote",
        bullets: [
            "Built reusable React + Next.js + Tailwind components/templates, reducing UI build time by 35%.",
            "Translated Figma specs into responsive production UI, improving alignment by 40% and cutting rework.",
            "Implemented data-driven views + CRUD form flows using hooks, lifting completion rates by 25–30%.",
        ],
    },
    {
        title: "Teaching Assistant – Business Innovation (ITMM-482/582)",
        org: "Illinois Institute of Technology",
        meta: "Aug 2025 – Dec 2025 · Chicago, IL",
        bullets: [
            "Coached 20+ students on prototyping, UX experimentation, and demo storytelling.",
            "Created templates/checklists that reduced iteration time by 30% per project.",
        ],
    },
    {
        title: "Elevate Cohort Manager",
        org: "Career Services, Illinois Tech",
        meta: "Jul 2025 – Present · Chicago, IL",
        bullets: [
            "Supported 100+ students with milestone planning and follow-ups; improved retention by 35%.",
            "Guided Student Success Coaches through prioritization and feedback.",
        ],
    },
    {
        title: "Web Developer Intern",
        org: "Abhyaz",
        meta: "Jan 2024 – Apr 2024 · Chennai, India",
        bullets: [
            "Delivered 5+ responsive websites increasing engagement by 40%.",
            "Fixed 30+ UI/cross-browser issues maintaining 98% uptime.",
        ],
    },
] as const;

export const skills = {
    "Frontend + UI/UX": [
        "React",
        "Next.js (App Router)",
        "TypeScript",
        "Tailwind CSS",
        "Responsive UI",
        "Accessibility (WCAG/ARIA)",
        "Figma",
        "Design systems",
        "Chart.js",
    ],
    "Backend + Data": ["Node.js", "Express.js", "REST APIs", "MongoDB", "SQL", "JWT Auth"],
    "Testing + DevOps": ["Jest", "React Testing Library", "Git/GitHub", "Postman", "CI/CD (GitHub Actions)"],
} as const;
