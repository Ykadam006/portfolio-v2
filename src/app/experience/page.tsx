import { ExperienceTimeline } from "@/components/experience-timeline";
import { experienceCore, experienceAdditional, leadershipActivities, education, training } from "@/lib/site-data";

function Block({ id, title, blurb, children }: { id: string; title: string; blurb: string; children: React.ReactNode }) {
    return (
        <section aria-labelledby={id}>
            <div className="grid gap-x-6 gap-y-3 lg:grid-cols-12">
                <h2 id={id} className="h2 scroll-mt-28 lg:col-span-4">
                    {title}
                </h2>
                <p className="text-muted-foreground lg:col-span-7 lg:col-start-6">{blurb}</p>
            </div>
            <div className="mt-12">{children}</div>
        </section>
    );
}

export default function ExperiencePage() {
    return (
        <div className="frame pb-24 pt-14 sm:pb-32">
            <h1 className="h1">Experience</h1>
            <p className="lead mt-6">Engineering roles first, then campus work, leadership, and school. Newest first.</p>

            <div className="mt-24 space-y-32">
                <Block id="core-heading" title="Engineering roles" blurb="Where I've shipped production code: a live booking platform, two WordPress sites, and campaign landing pages.">
                    <ExperienceTimeline items={experienceCore} />
                </Block>

                <Block id="additional-heading" title="Campus roles" blurb="Go-to-market, program management, and teaching at Illinois Tech.">
                    <ExperienceTimeline items={experienceAdditional} />
                </Block>

                <Block id="leadership-heading" title="Leadership and activities" blurb="Club leadership, volunteering, and photographing campus events.">
                    <ExperienceTimeline items={leadershipActivities} />
                </Block>

                <Block id="education-heading" title="Education and training" blurb="An MAS in IT and Management, a B.Tech in computer science, and cloud training.">
                    <ExperienceTimeline items={education} />
                    <div className="mt-14 grid gap-x-6 gap-y-3 lg:grid-cols-12">
                        <p className="text-muted-foreground lg:col-span-3">Training</p>
                        <ul className="space-y-4 lg:col-span-8 lg:col-start-5">
                            {training.map((t) => (
                                <li key={t.title}>
                                    <p className="font-semibold">{t.title}</p>
                                    <p className="text-muted-foreground">{t.org}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </Block>
            </div>
        </div>
    );
}
