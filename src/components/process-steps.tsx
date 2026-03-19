"use client";

import { motion } from "framer-motion";

type Step = { step: string; title: string; desc: string };

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, x: -16 },
    show: { opacity: 1, x: 0 },
};

export function ProcessSteps({ steps }: { steps: readonly Step[] }) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
        >
            {/* Connecting line */}
            <div
                className="absolute top-6 left-0 right-0 h-px bg-border hidden sm:block"
                style={{ left: "1.5rem", right: "1.5rem" }}
            />
            <div className="grid sm:grid-cols-4 gap-6 sm:gap-4 relative">
                {steps.map((s) => (
                    <motion.div
                        key={s.step}
                        variants={item}
                        className="relative flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-card text-xs font-semibold text-foreground z-10">
                                {s.step}
                            </span>
                            <h3 className="text-base font-semibold tracking-tight">{s.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground pl-11 sm:pl-0 sm:mt-1 leading-relaxed">
                            {s.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
