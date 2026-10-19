import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("bridgecare");

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function BridgeCareCaseStudy() {
    return (
        <CaseStudyShell p={p}>
            <aside className="rounded-[var(--radius)] border-l-4 border-sun bg-card p-5">
                <p className="font-semibold text-foreground">BridgeCare does not diagnose.</p>
                <p className="mt-1 text-muted-foreground">
                    It is a navigation tool that helps people decide where to go next. In an emergency, call 911.
                </p>
            </aside>

            <CaseSection title="Problem">
                <p>{p.problem}</p>
                <WhyItMatters>{p.whyItMatters}</WhyItMatters>
            </CaseSection>

            <CaseSection title="What I built">
                <Bullets items={p.bullets} />
            </CaseSection>

            <CaseSection title="Rules decide urgency">
                <p>
                    Urgency comes from a deterministic rules engine: 389 red-flag phrases (132 base, 257 added) across English, Spanish,
                    Chinese, French, Portuguese, Arabic, and Hindi.
                </p>
                <p>
                    The LLM never sets urgency. It explains the result and asks follow-up questions. Its one influence is a backstop of
                    20 fixed flags: unusual phrasing can raise urgency, but never lower it.
                </p>
                <p>
                    Four test scripts with 30 assertions guard the engine, including 25 triage cases spread across all 7 languages.
                </p>
            </CaseSection>

            <CaseSection title="LLM chain and budget">
                <p>
                    Model calls go through a 4-provider fallback chain: Ollama locally, then Claude, Groq, and Gemini. Claude spend is
                    logged in Postgres and cut off at a USD budget, so a busy day can&apos;t run up an open-ended bill.
                </p>
            </CaseSection>

            <CaseSection title="Questions about your own records">
                <p>
                    Uploaded PDFs are parsed with pypdf and chunked on page boundaries, embedded locally with MiniLM, and stored in
                    pgvector behind an HNSW index. Every answer cites the page it came from, so a person can check it against the
                    original.
                </p>
            </CaseSection>

            <CaseSection title="Data and access">
                <p>
                    15 Postgres tables, row-level security on all of them, 20 policies. The API takes the user&apos;s identity from the
                    verified token and ignores any identity in the request body. Web app and API live in one pnpm-workspaces monorepo.
                </p>
            </CaseSection>

            <CaseSection title="Maps and accessibility">
                <p>
                    The care-options map runs on Leaflet and OpenStreetMap, with Overpass for nearby care and OSRM for routes. Results are
                    announced through ARIA live regions, and motion respects the reduced-motion setting.
                </p>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
