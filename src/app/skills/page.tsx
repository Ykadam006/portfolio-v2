"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/container";
import {
    skillsTiered,
    skillCategories,
    signatureStrengthCards,
    currentlyLearning,
} from "@/lib/site-data";

const filterTabs = ["All", ...skillCategories] as const;
type FilterTab = (typeof filterTabs)[number];

function matchesFilter(
    skill: (typeof skillsTiered)[number],
    filter: FilterTab
): boolean {
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
                <h1 className="h1">Skills</h1>
                <p className="p mt-4 max-w-2xl">
                    A focused stack for building modern, accessible UIs and reliable full-stack
                    workflows.
                </p>

                {/* Category filter */}
                <div className="mt-10 flex flex-wrap gap-2">
                    {filterTabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setFilter(tab)}
                            className={`relative rounded-xl px-4 py-2 text-sm font-medium transition z-[1] ${
                                filter === tab
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
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

                {/* 3-tier pill system */}
                <div className="mt-8 space-y-10">
                    {/* Tier 1 — Daily Driver */}
                    <div>
                        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            Daily Driver
                        </h2>
                        <motion.div layout className="flex flex-wrap gap-2">
                            <AnimatePresence mode="popLayout">
                                {filteredByTier.tier1.map((s) => (
                                    <motion.span
                                        key={s.name}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        className="rounded-xl border-2 border-foreground/80 bg-background px-4 py-2 text-sm font-medium text-foreground"
                                    >
                                        {s.name}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Tier 2 — Strong */}
                    <div>
                        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            Strong
                        </h2>
                        <motion.div layout className="flex flex-wrap gap-2">
                            <AnimatePresence mode="popLayout">
                                {filteredByTier.tier2.map((s) => (
                                    <motion.span
                                        key={s.name}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        className="rounded-xl border border-border bg-muted/60 px-4 py-2 text-sm font-medium text-muted-foreground"
                                    >
                                        {s.name}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Tier 3 — Learning */}
                    <div>
                        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
                            Learning
                        </h2>
                        <motion.div layout className="flex flex-wrap gap-2">
                            <AnimatePresence mode="popLayout">
                                {filteredByTier.tier3.map((s) => (
                                    <motion.span
                                        key={s.name}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.2 }}
                                        className="rounded-xl border border-dashed border-muted-foreground/50 bg-transparent px-4 py-2 text-sm font-medium text-muted-foreground"
                                    >
                                        {s.name}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {!hasAny && (
                        <p className="text-sm text-muted-foreground py-8">
                            No skills in this category. Try &quot;All&quot;.
                        </p>
                    )}
                </div>

                {/* Signature strengths — 4 mini cards */}
                <div className="mt-16">
                    <h2 className="h2">Signature strengths</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Where I add the most value in product and engineering teams.
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {signatureStrengthCards.map((card) => (
                            <div
                                key={card.title}
                                className="card p-5"
                            >
                                <h3 className="font-semibold tracking-tight text-foreground">
                                    {card.title}
                                </h3>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                                    {card.proof}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Currently learning */}
                <div className="mt-16 rounded-2xl border border-dashed border-border bg-muted/20 p-6">
                    <p className="text-sm font-medium text-muted-foreground">
                        What I&apos;m actively studying right now:
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {currentlyLearning.map((s) => (
                            <span
                                key={s}
                                className="rounded-xl border border-dashed border-muted-foreground/50 bg-transparent px-3 py-1.5 text-sm text-muted-foreground"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
