import Link from "next/link";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { ProjectCard } from "@/components/project-card";
import { HeroCartoon } from "@/components/hero-cartoon";
import { LinkButton } from "@/components/button";
import { MetricCard } from "@/components/metric-card";
import { HeroBento } from "@/components/hero-bento";
import { ProcessSteps } from "@/components/process-steps";
import { HeroTypewriter } from "@/components/hero-typewriter";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { SkillsMarquee } from "@/components/skills-marquee";
import { fetchLastCommit } from "@/components/github-last-commit";
import { fetchContributions } from "@/lib/github-contributions";
import {
    site,
    projects,
    experienceCore,
    education,
    signatureStrengths,
} from "@/lib/site-data";

const bentoProjects = projects.filter((p) =>
    ["applyvibe", "dailyhabitz", "ghumakad"].includes(p.slug)
);

export default async function HomePage() {
    const [githubCommit, contributions] = await Promise.all([
        fetchLastCommit(),
        fetchContributions(),
    ]);

    return (
        <div className="flex flex-col">
            {/* HERO */}
            <section id="hero" className="section relative bg-gradient-to-b from-muted/30 to-transparent rounded-b-[2rem] sm:rounded-b-[3rem] overflow-hidden grain-overlay">
                <CursorSpotlight />
                <Container className="relative z-10">
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
                        <div className="min-w-0 lg:col-span-7">
                            <FadeIn>
                                <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                                    {site.role} <span className="opacity-60">·</span> {site.location}
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                                        </span>
                                        Open to US-wide roles · May 2026
                                    </span>
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.05}>
                                <h1 className="h1 mt-3 sm:mt-4">
                                    <HeroTypewriter />
                                </h1>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <p className="p mt-4 sm:mt-5 max-w-2xl">{site.summary}</p>
                            </FadeIn>
                            <FadeIn delay={0.15}>
                                <div className="mt-6 sm:mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {site.metricCards.map((m) => (
                                        <MetricCard
                                            key={m.source}
                                            value={m.value}
                                            prefix={m.prefix}
                                            suffix={m.suffix}
                                            label={m.label}
                                            source={m.source}
                                        />
                                    ))}
                                </div>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                                    <LinkButton href="/projects" variant="primary">
                                        View Projects
                                    </LinkButton>
                                    <LinkButton href="/contact" variant="secondary">
                                        Let&apos;s Talk
                                    </LinkButton>
                                    <LinkButton href={site.links.resume} variant="ghost">
                                        Resume
                                    </LinkButton>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="min-w-0 lg:col-span-5 flex flex-col gap-6 lg:gap-8">
                            {site.assets?.heroCartoon ? (
                                <FadeIn delay={0.05}>
                                    <HeroCartoon />
                                </FadeIn>
                            ) : null}
                            <FadeIn delay={0.1}>
                                <HeroBento
                                    githubCommit={githubCommit ?? undefined}
                                    contributions={contributions}
                                />
                            </FadeIn>
                        </div>
                    </div>
                </Container>
            </section>

            {/* TECH STRIP — closes dead air between hero and work */}
            <div className="border-y border-border/60 bg-muted/20 py-5 overflow-hidden">
                <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                    what i build with
                </p>
                <SkillsMarquee />
            </div>

            {/* BENTO FEATURED PROJECTS */}
            <section id="work" className="py-10 sm:py-14">
                <Container>
                    <FadeIn delay={0.12}>
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 mb-8">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                                    selected projects
                                </p>
                                <h2 className="h2">Featured work</h2>
                            </div>
                            <Link href="/projects" className="btn-ghost text-sm shrink-0">
                                View all projects →
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                            {/* Row 1 — two equal cards */}
                            <ProjectCard p={bentoProjects[0]} />
                            <ProjectCard p={bentoProjects[1]} />
                            {/* Row 2 — Ghumakkad full width */}
                            <div className="sm:col-span-2">
                                <ProjectCard p={bentoProjects[2]} />
                            </div>
                        </div>

                        {/* Full-width "view all" link — cleaner than a floating card */}
                        <div className="mt-6 text-center">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                            >
                                View all 6 projects
                                <span className="text-brand group-hover:translate-x-1 inline-block transition-transform">→</span>
                            </Link>
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* HOW I WORK — 4-step process */}
            <section id="how" className="section bg-muted/20">
                <Container>
                    <FadeIn delay={0.13}>
                        <div className="mb-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                                working style
                            </p>
                            <h2 className="h2">How I work</h2>
                        </div>
                        <ProcessSteps steps={site.processSteps} />
                    </FadeIn>
                </Container>
            </section>

            {/* EXPERIENCE PREVIEW — CIP first with Current badge */}
            <section id="experience" className="section">
                <Container>
                    <FadeIn delay={0.14}>
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                                    where i&apos;ve been
                                </p>
                                <h2 className="h2">Core experience</h2>
                            </div>
                            <Link href="/experience" className="btn-ghost text-sm shrink-0 sm:mb-1">
                                View full experience →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {experienceCore.slice(0, 3).map((x) => (
                                <div
                                    key={`${x.org}-${x.title}`}
                                    className="card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-2 border-l-brand/30 hover:border-l-brand/70 transition-colors"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-semibold tracking-tight">{x.title}</h3>
                                            {"current" in x && x.current && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
                                                    Current
                                                </span>
                                            )}
                                            {"roleType" in x && x.roleType && (
                                                <span className="inline-flex items-center rounded-full border border-brand/20 bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand capitalize">
                                                    {String(x.roleType)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            {x.org} · {x.meta}
                                        </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground sm:max-w-sm line-clamp-2 shrink-0">
                                        {x.bullets[0]}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-6 text-sm text-muted-foreground">{site.leadershipPreview}</p>
                    </FadeIn>
                </Container>
            </section>

            {/* EDUCATION PREVIEW */}
            <section id="education" className="section bg-muted/20">
                <Container>
                    <FadeIn delay={0.15}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <h2 className="h2">Education</h2>
                            <Link href="/experience?tab=education" className="btn-ghost text-sm shrink-0">
                                View full experience →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {education.map((e) => (
                                <div
                                    key={`${e.org}-${e.title}`}
                                    className="card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                >
                                    <div className="min-w-0">
                                        <h3 className="font-semibold tracking-tight">{e.title}</h3>
                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            {e.org} · {e.meta}
                                        </p>
                                    </div>
                                    {e.bullets.length > 0 && (
                                        <p className="text-sm text-muted-foreground sm:max-w-sm line-clamp-2 shrink-0">
                                            {e.bullets[0]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* SKILLS — marquee ticker */}
            <section id="skills" className="section bg-muted/20">
                <Container>
                    <FadeIn delay={0.16}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                                    things i build with
                                </p>
                                <h2 className="h2">Skills</h2>
                            </div>
                            <Link href="/skills" className="btn-ghost text-sm shrink-0">
                                View all →
                            </Link>
                        </div>
                    </FadeIn>
                </Container>

                {/* Full-bleed marquee — no Container so it extends edge-to-edge */}
                <FadeIn delay={0.18}>
                    <SkillsMarquee />
                </FadeIn>

                <Container>
                    <FadeIn delay={0.2}>
                        <div className="mt-8 rounded-2xl border border-border bg-muted/50 p-5 sm:p-6">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Signature strengths
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {signatureStrengths.map((s) => (
                                    <span
                                        key={s}
                                        className="text-sm rounded-full border border-brand/30 bg-brand/5 px-3 py-1.5 text-brand"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* CONTACT STRIP */}
            <section id="contact" className="section">
                <Container>
                    <FadeIn delay={0.18}>
                        <div className="card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 bg-gradient-to-br from-brand/5 to-brand/[0.03] border-brand/15">
                            <div className="min-w-0">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand mb-3">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                                    </span>
                                    Available · May 2026
                                </span>
                                <p className="text-lg font-semibold tracking-tight">Ready to build something great?</p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {site.replyNote} ·{" "}
                                    <a
                                        href={site.links.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 hover:text-foreground"
                                    >
                                        LinkedIn
                                    </a>
                                    {" · "}
                                    <a
                                        href={site.links.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="underline underline-offset-4 hover:text-foreground"
                                    >
                                        GitHub
                                    </a>
                                </p>
                            </div>
                            <LinkButton href="/contact" variant="primary" className="shrink-0">
                                Let&apos;s talk
                            </LinkButton>
                        </div>
                    </FadeIn>
                </Container>
            </section>
        </div>
    );
}
