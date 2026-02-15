import { Container } from "@/components/container";
import { skills, signatureStrengths } from "@/lib/site-data";
import { SkillIcon } from "@/components/skill-icon";

export default function SkillsPage() {
    return (
        <section className="section">
            <Container>
                <h1 className="h1">Skills</h1>
                <p className="p mt-4 max-w-2xl">
                    A focused stack for building modern, accessible UIs and reliable full-stack
                    workflows.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {(Object.entries(skills) as [keyof typeof skills, readonly string[]][]).map(
                        ([group, items]) => (
                            <div key={group} className="card p-6">
                                <h2 className="h2">{group}</h2>
                                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {items.map((s) => (
                                        <div
                                            key={s}
                                            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card/50 p-4 transition-colors duration-200 hover:border-brand/30 hover:bg-muted/30 group"
                                        >
                                            <SkillIcon skill={s} size={28} />
                                            <span className="text-xs text-muted-foreground group-hover:text-foreground text-center leading-tight">
                                                {s}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>

                <div className="mt-10 rounded-2xl border border-brand/20 bg-brand/5 p-6">
                    <h2 className="h2">Signature strengths</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Where I add the most value in product and engineering teams.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                        {signatureStrengths.map((s) => (
                            <span
                                key={s}
                                className="rounded-xl border border-brand/30 bg-brand/10 px-4 py-2 text-sm font-medium text-brand"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
