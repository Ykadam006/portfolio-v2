import { Container } from "@/components/container";
import { skills } from "@/lib/site-data";

export default function SkillsPage() {
    return (
        <section className="section">
            <Container>
                <h1 className="h1">Skills</h1>
                <p className="p mt-4 max-w-2xl">
                    A focused stack for building modern, accessible UIs and reliable full-stack workflows.
                </p>

                <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {Object.entries(skills).map(([group, items]) => (
                        <section key={group} className="card p-6">
                            <h2 className="h2">{group}</h2>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {items.map((s) => (
                                    <span key={s} className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </Container>
        </section>
    );
}
