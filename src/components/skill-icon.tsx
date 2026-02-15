"use client";

import { cn } from "@/lib/utils";
import {
    siReact,
    siNextdotjs,
    siTypescript,
    siTailwindcss,
    siNodedotjs,
    siExpress,
    siMongodb,
    siPostgresql,
    siGithub,
    siGit,
    siFigma,
    siVercel,
    siPostman,
} from "simple-icons";

const iconMap: Record<string, { path: string; title: string }> = {
    react: { path: siReact.path, title: siReact.title },
    "next.js": { path: siNextdotjs.path, title: siNextdotjs.title },
    typescript: { path: siTypescript.path, title: siTypescript.title },
    tailwind: { path: siTailwindcss.path, title: siTailwindcss.title },
    "node.js": { path: siNodedotjs.path, title: siNodedotjs.title },
    express: { path: siExpress.path, title: siExpress.title },
    mongodb: { path: siMongodb.path, title: siMongodb.title },
    postgresql: { path: siPostgresql.path, title: siPostgresql.title },
    "rest apis": { path: siPostman.path, title: siPostman.title },
    aws: { path: siVercel.path, title: "AWS" },
    github: { path: siGithub.path, title: siGithub.title },
    "git/github": { path: siGithub.path, title: siGithub.title },
    git: { path: siGit.path, title: siGit.title },
    figma: { path: siFigma.path, title: siFigma.title },
    vercel: { path: siVercel.path, title: siVercel.title },
    postman: { path: siPostman.path, title: siPostman.title },
    "ci/cd": { path: siGithub.path, title: siGithub.title },
    "ui systems": { path: siFigma.path, title: siFigma.title },
    accessibility: { path: siReact.path, title: siReact.title },
};

function getIcon(skill: string) {
    const key = skill.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
    return (
        iconMap[key] ??
        Object.entries(iconMap).find(([k]) => key.includes(k) || k.includes(key))?.[1]
    );
}

export function SkillIcon({ skill, size = 24, className }: { skill: string; size?: number; className?: string }) {
    const icon = getIcon(skill);
    if (!icon) return null;

    return (
        <span
            className={cn("inline-flex items-center justify-center text-muted-foreground transition-colors duration-200 hover:text-brand", className)}
            title={icon.title}
        >
            <svg
                role="img"
                viewBox="0 0 24 24"
                width={size}
                height={size}
                fill="currentColor"
                className="shrink-0"
            >
                <path d={icon.path} />
            </svg>
        </span>
    );
}
