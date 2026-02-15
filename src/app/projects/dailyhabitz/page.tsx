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
        >
            <CaseSection title="Problem">
                <p>
                    Habit tracking works only if progress is clear and motivating. The goal was clean CRUD flows, meaningful progress
                    visuals, and reliable deployments.
                </p>
            </CaseSection>

            <CaseSection title="Solution">
                <p>
                    Built a full-stack Next.js app with modular UI, reactive forms, and Chart.js progress dashboards. Automated CI/CD for
                    faster, safer iteration.
                </p>
            </CaseSection>

            <CaseSection title="Architecture">
                <p><b>Frontend:</b> Next.js (App Router) + TypeScript + Tailwind.</p>
                <p><b>Data:</b> MongoDB-backed CRUD workflows.</p>
                <p><b>Delivery:</b> GitHub Actions CI/CD pipeline.</p>
            </CaseSection>

            <CaseSection title="Impact">
                <ul className="list-disc pl-5 space-y-2">
                    <li>Delivered <b>100% CRUD flows</b> for habits.</li>
                    <li>Enabled <b>3× faster</b> iteration cycles via CI/CD automation.</li>
                </ul>
            </CaseSection>
        </CaseStudyShell>
    );
}
