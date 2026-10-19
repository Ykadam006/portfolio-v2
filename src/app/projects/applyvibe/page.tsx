import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, ChallengeBlock, Code, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("applyvibe");

const STAGES = [
    "Saved",
    "Applied",
    "OA",
    "Recruiter screen",
    "Interview 1",
    "Interview 2",
    "Final round",
    "Offer",
    "Rejected",
    "Ghosted",
    "Withdrawn",
];

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function ApplyVibeCaseStudy() {
    return (
        <CaseStudyShell p={p}>
            <CaseSection title="Problem">
                <p>{p.problem}</p>
                <WhyItMatters>{p.whyItMatters}</WhyItMatters>
            </CaseSection>

            <CaseSection title="What I built">
                <Bullets items={p.bullets} />
            </CaseSection>

            <CaseSection title="Every write is checked">
                <p>
                    Each handler confirms the record belongs to the signed-in user before touching it, validates the body against a
                    Zod schema shared with the client, and copies only whitelisted fields (21 of them) into the update. That closes
                    both IDOR, where someone edits another user&apos;s record by changing an ID, and mass assignment, where extra fields
                    ride along in the payload.
                </p>
            </CaseSection>

            <CaseSection title="Pipeline and analytics">
                <p>The board has 11 stages, terminal outcomes included:</p>
                <ol className="flex flex-wrap gap-1.5">
                    {STAGES.map((s) => (
                        <li key={s} className="chip chip-stack">
                            {s}
                        </li>
                    ))}
                </ol>
                <p>Dragging a card moves it with dnd-kit; 7 Recharts charts and 11 KPI cards show what the pipeline is doing.</p>
            </CaseSection>

            <CaseSection title="Bugs worth writing down">
                <div className="space-y-3">
                    <ChallengeBlock
                        title="Route protection silently stopped working"
                        problem={
                            <>
                                Next.js 16 renamed <Code>middleware.ts</Code> to <Code>proxy.ts</Code>; the old file kept loading with
                                only a deprecation warning.
                            </>
                        }
                        fix={
                            <>
                                Renamed it to <Code>proxy.ts</Code> with a default export, which the new convention requires.
                            </>
                        }
                    />
                    <ChallengeBlock
                        title="Prisma generate failing on Vercel"
                        problem="Prisma's config read an environment variable during install, before Vercel had injected it."
                        fix="Gave the config a placeholder fallback URL. prisma generate never connects, so the fallback is safe."
                    />
                    <ChallengeBlock
                        title="Applications vanishing from the funnel"
                        problem={
                            <>
                                The stage-order array listed only 5 stages, so <Code>indexOf()</Code> returned -1 for the rest and those
                                applications disappeared from the chart.
                            </>
                        }
                        fix="Rewrote the funnel to handle every stage, with terminal outcomes counted explicitly."
                    />
                    <ChallengeBlock
                        title="Duplicate drag IDs"
                        problem="The drag overlay rendered the same draggable card, so two components registered one dnd-kit ID."
                        fix="Split the card into pure content and an overlay wrapper; only the real card registers as draggable."
                    />
                </div>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
