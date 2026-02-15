import { CaseSection, CaseStudyShell } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "iscp")!;

export default function ISCPCaseStudy() {
    return (
        <CaseStudyShell
            title={p.title}
            subtitle={p.subtitle}
            stack={p.stack}
            metrics={p.metrics}
            live={p.links.live}
            github={p.links.github}
        >
            <CaseSection title="Problem">
                <p>
                    Teams needed a multi-user collaboration experience where workflow status, activity, and progress were clear and fast
                    even under load.
                </p>
            </CaseSection>

            <CaseSection title="Solution">
                <p>
                    Built a React UI integrated with REST APIs to power dynamic workflows. Standardized reusable UI patterns to speed up
                    new module delivery without sacrificing quality.
                </p>
            </CaseSection>

            <CaseSection title="Architecture">
                <p><b>Frontend:</b> React component system + predictable state patterns.</p>
                <p><b>Backend:</b> Spring Boot REST APIs backed by PostgreSQL.</p>
                <p><b>Infra:</b> AWS deployment with performance-minded optimizations.</p>
            </CaseSection>

            <CaseSection title="Impact">
                <ul className="list-disc pl-5 space-y-2">
                    <li>Reduced API latency by <b>30%</b> under load.</li>
                    <li>Maintained <b>99.9% uptime</b>.</li>
                    <li>Accelerated module delivery by <b>40%</b> through scalable UI patterns.</li>
                </ul>
            </CaseSection>
        </CaseStudyShell>
    );
}
