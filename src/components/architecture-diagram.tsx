/**
 * Simple architecture flow diagram for case studies.
 * Renders: Frontend → API → DB → Deployment
 */
export function ArchitectureDiagram({
    frontend,
    backend,
    infra,
}: {
    frontend: string;
    backend: string;
    infra: string;
}) {
    return (
        <div className="rounded-xl border border-border bg-muted/30 p-6 overflow-x-auto">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
                Architecture flow
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 min-w-0">
                <div className="flex flex-col items-center gap-1.5 min-w-[80px] sm:min-w-[100px]">
                    <span className="text-xs font-medium text-brand">Frontend</span>
                    <span className="text-xs text-muted-foreground text-center leading-tight">{frontend}</span>
                </div>
                <span className="text-muted-foreground/50 shrink-0" aria-hidden>→</span>
                <div className="flex flex-col items-center gap-1.5 min-w-[80px] sm:min-w-[100px]">
                    <span className="text-xs font-medium text-brand">API</span>
                    <span className="text-xs text-muted-foreground text-center leading-tight">{backend}</span>
                </div>
                <span className="text-muted-foreground/50 shrink-0" aria-hidden>→</span>
                <div className="flex flex-col items-center gap-1.5 min-w-[80px] sm:min-w-[100px]">
                    <span className="text-xs font-medium text-brand">Infra</span>
                    <span className="text-xs text-muted-foreground text-center leading-tight">{infra}</span>
                </div>
            </div>
        </div>
    );
}
