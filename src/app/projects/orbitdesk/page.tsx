import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("orbitdesk");

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function OrbitDeskCaseStudy() {
    return (
        <CaseStudyShell p={p}>
            <CaseSection title="Problem">
                <p>{p.problem}</p>
                <WhyItMatters>{p.whyItMatters}</WhyItMatters>
            </CaseSection>

            <CaseSection title="What I built">
                <Bullets items={p.bullets} />
            </CaseSection>

            <CaseSection title="Decisions">
                <div className="space-y-3">
                    <ChallengeBlock
                        title="Trust the token, or the database?"
                        problem="A JWT says who you were when it was issued. A workspace membership can be revoked a minute later."
                        fix="Socket JWTs are short-lived, and the socket service re-reads membership from the database on every event. Removing someone takes effect on their next message."
                    />
                    <ChallengeBlock
                        title="Optimistic, but never wrong for long"
                        problem="Waiting for the server makes dragging feel broken. Not waiting risks showing a move that never happened."
                        fix="The move applies instantly while the Zustand store keeps a snapshot. If the server rejects it, the board rolls back to the snapshot."
                    />
                    <ChallengeBlock
                        title="An LLM in the request path"
                        problem="A slow model call can hang a request a person is actively waiting on."
                        fix="Claude summaries run with a 30-second timeout and per-user throttling, and fall back to a deterministic summary when the model is slow."
                    />
                </div>
            </CaseSection>

            <CaseSection title="Permissions and security">
                <p>
                    3-tier role-based access is enforced twice: once in the HTTP API and again in the socket layer, across 12 event types
                    with presence and rooms.
                </p>
                <ul className="list-disc space-y-1.5 pl-5">
                    <li>bcrypt at cost 12; lockout after 5 failed attempts per 15 minutes</li>
                    <li>Single-use reset tokens and global session invalidation</li>
                    <li>CSRF origin checks, a CSP, and 7 security headers in total</li>
                    <li>An XSS sanitizer inside 12 Zod schemas</li>
                    <li>Upstash Redis per-IP rate limits with an in-memory fallback; auth capped at 10 requests per 15 minutes</li>
                </ul>
            </CaseSection>

            <CaseSection title="Data model">
                <p>
                    46 HTTP handlers over 30 route modules sit on a 10-model PostgreSQL schema with 11 indexes and constraints, 3 enums,
                    and 4 Prisma migrations behind it.
                </p>
            </CaseSection>

            <CaseSection title="Testing and delivery">
                <p>
                    283 tests across 51 files: Jest and React Testing Library for units and components, Playwright end to end. Line
                    coverage is 60%.
                </p>
                <p>
                    The app ships as a multi-stage Docker build on a non-root image, with health-gated Docker Compose. A 9-step GitHub
                    Actions pipeline runs on every push, including a Playwright E2E job.
                </p>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
