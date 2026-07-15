"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook backed by useSyncExternalStore — no setState-in-effect,
 * no hydration flash beyond the initial server snapshot (defaults to `false`).
 */
export function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (onChange: () => void) => {
            const mql = window.matchMedia(query);
            mql.addEventListener("change", onChange);
            return () => mql.removeEventListener("change", onChange);
        },
        [query]
    );

    return useSyncExternalStore(
        subscribe,
        () => window.matchMedia(query).matches,
        () => false
    );
}
