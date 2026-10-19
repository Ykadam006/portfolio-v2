"use client";

import { useRef, useState, useSyncExternalStore, ViewTransition } from "react";
import Link from "next/link";
import { drawIn, gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ProjectArt } from "@/components/project-art";
import { RequestPath } from "@/components/request-path";
import type { Project } from "@/lib/site-data";

const noSubscribe = () => () => {};

export function CaseStudyShell({ p, children }: { p: Project; children: React.ReactNode }) {
    const heroRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    /* Mounted by a navigation inside the site (true) or hydrating a page
       loaded directly (false). Only the first gets the opening shot: on a
       direct load the drawing has already been painted, and hiding it to
       redraw it would read as a flicker. */
    const [arrived] = useState(useSyncExternalStore(noSubscribe, () => true, () => false));

    /* The opening shot. A drawing draws itself, and the sun-yellow thing the
       story is about (with any cursors) lands last; a screenshot settles from
       a slow push-in. It starts after the page cut, while a picture carried
       over from a project card is still landing. */
    useGSAP(
        () => {
            const art = heroRef.current;
            if (!arrived || reduced || !art) return;
            const tl = gsap.timeline({ delay: 0.3 });
            const svg = art.querySelector("svg");
            if (svg) tl.add(drawIn(svg));
            const img = art.querySelector("img");
            if (img) tl.from(img, { scale: 1.08, duration: 1.6, ease: "yk", clearProps: "transform" }, 0);
        },
        { dependencies: [p.slug, reduced, arrived] }
    );

    return (
        <article className="pb-24 pt-10 sm:pb-32">
            <div className="frame">
                <Link href="/projects" className="btn-ghost">
                    ← All work
                </Link>

                <div className="mt-10 grid gap-x-6 gap-y-10 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-6">
                        <h1 className="display text-[clamp(3.25rem,1.4rem+7vw,8.5rem)]">
                            <ViewTransition name={`title-${p.slug}`} share="morph">
                                <span className="inline-block [text-wrap:balance]">{p.title}</span>
                            </ViewTransition>
                        </h1>
                        <p className="lead mt-6">{p.summary}</p>
                    </div>
                    <ViewTransition name={`art-${p.slug}`} share="morph">
                        <div ref={heroRef} className="aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-card lg:col-span-6">
                            <ProjectArt slug={p.slug} priority className={p.shot ? "!grayscale-0" : "p-8"} />
                        </div>
                    </ViewTransition>
                </div>

                <dl className="mt-16 grid gap-x-6 gap-y-8 rounded-[var(--radius)] bg-card p-6 sm:p-8 md:grid-cols-12">
                    <div className="md:col-span-4">
                        <dt className="small">Built with</dt>
                        <dd className="mt-3 flex flex-wrap gap-1.5">
                            {p.stack.map((s) => (
                                <span key={s} className="chip">
                                    {s}
                                </span>
                            ))}
                        </dd>
                    </div>
                    <div className="md:col-span-5">
                        <dt className="small">By the numbers</dt>
                        <dd className="mt-3">
                            <ul className="space-y-1.5">
                                {p.facts.map((f) => (
                                    <li key={f} className="flex gap-2.5">
                                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-sun" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                    <div className="md:col-span-3">
                        <dt className="small">Links</dt>
                        <dd className="mt-3 flex flex-col items-start gap-1">
                            {p.links.live && (
                                <a href={p.links.live} target="_blank" rel="noreferrer" className="btn-ghost">
                                    Live app ↗
                                </a>
                            )}
                            {p.links.github && (
                                <a href={p.links.github} target="_blank" rel="noreferrer" className="btn-ghost">
                                    Source ↗
                                </a>
                            )}
                            {!p.links.live && !p.links.github && (
                                <p>
                                    Code walkthrough on request.{" "}
                                    <Link href="/contact" className="underline decoration-sun decoration-2 underline-offset-4">
                                        Ask me
                                    </Link>
                                </p>
                            )}
                        </dd>
                    </div>
                </dl>

                <div className="mt-16">
                    <RequestPath flow={p.archFlow} />
                </div>

                <div className="mt-24 space-y-20 sm:mt-32 sm:space-y-28">{children}</div>

                <div className="mt-24 flex flex-wrap gap-3">
                    <Link href="/projects" className="btn-secondary">
                        ← All work
                    </Link>
                    <Link href="/contact" className="btn-primary">
                        Talk about this project
                    </Link>
                </div>
            </div>
        </article>
    );
}

/** One-sentence stakes line inside the Problem section. */
export function WhyItMatters({ children }: { children: React.ReactNode }) {
    return <p className="border-l-4 border-sun pl-4 font-medium text-foreground">{children}</p>;
}

/** Stable anchor for a section, e.g. #case-architecture. */
function sectionId(title: string) {
    return `case-${title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

/** A section of a case study: heading on the left, reading column on the right. */
export function CaseSection({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section id={sectionId(title)} className="grid scroll-mt-28 gap-x-6 gap-y-6 lg:grid-cols-12">
            <h2 className="h2 lg:col-span-4">{title}</h2>
            <div className="min-w-0 space-y-4 lg:col-span-7 lg:col-start-6 [&_li]:max-w-[62ch] [&_p]:max-w-[62ch]">{children}</div>
        </section>
    );
}

/** The resume bullets as a readable list. */
export function Bullets({ items }: { items: readonly string[] }) {
    return (
        <ul className="space-y-3">
            {items.map((b) => (
                <li key={b} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-sun" />
                    <span>{b}</span>
                </li>
            ))}
        </ul>
    );
}

/** One decision: what went wrong, and what I did about it. */
export function ChallengeBlock({
    title,
    problem,
    fix,
}: {
    title: string;
    problem: React.ReactNode;
    fix: React.ReactNode;
}) {
    return (
        <div className="rounded-[var(--radius)] bg-card p-6">
            <h3 className="font-display text-2xl font-bold leading-tight">{title}</h3>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                    <p className="font-semibold text-destructive">Problem</p>
                    <p className="mt-1 text-muted-foreground">{problem}</p>
                </div>
                <div>
                    <p className="font-semibold text-brand">Decision</p>
                    <p className="mt-1">{fix}</p>
                </div>
            </div>
        </div>
    );
}

/** "What I'd do next" — closing note on a case study. */
export function ImprovementsCallout({ children }: { children: React.ReactNode }) {
    return (
        <aside className="grid gap-x-6 gap-y-4 lg:grid-cols-12">
            <h2 className="h2 lg:col-span-4">What I&apos;d do next</h2>
            <div className="lead text-foreground lg:col-span-7 lg:col-start-6">{children}</div>
        </aside>
    );
}

/** Inline code token. */
export function Code({ children }: { children: React.ReactNode }) {
    return <code className="rounded bg-foreground/[0.07] px-1 py-0.5 font-mono text-[0.85em]">{children}</code>;
}
