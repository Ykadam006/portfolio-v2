import type { Metadata } from "next";
import { CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "bridgecare")!;

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.subtitle };

export default function BridgeCareCaseStudy() {
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
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Non-clinical disclaimer</p>
                <p className="mt-1">
                    BridgeCare is a <b>navigation</b> tool, not a medical provider. It does not diagnose. For emergencies, call <b>911</b>.
                </p>
            </div>

            <CaseSection num="01" title="Problem">
                <p>{p.problem}</p>
                <WhyItMatters>{p.whyItMatters}</WhyItMatters>
                <p className="mt-2 italic text-muted-foreground">
                    Tell us what&apos;s going on. We&apos;ll help you understand urgency, care options, cost direction, and next steps.
                </p>
            </CaseSection>

            <CaseSection num="02" title="Solution">
                <p>{p.solution}</p>
                <p className="mt-2">
                    BridgeCare is the AI health front door for Gen Z students — reducing confusion before care happens, not replacing clinicians.
                </p>
            </CaseSection>

            <CaseSection num="03" title="Architecture">
                <p><b>Frontend:</b> {p.architecture.frontend}</p>
                <p><b>Backend:</b> {p.architecture.backend}</p>
                <p><b>Infra:</b> {p.architecture.infra}</p>
                <div className="mt-4 rounded-lg bg-muted/40 border border-border p-4 font-mono text-xs text-muted-foreground leading-relaxed whitespace-pre">
{`apps/web (Next.js)          apps/api (FastAPI)
       │                            │
       ├── Supabase Auth            ├── /triage  (rules engine)
       ├── Check-in / Results       ├── /providers (OSM search)
       ├── Care options + map       ├── /coverage (templates + LLM)
       └── Dashboard / Admin        └── LLM service (explain only)
                    │
            Supabase Postgres + RLS + pgvector`}
                </div>
            </CaseSection>

            <CaseSection num="04" title="App routes">
                <div className="overflow-x-auto">
                    <table className="w-full text-xs border border-border rounded-lg">
                        <thead>
                            <tr className="border-b border-border bg-muted/40">
                                <th className="text-left p-2 font-semibold">Route</th>
                                <th className="text-left p-2 font-semibold">Purpose</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[
                                ["/", "Marketing landing"],
                                ["/check, /check/questions", "Onboarding + intake"],
                                ["/results/[caseId]", "Urgency + explanation"],
                                ["/options/[caseId]", "Ranked care options + map"],
                                ["/followup/[caseId]", "Reminders"],
                                ["/dashboard", "History / activity"],
                                ["/admin", "Platform analytics"],
                                ["/about, /safety, /privacy, /terms", "Trust & compliance"],
                            ].map(([route, purpose]) => (
                                <tr key={route}>
                                    <td className="p-2 font-mono text-brand">{route}</td>
                                    <td className="p-2">{purpose}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CaseSection>

            <CaseSection num="05" title="Key Features">
                <ul className="list-disc pl-5 space-y-2">
                    {p.keyFeatures.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </CaseSection>

            <CaseSection num="06" title="Rules-first triage (safety architecture)">
                <p>
                    Urgency is computed by a <b>deterministic rules engine</b> (4 tiers: low → critical, score 0–100). LLMs never decide urgency — they only explain outcomes and ask clarifying follow-ups. Critical keywords immediately surface 911/ER paths.
                </p>
                <p className="mt-2">
                    AI fallback chain: <b>Ollama → OpenRouter → Groq → Google AI Studio</b> — env-switchable so demos can run on $0/mo with local Ollama.
                </p>
            </CaseSection>

            <CaseSection num="07" title="Challenges & Decisions">
                <div className="space-y-3">
                    <ChallengeBlock
                        number={1}
                        title="Safety vs. AI hype"
                        problem="Letting an LLM score urgency risks downgrading emergencies or over-scaring low-risk users."
                        fix='Split responsibilities: rules engine owns urgency; LLM owns explanation and follow-up questions only. Critical red-flag keywords bypass model discretion.'
                    />
                    <ChallengeBlock
                        number={2}
                        title="Cost without live eligibility APIs"
                        problem="Real-time payer APIs are expensive and out of scope for a hackathon build."
                        fix="Deterministic coverage templates (parent plan, student plan, marketplace, uninsured) with LLM polish for plain-English summaries — honest about what is and isn't live data."
                    />
                    <ChallengeBlock
                        number={3}
                        title="Maps on a demo budget"
                        problem="Google Maps billing doesn't fit a $0/mo demo stack."
                        fix="Nominatim/Overpass + client-side Leaflet — no map API key required for provider discovery and care-option maps."
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
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
