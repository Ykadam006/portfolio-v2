"use client";

import { motion } from "framer-motion";
import { Users, Sparkles, Accessibility, ArrowLeftRight } from "lucide-react";

const ICONS = {
    users: Users,
    motion: Sparkles,
    accessibility: Accessibility,
    bridge: ArrowLeftRight,
} as const;

const ACCENTS = [
    "from-brand/10 to-brand/[0.02] border-brand/15",
    "from-purple-500/10 to-purple-500/[0.02] border-purple-500/15",
    "from-emerald-500/10 to-emerald-500/[0.02] border-emerald-500/15",
    "from-amber-500/10 to-amber-500/[0.02] border-amber-500/15",
];

type PhilosophyItem = {
    title: string;
    desc: string;
    icon: string;
};

export function DesignPhilosophy({ items }: { items: readonly PhilosophyItem[] }) {
    return (
        <div className="grid gap-4 sm:grid-cols-2">
            {items.map((item, i) => {
                const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Users;
                const accent = ACCENTS[i % ACCENTS.length];

                return (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                        className={`group relative card p-6 overflow-hidden border-l-2 ${accent.split(" ").pop()}`}
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${accent.split(" ").slice(0, 2).join(" ")} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-9 h-9 rounded-xl bg-muted/60 flex items-center justify-center shrink-0">
                                    <Icon className="w-4 h-4 text-brand" />
                                </div>
                                <h3 className="font-semibold tracking-tight text-sm">{item.title}</h3>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
