"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { Check, Terminal, Moon, Sun, Download } from "lucide-react";
import { useTheme } from "next-themes";
import { site, projects } from "@/lib/site-data";
import { openResumeDrawer } from "@/components/resume-drawer";

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
    { label: "Skills", action: () => {}, href: "/skills" },
    { label: "Contact", action: () => {}, href: "/contact" },
    { label: "Blog", action: () => {}, href: "/blog" },
    { label: "About", action: () => {}, href: "/about" },
];

const TERMINAL_OUTPUT = [
    "$ whoami",
    "",
    "  Yogesh Kadam — UI-focused full-stack engineer",
    "  📍  Chicago, IL · Open to US-wide roles",
    "  🎓  Illinois Tech · MAS ITM · GPA 4.0 · Graduated May 2026",
    "",
    "  💼  3 internships · 6 shipped products · 300+ students supported",
    "  ⚡  React · Next.js · TypeScript · Tailwind · Spring Boot · AWS",
    "",
    "  📧  y.kadam2026@outlook.com",
    "  🔗  github.com/Ykadam006",
    "  💼  linkedin.com/in/yogi006",
    "",
    "  > Recent: Web Design & Dev @ CIP · Elevate · Project Talon GTM",
    "  > Building: production-ready UIs that close the Figma gap",
    "",
    "$ _",
];

export function CommandPalette() {
    const router = useRouter();
    const { theme, setTheme, systemTheme } = useTheme();
    const [open, setOpen] = React.useState(false);
    const [toast, setToast] = React.useState<string | null>(null);
    const [showTerminal, setShowTerminal] = React.useState(false);
    const [terminalLines, setTerminalLines] = React.useState<string[]>([]);

    function showToast(msg: string) {
        setToast(msg);
        setTimeout(() => setToast(null), 2500);
    }

    function copyEmail() {
        navigator.clipboard.writeText(site.email);
        showToast("Email copied!");
    }

    function toggleTheme() {
        const current = theme === "system" ? systemTheme : theme;
        setTheme(current === "dark" ? "light" : "dark");
        showToast(current === "dark" ? "Switched to light mode" : "Switched to dark mode");
    }

    function runWhoami() {
        setOpen(false);
        setShowTerminal(true);
        setTerminalLines([]);
        let i = 0;
        const interval = setInterval(() => {
            setTerminalLines((prev) => [...prev, TERMINAL_OUTPUT[i]]);
            i++;
            if (i >= TERMINAL_OUTPUT.length) clearInterval(interval);
        }, 60);
    }

    const actionItems = [
        { label: "Open resume", action: openResumeDrawer, hint: "↵", icon: Download },
        { label: "Copy email", action: copyEmail, hint: "↵", icon: null },
        { label: "Open GitHub", action: () => window.open(site.links.github, "_blank"), hint: "↵", icon: null },
        { label: "Open LinkedIn", action: () => window.open(site.links.linkedin, "_blank"), hint: "↵", icon: null },
        { label: "Toggle theme", action: toggleTheme, hint: "↵", icon: null },
    ];

    const easterEggItems = [
        { label: "whoami", action: runWhoami, hint: "terminal" },
    ];

    React.useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            }
            if (e.key === "Escape") {
                setOpen(false);
                setShowTerminal(false);
            }
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

                <Dialog.Content className="fixed left-1/2 top-[10%] w-[94vw] max-w-2xl -translate-x-1/2 rounded-3xl border border-border bg-card p-0 shadow-2xl outline-none animate-in fade-in zoom-in-95" style={{ borderTop: "2px solid hsl(var(--brand))" }}>
                    <VisuallyHidden>
                        <Dialog.Title>Command palette</Dialog.Title>
                        <Dialog.Description>
                            Search pages, projects, and actions. Use arrow keys to navigate, Enter to select, Escape to close.
                        </Dialog.Description>
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
                                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 aria-selected:bg-brand/10 aria-selected:text-foreground relative aria-selected:shadow-[inset_2px_0_0_hsl(var(--brand))]"
                                    >
                                        <span>{it.label}</span>
                                        <span className="text-xs text-muted-foreground">↵</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>

                            <Command.Group heading="Actions" className="mb-2">
                                {actionItems.map((it) => {
                                    const current = theme === "system" ? systemTheme : theme;
                                    const isDark = current === "dark";
                                    const DynIcon = it.label === "Toggle theme"
                                        ? (isDark ? Sun : Moon)
                                        : it.icon;
                                    return (
                                        <Command.Item
                                            key={it.label}
                                            value={it.label}
                                            onSelect={() => run(it)}
                                            className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 aria-selected:bg-brand/10 aria-selected:text-foreground relative aria-selected:shadow-[inset_2px_0_0_hsl(var(--brand))]"
                                        >
                                            {DynIcon ? (
                                                <DynIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                            ) : (
                                                <span className="h-3.5 w-3.5 shrink-0" />
                                            )}
                                            <span className="flex-1">{it.label}</span>
                                            <kbd className="text-[10px] text-muted-foreground bg-muted rounded px-1.5 py-0.5 font-mono">{it.hint}</kbd>
                                        </Command.Item>
                                    );
                                })}
                            </Command.Group>

                            <Command.Group heading="Easter egg 🥚" className="mb-2">
                                {easterEggItems.map((it) => (
                                    <Command.Item
                                        key={it.label}
                                        value={it.label}
                                        onSelect={() => run(it)}
                                        className="flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 aria-selected:bg-brand/10 aria-selected:text-foreground relative aria-selected:shadow-[inset_2px_0_0_hsl(var(--brand))]"
                                    >
                                        <Terminal className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                        <span className="font-mono">{it.label}</span>
                                        <span className="ml-auto text-xs text-muted-foreground">{it.hint}</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>

                            <Command.Group heading="Projects" className="mb-1">
                                {projects.filter((p) => p.links.caseStudy).map((p) => (
                                    <Command.Item
                                        key={p.slug}
                                        value={`${p.title} ${p.slug} ${p.stack.join(" ")} ${p.subtitle}`}
                                        onSelect={() => run({ label: p.title, href: p.links.caseStudy || "/projects" })}
                                        className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors duration-150 aria-selected:bg-brand/10 aria-selected:text-foreground relative aria-selected:shadow-[inset_2px_0_0_hsl(var(--brand))]"
                                    >
                                        <span>{p.title}</span>
                                        <span className="text-xs text-muted-foreground">↵</span>
                                    </Command.Item>
                                ))}
                            </Command.Group>
                        </Command.List>

                        <div className="flex items-center justify-between rounded-b-3xl border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground bg-muted/30">
                            <span className="flex items-center gap-3">
                                <span><kbd className="font-mono bg-muted rounded px-1">↑↓</kbd> navigate</span>
                                <span><kbd className="font-mono bg-muted rounded px-1">↵</kbd> open</span>
                                <span><kbd className="font-mono bg-muted rounded px-1">esc</kbd> close</span>
                            </span>
                            <span className="text-brand/70 font-medium">⌘K</span>
                        </div>
                    </Command>
                </Dialog.Content>
            </Dialog.Portal>

            {/* Toast notification */}
            {toast && (
                <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-bottom-2 flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm shadow-xl">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/15 text-brand">
                        <Check className="h-3 w-3" />
                    </span>
                    <span className="font-medium">{toast}</span>
                </div>
            )}

            {/* Terminal easter egg modal */}
            {showTerminal && (
                <div
                    className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
                    onClick={() => setShowTerminal(false)}
                >
                    <div
                        className="w-full max-w-lg rounded-2xl border border-border overflow-hidden animate-in zoom-in-95"
                        style={{ background: "hsl(var(--card))", boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Terminal chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/60">
                            <button
                                onClick={() => setShowTerminal(false)}
                                className="h-3 w-3 rounded-full bg-destructive/60 hover:bg-destructive transition"
                                aria-label="Close terminal"
                            />
                            <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                            <span className="h-3 w-3 rounded-full bg-brand/40" />
                            <span className="ml-auto font-mono text-xs text-muted-foreground/60">bash — 80×24</span>
                        </div>
                        {/* Terminal content */}
                        <div className="p-5 font-mono text-sm leading-relaxed min-h-[260px]">
                            {terminalLines.map((line, i) => (
                                <div
                                    key={i}
                                    className={`${
                                        line.startsWith("$")
                                            ? "text-brand font-semibold"
                                            : line.startsWith("  >")
                                            ? "text-brand"
                                            : line.startsWith("  📧") || line.startsWith("  🔗") || line.startsWith("  💼") || line.startsWith("  ⚡") || line.startsWith("  🎓") || line.startsWith("  📍")
                                            ? "text-slate-300"
                                            : "text-slate-400"
                                    }`}
                                >
                                    {line || "\u00A0"}
                                </div>
                            ))}
                            {terminalLines.length < TERMINAL_OUTPUT.length && (
                                <span className="animate-pulse text-brand">▋</span>
                            )}
                        </div>
                        <div className="px-5 py-3 border-t border-border/30 text-xs text-muted-foreground/50 font-mono text-right">
                            click anywhere or press Esc to close
                        </div>
                    </div>
                </div>
            )}
        </Dialog.Root>
    );
}
