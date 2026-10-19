"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);
    if (!mounted) return <div className="h-11 w-11" />;

    const current = theme === "system" ? systemTheme : theme;
    const isDark = current === "dark";

    return (
        <button
            type="button"
            onClick={(e) => {
                const next = isDark ? "light" : "dark";
                const root = document.documentElement;
                /* A circle of the new theme spreads from the toggle (View
                   Transitions). The class is flipped inside the transition so
                   the snapshot sees it; next-themes then persists the choice. */
                if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                    setTheme(next);
                    return;
                }
                const r = e.currentTarget.getBoundingClientRect();
                const x = r.left + r.width / 2;
                const y = r.top + r.height / 2;
                const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
                root.classList.add("theme-vt");
                const t = document.startViewTransition(() => {
                    root.classList.remove("light", "dark");
                    root.classList.add(next);
                    root.style.colorScheme = next;
                });
                t.ready.then(() =>
                    root.animate(
                        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                        { duration: 520, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" }
                    )
                );
                t.finished.finally(() => root.classList.remove("theme-vt"));
                setTheme(next);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius)] bg-foreground/[0.07] transition-colors hover:bg-foreground hover:text-background"
            aria-label="Toggle theme"
        >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
}
