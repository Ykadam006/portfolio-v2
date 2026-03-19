"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

type MetricCardProps = {
    value: number;
    prefix?: string;
    suffix: string;
    label: string;
    source: string;
};

export function MetricCard({ value, prefix = "", suffix, label, source }: MetricCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayVal, setDisplayVal] = useState(0);
    const decimals = value % 1 !== 0 ? 1 : 0;

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(0, value, {
            duration: 1.2,
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
            className="card p-4 sm:p-5 hover:border-brand/20 transition-colors"
        >
            <span className="block text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                {prefix}{displayVal.toFixed(decimals)}{suffix}
            </span>
            <p className="mt-1 text-sm font-medium text-foreground">{label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{source}</p>
        </motion.div>
    );
}
