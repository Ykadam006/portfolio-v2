"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/container";
import { SkillsOrbit } from "@/components/skills-orbit";
import { skillsTiered, signatureStrengthCards, currentlyLearning } from "@/lib/site-data";
import {
    siReact, siNextdotjs, siTypescript, siTailwindcss, siFigma,
    siNodedotjs, siExpress, siMongodb, siPostgresql, siSpring,
    siGithub, siGithubactions, siPostman, siVercel, siRender,
    siNetlify, siGooglechrome,
    // "Show more" set
    siPrisma, siFlask, siZod, siVite, siReactrouter, siFramer,
    siGreensock, siChartdotjs, siLeaflet, siRadixui, siVitest,
    siMockserviceworker, siJest, siWordpress, siJira,
} from "simple-icons";
import {
    Accessibility, Globe, Cloud, Component,
    Lock, ShieldCheck, TestTube2, Gauge, Box, Coffee, ChevronDown,
} from "lucide-react";

type SimpleIcon = { title: string; hex: string; path: string };
type LucideIcon = React.FC<{ className?: string; size?: number }>;

/* Map skill names → Lucide icon (for skills without a matching simple-icon) */
const LUCIDE_ICON: Record<string, LucideIcon> = {
    "UI Systems":       Component,
    "Accessibility":    Accessibility,
    "REST APIs":        Globe,
    "AWS":              Cloud,
    "Java":             Coffee,
    "JWT / Auth":       Lock,
    "AWS Cognito":      ShieldCheck,
    "Playwright (E2E)": TestTube2,
    "Lighthouse":       Gauge,
    "Zustand":          Box,
};

/* Map skill names → their simple-icon */
const SKILL_ICON: Record<string, SimpleIcon> = {
    // Daily Drivers
    "React":            siReact,
    "Next.js":          siNextdotjs,
    "TypeScript":       siTypescript,
    "Tailwind CSS":     siTailwindcss,
    "Figma → code":     siFigma,
    // Production Experience
    "Node.js":          siNodedotjs,
    "Express":          siExpress,
    "MongoDB":          siMongodb,
    "SQL / PostgreSQL": siPostgresql,
    "Spring Boot":      siSpring,
    "GitHub":           siGithub,
    "CI/CD (GitHub Actions)": siGithubactions,
    "Postman":          siPostman,
    "Vercel":           siVercel,
    "Render":           siRender,
    "Netlify":          siNetlify,
    "Chrome DevTools":  siGooglechrome,
    // Show more
    "Prisma":           siPrisma,
    "Python / Flask":   siFlask,
    "Zod":              siZod,
    "Vite":             siVite,
    "React Router":     siReactrouter,
    "Framer Motion":    siFramer,
    "GSAP":             siGreensock,
    "Chart.js":         siChartdotjs,
    "Leaflet":          siLeaflet,
    "Shadcn/UI":        siRadixui,
    "Vitest + Testing Library": siVitest,
    "MSW":              siMockserviceworker,
    "Jest / Supertest": siJest,
    "WordPress":        siWordpress,
    "Agile / Scrum / JIRA": siJira,
};

/* Map skill names → project slugs it was used in */
const SKILL_PROJECTS: Record<string, { title: string; href: string }[]> = {
    "React": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "BridgeCare", href: "/projects/bridgecare" },
        { title: "SafeShelf", href: "/projects/safeshelf" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "Next.js": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "BridgeCare", href: "/projects/bridgecare" },
        { title: "SkillForge", href: "/projects/skillforge" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "TypeScript": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "BridgeCare", href: "/projects/bridgecare" },
        { title: "SafeShelf", href: "/projects/safeshelf" },
        { title: "SkillForge", href: "/projects/skillforge" },
    ],
    "Tailwind CSS": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "BridgeCare", href: "/projects/bridgecare" },
        { title: "SafeShelf", href: "/projects/safeshelf" },
        { title: "SkillForge", href: "/projects/skillforge" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "UI Systems": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "This portfolio", href: "/" },
    ],
    "Accessibility": [
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
        { title: "CIP Chicago", href: "/experience" },
    ],
    "Figma → code": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
    ],
    "Node.js": [
        { title: "SafeShelf", href: "/projects/safeshelf" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "Express": [
        { title: "SafeShelf", href: "/projects/safeshelf" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "REST APIs": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "MongoDB": [{ title: "DailyHabitz", href: "/projects/dailyhabitz" }],
    "SQL / PostgreSQL": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "SafeShelf", href: "/projects/safeshelf" },
        { title: "SkillForge", href: "/projects/skillforge" },
    ],
    "Spring Boot": [{ title: "ISCP", href: "/projects/iscp" }],
    "GitHub": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "ISCP", href: "/projects/iscp" },
    ],
    "CI/CD (GitHub Actions)": [
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "SafeShelf", href: "/projects/safeshelf" },
    ],
    "Postman": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "Vercel": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "SafeShelf", href: "/projects/safeshelf" },
    ],
    "Render": [{ title: "DailyHabitz", href: "/projects/dailyhabitz" }],
    "Netlify": [{ title: "Ghumakkad", href: "/projects/ghumakad" }],
    "AWS": [{ title: "ISCP", href: "/projects/iscp" }],
    "Chrome DevTools": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "Looks For Lease", href: "/experience" },
    ],
    // Show more
    "Java": [{ title: "ISCP", href: "/projects/iscp" }],
    "Prisma": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "SafeShelf", href: "/projects/safeshelf" },
        { title: "SkillForge", href: "/projects/skillforge" },
    ],
    "Python / Flask": [{ title: "BridgeCare", href: "/projects/bridgecare" }],
    "JWT / Auth": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "Zod": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "SafeShelf", href: "/projects/safeshelf" },
    ],
    "AWS Cognito": [{ title: "ISCP", href: "/projects/iscp" }],
    "Vite": [
        { title: "SafeShelf", href: "/projects/safeshelf" },
        { title: "Ghumakkad", href: "/projects/ghumakad" },
    ],
    "React Router": [
        { title: "Ghumakkad", href: "/projects/ghumakad" },
        { title: "SafeShelf", href: "/projects/safeshelf" },
    ],
    "Zustand": [
        { title: "SkillForge", href: "/projects/skillforge" },
        { title: "BridgeCare", href: "/projects/bridgecare" },
    ],
    "Framer Motion": [{ title: "This portfolio", href: "/" }],
    "GSAP": [
        { title: "This portfolio", href: "/" },
        { title: "Ghumakkad", href: "/projects/ghumakad" },
    ],
    "Chart.js": [{ title: "Ghumakkad", href: "/projects/ghumakad" }],
    "Leaflet": [
        { title: "Ghumakkad", href: "/projects/ghumakad" },
        { title: "BridgeCare", href: "/projects/bridgecare" },
    ],
    "Shadcn/UI": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "SkillForge", href: "/projects/skillforge" },
    ],
    "Vitest + Testing Library": [
        { title: "SkillForge", href: "/projects/skillforge" },
        { title: "Ghumakkad", href: "/projects/ghumakad" },
    ],
    "Playwright (E2E)": [{ title: "SkillForge", href: "/projects/skillforge" }],
    "MSW": [{ title: "Ghumakkad", href: "/projects/ghumakad" }],
    "Lighthouse": [{ title: "CIP Chicago", href: "/experience" }],
    "WordPress": [{ title: "CIP Chicago", href: "/experience" }],
};

const DOTS_FOR_TIER: Record<number, number> = { 1: 3, 2: 2 };

function ProficiencyDots({ tier }: { tier: 1 | 2 }) {
    const filled = DOTS_FOR_TIER[tier] ?? 1;
    return (
        <div className="flex items-center gap-0.5" aria-label={`Proficiency: ${filled}/3`}>
            {[1, 2, 3].map((d) => (
                <span
                    key={d}
                    className={`h-1.5 w-1.5 rounded-full ${d <= filled ? "bg-brand" : "bg-muted-foreground/30"}`}
                />
            ))}
        </div>
    );
}

type Skill = (typeof skillsTiered)[number];

function SkillIconCard({ skill, index = 0 }: { skill: Skill; index?: number }) {
    const [hovered, setHovered] = useState(false);
    const icon = SKILL_ICON[skill.name];
    const LucideIconComp = LUCIDE_ICON[skill.name];
    const projects = SKILL_PROJECTS[skill.name];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.2, delay: Math.min(index * 0.025, 0.3) }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative card p-3 sm:p-4 flex flex-col items-center gap-2 text-center cursor-default hover:border-brand/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
            {/* Icon — monochrome by default, brand pink on hover */}
            <div className="h-11 w-11 rounded-xl flex items-center justify-center bg-muted/60 text-muted-foreground group-hover:text-brand transition-colors duration-200">
                {LucideIconComp ? (
                    <LucideIconComp size={22} />
                ) : icon ? (
                    <svg
                        role="img"
                        viewBox="0 0 24 24"
                        width={26}
                        height={26}
                        fill="currentColor"
                        aria-label={icon.title}
                    >
                        <path d={icon.path} />
                    </svg>
                ) : (
                    <span className="text-xs font-bold">
                        {skill.name.slice(0, 2).toUpperCase()}
                    </span>
                )}
            </div>

            <span className="text-[11px] font-medium leading-snug line-clamp-2 w-full">
                {skill.name}
            </span>

            <ProficiencyDots tier={skill.tier} />

            {/* Project tooltip */}
            <AnimatePresence>
                {hovered && projects && projects.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 w-max max-w-[180px] rounded-xl border border-border bg-card/95 backdrop-blur-sm shadow-xl px-3 py-2.5"
                    >
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                            used in
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {projects.map((p) => (
                                <Link
                                    key={p.href}
                                    href={p.href}
                                    className="text-[11px] font-medium text-brand hover:underline underline-offset-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {p.title}
                                </Link>
                            ))}
                        </div>
                        {/* Arrow */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function TierDots({ filled }: { filled: number }) {
    return (
        <div className="flex gap-1" title={`Proficiency: ${filled}/3`}>
            {[1, 2, 3].map((d) => (
                <span
                    key={d}
                    className={`h-1.5 w-1.5 rounded-full ${d <= filled ? "bg-brand" : "bg-muted-foreground/30"}`}
                />
            ))}
        </div>
    );
}

const isHidden = (s: Skill) => "hidden" in s && s.hidden === true;
const dailyDrivers = skillsTiered.filter((s) => s.tier === 1);
const productionSkills = skillsTiered.filter((s) => s.tier === 2 && !isHidden(s));
const moreTools = skillsTiered.filter(isHidden);

export default function SkillsPage() {
    const [showMore, setShowMore] = useState(false);

    return (
        <section className="section">
            <Container>
                {/* Header — orbit is decorative, desktop-only */}
                <div className="flex items-center justify-between gap-8">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                            what i build with
                        </p>
                        <h1 className="h1">Skills</h1>
                        <p className="p mt-3 max-w-2xl">
                            A focused stack for building modern, accessible UIs and reliable full-stack workflows.
                        </p>
                    </div>
                    <div className="hidden lg:block shrink-0">
                        <SkillsOrbit />
                    </div>
                </div>

                <div className="mt-12 space-y-12">
                    {/* Daily Drivers */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                Daily Drivers
                            </h2>
                            <TierDots filled={3} />
                        </div>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                            {dailyDrivers.map((s, i) => (
                                <SkillIconCard key={s.name} skill={s} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* Production Experience */}
                    <div>
                        <div className="flex items-center gap-3 mb-5">
                            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                Production Experience
                            </h2>
                            <TierDots filled={2} />
                        </div>
                        <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                            {productionSkills.map((s, i) => (
                                <SkillIconCard key={s.name} skill={s} index={i} />
                            ))}
                            <AnimatePresence mode="popLayout">
                                {showMore &&
                                    moreTools.map((s, i) => (
                                        <SkillIconCard key={s.name} skill={s} index={i} />
                                    ))}
                            </AnimatePresence>
                        </motion.div>

                        <button
                            type="button"
                            onClick={() => setShowMore((v) => !v)}
                            aria-expanded={showMore}
                            className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-brand/30 hover:shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        >
                            {showMore ? "Show fewer tools" : `Show ${moreTools.length} more tools`}
                            <ChevronDown
                                className={`h-4 w-4 transition-transform duration-200 ${showMore ? "rotate-180" : ""}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Signature strengths */}
                <div className="mt-16">
                    <h2 className="h2">Signature strengths</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Where I add the most value in product and engineering teams.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {signatureStrengthCards.map((card) => (
                            <div key={card.title} className="card p-5 border-l-2 border-l-brand/40 hover:border-l-brand transition-colors">
                                <h3 className="font-semibold tracking-tight text-foreground">{card.title}</h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.proof}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Currently learning */}
                <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/20 p-6">
                    <p className="text-sm font-medium text-muted-foreground">
                        What I&apos;m actively studying right now:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {currentlyLearning.map((s) => (
                            <span
                                key={s}
                                className="inline-flex items-center gap-2 rounded-xl border border-dashed border-muted-foreground/40 bg-transparent px-3 py-1.5 text-sm text-muted-foreground"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-brand/60" />
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
