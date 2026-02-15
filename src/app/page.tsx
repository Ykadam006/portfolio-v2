import Link from "next/link";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { site, projects } from "@/lib/site-data";

function ProjectTile({ p }: { p: (typeof projects)[number] }) {
    return (
        <div className="card p-6 hover:shadow-md transition">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs text-muted-foreground">{p.date}</p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">
                        {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">{p.subtitle}</p>
                </div>

                <span className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">
          {p.metrics[0]}
        </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.slice(0, 5).map((s) => (
                    <span
                        key={s}
                        className="text-xs rounded-full border border-border bg-card px-2.5 py-1 text-muted-foreground"
                    >
            {s}
          </span>
                ))}
            </div>

            <div className="mt-6 flex items-center gap-4 text-sm">
                <Link href={p.links.caseStudy} className="hover:opacity-80">
                    Case study
                </Link>
                <a
                    href={p.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:opacity-80"
                >
                    Live
                </a>
            </div>
        </div>
    );
}

export default function HomePage() {
    return (
        <>
            {/* HERO */}
            <section className="section">
                <Container>
                    <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
                        <div className="min-w-0 lg:col-span-7">
                            <FadeIn>
                                <p className="text-sm text-muted-foreground">
                                    {site.role} <span className="mx-2 opacity-60">•</span>{" "}
                                    {site.location}
                                </p>

                                <h1 className="h1 mt-4">
                                    Building{" "}
                                    <span className="text-brand">clean</span>, scalable web apps
                                    with premium UI.
                                </h1>

                                <p className="p mt-5 max-w-2xl">{site.summary}</p>

                                <div className="mt-7 flex flex-wrap gap-2">
                                    {site.proofChips.map((chip) => (
                                        <span
                                            key={chip}
                                            className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground"
                                        >
                      {chip}
                    </span>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Link
                                        href="/projects"
                                        className="inline-flex items-center justify-center rounded-xl border border-border bg-card px-4 py-2 text-sm hover:shadow-sm transition"
                                    >
                                        View Projects
                                    </Link>

                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center justify-center rounded-xl bg-brand px-4 py-2 text-sm text-brand-foreground hover:opacity-90 transition"
                                    >
                                        Contact
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>

                        {/* SIDE CARD (premium, aligned) */}
                        <div className="min-w-0 lg:col-span-5">
                            <FadeIn delay={0.1}>
                                <div className="card p-6">
                                    <p className="text-xs text-muted-foreground">Now</p>
                                    <h2 className="mt-2 text-lg font-semibold tracking-tight">
                                        Building & shipping weekly
                                    </h2>
                                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                                        Focus: Next.js + TypeScript + clean UI systems. Also love
                                        photography — I care a lot about composition, spacing, and
                                        detail.
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-2">
                    <span className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">
                      Minimal UI
                    </span>
                                        <span className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">
                      Performance
                    </span>
                                        <span className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">
                      Accessibility
                    </span>
                                    </div>

                                    <div className="mt-6 flex gap-3 text-sm">
                                        <a
                                            href={site.links.linkedin}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-xl border border-border bg-card px-3 py-2 hover:shadow-sm transition"
                                        >
                                            LinkedIn
                                        </a>
                                        <a
                                            href={site.links.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="rounded-xl border border-border bg-card px-3 py-2 hover:shadow-sm transition"
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

            {/* FEATURED WORK */}
            <section className="section pt-0">
                <Container>
                    <FadeIn delay={0.12}>
                        <div className="flex items-end justify-between gap-4">
                            <h2 className="h2">Featured work</h2>
                            <Link
                                href="/projects"
                                className="text-sm text-muted-foreground hover:text-foreground transition"
                            >
                                View all
                            </Link>
                        </div>

                        <div className="mt-6 grid gap-4 md:grid-cols-2">
                            {projects.map((p) => (
                                <ProjectTile key={p.slug} p={p} />
                            ))}
                        </div>
                    </FadeIn>
                </Container>
            </section>
        </>
    );
}
