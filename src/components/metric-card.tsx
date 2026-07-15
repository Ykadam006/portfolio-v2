"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type MetricCardProps = {
    value: number;
    prefix?: string;
    suffix: string;
    label: string;
    source: string;
    accentColor?: string;
    /** Stagger offset in seconds — lets a row of cards reveal left to right. */
    delay?: number;
};

/* Pink for primary emphasis, purple for atmosphere — never other accents */
const ACCENT_COLORS = ["hsl(var(--brand))", "hsl(var(--purple))", "hsl(var(--brand))", "hsl(var(--purple))"];

/**
 * Metric card with a GSAP count-up. The real value is rendered in the SSR
 * markup (never 0), and the count-up runs from ~40% → value once in view.
 * Reduced motion / no JS: the static real value simply stays put.
 */
export function MetricCard({ value, prefix = "", suffix, label, source, accentColor, delay = 0 }: MetricCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const numRef = useRef<HTMLSpanElement>(null);
    const reduced = useReducedMotion();
    const decimals = value % 1 !== 0 ? 1 : 0;

    useGSAP(
        () => {
            if (reduced || !cardRef.current || !numRef.current) return;

            const counter = { v: value > 1 ? value * 0.4 : 0 };
            const render = () => {
                if (numRef.current) {
                    numRef.current.textContent = `${prefix}${counter.v.toFixed(decimals)}${suffix}`;
                }
            };

            gsap.from(cardRef.current, {
                opacity: 0.3,
                y: 14,
                duration: 0.45,
                delay,
                ease: EASE.soft,
                scrollTrigger: { trigger: cardRef.current, start: "top 85%", once: true },
            });
            // Zero is a deliberate value ("0 outages") — show it statically.
            if (value > 0) {
                gsap.to(counter, {
                    v: value,
                    duration: 1.1,
                    delay,
                    ease: EASE.soft,
                    onStart: render,
                    onUpdate: render,
                    scrollTrigger: { trigger: cardRef.current, start: "top 85%", once: true },
                });
            }
        },
        { scope: cardRef, dependencies: [value, prefix, suffix, decimals, reduced, delay] }
    );

    return (
        <div
            ref={cardRef}
            className="card p-4 sm:p-5 hover:border-brand/20 transition-colors overflow-hidden"
            style={accentColor ? { borderTop: `2px solid ${accentColor}` } : {}}
        >
            <span
                ref={numRef}
                className="block text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
                style={{ letterSpacing: "-0.03em" }}
            >
                {prefix}{value.toFixed(decimals)}{suffix}
            </span>
            <p className="mt-1 text-sm font-semibold text-foreground">{label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{source}</p>
        </div>
    );
}

export { ACCENT_COLORS };
