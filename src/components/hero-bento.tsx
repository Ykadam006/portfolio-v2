"use client";

import { motion } from "framer-motion";
import { siGithub } from "simple-icons";
import {
    siReact,
    siNextdotjs,
    siTypescript,
    siTailwindcss,
} from "simple-icons";
import type { GitHubCommit } from "@/components/github-last-commit";
import { timeAgo } from "@/components/github-last-commit";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

const cell = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: "easeOut" as const },
    },
};

type SimpleIcon = { title: string; hex: string; path: string };

const USES_CURRENT_COLOR = new Set(["Next.js"]);

const STACK_ICONS: SimpleIcon[] = [siReact, siNextdotjs, siTypescript, siTailwindcss];

export function HeroBento({ githubCommit }: { githubCommit?: GitHubCommit }) {
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
                className="card-glass p-3 sm:p-5 min-h-[100px] transition-colors hover:border-brand/25 [grid-area:shipping]"
            >
                <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Latest role
                    </span>
                </div>
                <p className="text-sm font-medium leading-snug">
                    Web Design &amp; Dev Manager · CIP Chicago
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">Feb – May 2026 · Chicago, IL</p>
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
                        <a
                            href="https://github.com/Ykadam006"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground hover:border-brand/30 transition-all"
                        >
                            <svg role="img" viewBox="0 0 24 24" width={11} height={11} fill="currentColor" aria-label="GitHub">
                                <path d={siGithub.path} />
                            </svg>
                            Ykadam006
                        </a>
                    )}
                </div>
            </motion.div>

            {/* Cell 2 — Stack */}
            <motion.div
                variants={cell}
                className="card-glass p-3 sm:p-5 transition-colors hover:border-brand/25 [grid-area:stack] hidden sm:block"
            >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    Stack
                </p>
                <div className="flex flex-wrap gap-2">
                    {STACK_ICONS.map((icon) => (
                        <div
                            key={icon.title}
                            title={icon.title}
                            className="flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-1 hover:scale-105 transition-transform"
                        >
                            <svg
                                role="img"
                                viewBox="0 0 24 24"
                                width={13}
                                height={13}
                                fill={USES_CURRENT_COLOR.has(icon.title) ? "currentColor" : `#${icon.hex}`}
                                aria-label={icon.title}
                                className="shrink-0"
                            >
                                <path d={icon.path} />
                            </svg>
                            <span className="text-[11px] font-medium">{icon.title}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Cell 3 — GPA */}
            <motion.div
                variants={cell}
                className="card-glass p-3 sm:p-5 transition-colors hover:border-brand/25 [grid-area:gpa]"
            >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5">
                    GPA
                </p>
                <p className="text-2xl font-bold tracking-tight leading-none">4.0</p>
                <p className="text-xs text-muted-foreground mt-1">/ 4.0 · Illinois Tech · M.A.S. ITM</p>
            </motion.div>

            {/* Cell 4 — Location */}
            <motion.div
                variants={cell}
                className="card-glass p-3 sm:p-5 transition-colors hover:border-brand/25 [grid-area:location]"
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
                className="card-glass p-3 sm:p-5 transition-colors hover:border-brand/25 [grid-area:internships] flex flex-col justify-center gap-2"
            >
                <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold tracking-tight leading-none">3</span>
                    <span className="text-xs text-muted-foreground">internships</span>
                </div>
                <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold tracking-tight leading-none">6</span>
                    <span className="text-xs text-muted-foreground">deployed</span>
                </div>
            </motion.div>
        </motion.div>
    );
}
