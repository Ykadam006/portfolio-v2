import type { Project } from "@/lib/site-data";
import Link from "next/link";
import { ViewTransition } from "react";
import { ProjectArt } from "@/components/project-art";

const ext = "relative z-10 text-sm underline decoration-foreground/30 decoration-2 underline-offset-4 hover:decoration-sun";

/** One entry in the work index. The title is a stretched link to the case study. */
export function ProjectCard({ p, priority = false }: { p: Project; priority?: boolean }) {
    return (
        <article data-project-card className="group relative flex h-full flex-col">
            {/* The picture travels into the case study's (a shared view transition) */}
            <ViewTransition name={`art-${p.slug}`} share="morph">
                <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-card">
                    <ProjectArt slug={p.slug} priority={priority} className={p.shot ? "" : "p-6"} />
                </div>
            </ViewTransition>
            <h3 className="mt-5 font-display text-4xl font-bold leading-none">
                <Link
                    href={p.links.caseStudy}
                    className="after:absolute after:inset-0 after:content-[''] group-hover:text-brand focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-brand"
                >
                    {p.title}
                </Link>
            </h3>
            <p className="mt-2 text-muted-foreground">{p.kind}</p>
            <p className="mt-3 max-w-[56ch]">{p.summary}</p>
            <p className="mt-4 text-sm text-muted-foreground">{p.facts.join(" · ")}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((t) => (
                    <span key={t} className="chip chip-stack">
                        {t}
                    </span>
                ))}
            </div>
            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 empty:hidden">
                {p.links.live && (
                    <a href={p.links.live} target="_blank" rel="noreferrer" className={ext}>
                        Live app
                    </a>
                )}
                {p.links.github && (
                    <a href={p.links.github} target="_blank" rel="noreferrer" className={ext}>
                        Source
                    </a>
                )}
            </div>
        </article>
    );
}
