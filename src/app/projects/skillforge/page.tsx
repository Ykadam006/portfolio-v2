import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("skillforge");

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function SkillForgeCaseStudy() {
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
                        title="Persisted state vs. server rendering"
                        problem="The server never sees localStorage, so charts and persisted store values rendered on the server can't match the client."
                        fix="Charts load client-only, and store selectors return stable empty values until hydration finishes, so the first render always matches."
                    />
                    <ChallengeBlock
                        title="Two kinds of project, one panel"
                        problem="Showcase projects come from static data while tracked builds live in the store; two sources risked two diverging lists."
                        fix="One combined selector feeds each skill's proof panel with both."
                    />
                </div>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
