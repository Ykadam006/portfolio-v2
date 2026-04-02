"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { experienceCore, experienceAdditional, leadershipActivities, education } from "@/lib/site-data";

type Tab = "core" | "additional" | "education";

const TABS = [
    { key: "core"       as const, label: "Internships" },
    { key: "additional" as const, label: "On-campus"   },
    { key: "education"  as const, label: "Education"   },
];

export default function ExperiencePage() {
    const [activeTab, setActiveTab] = useState<Tab>("core");

    return (
        <section className="section">
            <Container>
                <h1 className="h1">Experience</h1>
                <p className="p mt-4 max-w-2xl">
                    Roles where I shipped production UI, improved metrics, and collaborated in
                    Agile teams.
                </p>

                {/* Pill tab system */}
                <div
                    className="mt-8 flex gap-1 p-1 rounded-2xl bg-muted/60 border border-border w-fit"
                    role="tablist"
                    aria-label="Experience categories"
                >
                    {TABS.map(({ key, label }) => (
                        <button
                            key={key}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === key}
                            aria-controls={`${key}-panel`}
                            id={`${key}-tab`}
                            onClick={() => setActiveTab(key)}
                            className={`relative rounded-xl px-4 py-1.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 z-[1] ${
                                activeTab === key ? "text-white" : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {activeTab === key && (
                                <motion.span
                                    layoutId="exp-tab-pill"
                                    className="absolute inset-0 rounded-xl bg-[#0f172a] dark:bg-brand -z-[1]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                />
                            )}
                            {label}
                        </button>
                    ))}
                </div>

                {/* Core — Internships */}
                <div
                    className="mt-6"
                    role="tabpanel"
                    id="core-panel"
                    aria-labelledby="core-tab"
                    hidden={activeTab !== "core"}
                >
                    {activeTab === "core" && (
                        <ExperienceTimeline
                            items={experienceCore.map((x) => ({
                                ...x,
                                current: "current" in x ? x.current : false,
                            }))}
                            description="Professional internships and real production work."
                        />
                    )}
                </div>

                {/* Additional — On-campus / Leadership */}
                <div
                    className="mt-6"
                    role="tabpanel"
                    id="additional-panel"
                    aria-labelledby="additional-tab"
                    hidden={activeTab !== "additional"}
                >
                    {activeTab === "additional" && (
                        <>
                            <ExperienceTimeline
                                items={experienceAdditional}
                                description="Teaching, leadership, and campus roles."
                            />
                            <div className="mt-16">
                                <h3 className="text-lg font-semibold tracking-tight mb-2">Leadership & Activities</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Club leadership, volunteer work, and campus involvement.
                                </p>
                                <ExperienceTimeline items={leadershipActivities} description="" />
                            </div>
                        </>
                    )}
                </div>

                {/* Education */}
                <div
                    className="mt-6"
                    role="tabpanel"
                    id="education-panel"
                    aria-labelledby="education-tab"
                    hidden={activeTab !== "education"}
                >
                    {activeTab === "education" && (
                        <ExperienceTimeline
                            items={education.map((e) => ({
                                title: e.title,
                                org: e.org,
                                meta: e.meta,
                                bullets: e.bullets,
                                current: false,
                            }))}
                            description="Academic background in Computer Science and Information Technology."
                        />
                    )}
                </div>
            </Container>
        </section>
    );
}
