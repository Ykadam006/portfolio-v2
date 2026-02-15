import Link from "next/link";
import { Container } from "@/components/container";
import { projects } from "@/lib/site-data";

export default function ProjectsPage() {
    return (
        <section className="section">
            <Container>
                <h1 className="h1">Projects</h1>
                <p className="p mt-4 max-w-2xl">
                    Case studies with clear scope, architecture notes, and measurable outcomes.
                </p>

                <div className="mt-10 space-y-6">
                    {projects.map((p) => (
                        <section key={p.slug} className="card p-6">
                            <div className="flex flex-col gap-1">
                                <p className="text-xs text-muted-foreground">{p.date}</p>
                                <h2 className="text-xl font-semibold tracking-tight">{p.title}</h2>
                                <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {p.metrics.map((m) => (
                                    <span
                                        key={m}
                                        className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground"
                                    >
                    {m}
                  </span>
                                ))}
                            </div>

                            <ul className="mt-6 space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
                                {p.bullets.map((b) => (
                                    <li key={b}>{b}</li>
                                ))}
                            </ul>

                            <div className="mt-7 flex flex-wrap gap-3 text-sm">
                                <Link
                                    href={p.links.caseStudy}
                                    className="rounded-xl border border-border bg-card px-3 py-2 hover:shadow-sm transition"
                                >
                                    Case Study
                                </Link>

                                <a
                                    href={p.links.live}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl border border-border bg-card px-3 py-2 hover:shadow-sm transition"
                                >
                                    Live
                                </a>

                                <a
                                    href={p.links.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl border border-border bg-card px-3 py-2 hover:shadow-sm transition"
                                >
                                    GitHub
                                </a>
                            </div>
                        </section>
                    ))}
                </div>
            </Container>
        </section>
    );
}
