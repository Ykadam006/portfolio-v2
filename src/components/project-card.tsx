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
    // "loading" | "ready" | "blocked"
    const [state, setState] = useState<"loading" | "ready" | "blocked">("loading");

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const ro = new ResizeObserver(([entry]) => {
            setScale(entry.contentRect.width / IFRAME_W);
        });
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // After 1.2s without onLoad firing, assume the site blocks embedding
    useEffect(() => {
        const id = setTimeout(() => {
            setState((s) => (s === "loading" ? "blocked" : s));
        }, 1200);
        return () => clearTimeout(id);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden bg-muted/60 group/preview"
            style={{ aspectRatio: "16/9" }}
            aria-label={`Live preview of ${title}`}
        >
            {/* Scaled iframe — always mounted so it can load */}
            {state !== "blocked" && (
                <iframe
                    src={src}
                    title={`Live preview — ${title}`}
                    loading="lazy"
                    className="absolute top-0 left-0 border-0 pointer-events-none select-none transition-transform duration-500 group-hover/preview:scale-[1.04]"
                    style={{
                        width: IFRAME_W,
                        height: IFRAME_H,
                        transform: `scale(${scale})`,
                        transformOrigin: "top left",
                        opacity: state === "ready" ? 1 : 0,
                        transition: "opacity 0.5s ease",
                    }}
                    sandbox="allow-scripts allow-same-origin"
                    onLoad={() => setState("ready")}
                />
            )}

            {/* Brief loading pulse while iframe tries to load */}
            {state === "loading" && (
                <div className="absolute inset-0 bg-muted/40 animate-pulse" />
            )}

            {/* Fallback when blocked by X-Frame-Options — intentional premium placeholder */}
            {state === "blocked" && (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-brand/5 via-muted/30 to-brand/[0.08] hover:from-brand/10 hover:to-brand/[0.15] transition-all duration-300 group"
                >
                    {/* Decorative grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                            backgroundSize: "24px 24px",
                        }}
                    />
                    <div className="relative z-10 flex flex-col items-center gap-2 text-center px-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card/80 border border-border backdrop-blur-sm shadow-sm group-hover:border-brand/30 group-hover:bg-brand/5 transition-colors">
                            <ExternalLink className="h-4.5 w-4.5 text-muted-foreground group-hover:text-brand transition-colors" />
                        </div>
                        <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                            {href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </span>
                        <span className="text-[10px] text-brand/70 group-hover:text-brand transition-colors font-semibold uppercase tracking-wider">
                            Open live ↗
                        </span>
                    </div>
                </a>
            )}

            {/* Live badge — top left */}
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 rounded-full bg-card/90 backdrop-blur-sm border border-border px-2.5 py-1 text-xs font-medium shadow-sm pointer-events-none">
                <span className={`h-1.5 w-1.5 rounded-full ${state === "ready" ? "bg-brand animate-pulse" : "bg-muted-foreground"}`} />
                Live
            </div>

            {/* Open-in-new-tab — top right (visible when not blocked, blocked has its own overlay) */}
            {state !== "blocked" && (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open ${title} in new tab`}
                    className="absolute top-2 right-2 z-10 flex items-center justify-center h-7 w-7 rounded-full bg-card/90 backdrop-blur-sm border border-border shadow-sm hover:bg-card transition"
                >
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            )}

            {/* Full-area click overlay when iframe is visible */}
            {state === "ready" && (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={-1}
                    aria-hidden
                    className="absolute inset-0 z-[5]"
                />
            )}
        </div>
    );
}

/* Category → accent color for the top border stripe */
const CATEGORY_COLORS: Record<string, string> = {
    "Full-stack": "from-brand/80 to-brand/30",
    Frontend:     "from-brand/60 to-brand/20",
    Research:     "from-brand/40 to-brand/10",
};

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
    const isFeatured = "featured" in p && (p as Project & { featured?: boolean }).featured === true;
    const categoryGradient = CATEGORY_COLORS[p.category] ?? CATEGORY_COLORS["Full-stack"];

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
            <section className={`${cardClass} overflow-hidden relative`}>
                <div className={`p-5 sm:p-6 ${hasLive ? "lg:pr-[292px]" : ""}`}>
                    {/* Category + date */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs rounded-full border border-brand/30 bg-brand/5 px-2.5 py-1 text-brand font-medium">
                            {p.category}
                        </span>
                        <p className="text-xs text-muted-foreground">{p.date}</p>
                    </div>

                    {/* Title + subtitle */}
                    <h2 className="h2 mt-2">{p.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.subtitle}</p>

                    {/* Metric chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {p.metrics.slice(0, 4).map((m) => (
                            <span
                                key={m}
                                className="text-xs rounded-full border border-border bg-muted/50 px-3 py-1 text-muted-foreground"
                            >
                                {m}
                            </span>
                        ))}
                    </div>

                    {/* Impact bullets */}
                    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                        {impact.slice(0, 5).map((b) => (
                            <li key={b} className="flex gap-2">
                                <span className="text-brand shrink-0 mt-px">•</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Tech pills */}
                    <div className="mt-5 flex flex-wrap gap-2">
                        {techPills.map((t) => (
                            <span
                                key={t}
                                className="text-xs font-mono rounded-md border border-border bg-muted/40 px-2.5 py-1 text-muted-foreground"
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Links */}
                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                        {hasCaseStudy && (
                            <Link href={p.links.caseStudy} className="btn-secondary">
                                Case study
                            </Link>
                        )}
                        {hasLive && (
                            <a href={p.links.live} target="_blank" rel="noreferrer" className="btn-secondary">
                                Live ↗
                            </a>
                        )}
                        {p.links.github && (
                            <a href={p.links.github} target="_blank" rel="noreferrer" className="btn-secondary">
                                GitHub
                            </a>
                        )}
                    </div>
                </div>

                {/* ── Corner preview — absolute top-right on desktop, hidden on mobile ── */}
                {hasLive && (
                    <div className="hidden lg:block absolute top-5 right-5 w-[264px]">
                        <div className="rounded-xl border border-border bg-muted/30 overflow-hidden shadow-md">
                            {/* Fake browser chrome */}
                            <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-border bg-card/70">
                                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 shrink-0" />
                                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 shrink-0" />
                                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 shrink-0" />
                                <div className="flex-1 mx-1.5 rounded bg-muted/60 border border-border/50 px-2 py-0.5">
                                    <span className="text-[9px] text-muted-foreground/60 font-mono truncate block leading-relaxed">
                                        {p.links.live.replace(/^https?:\/\//, "")}
                                    </span>
                                </div>
                                <a
                                    href={p.links.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={`Open ${p.title} in new tab`}
                                    className="text-muted-foreground/60 hover:text-foreground transition shrink-0"
                                >
                                    <ExternalLink className="h-2.5 w-2.5" />
                                </a>
                            </div>
                            <LivePreview src={p.links.live} title={p.title} href={previewHref} />
                        </div>
                    </div>
                )}
            </section>
        );
    }

    return (
        <motion.div
            initial="rest"
            animate="rest"
            whileHover="hover"
            variants={{
                rest: { y: 0, boxShadow: "0 1px 3px rgba(0,0,0,0.06)" },
                hover: {
                    y: -4,
                    boxShadow: "0 16px 40px rgba(0,0,0,0.12), 0 0 0 1px hsla(338,100%,64%,0.15)",
                    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                },
            }}
            className={`${cardClass} block overflow-hidden h-full min-w-0 relative ${
                isLarge ? "min-h-[260px] flex flex-col" : "flex flex-col"
            }`}
        >
            {/* Category accent stripe */}
            <div className={`h-1 w-full bg-gradient-to-r ${categoryGradient} shrink-0`} />

            {/* Featured badge */}
            {isFeatured && (
                <div className="absolute top-4 right-3 z-20 rotate-3">
                    <span className="inline-flex items-center rounded-md bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm">
                        Featured
                    </span>
                </div>
            )}

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
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.subtitle}</p>

                {/* Tech tags — compact stack pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((tag) => (
                        <span
                            key={tag}
                            className="text-[11px] font-mono rounded-md border border-border bg-muted/50 px-2 py-0.5 text-muted-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* One key metric — the headline number */}
                {p.metrics[0] && (
                    <p className="mt-3 text-xs font-semibold text-brand">
                        {p.metrics[0]}
                    </p>
                )}
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
