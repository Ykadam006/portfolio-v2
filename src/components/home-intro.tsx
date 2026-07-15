"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SESSION_KEY = "yk_intro_seen";

const emptySubscribe = () => () => {};

/** True after hydration — SSR/hydration render both see `false`, so markup matches. */
function useMounted() {
    return useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );
}

/**
 * YK Studio preloader — home only, once per session, always under 1s.
 * DrawSVG traces the YK monogram + corner brackets, then a pink→purple
 * scan line reveals the wordmark. Click/tap/key skips.
 * Reduced motion: quick static fade. Fully removed from the DOM when done.
 */
export function HomeIntro() {
    const mounted = useMounted();
    // Lazy init reads sessionStorage on the client's first render; the
    // `mounted` guard below keeps SSR + hydration output identical (null).
    const [show, setShow] = useState(
        () => typeof window !== "undefined" && !sessionStorage.getItem(SESSION_KEY)
    );
    const reduced = useReducedMotion();

    const rootRef = useRef<HTMLDivElement>(null);
    const dismissedRef = useRef(false);

    const dismiss = useCallback(() => {
        if (dismissedRef.current) return;
        dismissedRef.current = true;
        sessionStorage.setItem(SESSION_KEY, "1");
        document.body.style.overflow = "";

        const el = rootRef.current;
        if (!el) {
            setShow(false);
            return;
        }
        gsap.to(el, {
            autoAlpha: 0,
            duration: 0.2,
            ease: "power1.in",
            onComplete: () => setShow(false),
        });
    }, []);

    // Lock page scroll while the overlay is up
    useEffect(() => {
        if (!show) return;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, [show]);

    // Skip listeners
    useEffect(() => {
        if (!show) return;
        const onKey = () => dismiss();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [show, dismiss]);

    useGSAP(
        () => {
            const root = rootRef.current;
            if (!show || !root) return;

            const scanline = root.querySelector("[data-scanline]");

            // Reduced motion: static logo fade, quick exit.
            if (reduced) {
                gsap.set(scanline, { autoAlpha: 0 });
                gsap.from(root, { autoAlpha: 0, duration: 0.15 });
                gsap.delayedCall(0.5, dismiss);
                return;
            }

            const strokes = root.querySelectorAll("[data-yk-stroke]");
            const brackets = root.querySelectorAll("[data-yk-bracket]");
            const dot = root.querySelector("[data-yk-dot]");
            const wordmark = root.querySelector("[data-wordmark]");
            const subline = root.querySelector("[data-subline]");

            // Deterministic initial states — set before the timeline plays so
            // nothing flashes at its final position for a frame.
            gsap.set(scanline, { xPercent: -110, autoAlpha: 0 });
            gsap.set(wordmark, { clipPath: "inset(0 100% 0 0)" });
            gsap.set(subline, { autoAlpha: 0, y: 6 });
            gsap.set(dot, { scale: 0, transformOrigin: "center" });

            const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

            tl.from(root, { autoAlpha: 0, duration: 0.1 })
                // Trace the monogram
                .from(
                    strokes,
                    { drawSVG: "0%", duration: 0.36, ease: "power2.inOut", stagger: 0.05 },
                    0.04
                )
                .from(
                    brackets,
                    { drawSVG: "0%", duration: 0.26, ease: "power2.inOut", stagger: 0.04 },
                    0.08
                )
                // Signature dot pops
                .to(dot, { scale: 1, duration: 0.22, ease: "back.out(2.8)" }, 0.4)
                // Scan line sweeps and reveals the wordmark
                .to(scanline, { autoAlpha: 1, duration: 0.05 }, 0.46)
                .to(scanline, { xPercent: 110, duration: 0.38, ease: "power2.inOut" }, 0.46)
                .to(wordmark, { clipPath: "inset(0 0% 0 0)", duration: 0.38, ease: "power2.inOut" }, 0.46)
                .to(subline, { autoAlpha: 1, y: 0, duration: 0.24 }, 0.62)
                .set(scanline, { autoAlpha: 0 })
                // Auto-exit — total on-screen time stays under 1s
                .call(dismiss, [], 0.9);
        },
        { scope: rootRef, dependencies: [show, reduced] }
    );

    if (!mounted || !show) return null;

    return (
        <div
            ref={rootRef}
            onClick={dismiss}
            className="fixed inset-0 z-[9999] flex items-center justify-center cursor-pointer select-none overflow-hidden"
            style={{ background: "hsl(var(--background))" }}
            aria-label="Intro — click or press any key to skip"
            role="dialog"
            aria-modal="true"
        >
            {/* Ambient pink/purple glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 55% 45% at 50% 42%, hsla(var(--brand) / 0.1) 0%, transparent 70%), radial-gradient(ellipse 40% 35% at 62% 60%, hsla(var(--purple) / 0.07) 0%, transparent 70%)",
                }}
            />

            {/* Noise grain */}
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
            <div className="relative flex flex-col items-center gap-5">
                {/* Monogram drawn with DrawSVG, framed by corner brackets */}
                <svg
                    width="180"
                    height="126"
                    viewBox="0 0 120 84"
                    fill="none"
                    aria-hidden="true"
                    className="text-foreground"
                >
                    {/* Corner brackets */}
                    <path data-yk-bracket d="M2 10 L2 2 L10 2" stroke="hsl(var(--brand))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <path data-yk-bracket d="M110 2 L118 2 L118 10" stroke="hsl(var(--brand))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <path data-yk-bracket d="M118 74 L118 82 L110 82" stroke="hsl(var(--brand))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <path data-yk-bracket d="M10 82 L2 82 L2 74" stroke="hsl(var(--brand))" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    {/* Y */}
                    <path data-yk-stroke d="M18 16 L40 44 L40 68" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    <path data-yk-stroke d="M62 16 L40 44" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    {/* K */}
                    <path data-yk-stroke d="M76 16 L76 68" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    <path data-yk-stroke d="M102 16 L76 44" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    <path data-yk-stroke d="M76 44 L102 68" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    {/* Brand dot */}
                    <circle data-yk-dot cx="110" cy="16" r="4" fill="hsl(var(--brand))" />
                </svg>

                {/* Wordmark — revealed by the scan line */}
                <div className="relative overflow-hidden text-center">
                    {/* Scan line */}
                    <div
                        data-scanline
                        aria-hidden="true"
                        className="absolute inset-y-0 left-0 w-full"
                        style={{
                            background:
                                "linear-gradient(to right, transparent, hsla(var(--brand) / 0.35) 45%, hsla(var(--purple) / 0.3) 55%, transparent)",
                        }}
                    />
                    <div data-wordmark>
                        <p
                            className="text-sm font-semibold tracking-[0.26em] uppercase text-foreground"
                            style={{ fontFamily: "var(--font-sora), var(--font-geist-sans), sans-serif" }}
                        >
                            YK Studio
                        </p>
                    </div>
                    <p data-subline className="mt-1.5 text-[11px] text-muted-foreground tracking-[0.14em]">
                        Frontend&nbsp;&nbsp;·&nbsp;&nbsp;Full-Stack&nbsp;&nbsp;·&nbsp;&nbsp;UI Systems
                    </p>
                </div>
            </div>

            {/* Skip hint */}
            <p
                aria-hidden="true"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground/40 tracking-[0.22em] uppercase"
            >
                tap to skip
            </p>
        </div>
    );
}
