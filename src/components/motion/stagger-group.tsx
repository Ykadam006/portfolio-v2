"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Staggers direct children upward with opacity as the group scrolls into view.
 * Children stay fully visible with reduced motion / no JS (from-tween only).
 */
export function StaggerGroup({
    children,
    className,
    stagger = 0.09,
}: {
    children: React.ReactNode;
    className?: string;
    stagger?: number;
}) {
    const root = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            if (reduced || !root.current) return;
            const items = Array.from(root.current.children);
            if (items.length === 0) return;
            /* y-only: opacity floors on text fail WCAG contrast while unrevealed */
            gsap.from(items, {
                y: 20,
                duration: 0.5,
                ease: EASE.out,
                stagger,
                clearProps: "transform",
                scrollTrigger: {
                    trigger: root.current,
                    start: "top 85%",
                    once: true,
                },
            });
        },
        { scope: root, dependencies: [reduced, stagger] }
    );

    return (
        <div ref={root} className={className}>
            {children}
        </div>
    );
}
