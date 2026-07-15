"use client";

import { useCallback, useState } from "react";

type Variant = "dashboard" | "kanban" | "map" | "cards" | "landing";
type Art = { c1: string; c2: string; variant: Variant };

/** Per-project accent colors + layout sketch, matching each product's real palette. */
const ART: Record<string, Art> = {
    applyvibe: { c1: "#3f6212", c2: "#a3e635", variant: "kanban" },
    iscp: { c1: "#1d4ed8", c2: "#60a5fa", variant: "dashboard" },
    dailyhabitz: { c1: "#059669", c2: "#6ee7b7", variant: "cards" },
    ghumakad: { c1: "#d97706", c2: "#fcd34d", variant: "map" },
    bridgecare: { c1: "#036666", c2: "#78c6a3", variant: "landing" },
    safeshelf: { c1: "#047857", c2: "#94a3b8", variant: "dashboard" },
    skillforge: { c1: "#7c3aed", c2: "#c4b5fd", variant: "cards" },
};

const FALLBACK: Art = { c1: "#ec4899", c2: "#8b5cf6", variant: "cards" };

/**
 * Static 16:9 project thumbnail. Renders a designed, deterministic UI sketch
 * immediately (zero network, zero CLS) and swaps in a real screenshot from
 * /projects/<slug>.webp the moment one exists. No iframes, no spinners.
 */
export function ProjectThumb({
    slug,
    title,
    className = "",
    priority = false,
}: {
    slug: string;
    title: string;
    className?: string;
    /** Above-fold usage (case-study hero): load eagerly with high fetch priority. */
    priority?: boolean;
}) {
    const [loaded, setLoaded] = useState(false);
    const [failed, setFailed] = useState(false);
    const art = ART[slug] ?? FALLBACK;

    // The image can settle before React hydrates, in which case onLoad/onError
    // never fire — reconcile from the element's actual state when it attaches.
    const imgRef = useCallback((img: HTMLImageElement | null) => {
        if (!img || !img.complete) return;
        if (img.naturalWidth > 0) setLoaded(true);
        else setFailed(true);
    }, []);

    return (
        <div className={`relative aspect-video overflow-hidden bg-muted/40 ${className}`}>
            <StylizedArt art={art} />
            {!failed && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    ref={imgRef}
                    src={`/projects/${slug}.webp`}
                    alt={`${title} — interface screenshot`}
                    width={1440}
                    height={810}
                    sizes="(min-width: 1024px) 640px, 100vw"
                    loading={priority ? "eager" : "lazy"}
                    fetchPriority={priority ? "high" : undefined}
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ring-1 ring-inset ring-black/5 dark:ring-white/10 dark:brightness-95 ${
                        loaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setLoaded(true)}
                    onError={() => setFailed(true)}
                />
            )}
        </div>
    );
}

/* ── Designed UI sketches ─────────────────────────────────────────── */

function Block({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
    return <div aria-hidden className={`rounded-[3px] bg-foreground/[0.08] dark:bg-foreground/[0.14] ${className}`} style={style} />;
}

function StylizedArt({ art }: { art: Art }) {
    const { c1, c2, variant } = art;
    return (
        <div
            aria-hidden
            className="absolute inset-0 flex flex-col p-3 gap-2"
            style={{
                background: `linear-gradient(135deg, ${c1}14 0%, transparent 45%, ${c2}1f 100%)`,
            }}
        >
            {/* App top bar */}
            <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: c1, opacity: 0.75 }} />
                <Block className="h-2 w-16" />
                <Block className="h-2 w-8 ml-auto" />
                <Block className="h-2 w-8" />
            </div>

            {variant === "dashboard" && (
                <div className="flex flex-1 gap-2 min-h-0">
                    <div className="w-1/5 flex flex-col gap-1.5">
                        <Block className="h-2.5 w-full" style={{ background: `${c1}55` }} />
                        <Block className="h-2 w-4/5" />
                        <Block className="h-2 w-full" />
                        <Block className="h-2 w-3/5" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2 min-h-0">
                        <div className="grid grid-cols-4 gap-1.5">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className="rounded-md bg-card/70 border border-foreground/[0.06] p-1.5">
                                    <Block className="h-1.5 w-3/5 mb-1" />
                                    <Block className="h-2.5 w-4/5" style={i === 0 ? { background: `${c1}66` } : undefined} />
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 rounded-md bg-card/70 border border-foreground/[0.06] p-2 flex items-end gap-1.5 min-h-0">
                            {[35, 55, 40, 70, 52, 85, 62, 90, 74].map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 rounded-sm"
                                    style={{ height: `${h}%`, background: i % 3 === 0 ? `${c1}66` : `${c2}4d` }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {variant === "kanban" && (
                <div className="flex flex-1 gap-2 min-h-0">
                    {[3, 2, 3, 1].map((cards, col) => (
                        <div key={col} className="flex-1 rounded-md bg-card/50 border border-foreground/[0.06] p-1.5 flex flex-col gap-1.5">
                            <Block className="h-1.5 w-3/5" style={{ background: `${c1}55` }} />
                            {Array.from({ length: cards }).map((_, i) => (
                                <div key={i} className="rounded bg-card/90 border border-foreground/[0.07] p-1.5">
                                    <Block className="h-1.5 w-full mb-1" />
                                    <Block className="h-1.5 w-1/2" style={col === 1 && i === 0 ? { background: `${c2}66` } : undefined} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}

            {variant === "map" && (
                <div className="flex flex-1 gap-2 min-h-0">
                    <div className="w-2/5 flex flex-col gap-1.5">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="rounded-md bg-card/70 border border-foreground/[0.06] p-1.5 flex gap-1.5 items-center">
                                <span className="h-4 w-4 rounded shrink-0" style={{ background: i === 0 ? `${c1}59` : `${c2}40` }} />
                                <div className="flex-1">
                                    <Block className="h-1.5 w-full mb-1" />
                                    <Block className="h-1.5 w-3/5" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 rounded-md border border-foreground/[0.06] relative overflow-hidden" style={{ background: `${c2}1a` }}>
                        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `linear-gradient(${c1}22 1px, transparent 1px), linear-gradient(90deg, ${c1}22 1px, transparent 1px)`, backgroundSize: "18px 18px" }} />
                        {[[30, 35], [55, 60], [72, 30]].map(([x, y], i) => (
                            <span key={i} className="absolute h-2.5 w-2.5 rounded-full border-2 border-card" style={{ left: `${x}%`, top: `${y}%`, background: c1 }} />
                        ))}
                    </div>
                </div>
            )}

            {variant === "cards" && (
                <div className="flex-1 grid grid-cols-3 gap-1.5 min-h-0">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="rounded-md bg-card/70 border border-foreground/[0.06] p-1.5 flex flex-col gap-1">
                            <span className="h-3 w-3 rounded" style={{ background: i % 2 === 0 ? `${c1}59` : `${c2}4d` }} />
                            <Block className="h-1.5 w-full" />
                            <Block className="h-1.5 w-2/3" />
                            <div className="mt-auto h-1 rounded-full bg-foreground/[0.07] overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${30 + i * 12}%`, background: `${c1}66` }} />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {variant === "landing" && (
                <div className="flex flex-1 gap-3 items-center min-h-0 px-2">
                    <div className="flex-1 flex flex-col gap-1.5">
                        <Block className="h-1.5 w-14" style={{ background: `${c1}59` }} />
                        <Block className="h-3 w-full" />
                        <Block className="h-3 w-4/5" />
                        <Block className="h-1.5 w-3/5 mt-1" />
                        <div className="flex gap-1.5 mt-1.5">
                            <span className="h-4 w-14 rounded-md" style={{ background: `${c1}8c` }} />
                            <span className="h-4 w-14 rounded-md border border-foreground/[0.12]" />
                        </div>
                    </div>
                    <div className="w-2/5 self-stretch rounded-md border border-foreground/[0.06] relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${c1}26, ${c2}33)` }}>
                        <div className="absolute bottom-2 left-2 right-2 rounded bg-card/80 p-1.5">
                            <Block className="h-1.5 w-full mb-1" />
                            <Block className="h-1.5 w-1/2" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
