"use client";

import { useEffect, useRef } from "react";

/**
 * Tasteful 3D-style blob for hero.
 * Desktop only, subtle pink/purple lighting, slow rotation.
 * Uses CSS + SVG for lightweight implementation (no Three.js).
 */
export function HeroBlob() {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        // Subtle floating animation via CSS
        const svg = svgRef.current;
        if (!svg) return;
        svg.style.animation = "blob-float 12s ease-in-out infinite";
    }, []);

    return (
        <div className="relative hidden lg:block w-full max-w-[280px] aspect-square mx-auto">
            <style>{`
                @keyframes blob-float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(4%, -4%) scale(1.02); }
                    66% { transform: translate(-3%, 3%) scale(0.98); }
                }
            `}</style>
            <svg
                ref={svgRef}
                viewBox="0 0 200 200"
                className="w-full h-full drop-shadow-2xl"
            >
                <defs>
                    <linearGradient id="blob-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(338 100% 64% / 0.4)" />
                        <stop offset="50%" stopColor="hsl(260 90% 70% / 0.3)" />
                        <stop offset="100%" stopColor="hsl(338 100% 64% / 0.2)" />
                    </linearGradient>
                    <filter id="blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                    </filter>
                </defs>
                <path
                    d="M45.7,-52.2C59.2,-41.8,69.4,-26.2,72.5,-8.9C75.6,8.4,71.6,28.3,60.8,43.2C50,58.1,32.4,68,13.8,73.2C-4.8,78.4,-25.2,78.9,-42.2,70.2C-59.2,61.5,-72.8,43.6,-77.5,23.4C-82.2,3.2,-78,-19.3,-66.2,-36.2C-54.4,-53.1,-35,-64.3,-15.2,-68.1C4.6,-71.9,32.2,-62.6,45.7,-52.2Z"
                    fill="url(#blob-grad)"
                    className="origin-center"
                    style={{ filter: "url(#blur)" }}
                />
            </svg>
        </div>
    );
}
