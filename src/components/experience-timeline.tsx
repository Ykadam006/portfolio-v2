"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type ExperienceItem = {
    title: string;
    org: string;
    meta: string;
    bullets: readonly string[];
    current?: boolean;
};

export function ExperienceTimeline({
    items,
    description,
}: {
    items: readonly ExperienceItem[];
    description: string;
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const pathLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

    return (
        <div ref={containerRef} className="relative">
            {description && <p className="text-sm text-muted-foreground mb-8">{description}</p>}
            <div className="relative">
                {/* Vertical connecting line — draws as you scroll */}
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                        className="absolute inset-0 w-full rounded-full bg-border origin-top"
                        style={{ scaleY: pathLength }}
                    />
                </div>

                <div className="space-y-8">
                    {items.map((item, i) => (
                        <TimelineItem key={`${item.org}-${item.title}-${i}`} item={item} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative flex gap-6 pl-0"
        >
            {/* Dot */}
            <div className="relative shrink-0 pt-1.5">
                <div
                    className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                        item.current
                            ? "border-emerald-500 bg-emerald-500/20"
                            : "border-border bg-card"
                    }`}
                >
                    {item.current ? (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                    ) : (
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                    )}
                </div>
            </div>

            {/* Card */}
            <section className="card p-5 sm:p-6 flex-1 min-w-0">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="h2">{item.title}</h2>
                        {item.current && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                                Current
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {item.org} · {item.meta}
                    </p>
                </div>
                {item.bullets.length > 0 && (
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
                        {item.bullets.map((b) => (
                            <li key={b}>{b}</li>
                        ))}
                    </ul>
                )}
            </section>
        </motion.div>
    );
}
