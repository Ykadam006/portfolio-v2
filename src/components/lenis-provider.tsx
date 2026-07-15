"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

import "lenis/dist/lenis.css";

/**
 * Smooth scrolling via Lenis, kept in lockstep with GSAP ScrollTrigger.
 * (We deliberately use Lenis instead of ScrollSmoother — no wrapper divs
 * means the sticky header, anchors, and route changes keep working as-is.)
 *
 * - Driven by gsap.ticker so scrubbed triggers never drift a frame.
 * - Disabled entirely for prefers-reduced-motion (native scroll).
 * - ScrollTrigger.refresh() after full load so image/font layout is final.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
            anchors: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        const onLoad = () => ScrollTrigger.refresh();
        if (document.readyState === "complete") {
            ScrollTrigger.refresh();
        } else {
            window.addEventListener("load", onLoad, { once: true });
        }

        return () => {
            window.removeEventListener("load", onLoad);
            gsap.ticker.remove(tick);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}
