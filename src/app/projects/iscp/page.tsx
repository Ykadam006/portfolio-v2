import type { Metadata } from "next";
import { CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "iscp")!;

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.subtitle };

export default function ISCPCaseStudy() {
    return (
        <CaseStudyShell
            title={p.title}
            subtitle={p.subtitle}
            stack={p.stack}
            metrics={p.metrics}
            live={p.links.live}
            github={p.links.github}
            architecture={p.architecture}
            archFlow={"archFlow" in p ? p.archFlow : undefined}
            slug={p.slug}
        >
            <CaseSection num="01" title="Problem">
                <p>{p.problem}</p>
                <WhyItMatters>{p.whyItMatters}</WhyItMatters>
            </CaseSection>

            <CaseSection num="02" title="Solution">
                <p>{p.solution}</p>
            </CaseSection>

            <CaseSection num="03" title="Architecture">
                <p><b>Frontend:</b> {p.architecture.frontend}</p>
                <p><b>Backend:</b> {p.architecture.backend}</p>
                <p><b>Infra:</b> {p.architecture.infra}</p>
            </CaseSection>

            <CaseSection num="04" title="Key Features">
                <ul className="list-disc pl-5 space-y-2">
                    {p.keyFeatures.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </CaseSection>

            <CaseSection num="05" title="Challenges & Decisions">
                <p>{p.challenges}</p>
                <div className="space-y-3 mt-4">
                    <ChallengeBlock
                        number={1}
                        title="State management: Context API vs Redux"
                        problem="Two role-scoped experiences (student vs employer) risked a tangled global store and boilerplate-heavy reducers."
                        fix="Chose Context API with two role-scoped provider trees — no cross-cutting state, less boilerplate, simpler onboarding for reviewers."
                    />
                    <ChallengeBlock
                        number={2}
                        title="Hosting: EC2 + RDS vs serverless"
                        problem="Spring Boot cold starts and connection pooling make serverless awkward, but managed VMs demand more setup."
                        fix="Chose EC2 + RDS for a predictable JVM runtime and full AWS provisioning (S3 + CloudFront + Cognito) — the deployment itself became a learning deliverable."
                    />
                    <ChallengeBlock
                        number={3}
                        title="API latency under concurrent load"
                        problem="List endpoints slowed under realistic multi-user testing as datasets grew."
                        fix="Added 5+ PostgreSQL indexes, rewrote hot queries, and moved list views to server-side pagination — endpoint timings improved ~30% across repeated DevTools test cycles."
                    />
                </div>
            </CaseSection>

            <CaseSection num="06" title="Design Note">
                <p>{p.designNote}</p>
            </CaseSection>

            <CaseSection num="07" title="Impact">
                <ul className="list-disc pl-5 space-y-2">
                    {p.impact.map((i) => (
                        <li key={i}>{i}</li>
                    ))}
                </ul>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
