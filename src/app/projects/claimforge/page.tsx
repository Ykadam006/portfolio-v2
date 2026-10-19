import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("claimforge");

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function ClaimForgeCaseStudy() {
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
                        title="Who wins when two people edit one claim?"
                        problem="Two reviewers act on the same claim, or one acts on a copy that is already out of date. Last write wins means a silent, wrong outcome."
                        fix="The lifecycle is a 9-state machine in Java. An illegal transition, or an update made against a stale claim, is refused with 409 Conflict."
                    />
                    <ChallengeBlock
                        title="Database committed, event lost"
                        problem="Writing to MySQL and then publishing to Kafka are two steps. A crash between them leaves other services never hearing about the change."
                        fix="A transactional outbox: the event is stored in the same MySQL transaction as the change, then published."
                    />
                    <ChallengeBlock
                        title="Kafka delivers twice"
                        problem="At-least-once delivery means a consumer will eventually see the same event again."
                        fix="Every consumer is idempotent, so applying an event a second time changes nothing."
                    />
                </div>
            </CaseSection>

            <CaseSection title="Security">
                <ul className="list-disc space-y-1.5 pl-5">
                    <li>24 REST endpoints and a GraphQL API behind Spring Security as an OAuth2 resource server with RS256 JWTs</li>
                    <li>12 method-level role checks across the services</li>
                    <li>Redis-backed lockout after 5 failed logins</li>
                    <li>Uploads checked by magic bytes and extension, capped at 10 MB, de-duplicated per claim by SHA-256</li>
                </ul>
            </CaseSection>

            <CaseSection title="Frontend and accessibility">
                <p>
                    The Angular 22 UI serves 4 roles with signals and lazy-loaded routes. axe-core checks 10 screens for WCAG 2.1 AA at
                    1366px and 390px, so the phone layout is tested, not assumed.
                </p>
            </CaseSection>

            <CaseSection title="Testing and delivery">
                <p>
                    70 backend tests with JUnit 5, Mockito, Testcontainers, and Cucumber; 24 Vitest and 11 Playwright tests on the
                    frontend. All 5 services are containerized behind nginx, and a 3-job GitHub Actions workflow (backend, frontend,
                    end-to-end) runs the E2E suite against Docker Compose.
                </p>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
