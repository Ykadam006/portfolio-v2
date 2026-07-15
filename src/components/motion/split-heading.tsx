"use client";

import { useRef } from "react";
import { gsap, useGSAP, SplitText, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type SplitHeadingProps = {
    as?: "h1" | "h2" | "h3" | "p" | "span";
    children: string;
    className?: string;
    /** "scroll" reveals when the heading enters the viewport; "load" plays on mount. */
    trigger?: "scroll" | "load";
    delay?: number;
    id?: string;
};

/**
 * SplitText word reveal for headings only (never long paragraphs).
 * - Full text is in the SSR markup — readable without JS and by crawlers.
 * - SplitText `aria: "auto"` keeps the element screen-reader friendly.
 * - Reduced motion: renders static text, no split at all.
 */
export function SplitHeading({
    as = "h2",
    children,
    className,
    trigger = "scroll",
    delay = 0,
    id,
}: SplitHeadingProps) {
    // Typed as heading for JSX; at runtime the element matches `as`
    // (GSAP only needs an Element, so the narrower type is safe).
    const ref = useRef<HTMLHeadingElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            const el = ref.current;
            if (!el || reduced) return;

            const split = SplitText.create(el, {
                type: "words",
                aria: "auto",
                autoSplit: true,
                onSplit: (self) =>
                    gsap.from(self.words, {
                        y: "0.5em",
                        autoAlpha: 0,
                        duration: 0.5,
                        ease: EASE.out,
                        stagger: 0.04,
                        delay,
                        ...(trigger === "scroll"
                            ? {
                                  scrollTrigger: {
                                      trigger: el,
                                      start: "top 85%",
                                      once: true,
                                  },
                              }
                            : {}),
                    }),
            });

            return () => split.revert();
        },
        { scope: ref, dependencies: [reduced, trigger, delay] }
    );

    const Tag = as as "h2";
    return (
        <Tag ref={ref} className={className} id={id}>
            {children}
        </Tag>
    );
}
