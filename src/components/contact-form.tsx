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

    function clearError(field: keyof Errors) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    return (
        <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                    Name
                </label>
                <input
                    id="contact-name"
                    type="text"
                    className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 invalid:border-destructive/50"
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError("name"); }}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && <p id="contact-name-error" className="mt-1 text-xs text-destructive" role="alert">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                    Email
                </label>
                <input
                    id="contact-email"
                    type="email"
                    className="mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 invalid:border-destructive/50"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && <p id="contact-email-error" className="mt-1 text-xs text-destructive" role="alert">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                    Message <span className="text-muted-foreground">(20+ characters)</span>
                </label>
                <textarea
                    id="contact-message"
                    className="mt-1 min-h-[120px] w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 resize-y"
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); clearError("message"); }}
                    placeholder="What are you building / hiring for?"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                />
                {errors.message && <p id="contact-message-error" className="mt-1 text-xs text-destructive" role="alert">{errors.message}</p>}
            </div>

            <button
                type="submit"
                className="btn-primary w-full"
            >
                Open email draft
            </button>

            <p className="text-xs text-muted-foreground">
                This opens your email client with a pre-filled message (no data stored).
            </p>
        </form>
    );
}
