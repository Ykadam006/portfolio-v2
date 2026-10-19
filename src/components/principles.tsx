import Link from "next/link";
import { PrincipleDiagram } from "@/components/principle-diagram";
import { site, proofLinks } from "@/lib/site-data";

/** How I build — one reading column, a run-in phrase per principle, the mechanism drawn (and run) after each. */
export function Principles() {
    return (
        <div className="grid gap-x-6 gap-y-10 lg:grid-cols-12">
            <h2 className="h2 lg:col-span-4">How I build</h2>
            <div className="space-y-16 lg:col-span-7 lg:col-start-6">
                {site.principles.map((x) => (
                    <div key={x.title}>
                        <p className="p text-muted-foreground">
                            <strong className="font-semibold text-foreground">{x.title}.</strong> {x.body}{" "}
                            <Link href={proofLinks[x.proof].href!} className="whitespace-nowrap text-foreground underline decoration-sun decoration-2 underline-offset-4">
                                See {proofLinks[x.proof].label}
                            </Link>
                        </p>
                        <PrincipleDiagram title={x.title} />
                    </div>
                ))}
            </div>
        </div>
    );
}
