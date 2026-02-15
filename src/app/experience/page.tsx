"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { experienceCore, experienceAdditional, leadershipActivities } from "@/lib/site-data";

type Tab = "core" | "additional";

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

                {/* Two-tier tabs */}
                <div
                    className="mt-8 flex gap-1 sm:gap-2 border-b border-border pb-1"
                    role="tablist"
                    aria-label="Experience categories"
                >
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "core"}
                        aria-controls="core-panel"
                        id="core-tab"
                        tabIndex={activeTab === "core" ? 0 : -1}
                        onClick={() => setActiveTab("core")}
                        className={`rounded-t-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                            activeTab === "core"
                                ? "bg-card text-foreground shadow-sm border border-border border-b-transparent -mb-px"
                                : "text-muted-foreground hover:text-foreground hover:underline"
                        }`}
                    >
                        Core (Internships)
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "additional"}
                        aria-controls="additional-panel"
                        id="additional-tab"
                        tabIndex={activeTab === "additional" ? 0 : -1}
                        onClick={() => setActiveTab("additional")}
                        className={`rounded-t-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                            activeTab === "additional"
                                ? "bg-card text-foreground shadow-sm border border-border border-b-transparent -mb-px"
                                : "text-muted-foreground hover:text-foreground hover:underline"
                        }`}
                    >
                        Additional (On-campus / Leadership)
                    </button>
                </div>

                <div
                    className="mt-6 space-y-6"
                    role="tabpanel"
                    id="core-panel"
                    aria-labelledby="core-tab"
                    hidden={activeTab !== "core"}
                >
                    {activeTab === "core" && (
                        <>
                            <p className="text-sm text-muted-foreground">
                                Professional internships and real production work.
                            </p>
                            {experienceCore.map((x) => (
                                <ExperienceCard key={`${x.org}-${x.title}`} {...x} />
                            ))}
                        </>
                    )}
                </div>
                <div
                    className="mt-6 space-y-6"
                    role="tabpanel"
                    id="additional-panel"
                    aria-labelledby="additional-tab"
                    hidden={activeTab !== "additional"}
                >
                    {activeTab === "additional" && (
                        <>
                            <p className="text-sm text-muted-foreground">
                                Teaching, leadership, and campus roles.
                            </p>
                            {experienceAdditional.map((x) => (
                                <ExperienceCard key={`${x.org}-${x.title}`} {...x} />
                            ))}
                            {/* Leadership & Activities */}
                            <div className="mt-10">
                                <h3 className="text-lg font-semibold tracking-tight mb-2">Leadership & Activities</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Club leadership, volunteer work, and campus involvement.
                                </p>
                                <div className="space-y-6">
                                    {leadershipActivities.map((x) => (
                                        <ExperienceCard key={`${x.org}-${x.title}`} {...x} />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Container>
        </section>
    );
}

function ExperienceCard({
    title,
    org,
    meta,
    bullets,
}: {
    title: string;
    org: string;
    meta: string;
    bullets: readonly string[];
}) {
    return (
        <section className="card p-5 sm:p-6">
            <div className="flex flex-col gap-1">
                <h2 className="h2">{title}</h2>
                <p className="text-sm text-muted-foreground">
                    {org} · {meta}
                </p>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
                {bullets.map((b) => (
                    <li key={b}>{b}</li>
                ))}
            </ul>
        </section>
    );
}
