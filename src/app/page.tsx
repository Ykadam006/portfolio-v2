import Link from "next/link";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { ProjectCard } from "@/components/project-card";
import { HeroCartoon } from "@/components/hero-cartoon";
import { LinkButton } from "@/components/button";
import { MetricCard } from "@/components/metric-card";
import { HeroBento } from "@/components/hero-bento";
import { ProcessSteps } from "@/components/process-steps";
import { fetchLastCommit, type GitHubCommit } from "@/components/github-last-commit";
import { fetchContributions } from "@/lib/github-contributions";
import {
    site,
    projects,
    experienceCore,
    education,
    skills,
    signatureStrengths,
} from "@/lib/site-data";

const TESTIMONIAL_INVITE =
    "LinkedIn recommendation from a manager or collaborator coming soon.";


const bentoProjects = projects.filter((p) =>
    ["iscp", "dailyhabitz", "ghumakad"].includes(p.slug)
);

export default async function HomePage() {
    const [githubCommit, contributions] = await Promise.all([
        fetchLastCommit(),
        fetchContributions(),
    ]);
    const flagship = bentoProjects[0];
    const stacked = bentoProjects.slice(1);

    return (
        <div className="flex flex-col">
            {/* HERO */}
            <section id="hero" className="section bg-gradient-to-b from-muted/30 to-transparent rounded-b-[2rem] sm:rounded-b-[3rem]">
                <Container>
                    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
                        <div className="min-w-0 lg:col-span-7">
                            <FadeIn>
                                <p className="text-sm text-muted-foreground flex flex-wrap items-center gap-2">
                                    {site.role} <span className="opacity-60">·</span> {site.location}
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Open to US-wide roles · May 2026
                                    </span>
                                </p>
                                <h1 className="h1 mt-3 sm:mt-4">
                                    {site.headline.includes("polished")
                                        ? <>
                                            {site.headline.split("polished")[0]}
                                            <span className="text-brand">polished</span>
                                            {site.headline.split("polished")[1]}
                                        </>
                                        : site.headline}
                                </h1>
                                <p className="p mt-4 sm:mt-5 max-w-2xl">{site.summary}</p>
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

            {/* BENTO FEATURED PROJECTS */}
            <section id="work" className="section">
                <Container>
                    <FadeIn delay={0.12}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
                            <h2 className="h2">Featured work</h2>
                            <Link href="/projects" className="btn-ghost text-sm shrink-0">
                                View all projects →
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:gap-5 lg:grid-cols-12 lg:grid-rows-[1fr_1fr_auto]">
                            <div className="lg:col-span-7 lg:row-span-3">
                                <ProjectCard p={flagship} size="large" variant="glass" />
                            </div>
                            {stacked.map((p) => (
                                <div key={p.slug} className="lg:col-span-5 flex">
                                    <ProjectCard p={p} />
                                </div>
                            ))}
                            <Link
                                href="/projects"
                                className="lg:col-span-5 card flex items-center justify-center min-h-[100px] p-6 text-center text-muted-foreground hover:text-foreground hover:shadow-md transition group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                            >
                                <span>
                                    View all projects <span className="text-brand group-hover:translate-x-0.5 inline-block transition-transform">→</span>
                                </span>
                            </Link>
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* SOCIAL PROOF — Testimonials */}
            {(site.testimonials.length > 0 || true) && (
                <section id="testimonials" className="section">
                    <Container>
                        <FadeIn delay={0.12}>
                            <h2 className="h2">What people say</h2>
                            {site.testimonials.length > 0 ? (
                                <div className="mt-6 grid gap-4 sm:gap-5 sm:grid-cols-2">
                                    {site.testimonials.map((t) => (
                                        <figure key={t.name} className="card p-6 flex flex-col gap-4">
                                            <blockquote className="text-sm leading-relaxed text-muted-foreground italic">
                                                &ldquo;{t.quote}&rdquo;
                                            </blockquote>
                                            <figcaption className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
                                                {t.companyDomain && (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img
                                                        src={`https://logo.clearbit.com/${t.companyDomain}`}
                                                        alt={t.company}
                                                        className="h-6 w-6 rounded object-contain grayscale opacity-60"
                                                    />
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                                                    <p className="text-xs text-muted-foreground">{t.title} · {t.company}</p>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-6 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-10 text-center">
                                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">{TESTIMONIAL_INVITE}</p>
                                    <a
                                        href={site.links.linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-3 inline-flex items-center gap-1.5 text-xs text-brand hover:text-brand/80 transition"
                                    >
                                        View LinkedIn profile →
                                    </a>
                                </div>
                            )}
                        </FadeIn>
                    </Container>
                </section>
            )}

            {/* HOW I WORK — 4-step process */}
            <section id="how" className="section bg-muted/20">
                <Container>
                    <FadeIn delay={0.13}>
                        <h2 className="h2">How I work</h2>
                        <div className="mt-6">
                            <ProcessSteps steps={site.processSteps} />
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* EXPERIENCE PREVIEW — CIP first with Current badge */}
            <section id="experience" className="section">
                <Container>
                    <FadeIn delay={0.14}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <h2 className="h2">Core experience</h2>
                            <Link href="/experience" className="btn-ghost text-sm shrink-0">
                                View full experience →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {experienceCore.slice(0, 3).map((x) => (
                                <div
                                    key={`${x.org}-${x.title}`}
                                    className="card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                >
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-semibold tracking-tight">{x.title}</h3>
                                            {"current" in x && x.current && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                                    Current
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

            {/* SKILLS SUMMARY */}
            <section id="skills" className="section bg-muted/20">
                <Container>
                    <FadeIn delay={0.16}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                            <h2 className="h2">Skills</h2>
                            <Link href="/skills" className="btn-ghost text-sm shrink-0">
                                View all →
                            </Link>
                        </div>
                        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
                            {Object.entries(skills).map(([group, items]) => (
                                <div key={group} className="card p-5 sm:p-6">
                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                        {group}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {items.slice(0, 4).map((s) => (
                                            <span
                                                key={s}
                                                className="text-xs rounded-full border border-border bg-card px-2.5 py-1 text-muted-foreground"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                        {items.length > 4 && (
                                            <span className="text-xs text-muted-foreground">+{items.length - 4}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 rounded-2xl border border-border bg-muted/50 p-5 sm:p-6">
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
                        <div className="card p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                            <div className="min-w-0">
                                <p className="text-sm text-muted-foreground">
                                    {site.replyNote} — {site.email}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    {site.location} ·{" "}
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
