"use client";

import { motion } from "framer-motion";

const float = (delay: number, y = 6) => ({
    y: [-y, y, -y],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay },
});

const pulse = (delay: number) => ({
    opacity: [0.5, 1, 0.5],
    scale: [0.96, 1.04, 0.96],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay },
});

export function HeroIllustration() {
    return (
        <div className="relative w-full max-w-[200px] sm:max-w-[340px] mx-auto aspect-square select-none" aria-hidden="true">
            {/* Ambient glow */}
            <div className="absolute inset-0 -m-8">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-brand/15 blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-2/5 h-2/5 rounded-full blur-3xl"
                    style={{ background: "hsl(260 90% 70% / 0.12)" }}
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
            </div>

            <svg viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10 w-full h-full">
                <defs>
                    <linearGradient id="desk-grad" x1="60" y1="210" x2="280" y2="250">
                        <stop offset="0%" stopColor="hsl(var(--muted))" />
                        <stop offset="100%" stopColor="hsl(var(--border))" />
                    </linearGradient>
                    <linearGradient id="screen-code" x1="50" y1="100" x2="160" y2="200">
                        <stop offset="0%" stopColor="hsl(var(--muted))" />
                        <stop offset="100%" stopColor="hsl(var(--border))" />
                    </linearGradient>
                    <linearGradient id="screen-design" x1="185" y1="100" x2="295" y2="200">
                        <stop offset="0%" stopColor="hsl(var(--muted))" />
                        <stop offset="100%" stopColor="hsl(var(--border))" />
                    </linearGradient>
                    <linearGradient id="person-body" x1="150" y1="160" x2="190" y2="260">
                        <stop offset="0%" stopColor="hsl(var(--brand))" />
                        <stop offset="100%" stopColor="hsl(338 80% 50%)" />
                    </linearGradient>
                    <linearGradient id="chair-grad" x1="140" y1="220" x2="200" y2="280">
                        <stop offset="0%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.15" />
                    </linearGradient>
                </defs>

                {/* Desk surface */}
                <motion.rect
                    x="40" y="218" width="260" height="10" rx="5"
                    fill="url(#desk-grad)"
                    stroke="hsl(var(--border))" strokeWidth="0.5"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
                {/* Desk legs */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.3 }}>
                    <rect x="65" y="228" width="4" height="35" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                    <rect x="271" y="228" width="4" height="35" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                </motion.g>

                {/* Left monitor — Code editor */}
                <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {/* Monitor frame */}
                    <rect x="48" y="100" width="118" height="85" rx="8" fill="url(#screen-code)" stroke="hsl(var(--border))" strokeWidth="1" />
                    {/* Monitor stand */}
                    <rect x="97" y="185" width="20" height="16" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.25" />
                    <rect x="87" y="199" width="40" height="4" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.2" />

                    {/* Code lines */}
                    <motion.g animate={pulse(0)}>
                        <rect x="58" y="113" width="35" height="3" rx="1.5" fill="#c084fc" opacity="0.8" />
                        <rect x="58" y="120" width="50" height="3" rx="1.5" fill="#67e8f9" opacity="0.6" />
                        <rect x="66" y="127" width="42" height="3" rx="1.5" fill="#86efac" opacity="0.7" />
                        <rect x="66" y="134" width="55" height="3" rx="1.5" fill="#fbbf24" opacity="0.5" />
                        <rect x="58" y="141" width="30" height="3" rx="1.5" fill="#c084fc" opacity="0.6" />
                        <rect x="66" y="148" width="48" height="3" rx="1.5" fill="#67e8f9" opacity="0.5" />
                        <rect x="66" y="155" width="38" height="3" rx="1.5" fill="#86efac" opacity="0.6" />
                        <rect x="58" y="162" width="25" height="3" rx="1.5" fill="#fbbf24" opacity="0.4" />
                        <rect x="58" y="169" width="45" height="3" rx="1.5" fill="#c084fc" opacity="0.5" />
                    </motion.g>

                    {/* Terminal cursor blink */}
                    <motion.rect
                        x="83" y="169" width="2" height="3" rx="0.5" fill="#86efac"
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity, times: [0, 0.5, 1] }}
                    />

                    {/* Code label */}
                    <rect x="58" y="105" width="8" height="3" rx="1" fill="hsl(var(--brand))" opacity="0.5" />
                    <rect x="69" y="105" width="8" height="3" rx="1" fill="hsl(var(--brand))" opacity="0.3" />
                    <rect x="80" y="105" width="8" height="3" rx="1" fill="hsl(var(--brand))" opacity="0.2" />
                </motion.g>

                {/* Right monitor — Design canvas */}
                <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {/* Monitor frame */}
                    <rect x="174" y="100" width="118" height="85" rx="8" fill="url(#screen-design)" stroke="hsl(var(--border))" strokeWidth="1" />
                    {/* Monitor stand */}
                    <rect x="223" y="185" width="20" height="16" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.25" />
                    <rect x="213" y="199" width="40" height="4" rx="2" fill="hsl(var(--muted-foreground))" opacity="0.2" />

                    {/* Design elements: UI mockup */}
                    <motion.g animate={pulse(1.5)}>
                        {/* Top nav bar */}
                        <rect x="184" y="112" width="98" height="8" rx="2" fill="hsl(var(--brand))" opacity="0.3" />
                        {/* Hero block */}
                        <rect x="184" y="124" width="60" height="20" rx="3" fill="hsl(var(--brand))" opacity="0.15" />
                        <rect x="188" y="128" width="30" height="3" rx="1" fill="hsl(var(--foreground))" opacity="0.4" />
                        <rect x="188" y="134" width="42" height="2" rx="1" fill="hsl(var(--foreground))" opacity="0.2" />
                        <rect x="188" y="139" width="16" height="3" rx="1.5" fill="hsl(var(--brand))" opacity="0.7" />
                        {/* Image placeholder */}
                        <rect x="248" y="124" width="34" height="20" rx="3" fill="hsl(260 90% 70%)" opacity="0.2" />
                        {/* Card row */}
                        <rect x="184" y="148" width="30" height="22" rx="3" fill="hsl(var(--card))" opacity="0.5" stroke="hsl(var(--border))" strokeWidth="0.5" />
                        <rect x="218" y="148" width="30" height="22" rx="3" fill="hsl(var(--card))" opacity="0.5" stroke="hsl(var(--border))" strokeWidth="0.5" />
                        <rect x="252" y="148" width="30" height="22" rx="3" fill="hsl(var(--card))" opacity="0.5" stroke="hsl(var(--border))" strokeWidth="0.5" />
                        {/* Card content lines */}
                        <rect x="188" y="153" width="20" height="2" rx="1" fill="hsl(var(--foreground))" opacity="0.25" />
                        <rect x="188" y="158" width="14" height="2" rx="1" fill="hsl(var(--foreground))" opacity="0.12" />
                        <rect x="222" y="153" width="20" height="2" rx="1" fill="hsl(var(--foreground))" opacity="0.25" />
                        <rect x="222" y="158" width="14" height="2" rx="1" fill="hsl(var(--foreground))" opacity="0.12" />
                        <rect x="256" y="153" width="20" height="2" rx="1" fill="hsl(var(--foreground))" opacity="0.25" />
                        <rect x="256" y="158" width="14" height="2" rx="1" fill="hsl(var(--foreground))" opacity="0.12" />
                    </motion.g>

                    {/* Figma-style selection handles */}
                    <motion.g
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    >
                        <rect x="183" y="123" width="62" height="22" rx="1" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 2" />
                        <circle cx="183" cy="123" r="2" fill="#0ea5e9" />
                        <circle cx="245" cy="123" r="2" fill="#0ea5e9" />
                        <circle cx="183" cy="145" r="2" fill="#0ea5e9" />
                        <circle cx="245" cy="145" r="2" fill="#0ea5e9" />
                    </motion.g>
                </motion.g>

                {/* Person / Chair */}
                <motion.g
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    {/* Chair back */}
                    <rect x="148" y="195" width="44" height="30" rx="8" fill="url(#chair-grad)" />
                    {/* Chair seat */}
                    <ellipse cx="170" cy="232" rx="28" ry="6" fill="hsl(var(--muted-foreground))" opacity="0.12" />

                    {/* Body (torso) */}
                    <rect x="155" y="188" width="30" height="32" rx="8" fill="url(#person-body)" opacity="0.85" />

                    {/* Head */}
                    <circle cx="170" cy="176" r="14" fill="hsl(var(--muted-foreground))" opacity="0.5" />
                    <circle cx="170" cy="176" r="13" fill="hsl(var(--card))" />
                    {/* Hair */}
                    <path d="M157 172 Q160 160 170 158 Q180 160 183 172" fill="hsl(var(--foreground))" opacity="0.7" />
                    {/* Glasses */}
                    <circle cx="165" cy="177" r="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.6" />
                    <circle cx="175" cy="177" r="4" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" opacity="0.6" />
                    <line x1="169" y1="177" x2="171" y2="177" stroke="hsl(var(--muted-foreground))" strokeWidth="0.6" opacity="0.4" />

                    {/* Arms reaching toward keyboards */}
                    <motion.g
                        animate={{ rotate: [-1, 1, -1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{ transformOrigin: "155px 200px" }}
                    >
                        <path d="M155 198 Q140 210 120 216" stroke="url(#person-body)" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
                    </motion.g>
                    <motion.g
                        animate={{ rotate: [1, -1, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        style={{ transformOrigin: "185px 200px" }}
                    >
                        <path d="M185 198 Q200 210 220 216" stroke="url(#person-body)" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
                    </motion.g>
                </motion.g>

                {/* Keyboard */}
                <motion.rect
                    x="120" y="210" width="100" height="8" rx="3"
                    fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                />
                {/* Key dots */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.6 }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                        <rect key={i} x={126 + i * 7.5} y="212" width="5" height="3.5" rx="0.75" fill="hsl(var(--muted-foreground))" opacity="0.3" />
                    ))}
                </motion.g>
            </svg>

            {/* Floating tool icons around the scene */}
            <motion.div
                className="absolute top-4 left-2 w-9 h-9 rounded-xl bg-card border border-border shadow-lg flex items-center justify-center"
                animate={float(0)}
            >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="hsl(var(--brand))">
                    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 0M8.148 24H3.56c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zm-4.588-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.02 3.019 3.02h3.117V16.49H3.56zm0 0M8.148 8.981H3.56C1.084 8.981-.93 6.967-.93 4.49S1.084 0 3.56 0h4.588v8.981zM3.56 1.471c-1.665 0-3.019 1.354-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.47H3.56zm0 0M8.148 15.019H3.56c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM3.56 7.51c-1.665 0-3.019 1.354-3.019 3.019s1.354 3.02 3.019 3.02h3.117V7.51H3.56zm0 0M12.735 15.019a4.494 4.494 0 01-4.588-4.49 4.494 4.494 0 014.588-4.49 4.494 4.494 0 014.49 4.49 4.494 4.494 0 01-4.49 4.49zm0-7.509a3.023 3.023 0 00-3.117 3.019 3.023 3.023 0 003.117 3.02 3.023 3.023 0 003.019-3.02 3.023 3.023 0 00-3.019-3.019zm0 0" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute top-8 right-0 w-9 h-9 rounded-xl bg-card border border-border shadow-lg flex items-center justify-center"
                animate={float(1.2, 8)}
            >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#61dafb">
                    <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.31 0-.592.058-.834.174-1.12.556-1.352 2.3-.76 4.852C3.3 7.194 1.86 8.298 1.303 9.14c-.545.822-.413 1.574.315 2.145.66.518 1.74.777 3.146.777.55 0 1.135-.05 1.74-.152.16.71.368 1.39.623 2.028-.92.805-1.64 1.66-2.092 2.472-.513.92-.636 1.712-.308 2.354.328.64 1.062.96 2.02.96 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.31 0 .592-.057.834-.173 1.12-.557 1.353-2.3.76-4.853 2.21-.832 3.65-1.936 4.208-2.778.545-.822.413-1.574-.315-2.145-.66-.518-1.74-.777-3.146-.777-.55 0-1.135.05-1.74.152-.16-.71-.368-1.39-.623-2.028.92-.805 1.64-1.66 2.092-2.472.513-.92.636-1.712.308-2.354-.328-.64-1.062-.96-2.02-.96z" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute bottom-16 left-0 w-9 h-9 rounded-xl bg-card border border-border shadow-lg flex items-center justify-center"
                animate={float(0.8, 5)}
            >
                <span className="text-xs font-bold font-mono text-brand opacity-80">&lt;/&gt;</span>
            </motion.div>

            <motion.div
                className="absolute bottom-20 right-2 w-9 h-9 rounded-xl bg-card border border-border shadow-lg flex items-center justify-center"
                animate={float(2, 7)}
            >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="hsl(260 90% 70%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                    <path d="M2 2l7.586 7.586" />
                    <circle cx="11" cy="11" r="2" />
                </svg>
            </motion.div>

            <motion.div
                className="absolute top-1/2 -left-2 w-8 h-8 rounded-lg bg-card border border-border shadow-lg flex items-center justify-center"
                animate={float(1.5, 4)}
            >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="hsl(var(--brand))" strokeWidth="2" strokeLinecap="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                </svg>
            </motion.div>
        </div>
    );
}
