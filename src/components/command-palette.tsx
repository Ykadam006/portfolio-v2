"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { site } from "@/lib/site-data";

// Minimal VisuallyHidden (so we don't need another dependency)
function VisuallyHidden({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                position: "absolute",
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                borderWidth: 0,
            }}
        >
      {children}
    </span>
    );
}

export function CommandPalette() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            const isK = e.key.toLowerCase() === "k";
            if ((e.metaKey || e.ctrlKey) && isK) {
                e.preventDefault();
                setOpen((v) => !v);
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const items = [
        { label: "Home", action: () => router.push("/") },
        { label: "Projects", action: () => router.push("/projects") },
        { label: "Experience", action: () => router.push("/experience") },
        { label: "Skills", action: () => router.push("/skills") },
        { label: "Contact", action: () => router.push("/contact") },
        { label: "Open Resume", action: () => window.open(site.links.resume, "_blank") },
        { label: "GitHub", action: () => window.open(site.links.github, "_blank") },
        { label: "LinkedIn", action: () => window.open(site.links.linkedin, "_blank") },
    ];

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

                <Dialog.Content className="fixed left-1/2 top-[18%] w-[92vw] max-w-xl -translate-x-1/2 rounded-3xl border border-border bg-card p-3 shadow-2xl outline-none">
                    {/* ✅ Required for accessibility */}
                    <VisuallyHidden>
                        <Dialog.Title>Command palette</Dialog.Title>
                    </VisuallyHidden>

                    <Command>
                        <div className="flex items-center justify-between px-2 pb-2">
                            <span className="text-xs text-muted-foreground">Search…</span>
                            <span className="text-xs text-muted-foreground">Esc</span>
                        </div>

                        <Command.Input
                            autoFocus
                            placeholder="Type a command…"
                            className="w-full rounded-xl border border-border bg-card px-3 py-3 text-sm outline-none"
                        />

                        <Command.List className="mt-3 max-h-72 overflow-auto">
                            <Command.Empty className="px-3 py-6 text-sm text-muted-foreground">
                                No results found.
                            </Command.Empty>

                            {items.map((it) => (
                                <Command.Item
                                    key={it.label}
                                    value={it.label}
                                    onSelect={() => {
                                        setOpen(false);
                                        it.action();
                                    }}
                                    className="cursor-pointer rounded-xl px-3 py-3 text-sm aria-selected:bg-muted"
                                >
                                    {it.label}
                                </Command.Item>
                            ))}
                        </Command.List>
                    </Command>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
