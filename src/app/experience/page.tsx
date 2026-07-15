import { Container } from "@/components/container";
import { ExperienceTimeline } from "@/components/experience-timeline";
import {
    experienceCore,
    experienceAdditional,
    leadershipActivities,
    education,
    awardsAndHonors,
} from "@/lib/site-data";

function SectionHeader({
    id,
    label,
    title,
    blurb,
}: {
    id: string;
    label: string;
    title: string;
    blurb?: string;
}) {
    return (
        <div className="mb-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1 flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-brand" />
                {label}
            </p>
            <h2 id={id} className="h2">
                {title}
            </h2>
            {blurb && <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{blurb}</p>}
        </div>
    );
}

export default function ExperiencePage() {
    return (
        <section className="section">
            <Container>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                    career
                </p>
                <h1 className="h1">Experience</h1>
                <p className="p mt-3 max-w-2xl">
                    Internships, campus programs, and leadership — most recent first.
                </p>

                <div className="mt-12 space-y-16 sm:space-y-20">
                    {/* 1 — Core Experience */}
                    <section aria-labelledby="core-heading">
                        <SectionHeader
                            id="core-heading"
                            label="01 · core"
                            title="Core Experience"
                            blurb="Professional internships and production client work."
                        />
                        <ExperienceTimeline items={experienceCore} description="" />
                    </section>

                    {/* 2 — Additional Experience */}
                    <section aria-labelledby="additional-heading">
                        <SectionHeader
                            id="additional-heading"
                            label="02 · campus"
                            title="Additional Experience"
                            blurb="Go-to-market, program management, and teaching roles at Illinois Tech."
                        />
                        <ExperienceTimeline items={experienceAdditional} description="" />
                    </section>

                    {/* 3 — Leadership & Activities */}
                    <section aria-labelledby="leadership-heading">
                        <SectionHeader
                            id="leadership-heading"
                            label="03 · involvement"
                            title="Leadership & Activities"
                            blurb="Club leadership, volunteering, and campus involvement."
                        />
                        <ExperienceTimeline items={leadershipActivities} description="" />
                    </section>

                    {/* 4 — Education */}
                    <section aria-labelledby="education-heading">
                        <SectionHeader
                            id="education-heading"
                            label="04 · education"
                            title="Education"
                            blurb="Computer Science and Information Technology."
                        />
                        <ExperienceTimeline items={education} description="" />

                        <div className="mt-12">
                            <h3 className="text-lg font-semibold tracking-tight mb-2">Awards &amp; honors</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Program recognition and academic awards.
                            </p>
                            <ExperienceTimeline items={awardsAndHonors} description="" />
                        </div>
                    </section>
                </div>
            </Container>
        </section>
    );
}
