"use client";

import { useEffect } from "react";

/**
 * Registers a single document-level mousemove listener.
 * Finds the nearest `.card` ancestor under the cursor and updates
 * --card-x / --card-y CSS vars so the ::before glow tracks the mouse.
 */
export function CardGlowEffect() {
    useEffect(() => {
        function handleMouseMove(e: MouseEvent) {
            const target = e.target;
            // Guard: only HTMLElements have .closest()
            if (!(target instanceof HTMLElement)) return;
            const card = target.closest<HTMLElement>(".card");
            if (!card) return;
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--card-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--card-y", `${e.clientY - rect.top}px`);
        }

        document.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => document.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return null;
}
