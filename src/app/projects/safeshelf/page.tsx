import type { Metadata } from "next";
import { CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "safeshelf")!;

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.subtitle };

export default function SafeShelfCaseStudy() {
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
                <div className="mt-4 rounded-lg bg-muted/40 border border-border p-4 font-mono text-xs text-muted-foreground leading-relaxed whitespace-pre">
{`React SPA (Vite)
       │
       ▼
api-service (Express + Prisma + Neon)
       │  pantry CRUD · orchestration
       ▼
recall-service (Express adapter only)
       │
       ▼
openFDA API  →  risk triage  →  alerts + audit trail`}
                </div>
            </CaseSection>

            <CaseSection num="04" title="Key Features">
                <ul className="list-disc pl-5 space-y-2">
                    {p.keyFeatures.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </CaseSection>

            <CaseSection num="05" title="Atomic recall-check pipeline">
                <p>
                    Every recall check runs inside a <b>Prisma transaction</b>: write an audit record, upsert matching recalls, and create alerts — all succeed or all roll back. If openFDA times out, the audit still records <code className="text-xs bg-muted px-1 py-0.5 rounded">externalApiStatus: FAILED</code> so there is never a silent partial write.
                </p>
                <p className="mt-2">
                    FDA classification maps to risk tiers with regex ordering: Class I → HIGH, II → MEDIUM, III → LOW — avoiding substring collisions between Class I and Class III labels.
                </p>
            </CaseSection>

            <CaseSection num="06" title="Challenges & Decisions">
                <div className="space-y-3">
                    <ChallengeBlock
                        number={1}
                        title="openFDA 404 and 429 are not generic errors"
                        problem="Zero recall matches return HTTP 404; rate limits return 429 — treating both as 500s breaks UX and hides real failures."
                        fix="Explicit handlers per status with sanitized Lucene phrase queries and user-facing copy. Search-phrase deduplication prevents double-brand queries like Jif Jif that yield zero matches."
                    />
                    <ChallengeBlock
                        number={2}
                        title="Two Express apps on Vercel serverless"
                        problem="Vercel's default body parser conflicts with express.json(); rewrites for two backends are poorly documented for Express."
                        fix="Disabled Vercel body parser so Express owns parsing; vercel.json rewrites route each service. Three Vercel projects: SPA + api-service + recall-service."
                    />
                    <ChallengeBlock
                        number={3}
                        title="Swagger UI behind Helmet CSP"
                        problem="Helmet's default CSP blocks inline Swagger assets on /api/docs."
                        fix="Surgically removed CSP headers only on the /api/docs route — rest of the API stays hardened."
                    />
                </div>
            </CaseSection>

            <CaseSection num="07" title="Design Note">
                <p>{p.designNote}</p>
            </CaseSection>

            <CaseSection num="08" title="Impact">
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
