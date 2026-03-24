import { CaseSection, CaseStudyShell } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "ghumakad")!;

export default function GhumakkadCaseStudy() {
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

            <CaseSection title="API Integrations">
                <p>Four external APIs were integrated, each with inconsistent response shapes requiring normalization:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><b>OpenWeather API</b> — real-time and forecast weather data for any destination, normalized to a consistent shape for rendering across weather and itinerary screens.</li>
                    <li><b>Nominatim (OpenStreetMap)</b> — geocoding and place search, used for destination lookup and map center coordinates.</li>
                    <li><b>OpenTripMap API</b> — points of interest and attraction data for destination discovery and itinerary suggestions.</li>
                    <li><b>Wikipedia API</b> — destination summary text for context cards on the destination detail screens.</li>
                </ul>
                <p className="mt-2">All four APIs were called via shared Axios interceptors with unified loading and error state handling reused across every route — one pattern for all four data sources.</p>
            </CaseSection>

            <CaseSection title="Challenges & Decisions">
                <p>{p.challenges}</p>
                <p className="mt-3">
                    A secondary challenge was keeping the budget dashboard reactive without a backend — user inputs drive Chart.js in real time via local state, with no network round-trip. This required careful memoization to prevent unnecessary re-renders as the budget data grew.
                </p>
                <p className="mt-3">
                    Smooth page transitions across 14 routes were achieved using GSAP and Lottie animations applied at the route level — keeping every navigation feel deliberate rather than abrupt.
                </p>
            </CaseSection>

            <CaseSection title="Testing Strategy">
                <p>Testing was enforced from the start, not added at the end:</p>
                <ul className="list-disc pl-5 space-y-2 mt-2">
                    <li><b>Vitest + Testing Library</b> — unit and integration tests for components and hooks, with a focus on API response rendering and error states.</li>
                    <li><b>MSW (Mock Service Worker)</b> — intercepted all four external API calls in tests so no real network requests were made, making the suite fast and deterministic.</li>
                    <li><b>ESLint + Prettier</b> — enforced via Husky pre-commit hooks so no malformatted or lint-failing code could be committed.</li>
                </ul>
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
