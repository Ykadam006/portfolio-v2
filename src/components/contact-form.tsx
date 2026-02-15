"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/site-data";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<Errors>({});

    const mailto = useMemo(() => {
        const subject = encodeURIComponent(`Portfolio inquiry — ${name || "Hi Yogesh"}`);
        const body = encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n— Sent from your portfolio`
        );
        return `mailto:${site.email}?subject=${subject}&body=${body}`;
    }, [name, email, message]);

    function validate(): Errors {
        const e: Errors = {};
        if (!name.trim()) e.name = "Please add your name.";
        if (!email.trim()) e.email = "Please add your email.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Please enter a valid email.";
        if (!message.trim()) e.message = "Please write a short message.";
        else if (message.trim().length < 20) e.message = "Add a little more detail (20+ chars).";
        return e;
    }

    function onSubmit(ev: React.FormEvent) {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) return;
        window.location.href = mailto;
    }

    return (
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div>
                <label className="text-sm text-muted-foreground">Name</label>
                <input
                    className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
                    value={name}
                    onChange={(v) => setName(v.target.value)}
                    placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <input
                    className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
                    value={email}
                    onChange={(v) => setEmail(v.target.value)}
                    placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>

            <div>
                <label className="text-sm text-muted-foreground">Message</label>
                <textarea
                    className="mt-1 min-h-[120px] w-full rounded-xl border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-brand"
                    value={message}
                    onChange={(v) => setMessage(v.target.value)}
                    placeholder="What are you building / hiring for?"
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-xl bg-brand px-4 py-2 text-sm text-brand-foreground hover:opacity-90 transition"
            >
                Open email draft
            </button>

            <p className="text-xs text-muted-foreground">
                This opens your email client with a pre-filled message (no data stored).
            </p>
        </form>
    );
}
