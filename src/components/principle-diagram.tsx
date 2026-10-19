"use client";

import { useRef } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const SUN = "hsl(var(--sun))";
const INK = "hsl(var(--sun-foreground))";
const Y = 44; // the line the arrows run along
const RIDE = 12; // packets ride just above the boxes, never over their labels

/** A labelled box in a mechanism diagram. */
function Box({ x, w, label, sun = false }: { x: number; w: number; label: string; sun?: boolean }) {
    return (
        <g data-box>
            <rect x={x} y={22} width={w} height={44} rx={4} fill={sun ? SUN : "none"} stroke={sun ? INK : "currentColor"} />
            <text x={x + w / 2} y={49} textAnchor="middle" fontSize={14} fill={sun ? INK : "currentColor"} stroke="none">
                {label}
            </text>
        </g>
    );
}
const Arrow = ({ x1, x2 }: { x1: number; x2: number }) => <path data-arrow d={`M${x1} ${Y}H${x2 - 2}m-7-6l7 6-7 6`} fill="none" />;
/** The thing travelling through the mechanism — hidden at rest, so the finished diagram is the reduced state. */
const Packet = ({ x, y = RIDE, hollow = false, id = "packet" }: { x: number; y?: number; hollow?: boolean; id?: string }) => (
    <circle data-packet={id} cx={x} cy={y} r={7} fill={hollow ? "none" : SUN} stroke={INK} strokeDasharray={hollow ? "3 3" : undefined} opacity={0} />
);
const Note = ({ x, y, anchor = "start", children }: { x: number; y: number; anchor?: "start" | "middle" | "end"; children: string }) => (
    <text data-note x={x} y={y} textAnchor={anchor} fontSize={13} fill="currentColor" stroke="none">
        {children}
    </text>
);

type Q = (selector: string) => Element[];
type Diagram = { svg: React.ReactElement; play?: (tl: gsap.core.Timeline, q: Q) => void };

/* Each principle's evidence: the mechanism itself, drawn small, and what it does when it runs. */
const DIAGRAMS: Record<string, Diagram> = {
    "Rules decide, models explain": {
        svg: (
            <>
                <Box x={0} w={120} label="What you typed" />
                <Arrow x1={120} x2={164} />
                <Box x={164} w={150} label="389 rules, 7 languages" />
                <Arrow x1={314} x2={358} />
                <Box x={358} w={100} label="Urgency" sun />
                <path data-dash d="M408 66v22H300" strokeDasharray="4 5" fill="none" />
                <Note x={292} y={93} anchor="end">the model only explains it</Note>
                <Packet x={60} />
            </>
        ),
        // The words pass through the rules and come out as urgency; only then does the model speak.
        play: (tl, q) =>
            tl
                .set(q("[data-packet]"), { opacity: 1 })
                .to(q("[data-packet]"), { x: 179, duration: 0.5, ease: "power2.inOut" })
                .to(q("[data-packet]"), { x: 348, duration: 0.45, ease: "power2.inOut" }, "+=0.25")
                .to(q("[data-packet]"), { opacity: 0, duration: 0.15 })
                .from(q("[data-dash]"), { opacity: 0, duration: 0.3 })
                .from(q("[data-note]"), { y: 8, duration: 0.4 }, "<"),
    },
    "Retries should be harmless": {
        svg: (
            <>
                <Box x={0} w={150} label="MySQL + outbox" />
                <Arrow x1={150} x2={196} />
                <Box x={196} w={90} label="Kafka" />
                <Arrow x1={286} x2={332} />
                <path data-dash d="M286 58c18 0 26-4 46-8" strokeDasharray="4 5" fill="none" />
                <Box x={332} w={126} label="Applied once" sun />
                <Note x={309} y={92} anchor="middle">redelivered: no-op</Note>
                <Packet x={75} id="first" />
                <Packet x={241} y={58} hollow id="again" />
            </>
        ),
        // The event lands once; Kafka sends it again, and the consumer absorbs it without effect.
        play: (tl, q) =>
            tl
                .set(q("[data-packet=first]"), { opacity: 1 })
                .to(q("[data-packet=first]"), { x: 166, duration: 0.45, ease: "power2.inOut" })
                .to(q("[data-packet=first]"), { x: 320, duration: 0.45, ease: "power2.inOut" }, "+=0.15")
                .to(q("[data-packet=first]"), { opacity: 0, duration: 0.15 })
                .from(q("[data-dash]"), { opacity: 0, duration: 0.25 })
                .set(q("[data-packet=again]"), { opacity: 1 })
                .to(q("[data-packet=again]"), { x: 92, y: -6, duration: 0.5, ease: "power2.inOut" })
                .to(q("[data-packet=again]"), { scale: 0.3, opacity: 0, transformOrigin: "center", duration: 0.25 })
                .from(q("[data-note]"), { y: 8, duration: 0.4 }, "<"),
    },
    "Fast, with a way back": {
        svg: (
            <>
                <Box x={0} w={110} label="Card moves" sun />
                <Arrow x1={110} x2={168} />
                <Box x={168} w={110} label="Server" />
                <path data-reject d="M296 32l20 20m0-20l-20 20" strokeWidth={3} fill="none" />
                <path data-dash d="M223 66c0 28-90 30-150 4M80 62l-8 9 11 3" strokeDasharray="4 5" fill="none" />
                <Note x={336} y={49}>rejected → snapshot back</Note>
                <Packet x={55} />
            </>
        ),
        // The move goes out at once; the server refuses; it rides the rollback home.
        play: (tl, q) =>
            tl
                .set(q("[data-packet]"), { opacity: 1 })
                .to(q("[data-packet]"), { x: 168, duration: 0.5, ease: "power2.inOut" })
                .from(q("[data-reject]"), { scale: 0.5, opacity: 0, transformOrigin: "center", duration: 0.25, ease: "back.out(2)" })
                .from(q("[data-dash]"), { opacity: 0, duration: 0.25 }, "<")
                .to(q("[data-packet]"), {
                    keyframes: [
                        { x: 168, y: 54, duration: 0.2 },
                        { x: 95, y: 78, duration: 0.3 },
                        { x: 20, y: 54, duration: 0.25 },
                        { x: 0, y: 0, duration: 0.2 },
                    ],
                    ease: "none",
                })
                .to(q("[data-packet]"), { opacity: 0, duration: 0.15 })
                .from(q("[data-note]"), { y: 8, duration: 0.4 }, "<"),
    },
    "Accessible is part of done": {
        svg: (
            <>
                {Array.from({ length: 10 }, (_, i) => (
                    <g key={i} data-box transform={`translate(${i * 46} 0)`}>
                        <rect x={0} y={18} width={34} height={22} rx={2} fill="none" />
                        <rect x={10} y={48} width={14} height={26} rx={2} fill="none" />
                    </g>
                ))}
                {/* rests on the tenth pair: checked on desktop and phone, all ten */}
                <circle data-tick cx={431} cy={88} r={4} fill={SUN} stroke={INK} />
                <Note x={0} y={100}>10 screens × desktop and phone, axe-core on each</Note>
            </>
        ),
        // A check ticks across every screen pair, one at a time.
        play: (tl, q) => tl.from(q("[data-tick]"), { x: -414, duration: 1.2, ease: "steps(9)" }).from(q("[data-note]"), { y: 8, duration: 0.4 }, "<"),
    },
};

export function PrincipleDiagram({ title }: { title: string }) {
    const ref = useRef<SVGSVGElement>(null);
    const reduced = useReducedMotion();
    const d = DIAGRAMS[title];

    useGSAP(
        () => {
            if (reduced || !ref.current || !d) return;
            const q = gsap.utils.selector(ref);
            const tl = gsap.timeline({ defaults: { ease: EASE.out }, scrollTrigger: { trigger: ref.current, start: "top 82%", once: true } });
            tl.from(q("[data-box]"), { y: 10, duration: 0.4, stagger: 0.06 });
            if (q("[data-arrow]").length) tl.from(q("[data-arrow]"), { drawSVG: "0%", duration: 0.3, stagger: 0.12 }, 0.2);
            d.play?.(tl, q);
        },
        { scope: ref, dependencies: [reduced] }
    );

    if (!d) return null;
    return (
        <svg
            ref={ref}
            viewBox="0 0 470 104"
            role="img"
            aria-label={`Diagram: ${title}`}
            className="mt-5 w-full max-w-[36rem] overflow-visible text-brand"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {d.svg}
        </svg>
    );
}
