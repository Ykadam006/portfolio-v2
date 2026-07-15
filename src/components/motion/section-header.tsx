"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SplitHeading } from "@/components/motion/split-heading";

/**
 * Consistent section intro pattern used across pages:
 * 1. tiny uppercase label fades in
 * 2. heading reveals word-by-word (SplitText)
 * 3. optional description fades up
 */
export function SectionHeader({
    label,
    title,
    description,
    className,
}: {
    label: string;
    title: string;
    description?: string;
    className?: string;
}) {
    const root = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            if (reduced || !root.current) return;
            /* y-only: opacity fades on small text fail WCAG contrast while unrevealed */
            gsap.from(root.current.querySelectorAll("[data-sh-fade]"), {
                y: 12,
                duration: 0.5,
                ease: EASE.soft,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: root.current,
                    start: "top 85%",
                    once: true,
                },
            });
        },
        { scope: root, dependencies: [reduced] }
    );

    return (
        <div ref={root} className={className}>
            <p
                data-sh-fade
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1 flex items-center gap-2"
            >
                <span aria-hidden className="h-1 w-1 rounded-full bg-brand" />
                {label}
            </p>
            <SplitHeading as="h2" className="h2">
                {title}
            </SplitHeading>
            {description && (
                <p data-sh-fade className="p mt-3 max-w-2xl">
                    {description}
                </p>
            )}
        </div>
    );
}
