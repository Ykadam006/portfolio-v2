import type { Metadata } from "next";
import { Bullets, CaseSection, CaseStudyShell, Code, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projectBySlug } from "@/lib/site-data";

const p = projectBySlug("sentinelmesh");

const TOPICS = [
    "service.metric.received",
    "alert.triggered",
    "service.status.changed",
    "incident.created",
    "incident.resolved",
];

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.summary };

export default function SentinelMeshCaseStudy() {
    return (
        <CaseStudyShell p={p}>
            <CaseSection title="Problem">
                <p>{p.problem}</p>
                <WhyItMatters>{p.whyItMatters}</WhyItMatters>
            </CaseSection>

            <CaseSection title="What I built">
                <Bullets items={p.bullets} />
            </CaseSection>

            <CaseSection title="The event path">
                <p>
                    The five Go services talk to each other over gRPC, and every state change travels as a Kafka event on one of five
                    topics:
                </p>
                <ul className="flex flex-wrap gap-2">
                    {TOPICS.map((t) => (
                        <li key={t}>
                            <Code>{t}</Code>
                        </li>
                    ))}
                </ul>
                <p>A stream processor indexes every event into Elasticsearch, so the whole history is searchable in Kibana.</p>
            </CaseSection>

            <CaseSection title="SLOs and alerting">
                <p>
                    The SLO engine, written in Go, computes availability and remaining error budget for 5 services and exports both as
                    Prometheus gauges. When a service burns past twice its threshold, the alert escalates.
                </p>
            </CaseSection>

            <CaseSection title="Incidents, not alert storms">
                <p>
                    A new alert for a service that already has an open incident attaches to that incident&apos;s timeline instead of
                    opening another one. A noisy service produces one incident with a growing history, not a page per spike.
                </p>
                <p>
                    Incidents live in PostgreSQL through GORM. On-call can acknowledge and resolve them; resolving records MTTR, and a
                    postmortem is generated from the timeline.
                </p>
            </CaseSection>

            <CaseSection title="Dashboard">
                <p>
                    React, TypeScript, and Redux Toolkit. SLO cards refresh on a 5-second poll, and incidents can be acknowledged or
                    resolved in place. Error budgets render as ARIA meters, every incident action is labeled, and translucent surfaces
                    fall back to solid ones when the system asks for reduced transparency.
                </p>
            </CaseSection>

            <CaseSection title="Running it">
                <p>
                    The full stack runs as 13 Docker Compose containers. For Kubernetes I wrote manifests with health probes, resource
                    limits, and a Horizontal Pod Autoscaler.
                </p>
            </CaseSection>

            <ImprovementsCallout>
                <p>{p.improveNext}</p>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
