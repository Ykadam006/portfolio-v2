"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useMediaQuery } from "@/components/use-media-query";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { siReact, siNextdotjs, siTypescript, siTailwindcss, siFigma } from "simple-icons";
import { Accessibility } from "lucide-react";

type SimpleIcon = { title: string; path: string };

const ORBIT_ICONS: SimpleIcon[] = [siReact, siNextdotjs, siTypescript, siTailwindcss, siFigma];

/**
 * Decorative desktop-only orbit: five stack icons circle a "UI Systems" core
 * along a MotionPath. Paused off-screen, absent on mobile & reduced motion.
 */
export function SkillsOrbit() {
    const rootRef = useRef<HTMLDivElement>(null);
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const reduced = useReducedMotion();
    const show = isDesktop && !reduced;

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root || !show) return;

            const path = root.querySelector<SVGPathElement>("[data-orbit-path]");
            const items = root.querySelectorAll<HTMLElement>("[data-orbit-item]");
            if (!path || items.length === 0) return;

            const tweens = Array.from(items).map((item, i) =>
                gsap.to(item, {
                    motionPath: {
                        path,
                        align: path,
                        alignOrigin: [0.5, 0.5],
                        start: i / items.length,
                        end: i / items.length + 1,
                    },
                    duration: 42,
                    repeat: -1,
                    ease: "none",
                })
            );

            const st = ScrollTrigger.create({
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                onToggle: (self) => tweens.forEach((t) => (self.isActive ? t.play() : t.pause())),
            });

            return () => {
                st.kill();
                tweens.forEach((t) => t.kill());
            };
        },
        { scope: rootRef, dependencies: [show] }
    );

    if (!show) return null;

    return (
        <div
            ref={rootRef}
            aria-hidden="true"
            className="relative h-[260px] w-[260px] select-none"
        >
            {/* Orbit ring */}
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 260 260" fill="none">
                <path
                    data-orbit-path
                    d="M 240 130 A 110 110 0 1 1 239.99 129.9"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                    strokeDasharray="3 6"
                />
            </svg>

            {/* Core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-brand/25 bg-card px-4 py-2.5 shadow-sm text-center">
                <p className="text-xs font-semibold tracking-tight">UI Systems</p>
                <p className="text-[10px] text-muted-foreground">design → code</p>
            </div>

            {/* Orbiting icons */}
            {ORBIT_ICONS.map((icon) => (
                <div
                    key={icon.title}
                    data-orbit-item
                    className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card shadow-sm text-muted-foreground"
                >
                    <svg role="img" viewBox="0 0 24 24" width={16} height={16} fill="currentColor" aria-label={icon.title}>
                        <path d={icon.path} />
                    </svg>
                </div>
            ))}
            <div
                data-orbit-item
                className="absolute left-0 top-0 flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card shadow-sm text-muted-foreground"
            >
                <Accessibility size={16} />
            </div>
        </div>
    );
}
