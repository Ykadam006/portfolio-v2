"use client";

import { useReducedMotion } from "framer-motion";
import { motion } from "framer-motion";

export function FadeIn({
    children,
    delay = 0,
    className,
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const reduced = useReducedMotion();

    return (
        /* Always the same element on server and client: switching to a plain
           div under reduced motion leaves the SSR-rendered initial styles
           stuck on the node after hydration (content dimmed forever).
           Under reduced motion the initial IS the final state — framer writes
           it on mount, overriding whatever the server rendered. */
        <motion.div
            /* y-only reveal: opacity fades on text fail WCAG contrast while
               unrevealed, so content is always fully readable. */
            initial={reduced ? { y: 0 } : { y: 16 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "0px 0px -15% 0px" }}
            transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
