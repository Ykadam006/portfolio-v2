import Link from "next/link";
import { skillGroups, proofLinks } from "@/lib/site-data";

export default function SkillsPage() {
    return (
        <div className="frame pb-24 pt-14 sm:pb-32">
            <h1 className="h1">Skills</h1>
            <p className="lead mt-6">
                Everything on my resume, grouped by layer. Each one names where I used it, so you can check the work instead of trusting
                the list.
            </p>
            <nav aria-label="Skill groups" className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {skillGroups.map((g) => (
                    <a key={g.id} href={`#${g.id}`} className="btn-ghost !min-h-10">
                        {g.label}
                    </a>
                ))}
            </nav>

            <div className="mt-24 space-y-24">
                {skillGroups.map((g) => (
                    <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`} className="grid scroll-mt-28 gap-x-6 gap-y-6 lg:grid-cols-12">
                        <div className="lg:col-span-4">
                            <h2 id={`${g.id}-heading`} className="h2">
                                {g.label}
                            </h2>
                            <p className="mt-2 text-muted-foreground">{g.items.length} skills</p>
                        </div>
                        <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
                            {g.items.map(([name, proof]) => (
                                <li key={name}>
                                    <p className="font-semibold">{name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        {proof.split(" ").map((key, i) => {
                                            const ref = proofLinks[key];
                                            return (
                                                <span key={key}>
                                                    {i > 0 && ", "}
                                                    {ref.href ? (
                                                        <Link href={ref.href} className="underline decoration-foreground/25 underline-offset-4 hover:text-foreground hover:decoration-sun">
                                                            {ref.label}
                                                        </Link>
                                                    ) : (
                                                        ref.label
                                                    )}
                                                </span>
                                            );
                                        })}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </div>
    );
}
