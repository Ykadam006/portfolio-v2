import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import { DesignPhilosophy } from "@/components/design-philosophy";
import { HeroIllustration } from "@/components/hero-illustration";
import { LinkButton } from "@/components/button";
import { ResumeLink } from "@/components/resume-drawer";
import {
    site,
    education,
    awardsAndHonors,
    signatureStrengthCards,
} from "@/lib/site-data";

export const metadata = {
    title: "About — Yogesh Kadam",
    description:
        "Frontend engineer with a design eye. Learn about my approach to building interfaces, my journey from Pune to Chicago, and what drives my work.",
};

const PERSONAL_FACTS = [
    { label: "Based in", value: "Chicago, IL" },
    { label: "From", value: "Pune, India" },
    { label: "Degree", value: "M.A.S. (May 2026)" },
    { label: "GPA", value: "4.0 / 4.0" },
    { label: "Hobby", value: "Nature photography" },
    { label: "Reply time", value: "< 24 hours" },
];

const APPROACH_CARDS = [
    {
        title: "I design before I code",
        desc: "Every project starts in Figma — wireframes, component hierarchy, edge cases. I map user flows and stress-test layouts before writing a single line of TypeScript. This means fewer rewrites and a codebase that mirrors the design intent.",
    },
    {
        title: "I build what I design",
        desc: "I don't hand off designs and wait. I translate my own Figma files into production React components — pixel-accurate, accessible, and performant. The gap between design and code is where quality gets lost, so I close it myself.",
    },
    {
        title: "I sweat the details",
        desc: "Loading states, empty states, error boundaries, keyboard navigation, reduced motion, color contrast. The difference between a demo and a product is in the 80% of work users never consciously notice but always feel.",
    },
    {
        title: "I measure what matters",
        desc: "Lighthouse scores, task completion, API response times, bundle size. Beautiful code that's slow is still broken. I use data to validate design decisions and catch regressions before users do.",
    },
];

export default function AboutPage() {
    return (
        <div className="flex flex-col">
            {/* HERO */}
            <section className="section relative">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-center">
                        <div className="min-w-0 lg:col-span-7">
                            <FadeIn>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-2">
                                    about me
                                </p>
                                <h1 className="h1">
                                    I build interfaces that feel{" "}
                                    <span className="text-brand">right</span>.
                                </h1>
                            </FadeIn>
                            <FadeIn delay={0.05}>
                                <p className="p mt-5 max-w-2xl text-base leading-relaxed">
                                    I&apos;m Yogesh — a frontend engineer who thinks like a designer. I hold a Master&apos;s in Information Technology &amp; Management from Illinois Tech (4.0 GPA), and I&apos;ve spent the last two years shipping production interfaces, leading campus initiatives for 300+ students, and building full-stack products end to end.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.1}>
                                <p className="p mt-4 max-w-2xl text-base leading-relaxed">
                                    I moved from Pune, India to Chicago to go deeper into software engineering and design. What drives me is the intersection — writing code that&apos;s architecturally clean and shipping UIs that people actually enjoy using. I don&apos;t pick one or the other; I do both.
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.15}>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <LinkButton href="/projects" variant="primary">
                                        See my work
                                    </LinkButton>
                                    <LinkButton href="/contact" variant="secondary">
                                        Get in touch
                                    </LinkButton>
                                    <ResumeLink variant="ghost">Resume</ResumeLink>
                                </div>
                            </FadeIn>
                        </div>
                        <div className="min-w-0 lg:col-span-5">
                            <FadeIn delay={0.08}>
                                <HeroIllustration />
                            </FadeIn>
                        </div>
                    </div>
                </Container>
            </section>

            {/* QUICK FACTS */}
            <section className="border-y border-border/60 bg-muted/20 py-8">
                <Container>
                    <FadeIn delay={0.05}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
                            {PERSONAL_FACTS.map((fact) => (
                                <div key={fact.label} className="text-center">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
                                        {fact.label}
                                    </p>
                                    <p className="text-sm font-medium">{fact.value}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </Container>
            </section>

            {/* MY APPROACH */}
            <section className="py-10 sm:py-12 lg:py-14">
                <Container>
                    <FadeIn delay={0.08}>
                        <div className="mb-7">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                                my approach
                            </p>
                            <h2 className="h2">How I bridge design and engineering</h2>
                            <p className="p mt-3 max-w-2xl">
                                Most teams have designers and developers. I sit in the middle — I can open Figma and open VS Code in the same morning, and the result is better because neither side gets lost in translation.
                            </p>
                        </div>
                    </FadeIn>
                    <div className="grid gap-5 sm:grid-cols-2">
                        {APPROACH_CARDS.map((card, i) => (
                            <FadeIn key={card.title} delay={0.1 + i * 0.06}>
                                <div className="card p-6 h-full">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand/10 text-brand text-sm font-bold font-mono">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3 className="font-semibold tracking-tight text-sm">{card.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* DESIGN PHILOSOPHY */}
            <section className="py-10 sm:py-12 lg:py-14 bg-muted/20">
                <Container>
                    <FadeIn delay={0.08}>
                        <div className="mb-8">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                                design principles
                            </p>
                            <h2 className="h2">What I believe in</h2>
                        </div>
                    </FadeIn>
                    <DesignPhilosophy items={site.designPhilosophy} />
                </Container>
            </section>

            {/* SIGNATURE STRENGTHS */}
            <section className="py-10 sm:py-12 lg:py-14">
                <Container>
                    <FadeIn delay={0.08}>
                        <div className="mb-8">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                                where i add value
                            </p>
                            <h2 className="h2">Signature strengths</h2>
                            <p className="p mt-3 max-w-2xl">
                                Not just skills on a resume — these are areas where I&apos;ve delivered measurable outcomes.
                            </p>
                        </div>
                    </FadeIn>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {signatureStrengthCards.map((card, i) => (
                            <FadeIn key={card.title} delay={0.1 + i * 0.06}>
                                <div className="card p-6 h-full border-l-2 border-l-brand/30 hover:border-l-brand/70 transition-colors">
                                    <h3 className="font-semibold tracking-tight">{card.title}</h3>
                                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.proof}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* BEYOND CODE */}
            <section className="py-10 sm:py-12 lg:py-14 bg-muted/20">
                <Container>
                    <FadeIn delay={0.08}>
                        <div className="mb-8">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                                beyond the code
                            </p>
                            <h2 className="h2">The person behind the pixels</h2>
                        </div>
                    </FadeIn>
                    <div className="grid gap-5 sm:grid-cols-3">
                        <FadeIn delay={0.1}>
                            <div className="card p-6 h-full">
                                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold tracking-tight mb-2">Nature photography</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    I shoot landscapes and wildlife — it trains the same eye I use for UI. Composition, spacing, negative space, leading lines. Good design and good photography follow the same principles.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.16}>
                            <div className="card p-6 h-full">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5" style={{ color: "hsl(260 90% 70%)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold tracking-tight mb-2">Student leadership</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Elevate Cohort Manager for 300+ students, Outstanding Student Award recipient, PME Marketing Chair, PMI volunteer. I lead teams the same way I build software — with clear communication and measurable outcomes.
                                </p>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.22}>
                            <div className="card p-6 h-full">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                                    </svg>
                                </div>
                                <h3 className="font-semibold tracking-tight mb-2">Pune to Chicago</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Moving across the world taught me to adapt fast, communicate clearly across cultures, and never take good design for granted. Every interface I build carries that cross-cultural lens.
                                </p>
                            </div>
                        </FadeIn>
                    </div>
                </Container>
            </section>

            {/* EDUCATION & AWARDS */}
            <section className="py-10 sm:py-12 lg:py-14">
                <Container>
                    <FadeIn delay={0.08}>
                        <div className="mb-8">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                                credentials
                            </p>
                            <h2 className="h2">Education &amp; recognition</h2>
                        </div>
                    </FadeIn>
                    <div className="space-y-4">
                        {education.map((e, i) => (
                            <FadeIn key={`${e.org}-${e.title}`} delay={0.1 + i * 0.06}>
                                <div className="card p-5 sm:p-6">
                                    <h3 className="font-semibold tracking-tight">{e.title}</h3>
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {e.org} · {e.meta}
                                    </p>
                                    {e.bullets.length > 0 && (
                                        <p className="mt-2 text-sm text-muted-foreground">{e.bullets[0]}</p>
                                    )}
                                </div>
                            </FadeIn>
                        ))}
                        {awardsAndHonors.map((a, i) => (
                            <FadeIn key={`${a.org}-${a.title}`} delay={0.2 + i * 0.06}>
                                <div className="card p-5 sm:p-6 border-l-2 border-l-amber-400/50">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold tracking-tight">{a.title}</h3>
                                        <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-400">
                                            Award
                                        </span>
                                    </div>
                                    <p className="mt-0.5 text-sm text-muted-foreground">
                                        {a.org} · {a.meta}
                                    </p>
                                    {a.bullets.length > 0 && (
                                        <p className="mt-2 text-sm text-muted-foreground">{a.bullets[0]}</p>
                                    )}
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-10 sm:py-12 lg:py-14 bg-muted/20">
                <Container>
                    <FadeIn delay={0.08}>
                        <div className="text-center max-w-xl mx-auto">
                            <h2 className="h2">Want to work together?</h2>
                            <p className="p mt-3 mx-auto">
                                I&apos;m looking for frontend, full-stack, and UI engineering roles across the US. Let&apos;s talk about what I can build for your team.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <LinkButton href="/contact" variant="primary">
                                    Get in touch
                                </LinkButton>
                                <LinkButton href="/projects" variant="secondary">
                                    View projects
                                </LinkButton>
                                <LinkButton href={site.links.linkedin} variant="ghost">
                                    LinkedIn
                                </LinkButton>
                            </div>
                        </div>
                    </FadeIn>
                </Container>
            </section>
        </div>
    );
}
