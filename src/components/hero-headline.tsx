"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Hero headline: one-shot SplitText word reveal (gentle blur + rise).
 * The complete sentence is in the SSR markup, so crawlers and screen
 * readers always get readable text, and the accent word is static —
 * no cycling, no reflow, no permanent animation.
 * Reduced motion: static sentence, no split.
 */
export function HeroHeadline() {
    const root = useRef<HTMLSpanElement>(null);
    const wordRef = useRef<HTMLSpanElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            const el = root.current;
            const word = wordRef.current;
            if (!el || !word || reduced) return;

            // If the session intro overlay is running, wait for it to lift.
            const introPending = !sessionStorage.getItem("yk_intro_seen");
            const startDelay = introPending ? 0.95 : 0.05;

            const split = SplitText.create(el.querySelectorAll("[data-split]"), {
                type: "words",
                // The animated copy is aria-hidden with an sr-only twin —
                // "auto" would put aria-label on plain spans (prohibited).
                aria: "none",
                autoSplit: true,
                onSplit: (self) =>
                    gsap.from([...self.words, word], {
                        y: "0.5em",
                        autoAlpha: 0,
                        filter: "blur(6px)",
                        duration: 0.55,
                        ease: EASE.out,
                        stagger: 0.03,
                        delay: startDelay,
                        clearProps: "filter",
                    }),
            });

            return () => split.revert();
        },
        { scope: root, dependencies: [reduced] }
    );

    return (
        <>
            {/* Screen readers get the whole sentence; the animated twin is hidden. */}
            <span className="sr-only">
                UI-focused full-stack developer crafting fast, production-ready web experiences.
            </span>
            <span ref={root} aria-hidden="true">
                <span data-split>UI-focused full-stack developer crafting</span>{" "}
                <span ref={wordRef} className="text-brand inline-block whitespace-nowrap">
                    fast,
                </span>{" "}
                <span data-split>production-ready web experiences.</span>
            </span>
        </>
    );
}
