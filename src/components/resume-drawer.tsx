"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Download, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-data";

const OPEN_EVENT = "yk:resume-open";

/** Open the in-site resume drawer from anywhere (client only). */
export function openResumeDrawer() {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
    none: "",
} as const;

type ResumeLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: keyof typeof variantClasses;
};

/**
 * Resume trigger — a real link to the PDF (works without JS / for crawlers),
 * upgraded on click to open the in-site side drawer instead of a new tab.
 */
export function ResumeLink({ variant = "none", className, children, onClick, ...props }: ResumeLinkProps) {
    return (
        <a
            href={site.links.resume}
            target="_blank"
            rel="noreferrer"
            className={cn(variantClasses[variant], className)}
            onClick={(e) => {
                onClick?.(e);
                // Let cmd/ctrl/middle-click keep native "open in new tab" behavior.
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                openResumeDrawer();
            }}
            {...props}
        >
            {children ?? "Resume"}
        </a>
    );
}

/**
 * In-site resume viewer: a right-side drawer with the PDF embedded, so
 * recruiters never leave the page. Mounted once in the root layout and
 * opened via `openResumeDrawer()` / <ResumeLink>. Radix supplies the focus
 * trap, Esc-to-close, and scroll lock.
 */
export function ResumeDrawer() {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const onOpen = () => setOpen(true);
        window.addEventListener(OPEN_EVENT, onOpen);
        return () => window.removeEventListener(OPEN_EVENT, onOpen);
    }, []);

    /* Enter/exit are CSS keyframes keyed on Radix's data-state (globals.css);
       Radix waits for the exit animation before unmounting. */
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="drawer-overlay fixed inset-0 z-[120] bg-foreground/45" />
                <Dialog.Content className="drawer-panel fixed inset-y-0 right-0 z-[121] flex w-full flex-col bg-background shadow-2xl outline-none sm:w-[min(94vw,680px)]">
                    <div className="flex items-center gap-3 px-4 py-4 sm:px-6">
                        <div className="min-w-0 flex-1">
                            <Dialog.Title className="font-display text-2xl font-bold leading-none">Resume</Dialog.Title>
                            <Dialog.Description className="mt-1 truncate text-sm text-muted-foreground">
                                {site.name} · {site.role} · {site.location}
                            </Dialog.Description>
                        </div>
                        <a href={site.links.resume} download className="btn-primary !min-h-11">
                            <Download className="h-4 w-4" />
                            <span className="hidden sm:inline">Download</span>
                        </a>
                        <a
                            href={site.links.resume}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-secondary !min-h-11 hidden sm:inline-flex"
                            aria-label="Open resume in a new tab"
                        >
                            <ExternalLink className="h-4 w-4" />
                            New tab
                        </a>
                        <Dialog.Close asChild>
                            <button type="button" className="btn-secondary !min-h-11 !px-3" aria-label="Close resume">
                                <X className="h-5 w-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    {/* PDF viewer — object falls back to links on browsers that
                        can't render inline PDFs (most phones) */}
                    <div className="min-h-0 flex-1 bg-card">
                        <object
                            data={`${site.links.resume}#toolbar=0&navpanes=0&view=FitH`}
                            type="application/pdf"
                            className="h-full w-full"
                            aria-label={`Resume of ${site.name} (PDF)`}
                        >
                            <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                                <p className="max-w-xs text-muted-foreground">This browser can&apos;t show PDFs inline. Download it instead:</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    <a href={site.links.resume} download className="btn-primary">
                                        Download resume
                                    </a>
                                    <a href={site.links.resume} target="_blank" rel="noreferrer" className="btn-secondary">
                                        Open in a new tab
                                    </a>
                                </div>
                            </div>
                        </object>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
