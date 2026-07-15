"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site-data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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
 * trap, Esc-to-close, and scroll lock; reduced motion gets a plain fade.
 */
export function ResumeDrawer() {
    const [open, setOpen] = React.useState(false);
    const reduced = useReducedMotion();

    React.useEffect(() => {
        const onOpen = () => setOpen(true);
        window.addEventListener(OPEN_EVENT, onOpen);
        return () => window.removeEventListener(OPEN_EVENT, onOpen);
    }, []);

    const panelMotion = reduced
        ? {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              transition: { duration: 0.1 },
          }
        : {
              initial: { x: "100%" },
              animate: { x: 0 },
              exit: { x: "100%" },
              transition: { type: "tween" as const, duration: 0.38, ease: [0.32, 0.72, 0, 1] as const },
          };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <AnimatePresence>
                {open && (
                    <Dialog.Portal forceMount>
                        <Dialog.Overlay asChild forceMount>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: reduced ? 0.1 : 0.3 }}
                                className="fixed inset-0 z-[120] bg-black/45 backdrop-blur-sm"
                            />
                        </Dialog.Overlay>

                        <Dialog.Content asChild forceMount>
                            <motion.div
                                {...panelMotion}
                                className="fixed inset-y-0 right-0 z-[121] flex w-full flex-col border-l border-border bg-background shadow-2xl outline-none sm:w-[min(94vw,680px)]"
                            >
                                {/* Brand accent — thin pink→purple line on the drawer edge */}
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-y-0 left-0 w-[2px]"
                                    style={{
                                        background:
                                            "linear-gradient(to bottom, hsl(var(--brand)), hsl(var(--purple) / 0.6), transparent)",
                                    }}
                                />

                                {/* Header */}
                                <div className="flex items-center gap-3 border-b border-border px-4 py-3 sm:px-6">
                                    <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-card shadow-sm">
                                        <span className="text-xs font-semibold tracking-tight">YK</span>
                                        <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-brand" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <Dialog.Title className="text-sm font-semibold tracking-tight">
                                            Resume — {site.name}
                                        </Dialog.Title>
                                        <Dialog.Description className="truncate text-xs text-muted-foreground">
                                            Frontend / Full-Stack · Chicago, IL
                                        </Dialog.Description>
                                    </div>
                                    <a
                                        href={site.links.resume}
                                        download
                                        className="btn-secondary !px-3 !py-1.5 text-xs inline-flex items-center gap-1.5"
                                    >
                                        <Download className="h-3.5 w-3.5" />
                                        <span className="hidden sm:inline">Download</span>
                                    </a>
                                    <a
                                        href={site.links.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn-secondary !px-3 !py-1.5 text-xs hidden sm:inline-flex items-center gap-1.5"
                                        aria-label="Open resume in a new tab"
                                    >
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        New tab
                                    </a>
                                    <Dialog.Close asChild>
                                        <button
                                            type="button"
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition hover:text-foreground hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                                            aria-label="Close resume"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </Dialog.Close>
                                </div>

                                {/* PDF viewer — object falls back to a friendly card on
                                    browsers that can't render inline PDFs (most phones) */}
                                <div className="min-h-0 flex-1 bg-muted/40">
                                    <object
                                        data={`${site.links.resume}#toolbar=0&navpanes=0&view=FitH`}
                                        type="application/pdf"
                                        className="h-full w-full"
                                        aria-label={`Resume of ${site.name} (PDF)`}
                                    >
                                        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                                            <p className="text-sm text-muted-foreground max-w-xs">
                                                Your browser can&apos;t preview PDFs inline — grab it directly instead:
                                            </p>
                                            <div className="flex flex-wrap justify-center gap-3">
                                                <a href={site.links.resume} download className="btn-primary text-sm">
                                                    Download resume
                                                </a>
                                                <a
                                                    href={site.links.resume}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn-secondary text-sm"
                                                >
                                                    Open in new tab ↗
                                                </a>
                                            </div>
                                        </div>
                                    </object>
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                )}
            </AnimatePresence>
        </Dialog.Root>
    );
}
