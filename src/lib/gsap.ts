"use client";

/**
 * Central GSAP setup — the single place plugins are registered.
 * Import gsap/plugins from here (never from "gsap/*" directly) so every
 * component shares one registration and stays client-only safe.
 */
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Draggable } from "gsap/Draggable";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
    gsap.registerPlugin(
        useGSAP,
        ScrollTrigger,
        DrawSVGPlugin,
        MotionPathPlugin,
        Draggable,
        SplitText
    );
}

/** Shared motion language — one timing vocabulary across the site. */
export const EASE = {
    out: "power2.out",
    inOut: "power2.inOut",
    soft: "power2.out",
} as const;

export { gsap, useGSAP, ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, Draggable, SplitText };
