import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("safeshelf");

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function SafeShelfCaseStudy() {
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
                        title="openFDA's 404 and 429 aren't generic errors"
                        problem="No matches comes back as HTTP 404 and rate limits as 429. Treating both as server errors hides real failures behind a broken-looking UI."
                        fix="Each status gets its own handling and message, with sanitized phrase queries and de-duplicated search terms."
                    />
                    <ChallengeBlock
                        title="Two Express apps on Vercel"
                        problem="Vercel's body parser conflicts with express.json(), and routing two backends isn't well documented for Express."
                        fix="Disabled Vercel's parser so Express owns parsing, and routed each service with rewrites."
                    />
                    <ChallengeBlock
                        title="Swagger UI behind Helmet's CSP"
                        problem="Helmet's default content security policy blocks Swagger UI's inline assets."
                        fix="Relaxed the policy on the docs route only; the rest of the API keeps the strict headers."
                    />
                </div>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
