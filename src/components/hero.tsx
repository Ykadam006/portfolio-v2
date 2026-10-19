"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { StepsScene } from "@/components/steps-scene";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ResumeLink } from "@/components/resume-drawer";
import { site, skillGroups } from "@/lib/site-data";

const layers = skillGroups.filter((g) => g.trace);

/**
 * First screen. The name runs margin to margin across the top; underneath
 * it, the statement on the left, the staircase in the middle — literally the
 * steps underneath — and the layers it stands for on the right. Hover or
 * focus a layer to light its step.
 */
export function Hero() {
    const [hovered, setHovered] = useState<number | null>(null);
    const [walking, setWalking] = useState<number | null>(null);
    const section = useRef<HTMLElement>(null);
    const stage = useRef<HTMLDivElement>(null);
    const scroll = useRef(0);
    const reduced = useReducedMotion();

    /* The crane shot. Scrolling walks one request up every layer, a step at
       a time, while the camera swings round to the staircase's profile; the
       scene reads this
       progress each frame and reports the step it is on, so the matching
       layer in the list lights with it. On a desktop the first screen holds
       still for it (the page's only pin); on smaller screens, where the hero
       is taller than the window, it plays as the stairs pass through view. */
    useGSAP(
        () => {
            if (reduced || !section.current || !stage.current) return;
            const set = (self: ScrollTrigger) => (scroll.current = self.progress);
            const mm = gsap.matchMedia();
            mm.add("(min-width: 1024px)", () => {
                /* Starts 1px into the scroll, so at rest the hero is in normal flow, not fixed. */
                const pin = ScrollTrigger.create({ trigger: section.current, start: "top 71px", end: "+=70%", pin: true, anticipatePin: 1, onUpdate: set });
                /* Once released, the name lifts away a little faster than the page (on
                   smaller screens CSS does this; a CSS view timeline would run during the pin). */
                gsap.to(".hero-name", {
                    yPercent: -14,
                    ease: "none",
                    scrollTrigger: { start: () => pin.end, end: () => pin.end + section.current!.offsetHeight * 0.8, scrub: true },
                });
                return () => (scroll.current = 0);
            });
            mm.add("(max-width: 1023.98px)", () => {
                ScrollTrigger.create({ trigger: stage.current, start: "top 75%", end: "bottom 30%", onUpdate: set });
                return () => (scroll.current = 0);
            });
        },
        { scope: section, dependencies: [reduced] }
    );

    const active = hovered ?? walking;

    return (
        <section ref={section} className="hero relative flex flex-col overflow-hidden lg:h-[calc(100svh-4.5rem)] lg:min-h-[36rem]">
            <div className="frame grid min-h-0 flex-1 grid-cols-1 gap-x-6 gap-y-10 py-10 lg:grid-cols-12 lg:py-6">
                <div className="lg:col-span-4 lg:self-center">
                    <p className="lead text-foreground">
                        Full-stack software engineer in Chicago. I care how a page looks and feels, and what happens after the request
                        leaves it.
                    </p>
                    <p className="mt-5 text-muted-foreground">
                        Kadam (<span lang="mr">कदम</span>) is Marathi for a step. Right now I&apos;m a {site.now.title} at {site.now.org},
                        and I&apos;m open to full-stack, frontend, and backend roles anywhere in the US.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link href="/projects" className="btn-primary">
                            See the work
                        </Link>
                        <ResumeLink className="btn-ghost">Resume</ResumeLink>
                    </div>
                </div>

                <div ref={stage} className="flex min-h-0 flex-col lg:col-span-5">
                    <StepsScene count={layers.length} active={hovered} scroll={scroll} onStep={setWalking} className="aspect-[5/4] w-full lg:aspect-auto lg:min-h-0 lg:flex-1" />
                </div>

                <ol className="lg:col-span-3 lg:col-start-10 lg:self-center" aria-label="The layers I build in">
                    {layers.map((g, i) => (
                        <li key={g.id}>
                            <Link
                                href={`/skills#${g.id}`}
                                onPointerEnter={() => setHovered(i)}
                                onPointerLeave={() => setHovered(null)}
                                onFocus={() => setHovered(i)}
                                onBlur={() => setHovered(null)}
                                className="group block py-2.5"
                            >
                                <span className="flex items-center gap-2 font-semibold">
                                    <span
                                        aria-hidden
                                        className={`h-2.5 w-2.5 rounded-full transition-colors duration-150 ${
                                            active === i ? "bg-sun" : "bg-foreground/20"
                                        }`}
                                    />
                                    {g.label}
                                </span>
                                <span className="mt-0.5 block pl-[18px] text-sm text-muted-foreground group-hover:text-foreground">
                                    {g.trace!.top}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="frame order-first pt-4 [container-type:inline-size]">
                <h1 className="monument display hero-name">
                    {/* Each word rises through its own mask in the opening titles (see page.tsx) */}
                    <span className="monument-word">
                        <span className="intro-word">Yogesh</span>
                    </span>{" "}
                    <span className="monument-word">
                        <span className="intro-word">Kadam</span>
                    </span>
                </h1>
            </div>
        </section>
    );
}
