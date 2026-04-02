"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type RoleType = "internship" | "part-time" | "contract" | "full-time";

type ExperienceItem = {
    title: string;
    org: string;
    meta: string;
    bullets: readonly string[];
    current?: boolean;
    roleType?: RoleType;
};

const ROLE_TYPE_LABELS: Record<RoleType, string> = {
    internship: "Internship",
    "part-time": "Part-time",
    contract: "Contract",
    "full-time": "Full-time",
};

const ROLE_TYPE_COLORS: Record<RoleType, string> = {
    internship:  "bg-brand/10 text-brand border-brand/20",
    "part-time": "bg-brand/[0.07] text-brand/80 border-brand/15",
    contract:    "bg-muted text-muted-foreground border-border",
    "full-time": "bg-brand/15 text-brand border-brand/25",
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
                {/* Vertical connecting line — draws as you scroll, pink */}
                <div className="absolute left-[11px] top-0 bottom-0 w-0.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                        className="absolute inset-0 w-full rounded-full bg-brand/50 origin-top"
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
                    className="h-6 w-6 rounded-full border-2 flex items-center justify-center border-brand/40 bg-brand/5"
                >
                    {item.current ? (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                        </span>
                    ) : (
                        <span className="h-2 w-2 rounded-full bg-brand/60" />
                    )}
                </div>
            </div>

            {/* Card */}
            <section className="card p-5 sm:p-6 flex-1 min-w-0">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="h2">{item.title}</h2>
                        {item.current && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">
                                Current
                            </span>
                        )}
                        {item.roleType && (
                            <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${ROLE_TYPE_COLORS[item.roleType]}`}>
                                {ROLE_TYPE_LABELS[item.roleType]}
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
