import type { Metadata } from "next";
import { CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "dailyhabitz")!;

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.subtitle };

export default function DailyHabitzCaseStudy() {
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

            <CaseSection num="05" title="CI/CD & quality gates">
                <p>
                    Every push runs a <b>GitHub Actions</b> pipeline with three gates — ESLint, TypeScript
                    type-check, and a full production build — so nothing lint-failing, type-unsafe, or
                    unbuildable can land on main.
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><b>11 Express routes</b> — auth (register, login, refresh, logout) plus habit CRUD and completion toggling, each behind JWT verification.</li>
                    <li><b>3 Next.js proxy routes</b> — a stable request layer between the dashboard and the Render-hosted API.</li>
                    <li><b>50+ frontend and 20 backend modules</b> — organized so each screen, hook, and route handler lives in one predictable place.</li>
                    <li><b>Main branch has stayed green</b> since the pipeline landed.</li>
                </ul>
            </CaseSection>

            <CaseSection num="06" title="Challenges & Decisions">
                <p>{p.challenges}</p>
                <div className="space-y-3 mt-4">
                    <ChallengeBlock
                        number={1}
                        title="Separate Express API vs Next.js API routes"
                        problem="Next API routes would couple the backend to the frontend deploy and blur auth ownership."
                        fix="Kept a standalone Express API (11 routes) with JWT issued and verified in one place — independently deployable, testable in isolation, and swappable later."
                    />
                    <ChallengeBlock
                        number={2}
                        title="Catching breakage before production"
                        problem="Solo-dev pace meant regressions could reach main unnoticed."
                        fix="GitHub Actions runs lint, type-check, and build on every push — main has stayed green since CI landed."
                    />
                    <ChallengeBlock
                        number={3}
                        title="Render free-tier cold starts"
                        problem="The Express backend sleeps when idle — the first API call after a quiet period timed out and broke login and dashboard loads."
                        fix="Routed browser calls through 3 Next.js proxy routes with timeout and retry handling, so a cold start resolves invisibly instead of surfacing as a failed request."
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
