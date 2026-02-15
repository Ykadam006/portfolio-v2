/**
 * Browser frame for case study screenshots.
 * Use: <BrowserFrame><img src="..." alt="..." /></BrowserFrame>
 */
export function BrowserFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-lg">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="flex-1 flex justify-center">
                    <span className="text-xs text-muted-foreground">Preview</span>
                </div>
            </div>
            <div className="overflow-hidden [&>img]:w-full [&>img]:block">
                {children}
            </div>
        </div>
    );
}
