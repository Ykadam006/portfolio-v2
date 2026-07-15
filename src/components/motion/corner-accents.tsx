"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * YK signature motif — thin corner crosshairs + a pink dot, drawn with
 * DrawSVG when the parent scrolls into view. Purely decorative.
 * Parent element must be `position: relative`.
 */
export function CornerAccents({ className = "" }: { className?: string }) {
    const ref = useRef<SVGSVGElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            const svg = ref.current;
            if (!svg || reduced) return;

            const corners = svg.querySelectorAll<SVGPathElement>("[data-corner]");
            const dot = svg.querySelector("[data-dot]");

            const tl = gsap.timeline({
                scrollTrigger: { trigger: svg, start: "top 90%", once: true },
            });
            tl.from(corners, {
                drawSVG: "0%",
                duration: 0.6,
                ease: EASE.inOut,
                stagger: 0.08,
            });
            if (dot) {
                tl.from(
                    dot,
                    { scale: 0, transformOrigin: "center", duration: 0.3, ease: "back.out(2.5)" },
                    "-=0.2"
                );
            }
        },
        { scope: ref, dependencies: [reduced] }
    );

    return (
        <svg
            ref={ref}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full overflow-visible ${className}`}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
        >
            {/* Corner brackets — vector-effect keeps strokes hairline at any size */}
            <path data-corner d="M1 9 L1 1 L9 1" stroke="hsl(var(--brand))" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity="0.7" />
            <path data-corner d="M91 1 L99 1 L99 9" stroke="hsl(var(--brand))" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity="0.7" />
            <path data-corner d="M99 91 L99 99 L91 99" stroke="hsl(var(--brand))" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity="0.7" />
            <path data-corner d="M9 99 L1 99 L1 91" stroke="hsl(var(--brand))" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity="0.7" />
            {/* Signature pink dot */}
            <circle data-dot cx="99" cy="1" r="2" fill="hsl(var(--brand))" />
        </svg>
    );
}
