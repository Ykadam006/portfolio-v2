import Link from "next/link";
import { Container } from "@/components/container";
import { BrowserFrame } from "@/components/browser-frame";
import { ArchitectureDiagram } from "@/components/architecture-diagram";

export function CaseStudyShell({
    title,
    subtitle,
    stack,
    metrics,
    live = "",
    github,
    architecture,
    heroImage,
    heroPreviewUrl,
    children,
}: {
    title: string;
    subtitle: string;
    stack: readonly string[];
    metrics: readonly string[];
    live?: string;
    github: string;
    architecture?: { frontend: string; backend: string; infra: string };
    heroImage?: { src: string; alt: string };
    heroPreviewUrl?: string;
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
                        <span key={m} className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">
                            {m}
                        </span>
                    ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                    {stack.map((s) => (
                        <span key={s} className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">
                            {s}
                        </span>
                    ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                    {live && live !== "#" && (
                        <a
                            href={live}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                        >
                            Live
                        </a>
                    )}
                    <a
                        href={github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                    >
                        GitHub
                    </a>
                </div>

                {(heroImage || heroPreviewUrl) && (
                    <div className="mt-10">
                        <BrowserFrame>
                            {heroImage ? (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={heroImage.src}
                                    alt={heroImage.alt}
                                    className="w-full aspect-video object-cover transition-transform duration-200 hover:scale-[1.02]"
                                />
                            ) : heroPreviewUrl ? (
                                <iframe
                                    src={heroPreviewUrl}
                                    title="Live app preview"
                                    className="w-full aspect-video border-0 bg-muted/50"
                                />
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
                        />
                    </div>
                )}

                <div className="mt-10 space-y-6">{children}</div>
            </Container>
        </section>
    );
}

export function CaseSection({
                                title,
                                children,
                            }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="card p-6">
            <h2 className="h2">{title}</h2>
            <div className="mt-3 text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
        </section>
    );
}
