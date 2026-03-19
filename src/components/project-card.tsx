"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { projects } from "@/lib/site-data";

type Project = (typeof projects)[number] & { image?: string };

const linkClass =
    "text-muted-foreground hover:text-foreground transition rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

const cardVariants = {
    rest: { y: 0, transition: { duration: 0.4 } },
    hover: { y: -4, transition: { duration: 0.4 } },
};

const imageVariants = {
    rest: { scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.04, transition: { duration: 0.4 } },
};

export function ProjectCard({
    p,
    size = "default",
    variant = "default",
    mode = "bento",
}: {
    p: Project;
    size?: "large" | "default";
    variant?: "default" | "glass";
    mode?: "bento" | "page";
}) {
    const isLarge = size === "large";
    const isPage = mode === "page";
    const cardClass = variant === "glass" ? "card-glass" : "card";
    const hasCaseStudy = !!p.links.caseStudy;
    const hasLive = Boolean(p.links.live?.trim());
    const label = "bentoLabel" in p ? (p as Project & { bentoLabel?: string }).bentoLabel : undefined;
    const maxChips = isLarge ? 3 : p.slug === "ghumakad" ? 1 : 2;

    const [imageError, setImageError] = useState(false);

    if (isPage) {
        const hasImage = "image" in p && p.image;
        const techPills: string[] = "techStack" in p && Array.isArray((p as Project & { techStack?: string[] }).techStack)
            ? (p as Project & { techStack: string[] }).techStack
            : [...p.stack];
        const impact = p.impact ?? p.bullets;
        const showImage = hasImage && !imageError;

        return (
            <section className={`${cardClass} overflow-hidden`}>
                {showImage && (
                    <Link
                        href={hasCaseStudy ? p.links.caseStudy : p.links.live || p.links.github || "#"}
                        className="block overflow-hidden aspect-video relative bg-muted"
                    >
                        <motion.div
                            className="relative w-full h-full"
                            initial="rest"
                            whileHover="hover"
                            animate="rest"
                            variants={imageVariants}
                        >
                            <Image
                                src={p.image!}
                                alt={p.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 800px"
                                onError={() => setImageError(true)}
                            />
                        </motion.div>
                    </Link>
                )}
                <div className="p-5 sm:p-6">
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs rounded-full border border-brand/30 bg-brand/5 px-2.5 py-1 text-brand font-medium">
                                {p.category}
                            </span>
                            <p className="text-xs text-muted-foreground">{p.date}</p>
                        </div>
                        <h2 className="h2 mt-1">{p.title}</h2>
                        <p className="text-sm text-muted-foreground">{p.subtitle}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{p.problem}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {p.metrics.slice(0, 3).map((m) => (
                            <span
                                key={m}
                                className="text-xs rounded-full border border-border bg-muted/50 px-3 py-1 text-muted-foreground"
                            >
                                {m}
                            </span>
                        ))}
                    </div>
                    <ul className="mt-4 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                        {impact.slice(0, 4).map((b) => (
                            <li key={b}>{b}</li>
                        ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {techPills.map((t) => (
                            <span
                                key={t}
                                className="text-xs font-mono rounded-md border border-border bg-card px-2.5 py-1 text-muted-foreground"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3 text-sm">
                        {hasCaseStudy && (
                            <Link href={p.links.caseStudy} className="btn-secondary">
                                Case study
                            </Link>
                        )}
                        {hasLive && (
                            <a href={p.links.live} target="_blank" rel="noreferrer" className="btn-secondary">
                                Live
                            </a>
                        )}
                        {p.links.github && (
                            <a href={p.links.github} target="_blank" rel="noreferrer" className="btn-secondary">
                                GitHub
                            </a>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    const hasImage = "image" in p && p.image;
    const showImage = hasImage && !imageError;

    return (
        <motion.div
            variants={cardVariants}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className={`${cardClass} block overflow-hidden h-full min-w-0 ${
                isLarge ? "min-h-[260px] flex flex-col" : "flex flex-col"
            }`}
        >
            {showImage && (
                <Link
                    href={hasCaseStudy ? p.links.caseStudy : p.links.live || p.links.github || "#"}
                    className="block overflow-hidden aspect-video relative bg-muted"
                    tabIndex={-1}
                >
                    <motion.div
                        variants={imageVariants}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={p.image!}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            onError={() => setImageError(true)}
                        />
                    </motion.div>
                </Link>
            )}
            <div className={`p-5 sm:p-6 flex flex-col ${isLarge ? "flex-1" : ""}`}>
                {label && (
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        {label}
                    </p>
                )}
                <h3
                    className={`font-semibold tracking-tight ${
                        label ? "mt-1" : ""
                    } ${isLarge ? "text-xl" : "text-lg"}`}
                >
                    {p.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.subtitle}</p>
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                {p.bullets.slice(0, isLarge ? 3 : 2).map((b) => (
                    <li key={b} className="flex gap-2">
                        <span className="text-brand shrink-0">•</span>
                        <span>{b.endsWith(".") ? b.slice(0, -1) : b}</span>
                    </li>
                ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                {p.metrics.slice(0, maxChips).map((m) => (
                    <span
                        key={m}
                        className="text-xs rounded-full border border-border bg-card px-3 py-1 text-muted-foreground"
                    >
                        {m}
                    </span>
                ))}
                </div>
                <div className={`flex flex-wrap items-center gap-4 text-sm ${isLarge ? "mt-6" : "mt-4"}`}>
                {hasCaseStudy && (
                    <Link href={p.links.caseStudy} className={`text-brand hover:underline ${linkClass}`}>
                        Case study
                    </Link>
                )}
                {hasLive && (
                    <a href={p.links.live} target="_blank" rel="noreferrer" className={linkClass}>
                        Live
                    </a>
                )}
                {p.links.github && !(hasCaseStudy && hasLive) && (
                    <a href={p.links.github} target="_blank" rel="noreferrer" className={linkClass}>
                        GitHub
                    </a>
                )}
                </div>
            </div>
        </motion.div>
    );
}
