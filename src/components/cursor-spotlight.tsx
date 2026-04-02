"use client";

import { useEffect, useRef } from "react";

export function CursorSpotlight() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const parent = el.parentElement;
        if (!parent) return;

        const handleMove = (e: MouseEvent) => {
            const rect = parent.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(236,72,153,0.13), transparent 60%)`;
        };

        parent.addEventListener("mousemove", handleMove);
        return () => parent.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div
            ref={ref}
            className="pointer-events-none absolute inset-0 z-0 rounded-b-[2rem] sm:rounded-b-[3rem] overflow-hidden"
            aria-hidden
        />
    );
}
