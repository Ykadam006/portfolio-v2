"use client";

import * as React from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

function getTextFromMessage(message: { role: string; parts: Array<{ type: string; text?: string }> }): string {
    return message.parts
        .filter((p): p is { type: string; text: string } => p.type === "text" && "text" in p)
        .map((p) => p.text)
        .join("");
}

/** Map SDK / OpenAI errors to something recruiters can act on. */
function friendlyChatError(err: Error | undefined): string {
    const raw = `${err?.message ?? ""} ${err?.name ?? ""}`.toLowerCase();
    if (raw.includes("insufficient_quota") || raw.includes("quota") || raw.includes("billing")) {
        return "Chat isn’t available right now—please use Contact or email me and I’ll reply within 24 hours.";
    }
    if (raw.includes("api key") || raw.includes("401") || raw.includes("invalid")) {
        return "Chat isn’t configured. You can still reach me via Contact.";
    }
    return "Something went wrong. Try again, or use the contact form.";
}

export function AskYogeshChat() {
    const [open, setOpen] = React.useState(false);
    const { messages, sendMessage, status, error } = useChat({
        transport: new DefaultChatTransport({ api: "/api/chat" }),
    });

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [input, setInput] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || status === "streaming") return;
        sendMessage({ text });
        setInput("");
    };

    const isLoading = status === "submitted" || status === "streaming";

    return (
        <>
            {/* Floating button */}
            <motion.button
                type="button"
                onClick={() => setOpen(true)}
                className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                aria-label="Ask Yogesh"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <MessageCircle className="h-6 w-6" />
            </motion.button>

            {/* Slide-up panel */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-50 bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[85dvh] flex-col rounded-t-3xl border-t border-border bg-card shadow-2xl"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        >
                            <div className="flex items-center justify-between border-b border-border px-4 py-3">
                                <h2 className="text-lg font-semibold">Ask Yogesh</h2>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                                    aria-label="Close"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
                                {messages.length === 0 && (
                                    <p className="text-sm text-muted-foreground text-center py-8">
                                        Ask about Yogesh&apos;s experience, projects, or availability. e.g. &quot;What&apos;s your experience with TypeScript?&quot;
                                    </p>
                                )}
                                {messages.map((message) => {
                                    const text = getTextFromMessage(message);
                                    if (!text) return null;
                                    const isUser = message.role === "user";
                                    return (
                                        <div
                                            key={message.id}
                                            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                                                    isUser
                                                        ? "bg-brand text-brand-foreground"
                                                        : "bg-muted text-foreground"
                                                }`}
                                            >
                                                {text}
                                            </div>
                                        </div>
                                    );
                                })}
                                {isLoading && (
                                    <div className="flex justify-start">
                                        <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span className="text-sm text-muted-foreground">Thinking…</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {error && (
                                <p className="mx-4 mb-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                                    {friendlyChatError(error)}
                                </p>
                            )}

                            <form onSubmit={handleSubmit} className="border-t border-border p-4">
                                <div className="flex gap-2">
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask about experience, projects..."
                                        className="flex-1 rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-brand"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!input.trim() || isLoading}
                                        className="rounded-xl bg-brand px-4 py-3 text-brand-foreground transition disabled:opacity-50 hover:enabled:opacity-90"
                                    >
                                        {isLoading ? (
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                        ) : (
                                            <Send className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
