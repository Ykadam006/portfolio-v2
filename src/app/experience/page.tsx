import { Container } from "@/components/container";
import { experience } from "@/lib/site-data";

export default function ExperiencePage() {
    return (
        <section className="section">
            <Container>
                <h1 className="h1">Experience</h1>
                <p className="p mt-4 max-w-2xl">
                    Roles where I shipped production UI, improved metrics, and collaborated in Agile teams.
                </p>

                <div className="mt-10 space-y-6">
                    {experience.map((x) => (
                        <section key={`${x.org}-${x.title}`} className="card p-6">
                            <div className="flex flex-col gap-1">
                                <h2 className="h2">{x.title}</h2>
                                <p className="text-sm text-muted-foreground">{x.org} · {x.meta}</p>
                            </div>

                        <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
                            {x.bullets.map((b) => (
                                <li key={b}>{b}</li>
                            ))}
                        </ul>
                        </section>
                    ))}
                </div>
            </Container>
        </section>
    );
}
