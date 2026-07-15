import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { projects } from "@/lib/site-data";
import { isRepoLink } from "@/lib/utils";
import { ProjectThumb } from "@/components/project-thumb";

type Project = (typeof projects)[number] & { image?: string };

const linkClass =
    "text-muted-foreground hover:text-foreground transition rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

/* Category → accent color for the top border stripe */
const CATEGORY_COLORS: Record<string, string> = {
    "Full-stack": "from-brand/80 to-brand/30",
    Frontend:     "from-brand/60 to-brand/20",
    Research:     "from-brand/40 to-brand/10",
};

/** Static thumbnail wrapped in browser chrome — no iframes, no loading states. */
function FramedThumb({ p }: { p: Project }) {
    const domain = p.links.live?.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
    return (
        <div className="rounded-xl border border-border bg-muted/30 overflow-hidden shadow-md">
            <div className="flex items-center gap-1.5 px-2.5 py-2 border-b border-border bg-card/70">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 shrink-0" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 shrink-0" />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/40 shrink-0" />
                <div className="flex-1 mx-1.5 rounded bg-muted/60 border border-border/50 px-2 py-0.5 min-w-0">
                    <span className="text-[9px] text-muted-foreground/60 font-mono truncate block leading-relaxed">
                        {domain || `${p.slug} — case study`}
                    </span>
                </div>
                {domain && (
                    <a
                        href={p.links.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${p.title} in new tab`}
                        className="flex items-center justify-center h-6 w-6 -my-1.5 -mr-1 rounded text-muted-foreground/60 hover:text-foreground transition shrink-0"
                    >
                        <ExternalLink className="h-3 w-3" />
                    </a>
                )}
            </div>
            <div className="overflow-hidden group/thumb">
                <div className="transition-transform duration-500 ease-out group-hover/thumb:scale-[1.025]">
                    <ProjectThumb slug={p.slug} title={p.title} />
                </div>
            </div>
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
    const isFeatured = "featured" in p && (p as Project & { featured?: boolean }).featured === true;
    const categoryGradient = CATEGORY_COLORS[p.category] ?? CATEGORY_COLORS["Full-stack"];

    if (isPage) {
        const techPills: string[] = "techStack" in p && Array.isArray((p as Project & { techStack?: string[] }).techStack)
            ? (p as Project & { techStack: string[] }).techStack
            : [...p.stack];
        const impact = p.impact ?? p.bullets;

        return (
            <section className={`${cardClass} glow-hover overflow-hidden relative`}>
                {/* Thumbnail — inline on mobile/tablet, corner card on desktop */}
                <div className="lg:hidden px-5 pt-5 sm:px-6 sm:pt-6">
                    <FramedThumb p={p} />
                </div>
                <div className="p-5 sm:p-6 lg:pr-[292px]">
                    {/* Category + date */}
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="chip chip-category">{p.category}</span>
                        <p className="text-xs text-muted-foreground">{p.date}</p>
                    </div>

                    {/* Title + subtitle */}
                    <h2 className="h2 mt-2">{p.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.subtitle}</p>

                    {/* Metric chips */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {p.metrics.slice(0, 2).map((m) => (
                            <span key={m} className="chip chip-metric">
                                {m}
                            </span>
                        ))}
                    </div>

                    {/* Impact bullets */}
                    <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                        {impact.slice(0, 3).map((b) => (
                            <li key={b} className="flex gap-2">
                                <span className="text-brand shrink-0 mt-px">•</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Tech pills */}
                    <div className="mt-5 flex flex-wrap gap-2">
                        {techPills.slice(0, 6).map((t) => (
                            <span key={t} className="chip chip-stack">
                                {t}
                            </span>
                        ))}
                        {techPills.length > 6 && (
                            <span className="chip chip-stack opacity-70" title={techPills.slice(6).join(" · ")}>
                                +{techPills.length - 6} more
                            </span>
                        )}
                    </div>

                    {/* Links */}
                    {(hasCaseStudy || hasLive || isRepoLink(p.links.github)) && (
                        <div className="mt-6 flex flex-wrap gap-3 text-sm">
                            {hasCaseStudy && (
                                <Link href={p.links.caseStudy} className="btn-primary">
                                    Case study
                                </Link>
                            )}
                            {hasLive && (
                                <a href={p.links.live} target="_blank" rel="noreferrer" className="btn-secondary">
                                    Live ↗
                                </a>
                            )}
                            {isRepoLink(p.links.github) && (
                                <a href={p.links.github} target="_blank" rel="noreferrer" className="btn-secondary">
                                    GitHub
                                </a>
                            )}
                        </div>
                    )}
                </div>

                {/* ── Corner thumbnail — static, desktop only ── */}
                <div className="hidden lg:block absolute top-5 right-5 w-[264px]">
                    <FramedThumb p={p} />
                </div>
            </section>
        );
    }

    return (
        <div
            className={`${cardClass} glow-hover group block overflow-hidden h-full min-w-0 relative ${
                isLarge ? "min-h-[260px] flex flex-col" : "flex flex-col"
            }`}
        >
            {/* Category accent stripe */}
            <div className={`h-1 w-full bg-gradient-to-r ${categoryGradient} shrink-0`} />

            {/* Featured badge */}
            {isFeatured && (
                <div className="absolute top-4 right-3 z-20 rotate-3">
                    <span className="inline-flex items-center rounded-md bg-brand px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-foreground shadow-sm">
                        Featured
                    </span>
                </div>
            )}

            {/* Static thumbnail */}
            <div className="overflow-hidden shrink-0">
                <div className="transition-transform duration-500 ease-out group-hover:scale-[1.025]">
                    <ProjectThumb slug={p.slug} title={p.title} />
                </div>
            </div>

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
                        <span key={tag} className="chip chip-stack">
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
                    {isRepoLink(p.links.github) && !(hasCaseStudy && hasLive) && (
                        <a href={p.links.github} target="_blank" rel="noreferrer" className={linkClass}>
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
