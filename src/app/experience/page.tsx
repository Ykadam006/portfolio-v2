"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/components/container";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { experienceCore, experienceAdditional, leadershipActivities, education } from "@/lib/site-data";

type Tab = "core" | "additional" | "education";

function ExperienceContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get("tab") as Tab | null;
    const activeTab: Tab = tabParam && ["core", "additional", "education"].includes(tabParam) ? tabParam : "core";

    const setActiveTab = (tab: Tab) => {
        router.replace(tab === "core" ? "/experience" : `/experience?tab=${tab}`, { scroll: false });
    };

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
                    <button
                        type="button"
                        role="tab"
                        aria-selected={activeTab === "education"}
                        aria-controls="education-panel"
                        id="education-tab"
                        tabIndex={activeTab === "education" ? 0 : -1}
                        onClick={() => setActiveTab("education")}
                        className={`rounded-t-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                            activeTab === "education"
                                ? "bg-card text-foreground shadow-sm border border-border border-b-transparent -mb-px"
                                : "text-muted-foreground hover:text-foreground hover:underline"
                        }`}
                    >
                        Education
                    </button>
                </div>

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
                            {/* Leadership & Activities */}
                            <div className="mt-16">
                                <h3 className="text-lg font-semibold tracking-tight mb-2">Leadership & Activities</h3>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Club leadership, volunteer work, and campus involvement.
                                </p>
                                <ExperienceTimeline
                                    items={leadershipActivities}
                                    description=""
                                />
                            </div>
                        </>
                    )}
                </div>
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

export default function ExperiencePage() {
    return (
        <Suspense fallback={
            <section className="section">
                <Container>
                    <h1 className="h1">Experience</h1>
                    <p className="p mt-4 max-w-2xl text-muted-foreground">Loading...</p>
                </Container>
            </section>
        }>
            <ExperienceContent />
        </Suspense>
    );
}
