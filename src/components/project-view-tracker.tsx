"use client";

/**
 * Records which project case studies a visitor has opened (by slug) so the
 * "Deep diver" achievement can fire across page navigations. No UI.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const PVIEWS_KEY = "yk_project_views";

export function ProjectViewTracker() {
    const pathname = usePathname();

    useEffect(() => {
        const match = /^\/projects\/([^/]+)\/?$/.exec(pathname);
        const slug = match?.[1];
        if (!slug) return;
        try {
            const set = new Set<string>(JSON.parse(localStorage.getItem(PVIEWS_KEY) || "[]"));
            if (!set.has(slug)) {
                set.add(slug);
                localStorage.setItem(PVIEWS_KEY, JSON.stringify([...set]));
            }
            window.dispatchEvent(new Event("yk:project-view"));
        } catch {
            /* storage unavailable — ignore */
        }
    }, [pathname]);

    return null;
}
