"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * 404 page personality.
 *
 * The sticker drifts along a gentle motion path and the headline resolves out
 * of scrambled characters. Small pages are where personality is cheapest — this
 * is a dead end, so it may as well be a pleasant one.
 *
 * Wraps its content rather than sitting beside it, so the tweens are scoped to
 * the real elements. The headline is rendered in full in the markup: only the
 * visible characters are scrambled, so assistive tech reads the sentence and
 * never the noise.
 */
export function NotFoundMotion({
    headline,
    children,
    className = "",
}: {
    headline: string;
    children: React.ReactNode;
    className?: string;
}) {
    const root = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            if (reduced || !root.current) return;

            const title = root.current.querySelector("[data-404-title]");

            if (title) {
                gsap.to(title, {
                    duration: 1.1,
                    scrambleText: { text: headline, chars: "lowerCase", speed: 0.5, revealDelay: 0.2 },
                    ease: "none",
                });
            }

            gsap.from(root.current.querySelectorAll("[data-404-item]"), {
                y: 16,
                duration: 0.5,
                ease: EASE.out,
                stagger: 0.08,
                delay: 0.35,
                clearProps: "transform",
            });
        },
        { scope: root, dependencies: [reduced, headline] }
    );

    return (
        <div ref={root} className={className}>
            {children}
        </div>
    );
}
