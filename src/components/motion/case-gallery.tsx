"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useMediaQuery } from "@/components/use-media-query";
import { DraggableRail } from "@/components/motion/draggable-rail";

export type Shot = { src: string; alt: string; caption: string };

/**
 * Screens from a shipped product, shown as a horizontal gallery.
 *
 * On desktop the shots stagger in and lift slightly as the strip scrolls past —
 * enough to suggest depth without turning evidence into a carousel. On touch and
 * under reduced motion it is the plain draggable rail, which already scrolls
 * natively with a keyboard.
 *
 * These are real screenshots, so they carry alt text and captions: this is
 * content, not decoration, and the motion must never be what makes it readable.
 */
export function CaseGallery({ shots, label }: { shots: readonly Shot[]; label: string }) {
    const root = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    useGSAP(
        () => {
            if (reduced || !isDesktop || !root.current) return;

            const shotEls = gsap.utils.toArray<HTMLElement>("[data-gallery-shot]", root.current);
            if (shotEls.length === 0) return;

            gsap.from(shotEls, {
                y: 26,
                duration: 0.55,
                ease: EASE.out,
                stagger: 0.08,
                clearProps: "transform",
                scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
            });
        },
        { scope: root, dependencies: [reduced, isDesktop] }
    );

    return (
        <div ref={root}>
            <DraggableRail ariaLabel={label} className="-mx-1 px-1">
                {shots.map((shot, i) => (
                    <figure
                        key={shot.src}
                        data-gallery-shot
                        className="w-[300px] shrink-0 snap-start overflow-hidden rounded-[var(--radius)] bg-card sm:w-[420px]"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={shot.src}
                            alt={shot.alt}
                            width={1600}
                            height={900}
                            /* The first shot is what the section is for — load it
                               eagerly. `decoding="async"` is deliberately absent:
                               inside a horizontal scroll container it lets the
                               browser defer the paint long enough that the shots
                               read as empty frames on arrival. */
                            loading={i === 0 ? "eager" : "lazy"}
                            draggable={false}
                            className="aspect-video w-full object-cover object-top"
                        />
                        <figcaption className="px-3 py-2.5 text-sm text-muted-foreground">
                            {shot.caption}
                        </figcaption>
                    </figure>
                ))}
            </DraggableRail>
        </div>
    );
}
