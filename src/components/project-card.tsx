"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { projects } from "@/lib/site-data";

type Project = (typeof projects)[number] & { image?: string };

const linkClass =
    "text-muted-foreground hover:text-foreground transition rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

const cardVariants = {
    rest: { y: 0, transition: { duration: 0.4 } },
    hover: { y: -4, transition: { duration: 0.4 } },
};

const IFRAME_W = 1440;
const IFRAME_H = 810;

/**
 * Scales a full-width iframe to exactly fit its container.
 * Renders the live site always — pointer-events disabled so the card
 * handles navigation instead of the embedded page.
 */
function LivePreview({ src, title, href }: { src: string; title: string; href: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.38);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            setScale(entry.contentRect.width / IFRAME_W);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden bg-muted/60"
            style={{ aspectRatio: "16/9" }}
            aria-label={`Live preview of ${title}`}
        >
            {/* Scaled iframe — always visible, never interactive */}
            <iframe
                src={src}
                title={`Live preview — ${title}`}
                loading="lazy"
                className="absolute top-0 left-0 border-0 pointer-events-none select-none"
                style={{
                    width: IFRAME_W,
                    height: IFRAME_H,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    opacity: loaded ? 1 : 0,
                    transition: "opacity 0.5s ease",
                }}
                sandbox="allow-scripts allow-same-origin"
                onLoad={() => setLoaded(true)}
            />

            {/* Loading shimmer (hidden once iframe fires onLoad) */}
            {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="h-5 w-5 rounded-full border-2 border-brand border-t-transparent animate-spin" />
                    <span className="text-xs text-muted-foreground">Loading preview…</span>
                </div>
            )}

            {/* Live badge — top left */}
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border px-2.5 py-1 text-xs font-medium shadow-sm pointer-events-none">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
            </div>

            {/* Open-in-new-tab button — top right */}
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${title} in new tab`}
                className="absolute top-2 right-2 z-10 flex items-center justify-center h-7 w-7 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm hover:bg-card transition"
            >
                <ExternalLink className="h-3.5 w-3.5" />
            </a>

            {/* Full-area click overlay — navigates to live/case-study */}
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                tabIndex={-1}
                aria-hidden
                className="absolute inset-0 z-[5]"
            />
        </div>
    );
}

export function ProjectCard({
    p,
    size = "default",
    variant = "default",
    mode = "bento",
}: {
    p: Project;
    size?: "large" | "default";
    variant?: "default" | "glass";
    mode?: "bento" | "page";
}) {
    const isLarge = size === "large";
    const isPage = mode === "page";
    const cardClass = variant === "glass" ? "card-glass" : "card";
    const hasCaseStudy = !!p.links.caseStudy;
    const hasLive = Boolean(p.links.live?.trim());
    const label = "bentoLabel" in p ? (p as Project & { bentoLabel?: string }).bentoLabel : undefined;
    const maxChips = isLarge ? 3 : p.slug === "ghumakad" ? 1 : 2;

    /* Destination for the iframe overlay click */
    const previewHref = hasLive
        ? p.links.live
        : hasCaseStudy
        ? p.links.caseStudy
        : p.links.github || "#";

    if (isPage) {
        const techPills: string[] = "techStack" in p && Array.isArray((p as Project & { techStack?: string[] }).techStack)
            ? (p as Project & { techStack: string[] }).techStack
            : [...p.stack];
        const impact = p.impact ?? p.bullets;

        return (
            <section className={`${cardClass} overflow-hidden`}>
                {/* Live iframe preview — always shown if a live URL exists */}
                {hasLive && (
                    <LivePreview src={p.links.live} title={p.title} href={previewHref} />
                )}
                <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs rounded-full border border-brand/30 bg-brand/5 px-2.5 py-1 text-brand font-medium">
                                {p.category}
                            </span>
                            <p className="text-xs text-muted-foreground">{p.date}</p>
                        </div>
                        <h2 className="h2 mt-1">{p.title}</h2>
                        <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{p.problem}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {p.metrics.slice(0, 3).map((m) => (
                            <span
                                key={m}
                                className="text-xs rounded-full border border-border bg-muted/50 px-3 py-1 text-muted-foreground"
                            >
                                {m}
                            </span>
                        ))}
                    </div>
                    <ul className="mt-4 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                        {impact.slice(0, 4).map((b) => (
                            <li key={b}>{b}</li>
                        ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {techPills.map((t) => (
                            <span
                                key={t}
                                className="text-xs font-mono rounded-md border border-border bg-card px-2.5 py-1 text-muted-foreground"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                        {hasCaseStudy && (
                            <Link href={p.links.caseStudy} className="btn-secondary">
                                Case study
                            </Link>
                        )}
                        {hasLive && (
                            <a href={p.links.live} target="_blank" rel="noreferrer" className="btn-secondary">
                                Live
                            </a>
                        )}
                        {p.links.github && (
                            <a href={p.links.github} target="_blank" rel="noreferrer" className="btn-secondary">
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className={`${cardClass} block overflow-hidden h-full min-w-0 ${
                isLarge ? "min-h-[260px] flex flex-col" : "flex flex-col"
            }`}
        >
            {/* Live iframe preview — always shown if a live URL exists */}
            {hasLive && (
                <LivePreview src={p.links.live} title={p.title} href={previewHref} />
            )}

            <div className={`p-5 sm:p-6 flex flex-col ${isLarge ? "flex-1" : ""}`}>
                {label && (
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {label}
                    </p>
                )}
                <h3
                    className={`font-semibold tracking-tight ${
                        label ? "mt-1" : ""
                    } ${isLarge ? "text-xl" : "text-lg"}`}
                >
                    {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.subtitle}</p>
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                    {p.bullets.slice(0, isLarge ? 3 : 2).map((b) => (
                        <li key={b} className="flex gap-2">
                            <span className="text-brand shrink-0">•</span>
                            <span>{b.endsWith(".") ? b.slice(0, -1) : b}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                    {p.metrics.slice(0, maxChips).map((m) => (
                        <span
                            key={m}
                            className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground"
                        >
                            {m}
                        </span>
                    ))}
                </div>
                <div className={`flex flex-wrap items-center gap-4 text-sm ${isLarge ? "mt-6" : "mt-4"}`}>
                    {hasCaseStudy && (
                        <Link href={p.links.caseStudy} className={`text-brand hover:underline ${linkClass}`}>
                            Case study
                        </Link>
                    )}
                    {hasLive && (
                        <a href={p.links.live} target="_blank" rel="noreferrer" className={linkClass}>
                            Live ↗
                        </a>
                    )}
                    {p.links.github && !(hasCaseStudy && hasLive) && (
                        <a href={p.links.github} target="_blank" rel="noreferrer" className={linkClass}>
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
