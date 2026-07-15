"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { isRepoLink } from "@/lib/utils";
import { BrowserFrame } from "@/components/browser-frame";
import { ArchitectureDiagram, type FlowNode } from "@/components/architecture-diagram";
import { ProjectThumb } from "@/components/project-thumb";
import { SplitHeading } from "@/components/motion/split-heading";
import { Lightbulb } from "lucide-react";

export function CaseStudyShell({
    title,
    subtitle,
    stack,
    metrics,
    live = "",
    github,
    architecture,
    archFlow,
    heroImage,
    slug,
    children,
}: {
    title: string;
    subtitle: string;
    stack: readonly string[];
    metrics: readonly string[];
    live?: string;
    github: string;
    architecture?: { frontend: string; backend: string; infra: string };
    /** Per-project architecture chain — overrides the generic 4-node flow. */
    archFlow?: readonly FlowNode[];
    heroImage?: { src: string; alt: string };
    /** Project slug — renders the static thumbnail hero when no heroImage is given. */
    slug?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="section">
            <Container>
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-lg px-1 -mx-1"
                >
                    ← Back to projects
                </Link>

                <h1 className="h1 mt-4">{title}</h1>
                <p className="p mt-3 max-w-2xl">{subtitle}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {metrics.map((m) => (
                        <span key={m} className="chip chip-metric">
                            {m}
                        </span>
                    ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                    {stack.map((s) => (
                        <span key={s} className="chip chip-stack">
                            {s}
                        </span>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    {live && live !== "#" && (
                        <a
                            href={live}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        >
                            Live app ↗
                        </a>
                    )}
                    {isRepoLink(github) && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        >
                            GitHub ↗
                        </a>
                    )}
                </div>

                {(heroImage || slug) && (
                    <div className="mt-10 relative group">
                        <BrowserFrame>
                            {heroImage ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={heroImage.src}
                                    alt={heroImage.alt}
                                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                />
                            ) : slug ? (
                                <div className="relative">
                                    <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                                        <ProjectThumb slug={slug} title={title} priority />
                                    </div>
                                    {live && live !== "#" && (
                                        <a
                                            href={live}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="absolute bottom-4 right-4 z-10 btn-primary text-xs shadow-lg"
                                        >
                                            Open live app ↗
                                        </a>
                                    )}
                                </div>
                            ) : null}
                        </BrowserFrame>
                    </div>
                )}

                {architecture && (
                    <div className="mt-8">
                        <ArchitectureDiagram
                            frontend={architecture.frontend}
                            backend={architecture.backend}
                            infra={architecture.infra}
                            flow={archFlow}
                        />
                    </div>
                )}

                <div className="mt-10 space-y-6">{children}</div>

                {/* End-of-study CTA */}
                <div className="mt-10 flex flex-wrap gap-3">
                    <Link href="/projects" className="btn-secondary">
                        ← All projects
                    </Link>
                    <Link href="/contact" className="btn-primary">
                        Get in touch
                    </Link>
                </div>
            </Container>
        </section>
    );
}

/** One-sentence stakes line rendered inside a Problem section. */
export function WhyItMatters({ children }: { children: React.ReactNode }) {
    return (
        <p className="rounded-lg border border-brand/20 bg-brand/5 px-3 py-2 text-sm text-foreground/90">
            <span className="font-semibold text-brand">Why it matters: </span>
            {children}
        </p>
    );
}

export function CaseSection({
    title,
    num,
    children,
}: {
    title: string;
    num?: string;
    children: React.ReactNode;
}) {
    return (
        <section className="card p-6 border-l-4 border-l-brand/30 hover:border-l-brand/60 transition-colors">
            <div className="flex items-baseline gap-3 mb-3">
                {num && (
                    <span className="text-xs font-mono font-semibold text-brand/50 select-none shrink-0">{num}</span>
                )}
                <SplitHeading as="h2" className="h2">{title}</SplitHeading>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
        </section>
    );
}

/** A single numbered challenge with a red problem chip and green fix chip */
export function ChallengeBlock({
    number,
    title,
    problem,
    fix,
}: {
    number?: number | string;
    title: string;
    problem: React.ReactNode;
    fix: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <p className="font-semibold text-sm text-foreground">
                {number !== undefined && (
                    <span className="mr-2 text-muted-foreground/60">{number}.</span>
                )}
                {title}
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-destructive mb-1">Problem</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{problem}</p>
                </div>
                <div className="flex-1 rounded-lg border border-brand/20 bg-brand/5 px-3 py-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-1">Fix</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{fix}</p>
                </div>
            </div>
        </div>
    );
}

/** Callout box for "What I'd Improve Next" — signals senior engineering thinking */
export function ImprovementsCallout({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-brand/25 bg-brand/5 p-5">
            <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand/15">
                    <Lightbulb className="h-4 w-4 text-brand" />
                </div>
                <p className="text-sm font-semibold text-foreground">What I&apos;d improve next</p>
                <span className="ml-auto text-[10px] font-medium uppercase tracking-widest text-brand/70 bg-brand/10 rounded-full px-2 py-0.5">
                    senior signal
                </span>
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-1.5">
                {children}
            </div>
        </div>
    );
}
