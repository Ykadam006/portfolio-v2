"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type RoleType = "internship" | "part-time" | "contract" | "full-time";

type ExperienceItem = {
    title: string;
    org: string;
    meta: string;
    bullets: readonly string[];
    current?: boolean;
    roleType?: RoleType;
};

const ROLE_TYPE_LABELS: Record<RoleType, string> = {
    internship: "Internship",
    "part-time": "Part-time",
    contract: "Contract",
    "full-time": "Full-time",
};

const ROLE_TYPE_COLORS: Record<RoleType, string> = {
    internship:  "bg-brand/10 text-brand border-brand/20",
    "part-time": "bg-brand/[0.07] text-brand/80 border-brand/15",
    contract:    "bg-muted text-muted-foreground border-border",
    "full-time": "bg-brand/15 text-brand border-brand/25",
};

/**
 * Resume-style timeline. The pink spine is an SVG path drawn with DrawSVG
 * as the user scrolls (scrubbed); each role card reveals as it enters the
 * viewport. Reduced motion: fully static.
 */
export function ExperienceTimeline({
    items,
    description,
}: {
    items: readonly ExperienceItem[];
    description: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            const root = containerRef.current;
            if (!root || reduced) return;

            const line = root.querySelector<SVGPathElement>("[data-timeline-line]");
            if (line) {
                gsap.fromTo(
                    line,
                    { drawSVG: "0%" },
                    {
                        drawSVG: "100%",
                        ease: "none",
                        scrollTrigger: {
                            trigger: root,
                            start: "top 75%",
                            end: "bottom 55%",
                            scrub: 0.6,
                        },
                    }
                );
            }

            root.querySelectorAll<HTMLElement>("[data-timeline-item]").forEach((item) => {
                gsap.from(item, {
                    autoAlpha: 0,
                    x: -14,
                    duration: 0.5,
                    ease: EASE.out,
                    scrollTrigger: { trigger: item, start: "top 88%", once: true },
                });
            });
        },
        { scope: containerRef, dependencies: [reduced, items.length] }
    );

    return (
        <div ref={containerRef} className="relative">
            {description && <p className="text-sm text-muted-foreground mb-8">{description}</p>}
            <div className="relative">
                {/* Vertical spine — muted track + pink DrawSVG line on top */}
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 rounded-full bg-muted" aria-hidden>
                    <svg
                        className="absolute inset-0 h-full w-full overflow-visible"
                        viewBox="0 0 2 100"
                        preserveAspectRatio="none"
                        fill="none"
                    >
                        <path
                            data-timeline-line
                            d="M1 0 L1 100"
                            stroke="hsl(var(--brand))"
                            strokeWidth="2"
                            strokeOpacity="0.55"
                            vectorEffect="non-scaling-stroke"
                        />
                    </svg>
                </div>

                <div className="space-y-8">
                    {items.map((item, i) => (
                        <TimelineItem key={`${item.org}-${item.title}-${i}`} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ item }: { item: ExperienceItem }) {
    return (
        <div data-timeline-item className="relative flex gap-6 pl-0">
            {/* Dot */}
            <div className="relative shrink-0 pt-1.5">
                <div className="h-6 w-6 rounded-full border-2 flex items-center justify-center border-brand/40 bg-brand/5">
                    {item.current ? (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                        </span>
                    ) : (
                        <span className="h-2 w-2 rounded-full bg-brand/60" />
                    )}
                </div>
            </div>

            {/* Card */}
            <section className="card p-5 sm:p-6 flex-1 min-w-0">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                        {item.current && (
                            <span className="chip chip-status">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
                                </span>
                                Current
                            </span>
                        )}
                        {item.roleType && (
                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${ROLE_TYPE_COLORS[item.roleType]}`}>
                                {ROLE_TYPE_LABELS[item.roleType]}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {item.org} · {item.meta}
                    </p>
                </div>
                {item.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
                        {item.bullets.map((b) => (
                            <li key={b}>{b}</li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
