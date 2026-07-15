"use client";

import { useScroll, motion, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    // Spring-smooth the raw scroll value so it doesn't feel jittery
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

    return (
        <motion.div
            style={{ scaleX, transformOrigin: "left" }}
            className="fixed top-0 left-0 right-0 z-[9999] h-[2px] bg-brand pointer-events-none"
            aria-hidden
        />
    );
}
