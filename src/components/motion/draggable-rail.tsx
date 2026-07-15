"use client";

import { useRef } from "react";
import { useGSAP, Draggable } from "@/lib/gsap";
import { useMediaQuery } from "@/components/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * Horizontal rail: a native overflow-x scroll container (keyboard + touch +
 * trackpad always work), progressively enhanced with GSAP Draggable
 * grab-to-scroll on fine-pointer desktop devices.
 */
export function DraggableRail({
    children,
    className = "",
    ariaLabel,
}: {
    children: React.ReactNode;
    className?: string;
    ariaLabel: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            const el = ref.current;
            if (!el || !isDesktop || reduced) return;

            const [instance] = Draggable.create(el, {
                type: "scrollLeft",
                edgeResistance: 0.85,
                cursor: "grab",
                activeCursor: "grabbing",
                allowNativeTouchScrolling: true,
            });
            return () => instance?.kill();
        },
        { scope: ref, dependencies: [isDesktop, reduced] }
    );

    return (
        <div
            ref={ref}
            role="region"
            aria-label={ariaLabel}
            tabIndex={0}
            className={`overflow-x-auto pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-2xl [scrollbar-width:thin] snap-x snap-mandatory lg:snap-none ${className}`}
        >
            {/* Single inner wrapper — GSAP Draggable's scroll proxy wraps the
                container's children in a block div, which would break a flex
                row applied to the container itself. */}
            <div className="flex w-max gap-4">
                {children}
            </div>
        </div>
    );
}
