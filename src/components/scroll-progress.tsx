"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Progress bar pinned to the top of the viewport.
 *
 * With `target`, it measures a specific element instead of the whole document —
 * on an article that means the bar reflects how much of the *writing* is left,
 * not how much of the page (header, footer, related posts) is left, which is
 * the number a reader actually cares about.
 *
 * Driven by ScrollTrigger rather than framer's useScroll so it shares the same
 * scroll source as everything else on the page and cannot drift from Lenis.
 */
export function ScrollProgress({ target }: { target?: string }) {
    const bar = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!bar.current) return;

            const el = target ? document.querySelector<HTMLElement>(target) : null;
            /* A missing target means the article hasn't rendered — measuring the
               document is a better fallback than showing nothing. */
            const trigger = el ?? document.documentElement;

            const st = ScrollTrigger.create({
                trigger,
                start: el ? "top 20%" : "top top",
                end: el ? "bottom bottom" : "bottom bottom",
                onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
            });

            return () => st.kill();
        },
        { scope: bar, dependencies: [target] }
    );

    return (
        <div
            ref={bar}
            aria-hidden="true"
            className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[2px] origin-left bg-brand"
            style={{ transform: "scaleX(0)" }}
        />
    );
}
