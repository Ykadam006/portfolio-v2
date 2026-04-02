"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/** Per-slug gradient background + accent */
const BENTO_THEME: Record<string, { gradient: string; accent: string }> = {
    applyvibe:   { gradient: "from-[#1a0a2e] via-[#2d1060] to-[#1f0840]",    accent: "#ec4899" },
    iscp:        { gradient: "from-[#061625] via-[#0d2e50] to-[#062038]",    accent: "#38bdf8" },
    dailyhabitz: { gradient: "from-[#052e16] via-[#14532d] to-[#064e3b]",    accent: "#4ade80" },
    ghumakad:    { gradient: "from-[#431407] via-[#7c2d12] to-[#451a03]",    accent: "#fb923c" },
};

const DEFAULT_THEME = { gradient: "from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]", accent: "#ec4899" };

type ProjectBentoCardProps = {
    p: {
        slug: string;
        title: string;
        subtitle: string;
        stack: readonly string[];
        metrics: readonly string[];
        category: string;
        links: { live?: string; github?: string; caseStudy?: string };
        featured?: boolean;
    };
    size?: "large" | "small";
};

export function ProjectBentoCard({ p, size = "small" }: ProjectBentoCardProps) {
    const theme = BENTO_THEME[p.slug] ?? DEFAULT_THEME;
    const hasCaseStudy = !!(p.links.caseStudy && p.links.caseStudy !== "#");
    const hasLive = !!(p.links.live && p.links.live !== "#");

    return (
        <motion.div
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 ${size === "large" ? "min-h-[340px]" : "min-h-[260px]"}`}
        >
            {/* Gradient background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} transition-transform duration-500 group-hover:scale-[1.04]`} />

            {/* Decorative noise overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')] bg-[length:128px_128px]" />

            {/* Ambient glow from accent color */}
            <div
                className="absolute top-0 left-0 w-3/4 h-1/2 opacity-20 blur-3xl rounded-full"
                style={{ background: `radial-gradient(circle, ${theme.accent}, transparent 70%)` }}
            />

            {/* Top badges */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm">
                    {p.category}
                </span>
                {p.featured && (
                    <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white rotate-[-2deg]"
                        style={{ background: theme.accent + "33", color: theme.accent, border: `1px solid ${theme.accent}40` }}>
                        Featured
                    </span>
                )}
            </div>

            {/* Frosted glass info panel — lifts on hover */}
            <div className="absolute inset-x-0 bottom-0 p-5 backdrop-blur-[2px] transition-all duration-300 group-hover:pb-6"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 60%, transparent 100%)" }}
            >
                <h3 className={`font-bold tracking-tight text-white leading-snug ${size === "large" ? "text-xl" : "text-lg"}`}>
                    {p.title}
                </h3>
                <p className="mt-1 text-xs text-white/60 line-clamp-2">{p.subtitle}</p>

                {/* Stack tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, size === "large" ? 5 : 3).map((tag) => (
                        <span
                            key={tag}
                            className="rounded border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] font-mono text-white/70"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Key metric + links */}
                <div className="mt-3 flex items-center justify-between">
                    {p.metrics[0] && (
                        <p className="text-xs font-semibold" style={{ color: theme.accent }}>
                            {p.metrics[0]}
                        </p>
                    )}
                    <div className="flex items-center gap-2 ml-auto">
                        {hasLive && (
                            <a
                                href={p.links.live}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-medium text-white/80 hover:bg-white/20 transition-colors"
                            >
                                Live <ArrowUpRight className="h-3 w-3" />
                            </a>
                        )}
                        {hasCaseStudy && (
                            <Link
                                href={p.links.caseStudy!}
                                className="flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold text-white transition-all hover:opacity-90"
                                style={{ background: theme.accent }}
                            >
                                Case study →
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
