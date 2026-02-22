"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { site, projects } from "@/lib/site-data";

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

const navItems = [
    { label: "Home", action: () => {}, href: "/" },
    { label: "Projects", action: () => {}, href: "/projects" },
    { label: "Experience", action: () => {}, href: "/experience" },
    { label: "Education", action: () => {}, href: "/experience?tab=education" },
    { label: "Skills", action: () => {}, href: "/skills" },
    { label: "Contact", action: () => {}, href: "/contact" },
];

const actionItems = [
    { label: "Open Resume", action: () => window.open(site.links.resume, "_blank"), hint: "↵" },
    { label: "Copy email", action: () => navigator.clipboard.writeText(site.email), hint: "↵" },
    { label: "Open GitHub", action: () => window.open(site.links.github, "_blank"), hint: "↵" },
    { label: "Open LinkedIn", action: () => window.open(site.links.linkedin, "_blank"), hint: "↵" },
];

export function CommandPalette() {
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    function run(item: { label?: string; action?: () => void; href?: string }) {
        setOpen(false);
        if (item.href) router.push(item.href);
        else item.action?.();
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in" />

                <Dialog.Content className="fixed left-1/2 top-[12%] w-[92vw] max-w-xl -translate-x-1/2 rounded-3xl border border-border bg-card p-0 shadow-2xl outline-none animate-in fade-in zoom-in-95">
                    <VisuallyHidden>
                        <Dialog.Title>Command palette</Dialog.Title>
                    </VisuallyHidden>

                    <Command className="rounded-3xl">
                        <Command.Input
                            autoFocus
                            placeholder="Type a command…"
                            className="w-full rounded-t-3xl border-0 border-b border-border bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-muted-foreground"
                        />

                        <Command.List className="max-h-[320px] overflow-auto p-2">
                            <Command.Empty className="px-4 py-8 text-center text-sm text-muted-foreground">
                                No results found.
                            </Command.Empty>

                            <Command.Group heading="Navigation" className="mb-2">
                                {navItems.map((it) => (
                                    <Command.Item
                                        key={it.label}
                                        value={it.label}
                                        onSelect={() => run(it)}
                                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm aria-selected:bg-muted"
                                    >
                                        <span>{it.label}</span>
                                        <span className="text-xs text-muted-foreground">↵</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>

                            <Command.Group heading="Actions" className="mb-2">
                                {actionItems.map((it) => (
                                    <Command.Item
                                        key={it.label}
                                        value={it.label}
                                        onSelect={() => run(it)}
                                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm aria-selected:bg-muted"
                                    >
                                        <span>{it.label}</span>
                                        <span className="text-xs text-muted-foreground">{it.hint}</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>

                            <Command.Group heading="Projects" className="mb-1">
                                {projects.map((p) => (
                                    <Command.Item
                                        key={p.slug}
                                        value={`${p.title} ${p.slug}`}
                                        onSelect={() => run({ label: p.title, href: p.links.caseStudy || "/projects" })}
                                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm aria-selected:bg-muted"
                                    >
                                        <span>{p.title}</span>
                                        <span className="text-xs text-muted-foreground">↵</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        </Command.List>

                        <div className="flex items-center justify-between rounded-b-3xl border-t border-border px-3 py-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-2">
                                {site.assets?.avatar && (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={site.assets.avatar}
                                            alt=""
                                            className="h-5 w-5 rounded-full object-cover shrink-0"
                                        />
                                    </>
                                )}
                                <span>Navigate with ↑↓</span>
                            </span>
                            <span>Esc to close</span>
                        </div>
                    </Command>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
