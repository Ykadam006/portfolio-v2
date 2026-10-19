import Link from "next/link";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { ResumeLink } from "@/components/resume-drawer";
import { site, education } from "@/lib/site-data";

export const metadata = {
    title: "About — Yogesh Kadam",
    description:
        "Full-stack software engineer in Chicago. I came in through the frontend and kept going down the stack. Junior Full-Stack Developer at Looks For Lease, MAS from Illinois Tech.",
};

const FACTS = [
    ["Based in", "Chicago, IL"],
    ["From", "Pune, India"],
    ["Now", `${site.now.title}, ${site.now.org}`],
    ["Degree", "MAS in ITM, Illinois Tech, 4.0 GPA"],
    ["Open to", "Roles anywhere in the US"],
    ["Replies", "Within a day"],
] as const;

/* Same link treatment as the principles on the home page */
const proof = "text-foreground underline decoration-sun decoration-2 underline-offset-4";

export default function AboutPage() {
    return (
        <div className="pb-24 sm:pb-32">
            <section className="frame grid gap-x-6 gap-y-14 pt-14 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <h1 className="h1">Hi, I&apos;m Yogesh.</h1>
                    {/* In his own words. */}
                    <div className="mt-10 space-y-5 text-lg leading-relaxed [&_p]:max-w-[60ch]">
                        <p className="font-medium">
                            I&apos;m a full-stack software engineer based in Chicago. I came in through the frontend, matching designs pixel
                            for pixel, and kept going down the stack until I was writing the APIs, schemas, and event pipelines behind the
                            screen. I still care how a page looks and feels. I also care what happens after the request leaves it.
                        </p>
                        <p className="text-muted-foreground">
                            Right now I&apos;m a Junior Full-Stack Developer at Looks For Lease, a remote LA startup, working on a
                            customer-facing booking and operations platform. I connected scheduling and payments so customers can book and
                            pay in one flow, without a separate checkout step. Then I added the unglamorous parts: safeguards that keep a
                            repeated or out-of-order event from scrambling someone&apos;s appointment. I also built a data-import workflow
                            where every upload is previewed and validated before it touches production, plus an internal admin app backed
                            by Postgres.
                        </p>
                        <p className="text-muted-foreground">
                            Before that I rebuilt two WordPress sites for the Council of International Programs Chicago, built Next.js admin
                            modules at Looks For Lease in 2025, and shipped landing pages for Abhyaz in Chennai.
                        </p>
                        <p className="text-muted-foreground">
                            What I&apos;m good at is getting productive in a stack I haven&apos;t used, and I learn one by building
                            something real in it. Java, Go, and Kafka never came up at work, so I built{" "}
                            <Link href="/projects/claimforge" className={proof}>
                                ClaimForge
                            </Link>
                            , an insurance claims platform with 5 Spring Boot microservices, a Kafka transactional outbox, MySQL, Redis, and
                            an Angular UI. Then{" "}
                            <Link href="/projects/sentinelmesh" className={proof}>
                                SentinelMesh
                            </Link>
                            : 5 Go microservices over Kafka and gRPC that turn service metrics into alerts and incidents, with an SLO
                            engine, Prometheus, and Kubernetes manifests.{" "}
                            <Link href="/projects/bridgecare" className={proof}>
                                BridgeCare
                            </Link>{" "}
                            is an AI health navigation app (Next.js, FastAPI, pgvector) where a rules engine decides urgency and the LLM
                            only explains it.
                        </p>
                        <p className="text-muted-foreground">
                            Day to day it&apos;s React, Next.js, TypeScript, Node, and PostgreSQL. I&apos;ve deployed a Spring Boot and
                            React app on AWS (EC2, RDS, S3), I write tests as I go (Jest, Vitest, Playwright, JUnit, Testcontainers), and I
                            use Claude Code and Codex every day.
                        </p>
                        <p className="text-muted-foreground">
                            I finished my MAS in Information Technology &amp; Management at Illinois Tech in May 2026. Off the keyboard I
                            shoot candid photos, mostly people in motion. I&apos;m open to full-stack, frontend, and backend roles anywhere
                            in the US. <span className="font-medium text-foreground">Give me a hard problem and a stack I don&apos;t know yet.</span>
                        </p>
                    </div>
                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <Link href="/projects" className="btn-primary">
                            See the work
                        </Link>
                        <ResumeLink className="btn-ghost">Resume</ResumeLink>
                    </div>
                </div>

                <dl className="h-fit space-y-5 rounded-[var(--radius)] bg-card p-6 sm:p-8 lg:col-span-4 lg:col-start-9">
                    {FACTS.map(([k, v]) => (
                        <div key={k}>
                            <dt className="small">{k}</dt>
                            <dd className="font-medium">{v}</dd>
                        </div>
                    ))}
                </dl>
            </section>

            <section aria-labelledby="edu-heading" className="frame mt-32">
                <h2 id="edu-heading" className="h2">
                    Education
                </h2>
                <div className="mt-12">
                    <ExperienceTimeline items={education} />
                </div>
            </section>
        </div>
    );
}
