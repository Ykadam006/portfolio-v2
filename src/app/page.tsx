import Link from "next/link";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { ProjectCard } from "@/components/project-card";
import { HeroBlob } from "@/components/hero-blob";
import { HeroCartoon } from "@/components/hero-cartoon";
import { CartoonSticker } from "@/components/cartoon-sticker";
import { LinkButton } from "@/components/button";
import {
    site,
    projects,
    experienceCore,
    education,
    skills,
    signatureStrengths,
} from "@/lib/site-data";

const bentoProjects = projects.filter((p) =>
    ["iscp", "dailyhabitz", "ghumakad"].includes(p.slug)
);

export default function HomePage() {
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
                                <p className="text-sm text-muted-foreground">
                                    {site.role} <span className="mx-2 opacity-60">•</span>{" "}
                                    {site.location}
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
                                <div className="mt-6 sm:mt-7 flex flex-wrap gap-2">
                                    {site.proofChips.slice(0, 6).map((chip) => (
                                        <span
                                            key={chip}
                                            className="text-xs rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground shadow-sm hover:border-brand/20 hover:text-foreground/90 transition-colors"
                                        >
                                            {chip}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-6 sm:mt-8 flex flex-wrap gap-3">
                                    <LinkButton href="/projects" variant="secondary">
                                        View Projects
                                    </LinkButton>
                                    <LinkButton href="/contact" variant="primary">
                                        Contact
                                    </LinkButton>
                                    <LinkButton href={site.links.resume} variant="secondary">
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
                            ) : (
                                <HeroBlob />
                            )}
                            <FadeIn delay={0.1}>
                                <div className="card-glass p-6 relative">
                                    {site.assets?.stickerBuilding && (
                                        <div className="absolute top-4 right-4">
                                            <CartoonSticker src={site.assets.stickerBuilding} size="sm" />
                                        </div>
                                    )}
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Now building</p>
                                    <h2 className="mt-2 text-lg font-semibold tracking-tight">
                                        {site.nowBuilding.title}
                                    </h2>
                                    <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                                        {site.nowBuilding.items.map((item) => (
                                            <li key={item}>• {item}</li>
                                        ))}
                                    </ul>
                                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                        Bonus: {site.nowBuilding.bonus}
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {site.nowBuilding.chips.map((chip) => (
                                            <span
                                                key={chip}
                                                className="text-xs rounded-full border border-border bg-card/80 px-3 py-1 text-muted-foreground"
                                            >
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-5 flex flex-wrap gap-3">
                                        <a
                                            href={site.links.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-secondary"
                                        >
                                            LinkedIn
                                        </a>
                                        <a
                                            href={site.links.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn-secondary"
                                        >
                                            GitHub
                                        </a>
                                    </div>
                                </div>
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

            {/* HOW I WORK */}
            <section id="how" className="section bg-muted/20">
                <Container>
                    <FadeIn delay={0.13}>
                        <h2 className="h2">How I work</h2>
                        <ul className="mt-6 space-y-2 sm:space-y-3">
                            {site.howIWork.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                                    <span className="text-base sm:text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </FadeIn>
                </Container>
            </section>

            {/* EXPERIENCE PREVIEW */}
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
                            {experienceCore.slice(0, 2).map((x) => (
                                <div
                                    key={`${x.org}-${x.title}`}
                                    className="card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                                >
                                    <div className="min-w-0">
                                        <h3 className="font-semibold tracking-tight">{x.title}</h3>
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
