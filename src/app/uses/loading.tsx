import { Container } from "@/components/container";

function SkeletonCard() {
    return (
        <div className="rounded-2xl border border-border bg-card p-4 flex items-start gap-3 animate-pulse">
            <div className="h-9 w-9 rounded-xl bg-muted/70 shrink-0" />
            <div className="flex-1 space-y-2 pt-0.5">
                <div className="h-3.5 bg-muted rounded w-1/3" />
                <div className="h-3 bg-muted/60 rounded w-full" />
                <div className="h-3 bg-muted/40 rounded w-3/4" />
            </div>
        </div>
    );
}

function SkeletonSection() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 pl-3 border-l-2 border-brand/30 animate-pulse">
                <div className="h-4 bg-muted rounded w-8" />
                <div className="h-4 bg-muted rounded w-32" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        </div>
    );
}

export default function UsesLoading() {
    return (
        <div className="section">
            <Container className="max-w-3xl">
                {/* Header skeleton */}
                <div className="space-y-3 animate-pulse">
                    <div className="h-10 bg-muted rounded w-24" />
                    <div className="h-4 bg-muted/60 rounded w-2/3" />
                    <div className="h-3 bg-muted/40 rounded w-1/4" />
                </div>

                {/* Section skeletons */}
                <div className="mt-14 space-y-14">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <SkeletonSection key={i} />
                    ))}
                </div>
            </Container>
        </div>
    );
}
