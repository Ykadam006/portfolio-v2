"use client";

import { motion } from "framer-motion";
import type { GitHubCommit } from "@/components/github-last-commit";
import { timeAgo } from "@/components/github-last-commit";
import type { ContributionsData } from "@/lib/github-contributions";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const cell = {
    hidden: { opacity: 0, y: 12 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
};

const STACK_PILLS = ["React", "Next.js", "TypeScript", "Tailwind"];

function getSquareColor(count: number): string {
    if (count === 0) return "bg-muted";
    if (count <= 3) return "bg-brand/25";
    if (count <= 7) return "bg-brand/60";
    return "bg-brand";
}

function ContributionGraph({ data }: { data: ContributionsData }) {
    if (!data) {
        return (
            <div className="flex items-center justify-center h-14 text-xs text-muted-foreground">
                Add GITHUB_TOKEN to show live activity
            </div>
        );
    }

    // Keep last 52 weeks worth of days — pad front to always start on Sunday
    const days = data.days.slice(-364);

    return (
        <div>
            <div
                className="overflow-x-auto"
                style={{
                    display: "grid",
                    gridTemplateRows: "repeat(7, 8px)",
                    gridAutoFlow: "column",
                    gridAutoColumns: "8px",
                    gap: "2px",
                }}
                aria-label="GitHub contribution graph"
            >
                {days.map((day) => (
                    <div
                        key={day.date}
                        title={`${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`}
                        className={`rounded-[2px] ${getSquareColor(day.count)}`}
                    />
                ))}
            </div>
            <p className="mt-2.5 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                    {data.total.toLocaleString()}
                </span>{" "}
                contributions in the last year
            </p>
        </div>
    );
}

export function HeroBento({
    githubCommit,
    contributions,
}: {
    githubCommit?: GitHubCommit;
    contributions?: ContributionsData;
}) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="bento-grid grid gap-3 sm:gap-3.5 w-full"
        >
            {/* Cell 1 — Currently shipping (2 cols) */}
            <motion.div
                variants={cell}
                className="card p-3 sm:p-5 min-h-[100px] transition-colors hover:border-white/25 [grid-area:shipping]"
            >
                <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Currently shipping
                    </span>
                </div>
                <p className="text-sm font-medium leading-snug">
                    Web Design &amp; Dev Manager · CIP Chicago
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Feb 2026 – Present</p>
                <div className="mt-3 pt-3 border-t border-border/60">
                    {githubCommit ? (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            <span className="text-foreground/70">Last commit:</span>{" "}
                            <span className="truncate">{githubCommit.message}</span>
                            {" · "}
                            <span className="font-medium">{githubCommit.repo}</span>
                            {githubCommit.createdAt && (
                                <> · {timeAgo(githubCommit.createdAt)}</>
                            )}
                        </p>
                    ) : (
                        <p className="text-xs text-muted-foreground">github.com/Ykadam006</p>
                    )}
                </div>
            </motion.div>

            {/* Cell 2 — Stack */}
            <motion.div
                variants={cell}
                className="card p-3 sm:p-5 transition-colors hover:border-white/25 [grid-area:stack]"
            >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Stack
                </p>
                <div className="flex flex-wrap gap-1.5">
                    {STACK_PILLS.map((s) => (
                        <span
                            key={s}
                            className="rounded-full border border-border bg-muted/60 px-2 py-0.5 text-xs font-medium"
                        >
                            {s}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Cell 3 — GPA */}
            <motion.div
                variants={cell}
                className="card p-3 sm:p-5 transition-colors hover:border-white/25 [grid-area:gpa]"
            >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                    GPA
                </p>
                <p className="text-2xl font-bold tracking-tight leading-none">4.0</p>
                <p className="text-xs text-muted-foreground mt-1">/ 4.0 · Illinois Tech · May 2026</p>
            </motion.div>

            {/* Cell 4 — Location */}
            <motion.div
                variants={cell}
                className="card p-3 sm:p-5 transition-colors hover:border-white/25 [grid-area:location]"
            >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                    Location
                </p>
                <p className="text-sm font-medium">Chicago, IL</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Open to relocate anywhere in the US
                </p>
            </motion.div>

            {/* Cell 5 — Signal */}
            <motion.div
                variants={cell}
                className="card p-3 sm:p-5 transition-colors hover:border-white/25 [grid-area:internships]"
            >
                <p className="text-sm font-semibold leading-snug">
                    3 internships
                </p>
                <p className="text-sm font-semibold mt-0.5">3 deployed products</p>
            </motion.div>

            {/* Cell 6 — GitHub contribution graph */}
            <motion.div
                variants={cell}
                className="card p-3 sm:p-5 transition-colors hover:border-white/25 overflow-hidden [grid-area:contrib]"
            >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Always shipping · 52 weeks
                </p>
                <ContributionGraph data={contributions ?? null} />
            </motion.div>
        </motion.div>
    );
}
