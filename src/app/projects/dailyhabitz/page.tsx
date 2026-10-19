import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("dailyhabitz");

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function DailyHabitzCaseStudy() {
    return (
        <CaseStudyShell p={p}>
            <CaseSection title="Problem">
                <p>{p.problem}</p>
                <WhyItMatters>{p.whyItMatters}</WhyItMatters>
            </CaseSection>

            <CaseSection title="What I built">
                <Bullets items={p.bullets} />
            </CaseSection>

            <CaseSection title="Decisions">
                <div className="space-y-3">
                    <ChallengeBlock
                        title="Sessions you can revoke"
                        problem="A self-contained token can't be taken back before it expires."
                        fix="256-bit opaque session tokens stored in MongoDB with a TTL index, rotated every 50 minutes against a 60-minute expiry. Deleting the record ends the session."
                    />
                    <ChallengeBlock
                        title="A double tap shouldn't count twice"
                        problem="Retries and quick double taps can record the same day's check-in twice, inflating a streak."
                        fix="Completions are keyed on the user's local date, so recording one again is a no-op. The UI stays optimistic on 4 TanStack Query mutations."
                    />
                    <ChallengeBlock
                        title="Free-tier cold starts"
                        problem="The Express API sleeps when idle on Render, and the first call after a quiet period timed out."
                        fix="Browser calls go through Next.js proxy routes with timeout and retry handling, so a cold start resolves instead of failing."
                    />
                </div>
            </CaseSection>

            <CaseSection title="Operability">
                <p>
                    A health endpoint answers 200 or 503, every request carries an ID for tracing, and logs are structured JSON with 9
                    sensitive key patterns redacted before they are written.
                </p>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
