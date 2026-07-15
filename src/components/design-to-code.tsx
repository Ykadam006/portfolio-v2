"use client";

/**
 * Design → Code → Live — a pinned, scroll-scrubbed section that embodies the
 * "I bridge design and code" thesis. As the user scrolls, one artboard morphs
 * through three stages: a Figma-style wireframe → the typed React source →
 * the real, interactive rendered component.
 *
 * Driven by a single GSAP ScrollTrigger timeline (pinned, scrub). Honors
 * prefers-reduced-motion and small screens by rendering the three stages
 * stacked statically — no pin, no scrub.
 */

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/components/use-media-query";

const STAGES = [
    {
        n: "01",
        label: "Design",
        caption: "It starts in Figma — frames, auto-layout, components, real content. Edge cases decided before a line of code.",
    },
    {
        n: "02",
        label: "Code",
        caption: "Then typed, reusable React. Consistent states, accessibility, and design tokens baked in — not bolted on.",
    },
    {
        n: "03",
        label: "Live",
        caption: "Shipped to production. Interactive, responsive, and fast — the design and the build are the same thing.",
    },
];

/* ── Stage 1: Figma-style wireframe ───────────────────────────────── */
function DesignStage() {
    return (
        /* Decorative mock of a Figma artboard — not content */
        <div aria-hidden="true" className="dtc-stage absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-[360px]">
                {/* frame label tab */}
                <div className="absolute -top-6 left-0 flex items-center gap-1.5 text-[11px] font-medium text-sky-700 dark:text-sky-400">
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor">
                        <path d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 0 0 0 8Z" opacity=".7" />
                        <rect x="8" width="8" height="8" rx="4" opacity=".4" />
                    </svg>
                    ProfileCard
                </div>

                {/* dashed selection frame */}
                <div className="relative rounded-2xl border-2 border-dashed border-sky-400/50 bg-muted/30 p-5">
                    {/* corner handles */}
                    {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((c) => (
                        <span key={c} className={`absolute ${c} h-2.5 w-2.5 rounded-[3px] border-2 border-sky-400 bg-background`} />
                    ))}

                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-foreground/10" />
                        <div className="flex-1 space-y-2">
                            <div className="h-3 w-2/3 rounded bg-foreground/15" />
                            <div className="h-2.5 w-1/2 rounded bg-foreground/10" />
                        </div>
                    </div>
                    <div className="mt-4 h-8 w-28 rounded-lg bg-foreground/10" />

                    {/* layer name pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {["Avatar", "Title", "Role", "Button"].map((l) => (
                            <span key={l} className="rounded bg-sky-400/10 px-1.5 py-0.5 text-[10px] font-medium text-sky-700 dark:text-sky-400">
                                {l}
                            </span>
                        ))}
                    </div>
                </div>

                {/* collaborator cursor */}
                <div className="absolute -bottom-3 right-6 flex items-center gap-1">
                    <svg viewBox="0 0 24 24" width="16" height="16" className="text-brand" fill="currentColor">
                        <path d="m5 3 14 7-6 2-2 6z" />
                    </svg>
                    <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] font-medium text-brand-foreground">Yogesh</span>
                </div>
            </div>
        </div>
    );
}

/* ── Stage 2: the source ──────────────────────────────────────────── */
function CodeStage() {
    return (
        <div className="dtc-stage absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-[380px] overflow-hidden rounded-2xl border border-border bg-[#0d0f17] shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-2 font-mono text-[11px] text-white/70">ProfileCard.tsx</span>
                </div>
                <pre className="overflow-x-auto px-4 py-3 font-mono text-[11.5px] leading-relaxed">
<code>
<span className="text-[#c586c0]">export function </span><span className="text-[#dcdcaa]">ProfileCard</span><span className="text-white/70">(</span><span className="text-[#9cdcfe]">{"{ name, role }"}</span><span className="text-white/70">) {"{"}</span>{"\n"}
{"  "}<span className="text-[#c586c0]">return</span> <span className="text-white/70">(</span>{"\n"}
{"    "}<span className="text-white/40">&lt;</span><span className="text-[#4ec9b0]">article</span> <span className="text-[#9cdcfe]">className</span><span className="text-white/40">=</span><span className="text-[#ce9178]">&quot;card&quot;</span><span className="text-white/40">&gt;</span>{"\n"}
{"      "}<span className="text-white/40">&lt;</span><span className="text-[#4ec9b0]">Avatar</span> <span className="text-[#9cdcfe]">initials</span><span className="text-white/40">=</span><span className="text-[#ce9178]">&quot;YK&quot;</span> <span className="text-white/40">/&gt;</span>{"\n"}
{"      "}<span className="text-white/40">&lt;</span><span className="text-[#4ec9b0]">h3</span><span className="text-white/40">&gt;</span><span className="text-[#9cdcfe]">{"{name}"}</span><span className="text-white/40">&lt;/</span><span className="text-[#4ec9b0]">h3</span><span className="text-white/40">&gt;</span>{"\n"}
{"      "}<span className="text-white/40">&lt;</span><span className="text-[#4ec9b0]">p</span> <span className="text-[#9cdcfe]">className</span><span className="text-white/40">=</span><span className="text-[#ce9178]">&quot;muted&quot;</span><span className="text-white/40">&gt;</span><span className="text-[#9cdcfe]">{"{role}"}</span><span className="text-white/40">&lt;/</span><span className="text-[#4ec9b0]">p</span><span className="text-white/40">&gt;</span>{"\n"}
{"      "}<span className="text-white/40">&lt;</span><span className="text-[#4ec9b0]">Button</span> <span className="text-[#9cdcfe]">href</span><span className="text-white/40">=</span><span className="text-[#ce9178]">&quot;/projects&quot;</span><span className="text-white/40">&gt;</span>View work<span className="text-white/40">&lt;/</span><span className="text-[#4ec9b0]">Button</span><span className="text-white/40">&gt;</span>{"\n"}
{"    "}<span className="text-white/40">&lt;/</span><span className="text-[#4ec9b0]">article</span><span className="text-white/40">&gt;</span>{"\n"}
{"  "}<span className="text-white/70">)</span>{"\n"}
<span className="text-white/70">{"}"}</span>
</code>
                </pre>
            </div>
        </div>
    );
}

/* ── Stage 3: the real, interactive component ─────────────────────── */
function LiveStage() {
    return (
        <div className="dtc-stage absolute inset-0 flex items-center justify-center">
            <article className="group w-full max-w-[340px] overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                <div className="h-20 bg-gradient-to-r from-brand to-[hsl(260_90%_70%)]" />
                <div className="px-6 pb-6">
                    <div className="-mt-10 flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-card bg-gradient-to-br from-brand to-[hsl(260_90%_70%)] text-2xl font-bold text-white shadow-lg">
                        YK
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight">Yogesh Kadam</h3>
                    <p className="text-sm text-muted-foreground">Frontend Engineer · Chicago, IL</p>
                    <Link
                        href="/projects"
                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
                    >
                        View work
                        <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </Link>
                </div>
            </article>
        </div>
    );
}

export function DesignToCode() {
    const root = useRef<HTMLDivElement>(null);
    const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const animate = !reduced && isDesktop;

    useGSAP(
        () => {
            if (!animate) return;

            const stages = gsap.utils.toArray<HTMLElement>(".dtc-stage");
            const steps = gsap.utils.toArray<HTMLElement>(".dtc-step");
            const caps = gsap.utils.toArray<HTMLElement>(".dtc-cap");

            gsap.set(stages, { autoAlpha: 0 });
            gsap.set(stages[0], { autoAlpha: 1 });
            gsap.set(caps, { autoAlpha: 0, y: 14 });
            gsap.set(caps[0], { autoAlpha: 1, y: 0 });

            const setStep = (i: number) =>
                steps.forEach((s, k) => s.classList.toggle("is-active", k === i));
            setStep(0);

            // Active step = whichever stage is most visible (matches the scrubbed
            // visual exactly, rather than raw scroll thresholds that drift under scrub).
            const syncStep = () => {
                let best = 0;
                let bestAlpha = -1;
                stages.forEach((s, k) => {
                    const a = Number(gsap.getProperty(s, "autoAlpha"));
                    if (a > bestAlpha) {
                        bestAlpha = a;
                        best = k;
                    }
                });
                setStep(best);
            };

            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                scrollTrigger: {
                    trigger: root.current,
                    start: "top top",
                    end: "+=2600",
                    pin: ".dtc-pin",
                    scrub: 0.7,
                    onUpdate: syncStep,
                },
            });

            // 01 → 02
            tl.to(stages[0], { autoAlpha: 0, yPercent: -3, duration: 1 })
                .to(caps[0], { autoAlpha: 0, y: -14, duration: 1 }, "<")
                .fromTo(stages[1], { autoAlpha: 0, yPercent: 4 }, { autoAlpha: 1, yPercent: 0, duration: 1 }, "<0.35")
                .fromTo(caps[1], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1 }, "<")
                .to({}, { duration: 0.5 })
                // 02 → 03
                .to(stages[1], { autoAlpha: 0, yPercent: -3, duration: 1 })
                .to(caps[1], { autoAlpha: 0, y: -14, duration: 1 }, "<")
                .fromTo(stages[2], { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, duration: 1 }, "<0.35")
                .fromTo(caps[2], { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1 }, "<")
                .to({}, { duration: 0.5 });
        },
        { scope: root, dependencies: [animate] }
    );

    return (
        <section ref={root} id="craft" className="relative">
            <div className="dtc-pin section flex min-h-screen items-center overflow-hidden bg-muted/20">
                <div className="mx-auto w-full max-w-6xl px-6">
                    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                        {/* Left: story */}
                        <div>
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                                design engineering
                            </p>
                            <h2 className="h2">
                                Design <span className="text-muted-foreground">→</span> Code{" "}
                                <span className="text-muted-foreground">→</span>{" "}
                                <span className="text-brand">Live</span>
                            </h2>

                            {/* stepper */}
                            <div className="mt-6 flex gap-3">
                                {STAGES.map((s, i) => (
                                    <div
                                        key={s.n}
                                        className={`dtc-step flex-1 rounded-xl border p-3 transition-colors duration-300 ${
                                            animate
                                                ? "border-border [&.is-active]:border-brand/50 [&.is-active]:bg-brand/5"
                                                : "border-border"
                                        }`}
                                        data-step={i}
                                    >
                                        <span className="font-mono text-xs text-foreground/60">{s.n}</span>
                                        <p className="mt-0.5 text-sm font-semibold">{s.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* captions — animated (overlaid) on desktop, stacked when static */}
                            {animate ? (
                                <div className="relative mt-6 h-24">
                                    {STAGES.map((s) => (
                                        <p key={s.n} className="dtc-cap absolute inset-0 max-w-md text-muted-foreground">
                                            {s.caption}
                                        </p>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-6 max-w-md text-muted-foreground">
                                    From Figma frames to typed React to a shipped, interactive component — the design and the
                                    build are the same craft.
                                </p>
                            )}
                        </div>

                        {/* Right: artboard */}
                        {animate ? (
                            <div className="relative mx-auto aspect-[4/3] w-full max-w-[440px]">
                                <DesignStage />
                                <CodeStage />
                                <LiveStage />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {[DesignStage, CodeStage, LiveStage].map((Stage, i) => (
                                    <div key={i} className="relative h-64">
                                        <Stage />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
