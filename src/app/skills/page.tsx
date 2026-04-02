"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/container";
import {
    skillsTiered,
    skillCategories,
    signatureStrengthCards,
    currentlyLearning,
} from "@/lib/site-data";
import {
    siReact, siNextdotjs, siTypescript, siTailwindcss,
    siJavascript, siHtml5, siGit, siFigma, siNodedotjs,
    siExpress, siMongodb, siPostgresql, siSpring, siGithubactions,
    siVite, siFramer, siPrisma, siRedis, siVuedotjs, siPython,
    siGo, siGithub, siDocker, siGraphql,
} from "simple-icons";

type SimpleIcon = { title: string; hex: string; path: string };

const USES_CURRENT_COLOR = new Set(["Next.js (App Router)", "GitHub"]);

/* Map skill names → their simple-icon */
const SKILL_ICON: Record<string, SimpleIcon> = {
    "React": siReact,
    "Next.js (App Router)": siNextdotjs,
    "TypeScript": siTypescript,
    "Tailwind CSS": siTailwindcss,
    "JavaScript (ES6+)": siJavascript,
    "HTML5 / CSS3": siHtml5,
    "Git / GitHub": siGit,
    "Figma → code": siFigma,
    "Node.js / Express": siNodedotjs,
    "MongoDB Atlas": siMongodb,
    "PostgreSQL": siPostgresql,
    "Spring Boot": siSpring,
    "GitHub Actions (CI/CD)": siGithubactions,
    "Vite": siVite,
    "Framer Motion": siFramer,
    "Prisma": siPrisma,
    "Redis": siRedis,
    "tRPC": siGraphql,
    "Vue.js": siVuedotjs,
    "Golang": siGo,
    "Python / Flask": siPython,
    "Docker": siDocker,
    "Express": siExpress,
    "GitHub": siGithub,
};

/* Map skill names → project slugs it was used in */
const SKILL_PROJECTS: Record<string, { title: string; href: string }[]> = {
    "React": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "Next.js (App Router)": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "TypeScript": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "Tailwind CSS": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
        { title: "Ghumakkad", href: "/projects/ghumakad" },
    ],
    "JavaScript (ES6+)": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "HTML5 / CSS3": [
        { title: "Ghumakkad", href: "/projects/ghumakad" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "REST APIs": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
    ],
    "Git / GitHub": [
        { title: "ApplyVibe", href: "/projects/applyvibe" },
        { title: "ISCP", href: "/projects/iscp" },
    ],
    "Figma → code": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
    ],
    "Node.js / Express": [{ title: "DailyHabitz", href: "/projects/dailyhabitz" }],
    "MongoDB Atlas": [
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
        { title: "Ghumakkad", href: "/projects/ghumakad" },
    ],
    "PostgreSQL": [
        { title: "ISCP", href: "/projects/iscp" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
    ],
    "Spring Boot": [{ title: "ISCP", href: "/projects/iscp" }],
    "GitHub Actions (CI/CD)": [
        { title: "DailyHabitz", href: "/projects/dailyhabitz" },
        { title: "ApplyVibe", href: "/projects/applyvibe" },
    ],
    "Prisma": [{ title: "ApplyVibe", href: "/projects/applyvibe" }],
    "Framer Motion": [
        { title: "Portfolio", href: "/" },
    ],
};

const DOTS_FOR_TIER: Record<number, number> = { 1: 3, 2: 2, 3: 1 };

function ProficiencyDots({ tier }: { tier: 1 | 2 | 3 }) {
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

function SkillIconCard({ skill }: { skill: Skill }) {
    const [hovered, setHovered] = useState(false);
    const icon = SKILL_ICON[skill.name];
    const projects = SKILL_PROJECTS[skill.name];
    const useCurrentColor = USES_CURRENT_COLOR.has(skill.name);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative card p-3 sm:p-4 flex flex-col items-center gap-2 text-center cursor-default hover:border-brand/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
            {/* Icon or monogram */}
            <div className="h-11 w-11 rounded-xl flex items-center justify-center bg-muted/60">
                {icon ? (
                    <svg
                        role="img"
                        viewBox="0 0 24 24"
                        width={26}
                        height={26}
                        fill={useCurrentColor ? "currentColor" : `#${icon.hex}`}
                        aria-label={icon.title}
                    >
                        <path d={icon.path} />
                    </svg>
                ) : (
                    <span className="text-xs font-bold text-brand">
                        {skill.name.slice(0, 2).toUpperCase()}
                    </span>
                )}
            </div>

            <span className="text-[11px] font-medium leading-snug line-clamp-2 w-full">
                {skill.name}
            </span>

            <ProficiencyDots tier={skill.tier as 1 | 2 | 3} />

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

function SkillPill({ skill }: { skill: Skill }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:border-brand/30 cursor-default ${
                skill.tier === 2
                    ? "border border-border bg-muted/60 text-muted-foreground"
                    : "border border-dashed border-muted-foreground/40 bg-transparent text-muted-foreground"
            }`}
        >
            <ProficiencyDots tier={skill.tier as 1 | 2 | 3} />
            {skill.name}
        </motion.div>
    );
}

const filterTabs = ["All", ...skillCategories] as const;
type FilterTab = (typeof filterTabs)[number];

function matchesFilter(skill: (typeof skillsTiered)[number], filter: FilterTab): boolean {
    if (filter === "All") return true;
    return (skill.categories as readonly string[]).includes(filter);
}

export default function SkillsPage() {
    const [filter, setFilter] = useState<FilterTab>("All");

    const filteredByTier = useMemo(() => {
        const filtered = skillsTiered.filter((s) => matchesFilter(s, filter));
        return {
            tier1: filtered.filter((s) => s.tier === 1),
            tier2: filtered.filter((s) => s.tier === 2),
            tier3: filtered.filter((s) => s.tier === 3),
        };
    }, [filter]);

    const hasAny = filteredByTier.tier1.length > 0 || filteredByTier.tier2.length > 0 || filteredByTier.tier3.length > 0;

    return (
        <section className="section">
            <Container>
                {/* Header */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        what i build with
                    </p>
                    <h1 className="h1">Skills</h1>
                    <p className="p mt-3 max-w-2xl">
                        A focused stack for building modern, accessible UIs and reliable full-stack workflows.
                    </p>
                </div>

                {/* Category filter with sliding pill */}
                <div className="mt-10 flex flex-wrap gap-2">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setFilter(tab)}
                            className={`relative rounded-xl px-4 py-2 text-sm font-medium transition z-[1] ${
                                filter === tab ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                            aria-pressed={filter === tab}
                        >
                            {filter === tab && (
                                <motion.span
                                    layoutId="skill-filter"
                                    className="absolute inset-0 rounded-xl bg-muted border border-border -z-[1]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                />
                            )}
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="mt-10 space-y-12">
                    {/* Tier 1 — Daily Driver: icon grid */}
                    {filteredByTier.tier1.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    Daily Driver
                                </h2>
                                <div className="flex gap-1" title="Proficiency: 3/3">
                                    {[1, 2, 3].map((d) => (
                                        <span key={d} className="h-1.5 w-1.5 rounded-full bg-brand" />
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground">hover for project links</span>
                            </div>
                            <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                                <AnimatePresence mode="popLayout">
                                    {filteredByTier.tier1.map((s) => (
                                        <SkillIconCard key={s.name} skill={s} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}

                    {/* Tier 2 — Strong: pills with dots */}
                    {filteredByTier.tier2.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    Strong
                                </h2>
                                <div className="flex gap-1" title="Proficiency: 2/3">
                                    {[1, 2, 3].map((d) => (
                                        <span key={d} className={`h-1.5 w-1.5 rounded-full ${d <= 2 ? "bg-brand" : "bg-muted-foreground/30"}`} />
                                    ))}
                                </div>
                            </div>
                            <motion.div layout className="flex flex-wrap gap-2">
                                <AnimatePresence mode="popLayout">
                                    {filteredByTier.tier2.map((s) => (
                                        <SkillPill key={s.name} skill={s} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}

                    {/* Tier 3 — Learning: pills with dots */}
                    {filteredByTier.tier3.length > 0 && (
                        <div>
                            <div className="flex items-center gap-3 mb-5">
                                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                    Learning
                                </h2>
                                <div className="flex gap-1" title="Proficiency: 1/3">
                                    {[1, 2, 3].map((d) => (
                                        <span key={d} className={`h-1.5 w-1.5 rounded-full ${d <= 1 ? "bg-brand" : "bg-muted-foreground/30"}`} />
                                    ))}
                                </div>
                            </div>
                            <motion.div layout className="flex flex-wrap gap-2">
                                <AnimatePresence mode="popLayout">
                                    {filteredByTier.tier3.map((s) => (
                                        <SkillPill key={s.name} skill={s} />
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    )}

                    {!hasAny && (
                        <p className="text-sm text-muted-foreground py-8">No skills in this category. Try &quot;All&quot;.</p>
                    )}
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
