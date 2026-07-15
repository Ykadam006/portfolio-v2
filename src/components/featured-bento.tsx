import Link from "next/link";
import { projects } from "@/lib/site-data";
import { isRepoLink } from "@/lib/utils";
import { ProjectThumb } from "@/components/project-thumb";
import { StaggerGroup } from "@/components/motion/stagger-group";

type Project = (typeof projects)[number];

/** Recruiter-scannable one-liners for the bento (subtitles are too long here). */
const VALUE_LINE: Record<string, string> = {
    applyvibe: "Free-first job-search SaaS — 11-stage Kanban pipeline, analytics dashboard, Auth.js security.",
    dailyhabitz: "Full-stack habit tracker — 11 Express routes, JWT auth, CI-stable releases.",
    ghumakad: "14-screen React travel planner — budgets, maps, and 4 live APIs.",
    bridgecare: "Calm AI health navigation — rules decide urgency, AI explains.",
    safeshelf: "Pantry tracker cross-referencing live FDA recall data.",
    skillforge: "Personal learning OS — skill paths, practice logs, analytics.",
};

/** Proof bullets — flagship card only (max 3). */
const FLAGSHIP_BULLETS: Record<string, string[]> = {
    applyvibe: [
        "8 app pages + 6 API routes, 0 TypeScript errors",
        "Server components — fresh dashboard data, no loading flash",
        "5-model Prisma schema on Neon PostgreSQL",
    ],
};


function byslug(slug: string): Project {
    return projects.find((p) => p.slug === slug)!;
}

function MiniChrome({ url }: { url?: string }) {
    const domain = url?.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return (
        <div className="flex items-center gap-1.5 border-b border-border bg-muted/50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="ml-2 flex-1 truncate rounded bg-muted/70 border border-border/50 px-2 py-0.5 text-[9px] font-mono text-muted-foreground/70">
                {domain || "case study"}
            </span>
        </div>
    );
}

function CardLinks({ p, className = "" }: { p: Project; className?: string }) {
    const hasLive = Boolean(p.links.live?.trim());
    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            {p.links.caseStudy && (
                <Link href={p.links.caseStudy} className="btn-primary !px-3 !py-1.5 text-xs">
                    Case study
                </Link>
            )}
            {hasLive && (
                <a href={p.links.live} target="_blank" rel="noreferrer" className="btn-secondary !px-3 !py-1.5 text-xs">
                    Live ↗
                </a>
            )}
            {isRepoLink(p.links.github) && (
                <a href={p.links.github} target="_blank" rel="noreferrer" className="btn-secondary !px-3 !py-1.5 text-xs">
                    GitHub
                </a>
            )}
        </div>
    );
}

function BentoCard({ p, large = false }: { p: Project; large?: boolean }) {
    const label = "bentoLabel" in p ? (p as Project & { bentoLabel?: string }).bentoLabel : p.category;
    return (
        <article className={`${large ? "card-glass" : "card"} glow-hover group overflow-hidden flex flex-col ${large ? "h-full" : ""}`}>
            {/* Static thumbnail in a consistent browser frame */}
            <MiniChrome url={p.links.live} />
            <div className="overflow-hidden shrink-0">
                <div className="transition-transform duration-200 ease-out group-hover:scale-[1.02]">
                    <ProjectThumb slug={p.slug} title={p.title} />
                </div>
            </div>

            <div className={`flex flex-col flex-1 ${large ? "p-5 sm:p-6" : "p-4 sm:p-5"}`}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                    {label}
                </p>
                <h3 className={`mt-1 font-semibold tracking-tight ${large ? "text-xl" : "text-base"}`}>
                    {p.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                    {VALUE_LINE[p.slug] ?? p.subtitle}
                </p>

                {/* Proof bullets — flagship only, max 3 */}
                {large && FLAGSHIP_BULLETS[p.slug] && (
                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                        {FLAGSHIP_BULLETS[p.slug].slice(0, 3).map((b) => (
                            <li key={b} className="flex gap-2">
                                <span className="text-brand shrink-0 mt-px">•</span>
                                <span>{b}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Stack chips — max 4 */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.slice(0, 4).map((t) => (
                        <span key={t} className="chip chip-stack">
                            {t}
                        </span>
                    ))}
                </div>

                {/* Metric chips — 1–2 */}
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {p.metrics.slice(0, large ? 2 : 1).map((m) => (
                        <span key={m} className="chip chip-metric">
                            {m}
                        </span>
                    ))}
                </div>

                <CardLinks p={p} className="mt-auto pt-4" />
            </div>
        </article>
    );
}

function CompactCard({ p }: { p: Project }) {
    const label = "bentoLabel" in p ? (p as Project & { bentoLabel?: string }).bentoLabel : p.category;
    return (
        <Link
            href={p.links.caseStudy || "/projects"}
            className="card glow-hover group p-4 sm:p-5 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">{label}</p>
            <h3 className="mt-1 font-semibold tracking-tight text-base">{p.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">
                {VALUE_LINE[p.slug] ?? p.subtitle}
            </p>
            {p.metrics[0] && (
                <p className="mt-3 text-[11px] font-medium text-brand">{p.metrics[0]}</p>
            )}
            <span className="mt-auto pt-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Case study{" "}
                <span aria-hidden className="text-brand inline-block transition-transform group-hover:translate-x-1">→</span>
            </span>
        </Link>
    );
}

/**
 * Premium featured-work bento: one flagship card, two stacked support cards,
 * and a compact row for the rest of the featured set.
 */
export function FeaturedBento() {
    const flagship = byslug("applyvibe");
    const stacked = [byslug("dailyhabitz"), byslug("ghumakad")];
    const compact = [byslug("bridgecare"), byslug("safeshelf"), byslug("skillforge")];

    return (
        <div>
            <StaggerGroup className="grid gap-4 sm:gap-5 lg:grid-cols-5">
                <div className="lg:col-span-3">
                    <BentoCard p={flagship} large />
                </div>
                <div className="lg:col-span-2 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-1">
                    {stacked.map((p) => (
                        <BentoCard key={p.slug} p={p} />
                    ))}
                </div>
            </StaggerGroup>
            <StaggerGroup className="mt-4 sm:mt-5 grid gap-4 sm:gap-5 sm:grid-cols-3" stagger={0.07}>
                {compact.map((p) => (
                    <CompactCard key={p.slug} p={p} />
                ))}
            </StaggerGroup>
        </div>
    );
}
