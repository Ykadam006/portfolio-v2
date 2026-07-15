import type { Metadata } from "next";
import { CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "skillforge")!;

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.subtitle };

export default function SkillForgeCaseStudy() {
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

            <CaseSection num="04" title="Dual data layer">
                <p>
                    SkillForge combines two persistence models on purpose:
                </p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li>
                        <b>Static master guide</b> — <code className="text-xs bg-muted px-1 py-0.5 rounded">skills.json</code> (~2.4k lines) transformed at build time into 27 skills across 10 categories with resources, levels, and curated links.
                    </li>
                    <li>
                        <b>Client state</b> — Zustand + <code className="text-xs bg-muted px-1 py-0.5 rounded">localStorage</code> (<code className="text-xs bg-muted px-1 py-0.5 rounded">skillforge:v1</code>) for checklist progress, practice logs, tracker projects, certs, and session minutes.
                    </li>
                    <li>
                        <b>Optional sync</b> — Prisma <code className="text-xs bg-muted px-1 py-0.5 rounded">SkillforgeState</code> single-row JSON snapshot on Neon when <code className="text-xs bg-muted px-1 py-0.5 rounded">DATABASE_URL</code> is set; <code className="text-xs bg-muted px-1 py-0.5 rounded">/api/progress</code> stubbed for future multi-device sync.
                    </li>
                </ul>
                <p className="mt-2">
                    Showcase repos in <code className="text-xs bg-muted px-1 py-0.5 rounded">projects.json</code> (portfolio proof) merge with Zustand tracker projects on <code className="text-xs bg-muted px-1 py-0.5 rounded">/projects</code> via <code className="text-xs bg-muted px-1 py-0.5 rounded">combinedProjects</code> in each skill detail panel.
                </p>
            </CaseSection>

            <CaseSection num="05" title="Key Features">
                <ul className="list-disc pl-5 space-y-2">
                    {p.keyFeatures.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </CaseSection>

            <CaseSection num="06" title="App surface">
                <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                    / · /dashboard · /skills · /skills/[slug] · /practice · /projects · /certs · /analytics · /now · /settings
                </p>
                <p className="mt-2">
                    <code className="text-xs bg-muted px-1 py-0.5 rounded">pickTodayFocus</code> auto-ranks what to study today from priority, hot flags, and incomplete checklists. Recharts loads via <code className="text-xs bg-muted px-1 py-0.5 rounded">dynamic(..., {"{ ssr: false }"})</code> to avoid hydration warnings.
                </p>
            </CaseSection>

            <CaseSection num="07" title="Challenges & Decisions">
                <div className="space-y-3">
                    <ChallengeBlock
                        number={1}
                        title="Hydration vs. persisted client state"
                        problem="Recharts and Zustand persist both break SSR — server render never matches localStorage state, triggering useSyncExternalStore hydration warnings."
                        fix="Charts load via dynamic(..., { ssr: false }) and store selectors return stable empty arrays until hydration completes — zero hydration warnings across all 9 routes."
                    />
                    <ChallengeBlock
                        number={2}
                        title="Two project models, one panel"
                        problem="Showcase entries live in projects.json (static portfolio proof) while tracker projects live in Zustand — two sources risked duplicate, diverging lists."
                        fix="Unified both behind a single combinedProjects selector, so each skill's 'Ship your proof' panel shows static showcase repos and live tracker builds together."
                    />
                    <ChallengeBlock
                        number={3}
                        title="A ~2.4k-line hand-maintained guide JSON"
                        problem="The static skills.json master guide is big enough that a malformed edit could silently break navigation or dashboard insights."
                        fix="Content is transformed once at build time (skills-stack-to-guide), and 13 Vitest + Playwright tests cover the critical paths — landing → dashboard and skill detail — so guide refactors can't ship broken."
                    />
                </div>
            </CaseSection>

            <CaseSection num="08" title="Design Note">
                <p>{p.designNote}</p>
            </CaseSection>

            <CaseSection num="09" title="Impact">
                <ul className="list-disc pl-5 space-y-2">
                    {p.impact.map((i) => (
                        <li key={i}>{i}</li>
                    ))}
                </ul>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
                {!p.links.live && (
                    <p className="mt-2 text-xs">
                        Live demo URL pending — deploy to Vercel and add the link in site data when ready.
                    </p>
                )}
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
