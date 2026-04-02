"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const SESSION_KEY = "yk_intro_seen";

export function HomeIntro() {
    const [mounted, setMounted] = useState(false);
    const [show, setShow] = useState(false);
    const prefersReduced = useReducedMotion();

    const dismiss = useCallback(() => {
        sessionStorage.setItem(SESSION_KEY, "1");
        setShow(false);
        document.body.style.overflow = "";
    }, []);

    // Hydration guard + one-time session check
    useEffect(() => {
        setMounted(true);
        if (!sessionStorage.getItem(SESSION_KEY)) {
            setShow(true);
            document.body.style.overflow = "hidden";
        }
    }, []);

    // Auto-exit timeline + skip listeners
    useEffect(() => {
        if (!show) return;
        const duration = prefersReduced ? 350 : 1900;
        const timer = setTimeout(dismiss, duration);
        const onKey = () => dismiss();
        document.addEventListener("keydown", onKey, { once: true });
        return () => {
            clearTimeout(timer);
            document.removeEventListener("keydown", onKey);
        };
    }, [show, dismiss, prefersReduced]);

    // Nothing until JS mounts (prevents hydration mismatch)
    if (!mounted) return null;

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="home-intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: prefersReduced ? 0.1 : 0.22, ease: "easeIn" } }}
                    transition={{ duration: 0.12 }}
                    onClick={dismiss}
                    className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none overflow-hidden"
                    style={{ background: "hsl(var(--background))" }}
                    aria-label="Intro screen — click or press any key to skip"
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Ambient pink glow */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse 55% 45% at 50% 50%, rgba(236,72,153,0.09) 0%, transparent 70%)",
                        }}
                    />

                    {/* Noise grain texture */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage:
                                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                            backgroundSize: "128px 128px",
                        }}
                    />

                    {/* ── Center stage ── */}
                    <div className="relative flex flex-col items-center gap-4">

                        {/* YK Monogram */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: prefersReduced ? 1 : 0.86 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: prefersReduced ? 0.1 : 0.28,
                                delay:    prefersReduced ? 0    : 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <span
                                className="text-[5.5rem] font-semibold tracking-tight leading-none text-foreground"
                                style={{ fontFamily: "var(--font-sora), var(--font-geist-sans), sans-serif" }}
                            >
                                YK
                            </span>

                            {/* Brand dot — springs in */}
                            <motion.span
                                aria-hidden="true"
                                className="absolute -top-1 -right-2 h-3.5 w-3.5 rounded-full bg-brand"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    duration: 0.22,
                                    delay:    prefersReduced ? 0 : 0.3,
                                    type:    "spring",
                                    stiffness: 420,
                                    damping:   14,
                                }}
                            />
                        </motion.div>

                        {/* Scan line — pink → purple, draws left-to-right */}
                        {!prefersReduced && (
                            <motion.div
                                aria-hidden="true"
                                className="h-px w-32 origin-left"
                                style={{
                                    background:
                                        "linear-gradient(to right, #ec4899, #8b5cf6, transparent)",
                                }}
                                initial={{ scaleX: 0, opacity: 0 }}
                                animate={{ scaleX: 1, opacity: 1 }}
                                transition={{ duration: 0.38, delay: 0.32, ease: [0.4, 0, 0.2, 1] }}
                            />
                        )}

                        {/* Wordmark + subtitle */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: prefersReduced ? 0 : 7 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: prefersReduced ? 0.1 : 0.28,
                                delay:    prefersReduced ? 0.1 : 0.56,
                                ease: "easeOut",
                            }}
                        >
                            <p
                                className="text-sm font-semibold tracking-[0.26em] uppercase text-foreground"
                                style={{ fontFamily: "var(--font-sora), var(--font-geist-sans), sans-serif" }}
                            >
                                YK Studio
                            </p>
                            <p className="mt-1.5 text-[11px] text-muted-foreground tracking-[0.14em]">
                                Frontend&nbsp;&nbsp;·&nbsp;&nbsp;Full-Stack&nbsp;&nbsp;·&nbsp;&nbsp;UI Systems
                            </p>
                        </motion.div>
                    </div>

                    {/* Skip hint */}
                    {!prefersReduced && (
                        <motion.p
                            aria-hidden="true"
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/40 tracking-[0.22em] uppercase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.78 }}
                        >
                            tap to skip
                        </motion.p>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
