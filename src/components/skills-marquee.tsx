"use client";

import Marquee from "react-fast-marquee";
import {
    siReact,
    siNextdotjs,
    siTypescript,
    siTailwindcss,
    siNodedotjs,
    siExpress,
    siPostgresql,
    siMongodb,
    siDocker,
    siGit,
    siGithub,
    siSpring,
    siPrisma,
    siRedis,
    siGraphql,
    siFigma,
    siVercel,
    siApachekafka,
    siJest,
    siVite,
} from "simple-icons";

type SimpleIcon = { title: string; hex: string; path: string };

/* Icons that are near-black — swap to currentColor so they stay legible in dark mode */
const USES_CURRENT_COLOR = new Set(["Next.js", "GitHub", "Vercel", "Express"]);

function TechPill({ icon }: { icon: SimpleIcon }) {
    const useCurrent = USES_CURRENT_COLOR.has(icon.title);
    return (
        <div
            className="group flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 transition-all duration-200 hover:scale-[1.12] hover:shadow-md hover:border-brand/30 cursor-default select-none"
            title={icon.title}
        >
            <svg
                role="img"
                viewBox="0 0 24 24"
                width={16}
                height={16}
                fill={useCurrent ? "currentColor" : `#${icon.hex}`}
                aria-label={icon.title}
                className="shrink-0"
            >
                <path d={icon.path} />
            </svg>
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {icon.title}
            </span>
        </div>
    );
}

const ROW_1: SimpleIcon[] = [
    siReact,
    siNextdotjs,
    siTypescript,
    siTailwindcss,
    siNodedotjs,
    siExpress,
    siPostgresql,
    siMongodb,
    siDocker,
];

const ROW_2: SimpleIcon[] = [
    siSpring,
    siPrisma,
    siRedis,
    siGraphql,
    siGit,
    siGithub,
    siFigma,
    siVercel,
    siApachekafka,
    siJest,
    siVite,
];

export function SkillsMarquee() {
    return (
        <div className="w-full overflow-hidden space-y-3">
            <Marquee
                gradient={false}
                speed={35}
                pauseOnHover
                className="py-0.5"
            >
                <div className="flex gap-3 pr-3">
                    {ROW_1.map((icon) => (
                        <TechPill key={icon.title} icon={icon} />
                    ))}
                </div>
            </Marquee>

            <Marquee
                gradient={false}
                speed={35}
                pauseOnHover
                direction="right"
                className="py-0.5"
            >
                <div className="flex gap-3 pr-3">
                    {ROW_2.map((icon) => (
                        <TechPill key={icon.title} icon={icon} />
                    ))}
                </div>
            </Marquee>
        </div>
    );
}
