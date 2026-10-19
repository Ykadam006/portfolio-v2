import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { CaseGallery } from "@/components/motion/case-gallery";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("ghumakad");

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function GhumakkadCaseStudy() {
    return (
        <CaseStudyShell p={p}>
            <CaseSection title="Problem">
                <p>{p.problem}</p>
                <WhyItMatters>{p.whyItMatters}</WhyItMatters>
            </CaseSection>

            <CaseSection title="What I built">
                <Bullets items={p.bullets} />
            </CaseSection>

            <CaseSection title="Screens">
                <p>A generated itinerary, the budget breakdown, and destination ideas, all from the live app.</p>
                <CaseGallery
                    label="Ghumakkad app screenshots"
                    shots={[
                        {
                            src: "/projects/ghumakad/itinerary.webp",
                            alt: "Ghumakkad itinerary screen showing a generated day-by-day travel plan",
                            caption: "One-tap itinerary, day by day",
                        },
                        {
                            src: "/projects/ghumakad/budget.webp",
                            alt: "Ghumakkad budget screen breaking a trip down by category",
                            caption: "Budget breakdown by category",
                        },
                        {
                            src: "/projects/ghumakad/destinations.webp",
                            alt: "Ghumakkad destination discovery screen with suggested places",
                            caption: "Destination discovery",
                        },
                    ]}
                />
            </CaseSection>

            <CaseSection title="Performance and caching">
                <ul className="list-disc space-y-1.5 pl-5">
                    <li>13 of 15 routes are lazy-loaded, split into 26 Vite chunks.</li>
                    <li>Weather goes through a Netlify Function proxy with a 10-minute CDN cache.</li>
                    <li>On the client, an in-memory map sits in front of a 24-hour localStorage cache.</li>
                    <li>Nominatim geocoding is rate-limited to one call per 1,100 ms, behind a 400 ms debounce.</li>
                    <li>The proxy returns real status codes (400, 500, 502), so the UI can tell a bad query from an upstream outage.</li>
                </ul>
            </CaseSection>

            <CaseSection title="UI system and motion">
                <p>
                    A 12-primitive design system in strict TypeScript. Motion uses View Transitions, Framer Motion, and GSAP; reduced
                    motion is respected across 24 components, and drag-and-drop works from the keyboard.
                </p>
            </CaseSection>

            <CaseSection title="Testing">
                <p>
                    33 Vitest and 10 Playwright tests with MSW mocking every external call, 25 Storybook stories, and CI on GitHub
                    Actions.
                </p>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
