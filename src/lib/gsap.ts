"use client";

/**
 * Central GSAP setup — the single place plugins are registered.
 * Import gsap/plugins from here (never from "gsap/*" directly) so every
 * component shares one registration and stays client-only safe.
 */
import { gsap } from "gsap";
import { useGSAP as baseUseGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Flip } from "gsap/Flip";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
    gsap.registerPlugin(
        baseUseGSAP,
        ScrollTrigger,
        DrawSVGPlugin,
        Draggable,
        InertiaPlugin,
        Flip,
        ScrambleTextPlugin,
        CustomEase
    );

    /* The site's signature curves. Quick departure, long settle — distinct
       from the power2.out every other Next.js portfolio ships with. */
    CustomEase.create("yk", "M0,0 C0.16,0.84 0.24,1 1,1");
    CustomEase.create("yk-in", "M0,0 C0.6,0 0.9,0.3 1,1");
}

/**
 * Shared motion language — one timing vocabulary across the site.
 * `out` is the default reveal curve; `in` is for exits; `inOut` for
 * scrubbed/pinned sequences where both ends need easing.
 */
export const EASE = {
    out: "yk",
    in: "yk-in",
    inOut: "power2.inOut",
    /** Kept as an alias so older call sites read the same. */
    soft: "yk",
} as const;

/**
 * Scroll-trigger start positions. Uniform triggers make a page feel like a
 * metronome — supporting text leads, cards follow, heavy media lands last,
 * so a section assembles instead of snapping in all at once.
 */
export const START = {
    text: "top 92%",
    card: "top 85%",
    media: "top 78%",
} as const;

/**
 * useGSAP, but a change of dependencies reverts the previous run before the
 * next. The stock default defers all cleanup to unmount, so animations built
 * while hydrating — when prefers-reduced-motion still reads its server value,
 * false — kept running after it flipped to true.
 */
export const useGSAP: typeof baseUseGSAP = (callback, config) =>
    baseUseGSAP(callback, config && !Array.isArray(config) ? { revertOnUpdate: true, ...config } : config);

/**
 * A line drawing draws itself: strokes in document order; dashed lines fade
 * in instead (DrawSVG would overwrite their dash pattern); filled marks — the
 * sun-yellow subject, cursors, dots — land last.
 */
export function drawIn(svg: Element, duration = 0.8) {
    const filled = '[fill]:not([fill="none"])';
    const lines = [...svg.querySelectorAll("path, rect, circle")].filter((el) => !el.matches(filled));
    const dashed = lines.filter((el) => el.hasAttribute("stroke-dasharray"));
    return gsap
        .timeline({ defaults: { ease: "yk" } })
        .from(lines.filter((el) => !dashed.includes(el)), { drawSVG: "0%", duration, stagger: 0.03 })
        .from(dashed, { opacity: 0, duration: duration * 0.6, stagger: 0.05 }, "<0.25")
        .from(svg.querySelectorAll(filled), { scale: 0, transformOrigin: "50% 50%", duration: 0.45, stagger: 0.08, ease: "back.out(2)" }, "-=0.2");
}

export {
    gsap,
    ScrollTrigger,
    DrawSVGPlugin,
    Draggable,
    InertiaPlugin,
    Flip,
    ScrambleTextPlugin,
    CustomEase,
};
