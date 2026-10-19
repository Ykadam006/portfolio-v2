import type { Role } from "@/lib/site-data";

/** Date-led role list: the log of a career, newest first. Space separates rows, not lines. */
export function ExperienceTimeline({ items }: { items: readonly Role[] }) {
    return (
        <div className="space-y-14">
            {items.map((r) => (
                <article key={`${r.org}-${r.title}-${r.dates}`} className="grid gap-x-6 gap-y-2 lg:grid-cols-12">
                    <div className="text-muted-foreground lg:col-span-3">
                        <p>{r.dates}</p>
                        <p className="text-sm">{r.place}</p>
                    </div>
                    <div className="min-w-0 lg:col-span-8 lg:col-start-5">
                        <h3 className="font-display text-3xl font-bold leading-tight">
                            {r.title}
                            {r.current && (
                                <span className="ml-3 inline-flex translate-y-[-0.2em] items-center gap-1.5 rounded-[var(--radius)] bg-sun px-2 py-1 align-middle font-sans text-xs font-semibold text-sun-foreground">
                                    Now
                                </span>
                            )}
                        </h3>
                        <p className="mt-1 text-muted-foreground">
                            {r.org}
                            {r.focus && ` · ${r.focus}`}
                        </p>
                        {r.bullets.length > 0 && (
                            <ul className="mt-4 max-w-[68ch] space-y-2">
                                {r.bullets.map((b) => (
                                    <li key={b} className="flex gap-3">
                                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-sun" />
                                        <span>{b}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}
