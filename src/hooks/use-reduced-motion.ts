"use client";

import { useMediaQuery } from "@/components/use-media-query";

/**
 * SSR-safe prefers-reduced-motion hook (server snapshot is `false`,
 * so reduced-motion users may see one frame of static content — never motion).
 */
export function useReducedMotion(): boolean {
    return useMediaQuery("(prefers-reduced-motion: reduce)");
}
