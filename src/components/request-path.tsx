import type { FlowNode } from "@/lib/site-data";

/**
 * A system drawn as the steps a request takes through it — a real ordered
 * list, because the order is the information. Cobalt arrows between steps;
 * the entry step carries the sun.
 */
export function RequestPath({ flow }: { flow: readonly FlowNode[] }) {
    return (
        <figure>
            <ol className="grid gap-8 md:grid-flow-col md:auto-cols-fr md:gap-10">
                {flow.map((n, i) => (
                    <li
                        key={n.label}
                        className={`relative rounded-[var(--radius)] p-5 ${i === 0 ? "bg-sun text-sun-foreground" : "bg-card"} ${
                            i < flow.length - 1
                                ? "after:absolute after:-bottom-8 after:left-6 after:text-2xl after:leading-8 after:text-brand after:content-['↓'] md:after:-right-9 md:after:bottom-auto md:after:left-auto md:after:top-1/2 md:after:-translate-y-1/2 md:after:content-['→']"
                                : ""
                        }`}
                    >
                        <p className="font-display text-2xl font-bold leading-none">{n.label}</p>
                        <p className={`mt-2 text-sm leading-snug ${i === 0 ? "" : "text-muted-foreground"}`}>{n.body}</p>
                    </li>
                ))}
            </ol>
            <figcaption className="small mt-4">The path a request takes, one step at a time.</figcaption>
        </figure>
    );
}
