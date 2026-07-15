import Link from "next/link";
import { HomeIntro } from "@/components/home-intro";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { LinkButton } from "@/components/button";
import { ResumeLink } from "@/components/resume-drawer";
import { MetricCard, ACCENT_COLORS } from "@/components/metric-card";
import { HeroBento } from "@/components/hero-bento";
import { ProcessSteps } from "@/components/process-steps";
import { DesignPhilosophy } from "@/components/design-philosophy";
import { DesignToCode } from "@/components/design-to-code";
import { HeroHeadline } from "@/components/hero-headline";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { SkillsMarquee } from "@/components/skills-marquee";
import { FeaturedBento } from "@/components/featured-bento";
import { SectionHeader } from "@/components/motion/section-header";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { CornerAccents } from "@/components/motion/corner-accents";
import { fetchLastCommit } from "@/components/github-last-commit";
import {
    site,
    experienceCore,
    education,
} from "@/lib/site-data";

export default async function HomePage() {
    const githubCommit = await fetchLastCommit();

    return (
        <div className="flex flex-col">
            {/* Home-only intro — plays once per session */}
            <HomeIntro />

            {/* HERO */}
            <section id="hero" className="section relative bg-gradient-to-b from-muted/30 to-transparent rounded-b-[2rem] sm:rounded-b-[3rem] overflow-hidden grain-overlay">
                <CursorSpotlight />
                <Container className="relative z-10">
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
                        <div className="min-w-0 lg:col-span-7">
                            <FadeIn>
                                {site.assets.avatar && (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img
                                        src={site.assets.avatar}
                                        alt="Yogesh Kadam"
                                        width={112}
                                        height={112}
                                        className="mb-4 h-24 w-24 sm:h-28 sm:w-28 rounded-full object-cover ring-2 ring-brand/30 shadow-md"
                                    />
                                )}
                                <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                                    {site.role} <span className="opacity-60">·</span> {site.location}
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                                        </span>
                                        Open to US-wide roles
                                    </span>
                                </p>
                            </FadeIn>
                            <h1 className="h1 mt-3 sm:mt-4">
                                <HeroHeadline />
                            </h1>
                            <FadeIn delay={0.15}>
                                <p className="p mt-4 sm:mt-5 max-w-2xl">{site.summary}</p>
                            </FadeIn>
                            <FadeIn delay={0.25}>
                                <div className="mt-6 sm:mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {site.metricCards.map((m, i) => (
                                        <MetricCard
                                            key={m.source}
                                            value={m.value}
                                            prefix={m.prefix}
                                            suffix={m.suffix}
                                            label={m.label}
                                            source={m.source}
                                            accentColor={ACCENT_COLORS[i % ACCENT_COLORS.length]}
                                            delay={i * 0.07}
                                        />
                                    ))}
                                </div>
                            </FadeIn>
                            <FadeIn delay={0.35}>
                                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                                    <LinkButton href="/projects" variant="primary">
                                        View Projects
                                    </LinkButton>
                                    <LinkButton href="/contact" variant="secondary">
                                        Let&apos;s Talk
                                    </LinkButton>
                                    <ResumeLink variant="ghost">Resume</ResumeLink>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="min-w-0 lg:col-span-5">
                            <FadeIn delay={0.2}>
                                <div className="relative p-3">
                                    <CornerAccents />
                                    <HeroBento githubCommit={githubCommit ?? undefined} />
                                </div>
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
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-1 mb-8">
                        <SectionHeader label="selected projects" title="Featured work" />
                        <Link href="/projects" className="btn-ghost text-sm shrink-0">
                            View all projects →
                        </Link>
                    </div>

                    <FeaturedBento />

                    {/* Full-width "view all" link — cleaner than a floating card */}
                    <div className="mt-6 text-center">
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            View all projects
                            <span className="text-brand group-hover:translate-x-1 inline-block transition-transform">→</span>
                        </Link>
                    </div>
                </Container>
            </section>

            {/* DESIGN → CODE → LIVE — pinned scroll-driven thesis */}
            <DesignToCode />

            {/* HOW I WORK — 4-step process */}
            <section id="how" className="section bg-muted/20">
                <Container>
                    <SectionHeader label="working style" title="How I work" className="mb-6" />
                    <FadeIn delay={0.1}>
                        <ProcessSteps steps={site.processSteps} />
                    </FadeIn>
                </Container>
            </section>

            {/* DESIGN PHILOSOPHY */}
            <section id="philosophy" className="section">
                <Container>
                    <SectionHeader
                        label="design thinking"
                        title="What I believe in"
                        description="I write code for a living, but I think like a designer. These principles shape every interface I build."
                        className="mb-8"
                    />
                    <FadeIn delay={0.1}>
                        <DesignPhilosophy items={site.designPhilosophy} />
                    </FadeIn>
                </Container>
            </section>

            {/* EXPERIENCE PREVIEW — CIP first with Current badge */}
            <section id="experience" className="section bg-muted/20">
                <Container>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                        <SectionHeader label="where i've been" title="Core experience" />
                        <Link href="/experience" className="btn-ghost text-sm shrink-0 sm:mb-1">
                            View full experience →
                        </Link>
                    </div>
                    <StaggerGroup className="space-y-4">
                        {experienceCore.slice(0, 3).map((x) => (
                                <div
                                    key={`${x.org}-${x.title}`}
                                    className="card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-l-2 border-l-brand/30 hover:border-l-brand/70 transition-colors"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-semibold tracking-tight">{x.title}</h3>
                                            {"current" in x && x.current && (
                                                <span className="chip chip-status">
                                                    <span className="relative flex h-1.5 w-1.5">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                                                    </span>
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
                    </StaggerGroup>
                    <FadeIn delay={0.1}>
                        <p className="mt-6 text-sm text-muted-foreground">{site.leadershipPreview}</p>
                    </FadeIn>
                </Container>
            </section>

            {/* EDUCATION PREVIEW */}
            <section id="education" className="section">
                <Container>
                    <FadeIn delay={0.15}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <h2 className="h2">Education</h2>
                            <Link href="/experience#education-heading" className="btn-ghost text-sm shrink-0">
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

        </div>
    );
}
