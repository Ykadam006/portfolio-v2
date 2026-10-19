"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const DOT = 14;

/**
 * The ending: one more step, drawn the way the journey's are (riser up the
 * left, tread along the top), with what it wraps standing on it. The sun dot
 * climbs it as the section scrolls in and comes to rest at the far end — the
 * next step. Decorative; without script or with reduced motion the step is
 * simply there, with the dot at rest.
 */
export function LastStep({ children }: { children: React.ReactNode }) {
    const root = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            const el = root.current;
            if (reduced || !el) return;
            const q = gsap.utils.selector(el);
            const end = () => el.offsetWidth - (q("[data-climber]")[0] as HTMLElement).offsetLeft - DOT / 2; // to the far end of the tread
            gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: { trigger: el, start: "top 88%", end: "top 38%", scrub: 0.4, invalidateOnRefresh: true },
            })
                .from(q("[data-riser]"), { scaleY: 0, transformOrigin: "bottom", duration: 1 })
                .fromTo(q("[data-climber]"), { x: 0, y: () => el.offsetHeight }, { y: 0, duration: 1 }, 0)
                .from(q("[data-tread]"), { scaleX: 0, transformOrigin: "left", duration: 2 })
                .fromTo(q("[data-climber]"), { x: 0 }, { x: end, duration: 2 }, "<");
        },
        { scope: root, dependencies: [reduced] }
    );

    return (
        <div ref={root} className="relative pt-[0.6em]">
            <span data-riser aria-hidden className="absolute bottom-0 left-[calc(var(--margin)/-2)] top-0 w-[3px] bg-field-foreground" />
            <span data-tread aria-hidden className="absolute left-[calc(var(--margin)/-2)] right-0 top-0 h-[3px] bg-field-foreground" />
            <span
                data-climber
                aria-hidden
                className="absolute rounded-full border-2 border-sun-foreground bg-sun"
                style={{ width: DOT, height: DOT, left: `calc(var(--margin) / -2 + 1.5px - ${DOT / 2}px)`, top: 1.5 - DOT / 2 }}
            />
            {children}
        </div>
    );
}
