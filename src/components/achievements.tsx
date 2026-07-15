"use client";

/**
 * Achievement toasts — light, opt-in gamification that rewards exploration.
 * Everything is detected centrally here (no wiring across the app), unlocked
 * once, and persisted in localStorage so they never re-fire. Reduced-motion safe.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Id = "explorer" | "theme" | "cmdk" | "konami" | "deepdiver";

const ACHIEVEMENTS: Record<Id, { icon: string; title: string; desc: string }> = {
    explorer: { icon: "🧭", title: "Explorer", desc: "You scrolled through the whole story." },
    theme: { icon: "🌗", title: "Shape-shifter", desc: "Switched the theme." },
    cmdk: { icon: "⌘", title: "Power user", desc: "Opened the command palette." },
    konami: { icon: "🕹️", title: "Secret finder", desc: "↑ ↑ ↓ ↓ — you know the code." },
    deepdiver: { icon: "🔍", title: "Deep diver", desc: "Read three case studies." },
};

const STORE_KEY = "yk_achievements";
const PVIEWS_KEY = "yk_project_views";
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

function readSet(key: string): Set<string> {
    try {
        return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch {
        return new Set();
    }
}

export function Achievements() {
    const pathname = usePathname();
    const reduced = useReducedMotion();
    const [toasts, setToasts] = useState<{ key: number; id: Id }[]>([]);
    const unlockedRef = useRef<Set<string> | null>(null);
    const keyRef = useRef(0);

    const unlock = useCallback((id: Id) => {
        const set = unlockedRef.current ?? (unlockedRef.current = readSet(STORE_KEY));
        if (set.has(id)) return;
        set.add(id);
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify([...set]));
        } catch {
            /* storage unavailable — still show the toast this session */
        }
        const key = ++keyRef.current;
        setToasts((t) => [...t, { key, id }]);
        window.setTimeout(() => setToasts((t) => t.filter((x) => x.key !== key)), 5000);
    }, []);

    // Command palette + Konami — global keydown.
    useEffect(() => {
        let seq: string[] = [];
        const onKey = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") unlock("cmdk");

            seq = [...seq, e.key].slice(-KONAMI.length);
            if (seq.length === KONAMI.length && seq.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
                unlock("konami");
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [unlock]);

    // Theme flip — watch the <html> class/attribute that next-themes toggles.
    // Ignore mutations during the initial theme settle so only user toggles count.
    useEffect(() => {
        const start = performance.now();
        const mo = new MutationObserver(() => {
            if (performance.now() - start < 600) return;
            unlock("theme");
        });
        mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
        return () => mo.disconnect();
    }, [unlock]);

    // Deep diver — count distinct project case studies viewed (recorded on those pages).
    useEffect(() => {
        const check = () => {
            if (readSet(PVIEWS_KEY).size >= 3) unlock("deepdiver");
        };
        check();
        window.addEventListener("yk:project-view", check);
        return () => window.removeEventListener("yk:project-view", check);
    }, [unlock]);

    // Explorer — saw most of the homepage sections.
    useEffect(() => {
        if (pathname !== "/") return;
        const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
        if (sections.length === 0) return;
        const threshold = Math.min(6, sections.length);
        const seen = new Set<string>();
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting && e.target.id) seen.add(e.target.id);
                }
                if (seen.size >= threshold) {
                    unlock("explorer");
                    io.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, [pathname, unlock]);

    return (
        <div className="pointer-events-none fixed bottom-4 right-4 z-[90] flex flex-col gap-2 sm:bottom-6 sm:right-6">
            <AnimatePresence>
                {toasts.map(({ key, id }) => {
                    const a = ACHIEVEMENTS[id];
                    return (
                        <motion.button
                            key={key}
                            type="button"
                            onClick={() => setToasts((t) => t.filter((x) => x.key !== key))}
                            initial={reduced ? { opacity: 0 } : { opacity: 0, x: 24, scale: 0.96 }}
                            animate={reduced ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
                            exit={reduced ? { opacity: 0 } : { opacity: 0, x: 24, scale: 0.96 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="pointer-events-auto flex w-[19rem] max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 pr-4 text-left shadow-xl backdrop-blur-md"
                        >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand/15 to-[hsl(260_90%_70%)]/10 text-xl">
                                {a.icon}
                            </span>
                            <span className="min-w-0">
                                <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
                                    Achievement unlocked
                                </span>
                                <span className="block text-sm font-semibold tracking-tight">{a.title}</span>
                                <span className="block truncate text-xs text-muted-foreground">{a.desc}</span>
                            </span>
                        </motion.button>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}
