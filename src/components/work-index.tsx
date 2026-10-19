"use client";

import { useEffect, useRef, useState, useSyncExternalStore, ViewTransition } from "react";
import Link from "next/link";
import { projects, proofLinks } from "@/lib/site-data";
import { ProjectArt } from "@/components/project-art";
import { drawIn, gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/components/use-media-query";

/**
 * The work as an index with a preview. Every project name, large, down the
 * left; a panel held beside them shows the one under the pointer, or else the
 * one crossing the middle of the screen: its picture, what it is, its numbers.
 * Names and panel sit in separate columns, so nothing ever covers the other.
 * The panel is an ordinary sticky element exactly one screen tall (the
 * picture gives way, the facts never do). The name crossing a line a third
 * of the way down the screen, level with the picture, is the current one;
 * the list has just enough room above its first name and below its last for
 * both to cross that line while the panel is held, so every project, first
 * to last, is shown in the same place. Phones get the facts under each name.
 */
const noSubscribe = () => () => {};
type Connection = { connection?: { saveData?: boolean } };

export function WorkIndex() {
    const [scrolled, setScrolled] = useState(0);
    const [hovered, setHovered] = useState<number | null>(null);
    const list = useRef<HTMLOListElement>(null);
    const panel = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    /* Footage only where the panel shows (768px+), with motion allowed and no data saver. */
    const roomy = useMediaQuery("(min-width: 768px)");
    const saveData = useSyncExternalStore(noSubscribe, () => !!(navigator as Connection).connection?.saveData, () => true);
    const footage = roomy && !reduced && !saveData;
    const current = hovered ?? scrolled;
    const p = projects[current];

    /* A focus pull between projects: the old picture blurs out as the new one
       sharpens in (CSS, below), and its drawing draws itself or its
       screenshot settles, so the change reads as arrival, not a swap. */
    useGSAP(
        () => {
            if (reduced) return;
            const art = panel.current?.querySelector(`[data-art="${p.slug}"]`);
            if (!art) return;
            const svg = art.querySelector("svg");
            if (svg) drawIn(svg, 0.6);
            const img = art.querySelector("video, img");
            if (img) gsap.fromTo(img, { scale: 1.05 }, { scale: 1, duration: 0.6, ease: EASE.out, clearProps: "transform" });
        },
        { dependencies: [p.slug, reduced] }
    );

    /* The name crossing the line 35% down the screen is the scrolled-to one. */
    useEffect(() => {
        const items = list.current?.querySelectorAll<HTMLElement>("[data-index]");
        if (!items) return;
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) if (e.isIntersecting) setScrolled(Number((e.target as HTMLElement).dataset.index));
            },
            { rootMargin: "-35% 0px -65% 0px" }
        );
        items.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <div className="grid gap-x-6 md:grid-cols-12">
            {/* pt: the first name still sits on the line when the panel pins (its top is 4.5rem + 6svh);
                pb: the last name reaches the line before the list's end lets the panel go. */}
            <ol
                ref={list}
                className="md:col-span-7 md:pb-[max(0px,calc(65svh-8rem))] md:pt-[max(0px,calc(29svh-4.5rem))]"
                onPointerLeave={() => setHovered(null)}
            >
                {projects.map((x, i) => (
                    <li key={x.slug} data-index={i} className="pb-8 pt-2 md:py-[3svh]">
                        <Link
                            href={x.links.caseStudy}
                            onPointerEnter={() => setHovered(i)}
                            onFocus={() => setHovered(i)}
                            onBlur={() => setHovered(null)}
                            className={`display inline-block text-[clamp(3rem,8.5vw,9rem)] transition-colors duration-200 hover:text-sun focus-visible:text-sun ${
                                i === current ? "text-field-foreground" : "text-field-foreground/70"
                            }`}
                        >
                            {/* The name travels into the case study's title (a shared view transition) */}
                            <ViewTransition name={`title-${x.slug}`} share="morph">
                                <span className="inline-block">{proofLinks[x.slug].label}</span>
                            </ViewTransition>
                            {/* Phones: the facts sit under each name. Desktop: the panel shows them, so this is for screen readers. */}
                            <span className="mt-2 block font-sans text-sm font-normal normal-case leading-snug tracking-normal text-field-muted md:sr-only">
                                <span className="sr-only">: </span>
                                {x.kind} · {x.facts[0]}
                            </span>
                        </Link>
                    </li>
                ))}
            </ol>

            {/* The preview: held beside the list, never over it. Decorative —
                every fact in it is also in the link text and the case study. */}
            <div aria-hidden className="hidden md:col-span-5 md:block">
                <div ref={panel} className="sticky top-[calc(4.5rem+6svh)] flex h-[calc(100svh-4.5rem-6svh-1.5rem)] flex-col">
                    <div className="relative aspect-[4/3] min-h-0 w-full shrink overflow-hidden rounded-[var(--radius)] bg-foreground/15">
                        {projects.map((x, i) => (
                            <div
                                key={x.slug}
                                data-art={x.slug}
                                className={`absolute inset-0 transition-[opacity,filter] duration-300 ease-[cubic-bezier(0.16,0.84,0.24,1)] motion-reduce:transition-none ${x.shot ? "" : "p-6"} ${
                                    i === current ? "opacity-100" : "opacity-0 blur-[10px]"
                                }`}
                            >
                                {/* The live demo, filmed: plays once when its project takes the
                                    panel and rests on its last frame (the same as its first). */}
                                {x.footage && footage && i === current && (
                                    <video
                                        autoPlay
                                        muted
                                        playsInline
                                        preload="auto"
                                        poster={`/projects/${x.slug}.webp`}
                                        onPlaying={(e) => (e.currentTarget.dataset.playing = "")}
                                        className="absolute inset-0 h-full w-full object-cover object-top opacity-0 grayscale mix-blend-luminosity transition-opacity duration-300 data-[playing]:opacity-100"
                                    >
                                        <source src={`/projects/footage/${x.slug}.webm`} type="video/webm" />
                                        <source src={`/projects/footage/${x.slug}.mp4`} type="video/mp4" />
                                    </video>
                                )}
                                <ProjectArt slug={x.slug} tone="field" />
                            </div>
                        ))}
                    </div>
                    <div key={p.slug} className="panel-swap mt-6 flex-none">
                        <p className="font-display text-2xl font-bold uppercase leading-none">{p.title}</p>
                        <p className="mt-2 text-field-muted">{p.kind}</p>
                        <ul className="mt-4 space-y-1.5">
                            {p.facts.map((f) => (
                                <li key={f} className="flex gap-2.5">
                                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-sun" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <p className="mt-5 text-sm text-field-muted">{p.stack.join(" · ")}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
