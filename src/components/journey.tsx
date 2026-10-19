"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { journey } from "@/lib/site-data";

const n = journey.length;
const DOT = 14;

/**
 * The career as a staircase, oldest step bottom-left, today top-right, every
 * step the same height so the whole flight fits on one screen. On a desktop
 * it plays as one shot once it is in view: the sun dot (the hero's request,
 * starting another flight) drops onto the first step and climbs, the stairs drawing
 * under it, until it stands on today. A climb can't be scrubbed here: the dot
 * would rise up the page while the reader scrolls down, and leave the screen.
 * Below 1024px the steps run down a vertical line, the same way the page
 * scrolls, so there the dot is scrubbed and stays near one line on screen.
 * Reduced motion and no script show the finished staircase.
 */
export function Journey() {
    const root = useRef<HTMLOListElement>(null);
    const reduced = useReducedMotion();

    useGSAP(
        () => {
            const ol = root.current;
            if (reduced || !ol) return;
            const steps = gsap.utils.toArray<HTMLElement>("[data-step]", ol);
            const dot = ol.querySelector<HTMLElement>("[data-climber]");
            if (!dot) return;

            /* Waypoints from the real layout, re-read on every refresh. */
            const at = (el: HTMLElement, corner: "tl" | "tr" | "bl") => {
                const o = ol.getBoundingClientRect(), r = el.getBoundingClientRect();
                return {
                    x: (corner === "tr" ? r.right : r.left) - o.left + 1.5 - DOT / 2,
                    y: (corner === "bl" ? r.bottom : r.top) - o.top + 1.5 - DOT / 2,
                };
            };

            const mm = gsap.matchMedia();
            mm.add({ wide: "(min-width: 1024px)", narrow: "(max-width: 1023.98px)" }, (ctx) => {
                const wide = !!ctx.conditions?.wide;
                const d = wide ? 0.26 : 1; // seconds per riser or tread; scrubbed, just proportions
                const tl = gsap.timeline({
                    defaults: { ease: "none" },
                    scrollTrigger: wide
                        ? /* when the first step, where the climb starts, is well on screen */
                          { trigger: steps[0], start: "bottom 92%", toggleActions: "play none none none", invalidateOnRefresh: true }
                        : { trigger: ol, start: "top 65%", end: "bottom 65%", scrub: true, invalidateOnRefresh: true },
                });
                const first = steps[0];
                tl.fromTo(
                    dot,
                    { autoAlpha: 0, x: () => at(first, wide ? "bl" : "tl").x, y: () => at(first, wide ? "bl" : "tl").y - (wide ? 28 : 0) },
                    { autoAlpha: 1, y: () => at(first, wide ? "bl" : "tl").y, duration: wide ? 0.4 : 0.01, ease: wide ? "bounce.out" : "none" }
                );
                steps.forEach((step, i) => {
                    const riser = step.querySelector("[data-riser]");
                    const tread = step.querySelector("[data-tread]");
                    const text = step.querySelector("[data-text]");
                    tl.addLabel(`s${i}`)
                        .from(riser, { scaleY: 0, transformOrigin: "bottom", duration: d }, `s${i}`)
                        .to(dot, { x: () => at(step, "tl").x, y: () => at(step, "tl").y, duration: d, ease: wide ? "power2.inOut" : "none" }, `s${i}`)
                        .from(text, { y: 14, duration: d * 2, ease: wide ? "yk" : "none" }, `s${i}`);
                    if (tread && wide) {
                        tl.from(tread, { scaleX: 0, transformOrigin: "left", duration: d }, `s${i}+=${d}`);
                        if (i < n - 1) tl.to(dot, { x: () => at(step, "tr").x, y: () => at(step, "tl").y, duration: d }, `s${i}+=${d}`);
                    }
                });
            });
        },
        { scope: root, dependencies: [reduced] }
    );

    return (
        <ol
            ref={root}
            className="relative grid gap-y-6 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] lg:grid-rows-[repeat(var(--n),var(--row))] lg:gap-y-0 lg:pb-16"
            style={{ "--n": n, "--row": "clamp(4.5rem, 10svh, 7.5rem)" } as React.CSSProperties}
        >
            {/* The climber: the same sun as the hero's request, now standing in for you */}
            <li aria-hidden data-climber className="pointer-events-none invisible absolute left-0 top-0 z-10 rounded-full border-2 border-sun-foreground bg-sun" style={{ width: DOT, height: DOT }} />

            {/* The two ends of the story, in the corners the stairs leave open — widescreen frames */}
            <li aria-hidden className="hidden lg:col-span-3 lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:block lg:pr-8">
                <Photo src="/story/pune-skyline.webp" rows={4} caption="Pune, from above. Where it started." />
            </li>
            <li aria-hidden className="hidden lg:col-span-3 lg:col-start-5 lg:row-span-3 lg:row-start-5 lg:flex lg:flex-col lg:items-end lg:justify-end lg:pl-8">
                <Photo src="/story/chicago-cloud-gate.webp" rows={3} caption="Chicago. Cloud Gate in Millennium Park." />
            </li>

            {journey.map((s, i) => (
                <li
                    key={s.when}
                    data-step
                    className="relative pl-5 lg:col-[var(--c)] lg:row-[var(--r)] lg:pl-0"
                    style={{ "--c": i + 1, "--r": n - i } as React.CSSProperties}
                >
                    {/* riser (left edge) and tread (top edge): 3px cobalt, a drawn stair */}
                    <span data-riser aria-hidden className="absolute bottom-0 left-0 top-0 w-[3px] bg-brand" />
                    <span data-tread aria-hidden className="absolute left-0 right-0 top-0 hidden h-[3px] bg-brand lg:block" />
                    {/* Text sits on its tread; a long one runs on down into the open space under the stairs, never sideways into another step. */}
                    <div data-text className="pb-6 pt-3 lg:pb-0 lg:pl-3.5 lg:pr-2">
                        <p className="text-sm text-muted-foreground">{s.when}</p>
                        <p className="mt-1 font-semibold leading-snug">
                            {s.what}
                            {i === n - 1 && <span className="sr-only"> (current)</span>}
                        </p>
                        <p className="text-sm text-muted-foreground">{s.where}</p>
                    </div>
                </li>
            ))}
        </ol>
    );
}

/** A widescreen (2.39:1) frame, as wide as its corner allows and no taller than its rows. */
function Photo({ src, caption, rows }: { src: string; caption: string; rows: number }) {
    return (
        <figure style={{ width: `min(100%, calc((var(--row) * ${rows} - 2.5rem) * 2.39))` }}>
            <div className="opening-photo overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} width={1400} height={1050} alt="" loading="lazy" className="aspect-[2.39/1] w-full object-cover grayscale" />
            </div>
            <figcaption className="mt-2 text-sm text-muted-foreground">{caption}</figcaption>
        </figure>
    );
}
