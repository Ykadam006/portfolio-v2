import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("iscp");

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function ISCPCaseStudy() {
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
                        title="EC2 and RDS, not serverless"
                        problem="Spring Boot's JVM startup and connection pooling make serverless awkward, while managed VMs mean more setup."
                        fix="The API runs on EC2 with PostgreSQL on RDS and files on S3: a predictable runtime, and a deployment I understood end to end."
                    />
                    <ChallengeBlock
                        title="List views slowing down"
                        problem="As test data grew, the list endpoints that every role opens first got slower."
                        fix="Added indexes for the hot query paths and rewrote the heaviest queries."
                    />
                </div>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
