"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/components/use-media-query";

export type FlowNode = { label: string; body: string; accent?: boolean };

/**
 * Architecture flow for case studies. By default renders the generic
 * User → Frontend → API → Infra strip; pass `flow` for a per-project
 * chain of 3–6 nodes (connectors and data dots adapt to the node count).
 * Connector lines draw in with DrawSVG when scrolled into view, then small
 * data-flow dots travel the connectors via MotionPath (paused off-screen).
 * Reduced motion / mobile: clean static layout.
 */
export function ArchitectureDiagram({
    frontend,
    backend,
    infra,
    flow,
}: {
    frontend: string;
    backend: string;
    infra: string;
    flow?: readonly FlowNode[];
}) {
    const rootRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const isDesktop = useMediaQuery("(min-width: 640px)");
    const animate = !reduced && isDesktop;

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root || !animate) return;

            const lines = root.querySelectorAll<SVGPathElement>("[data-flow-line]");
            const dots = root.querySelectorAll<SVGCircleElement>("[data-flow-dot]");
            const nodes = root.querySelectorAll<Element>("[data-arch-node]");

            // Dots loop along the connectors — created paused, toggled by view.
            gsap.set(dots, { autoAlpha: 0 });
            const dotTweens = Array.from(dots).map((dot, i) => {
                const path = lines[i % lines.length];
                return gsap.to(dot, {
                    motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
                    duration: 1.6,
                    delay: i * 0.55,
                    repeat: -1,
                    repeatDelay: 1.4,
                    ease: "power1.inOut",
                    paused: true,
                    onStart: () => gsap.set(dot, { autoAlpha: 1 }),
                });
            });

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: root,
                    start: "top 85%",
                    once: true,
                    onEnter: () => dotTweens.forEach((t) => t.play()),
                },
            });
            intro
                .from(nodes, { autoAlpha: 0, y: 10, duration: 0.4, ease: "power2.out", stagger: 0.1 })
                .from(lines, { drawSVG: "0%", duration: 0.5, ease: "power2.inOut", stagger: 0.12 }, "-=0.2");

            // Pause the infinite dots whenever the diagram leaves the viewport.
            const visibility = gsap.timeline({
                scrollTrigger: {
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    onToggle: (self) => {
                        if (!intro.scrollTrigger || intro.progress() === 0) return;
                        dotTweens.forEach((t) => (self.isActive ? t.play() : t.pause()));
                    },
                },
            });

            return () => {
                dotTweens.forEach((t) => t.kill());
                visibility.kill();
            };
        },
        { scope: rootRef, dependencies: [animate] }
    );

    const nodes: readonly FlowNode[] = flow ?? [
        { label: "User", body: "Browser / mobile", accent: false },
        { label: "Frontend", body: frontend, accent: true },
        { label: "API", body: backend, accent: true },
        { label: "Infra", body: infra, accent: true },
    ];
    const n = nodes.length;
    // One connector per gap; dots alternate brand/purple, capped at 3.
    const connectors = Array.from({ length: n - 1 }, (_, i) => `M${(i + 1) * 100 - 14} 50 L${(i + 1) * 100 + 14} 50`);
    const dotCount = Math.min(3, n - 1);

    return (
        <div ref={rootRef} className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4 flex items-center gap-2">
                <span aria-hidden className="h-1 w-1 rounded-full bg-brand" />
                Architecture flow
            </p>

            {/* Desktop: nodes with animated SVG connectors */}
            <div className="hidden sm:block">
                <div
                    className="relative grid gap-8"
                    style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
                >
                    {/* Connector layer sits in the gaps between columns */}
                    <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                        preserveAspectRatio="none"
                        viewBox={`0 0 ${n * 100} 100`}
                        fill="none"
                    >
                        {/* connectors span the gaps between the equal columns; slight
                            overlap under the cards keeps them joined at any width */}
                        {connectors.map((d) => (
                            <path key={d} data-flow-line d={d} stroke="hsl(var(--brand))" strokeWidth="1.5" vectorEffect="non-scaling-stroke" opacity="0.5" />
                        ))}
                        {Array.from({ length: dotCount }, (_, i) => (
                            <circle key={i} data-flow-dot r="2.5" fill={i % 2 === 0 ? "hsl(var(--brand))" : "hsl(var(--purple))"} />
                        ))}
                    </svg>

                    {nodes.map((node) => (
                        <div
                            key={node.label}
                            data-arch-node
                            className={`relative rounded-xl border p-3 text-center bg-card/70 ${
                                node.accent !== false ? "border-brand/25" : "border-border"
                            }`}
                        >
                            <p className={`text-xs font-semibold ${node.accent !== false ? "text-brand" : "text-foreground"}`}>
                                {node.label}
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{node.body}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile: static vertical flow */}
            <div className="sm:hidden space-y-1">
                {nodes.map((node, i) => (
                    <div key={node.label}>
                        {i > 0 && (
                            <div className="flex justify-center py-0.5 text-muted-foreground/50" aria-hidden>
                                ↓
                            </div>
                        )}
                        <div className={`rounded-xl border p-3 bg-card/70 ${node.accent !== false ? "border-brand/25" : "border-border"}`}>
                            <p className={`text-xs font-semibold ${node.accent !== false ? "text-brand" : "text-foreground"}`}>
                                {node.label}
                            </p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">{node.body}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
