import { CaseSection, CaseStudyShell } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "dailyhabitz")!;

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
            heroPreviewUrl={p.links.live || undefined}
        >
            <CaseSection title="Problem">
                <p>{p.problem}</p>
            </CaseSection>

            <CaseSection title="Solution">
                <p>{p.solution}</p>
            </CaseSection>

            <CaseSection title="Architecture">
                <p><b>Frontend:</b> {p.architecture.frontend}</p>
                <p><b>Backend:</b> {p.architecture.backend}</p>
                <p><b>Infra:</b> {p.architecture.infra}</p>
            </CaseSection>

            <CaseSection title="Key Features">
                <ul className="list-disc pl-5 space-y-2">
                    {p.keyFeatures.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </CaseSection>

            <CaseSection title="Challenges & Decisions">
                <p>{p.challenges}</p>
            </CaseSection>

            <CaseSection title="Design Note">
                <p>{p.designNote}</p>
            </CaseSection>

            <CaseSection title="Impact">
                <ul className="list-disc pl-5 space-y-2">
                    {p.impact.map((i) => (
                        <li key={i}>{i}</li>
                    ))}
                </ul>
            </CaseSection>

            <CaseSection title="What I'd Improve Next">
                <p>{p.improveNext}</p>
            </CaseSection>
        </CaseStudyShell>
    );
}
