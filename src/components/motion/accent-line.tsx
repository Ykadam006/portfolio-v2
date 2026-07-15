"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Small decorative brand underline drawn in with DrawSVG on mount.
 * Reduced motion: renders fully drawn, no animation.
 */
export function AccentLine({ className = "" }: { className?: string }) {
    const ref = useRef<SVGSVGElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            const path = ref.current?.querySelector("path");
            if (!path || reduced) return;
            gsap.from(path, { drawSVG: "0%", duration: 0.8, ease: "power2.out", delay: 0.35 });
        },
        { scope: ref, dependencies: [reduced] }
    );

    return (
        <svg
            ref={ref}
            aria-hidden="true"
            className={`h-2 w-28 overflow-visible ${className}`}
            viewBox="0 0 112 8"
            fill="none"
        >
            <path
                d="M2 5 C 30 1, 82 1, 110 5"
                stroke="hsl(var(--brand))"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
            />
        </svg>
    );
}
