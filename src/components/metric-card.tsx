"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

type MetricCardProps = {
    value: number;
    prefix?: string;
    suffix: string;
    label: string;
    source: string;
    accentColor?: string;
};

const ACCENT_COLORS = ["#ec4899", "#8b5cf6", "#22c55e", "#ec4899"];

export function MetricCard({ value, prefix = "", suffix, label, source, accentColor }: MetricCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });
    // Initialize to real value so SSR + hydration always shows correct numbers
    const [displayVal, setDisplayVal] = useState(value);
    const decimals = value % 1 !== 0 ? 1 : 0;

    useEffect(() => {
        if (!isInView) return;
        // Animate from ~40% of the value so there's still a satisfying count-up
        const from = value > 1 ? Math.max(0, value * 0.4) : 0;
        const controls = animate(from, value, {
            duration: 1.1,
            ease: "easeOut",
            onUpdate: (v) => setDisplayVal(v),
        });
        return () => controls.stop();
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="card p-4 sm:p-5 hover:border-brand/20 transition-colors overflow-hidden"
            style={accentColor ? { borderTop: `2px solid ${accentColor}` } : {}}
        >
            <span className="block text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ letterSpacing: "-0.03em" }}>
                {prefix}{displayVal.toFixed(decimals)}{suffix}
            </span>
            <p className="mt-1 text-sm font-semibold text-foreground">{label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{source}</p>
        </motion.div>
    );
}

export { ACCENT_COLORS };
