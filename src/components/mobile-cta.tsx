"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function MobileCTA() {
    const { scrollY } = useScroll();
    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollY, "change", (v) => {
        setVisible(v > 200);
    });

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={visible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-safe-area-inset-bottom"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        >
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/90 backdrop-blur-md px-4 py-3 shadow-xl shadow-black/10">
                <div className="flex items-center gap-2 min-w-0">
                    <span className="relative flex h-2 w-2 shrink-0">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                    </span>
                    <span className="text-xs font-medium text-muted-foreground truncate">
                        Open to work · Chicago, IL
                    </span>
                </div>
                <Link
                    href="/contact"
                    className="btn-primary shrink-0 text-xs px-3 py-1.5 rounded-lg"
                >
                    Let&apos;s Talk →
                </Link>
            </div>
        </motion.div>
    );
}
