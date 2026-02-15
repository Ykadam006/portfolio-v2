import Link from "next/link";
import { Container } from "@/components/container";

export function CaseStudyShell({
                                   title,
                                   subtitle,
                                   stack,
                                   metrics,
                                   live,
                                   github,
                                   children,
                               }: {
    title: string;
    subtitle: string;
    stack: readonly string[];
    metrics: readonly string[];
    live: string;
    github: string;
    children: React.ReactNode;
}) {
    return (
        <section className="section">
            <Container>
                <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition">
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

                <div className="mt-7 flex gap-3">
                    <a className="rounded-xl border border-border bg-card px-4 py-2 text-sm hover:shadow-sm transition" href={live} target="_blank" rel="noreferrer">
                        Live
                    </a>
                    <a className="rounded-xl border border-border bg-card px-4 py-2 text-sm hover:shadow-sm transition" href={github} target="_blank" rel="noreferrer">
                        GitHub
                    </a>
                </div>

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
