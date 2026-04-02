"use client";

import { motion } from "framer-motion";
import { Eye, Code2, FlaskConical, Rocket } from "lucide-react";

type Step = { step: string; title: string; desc: string };

const STEP_ICONS: Record<string, React.ElementType> = {
    "01": Eye,
    "02": Code2,
    "03": FlaskConical,
    "04": Rocket,
};

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ProcessSteps({ steps }: { steps: readonly Step[] }) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-4 gap-6 sm:gap-4"
        >
            {steps.map((s, idx) => {
                const Icon = STEP_ICONS[s.step] ?? Code2;
                return (
                    <motion.div
                        key={s.step}
                        variants={item}
                        className="group relative flex flex-col p-5 rounded-2xl border border-border bg-card hover:border-brand/25 hover:shadow-md transition-all duration-300"
                    >
                        {/* Decorative number — large, faint, top-right */}
                        <span
                            aria-hidden
                            className="absolute top-3 right-4 text-5xl font-bold leading-none select-none transition-colors duration-300 text-muted/20 group-hover:text-brand/15"
                            style={{ fontVariantNumeric: "tabular-nums" }}
                        >
                            {s.step}
                        </span>

                        {/* Icon circle */}
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-muted/50 transition-all duration-300 group-hover:border-brand/30 group-hover:bg-brand/10 group-hover:scale-110">
                            <Icon className="h-4.5 w-4.5 text-muted-foreground transition-colors duration-300 group-hover:text-brand" />
                        </div>

                        <h3 className="font-semibold tracking-tight text-base">{s.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>

                        {/* Connecting dot (visible between cards on desktop) */}
                        {idx < steps.length - 1 && (
                            <div className="hidden sm:block absolute -right-2 top-[2.25rem] z-10 h-4 w-4 rounded-full border-2 border-border bg-background group-hover:border-brand/40 transition-colors" />
                        )}
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
