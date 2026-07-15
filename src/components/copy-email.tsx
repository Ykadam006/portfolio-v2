"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CopyEmail({ email }: { email: string }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for browsers without clipboard API
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Email copied!" : "Copy email address"}
            className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border bg-muted/60 text-muted-foreground hover:text-brand hover:border-brand/30 transition-all duration-200 hover:scale-110"
        >
            <span role="status" aria-live="polite" className="sr-only">
                {copied ? "Email copied to clipboard" : ""}
            </span>
            <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                    <motion.span
                        key="check"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-brand"
                    >
                        <Check className="h-3 w-3" />
                    </motion.span>
                ) : (
                    <motion.span
                        key="copy"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Copy className="h-3 w-3" />
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}
