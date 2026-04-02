"use client";

import { useState } from "react";
import { site } from "@/lib/site-data";
import { Check } from "lucide-react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    function validate(): Errors {
        const e: Errors = {};
        if (!name.trim()) e.name = "Please add your name.";
        if (!email.trim()) e.email = "Please add your email.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Please enter a valid email.";
        if (!message.trim()) e.message = "Please write a short message.";
        else if (message.trim().length < 20) e.message = "Add a little more detail (20+ chars).";
        return e;
    }

    async function onSubmit(ev: React.FormEvent) {
        ev.preventDefault();
        const e = validate();
        setErrors(e);
        if (Object.keys(e).length > 0) return;

        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, company: company.trim() || undefined, message }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to send");
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    }

    function clearError(field: keyof Errors) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    const inputClass = "mt-1 w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm outline-none transition-all duration-200 focus:border-brand focus:shadow-[0_0_0_3px_rgba(236,72,153,0.15)] disabled:opacity-60";

    if (status === "sent") {
        return (
            <div className="mt-4 flex flex-col items-center justify-center py-12 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <Check className="h-7 w-7" />
                </span>
                <p className="mt-4 font-semibold text-foreground text-lg">Message sent!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    I&apos;ll reply to {email} within 24 hours.
                </p>
            </div>
        );
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
                    className={`${inputClass} ${errors.name ? "border-destructive/60" : ""}`}
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError("name"); }}
                    placeholder="Your name"
                    autoComplete="name"
                    disabled={status === "sending"}
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
                    className={`${inputClass} ${errors.email ? "border-destructive/60" : ""}`}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={status === "sending"}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && <p id="contact-email-error" className="mt-1 text-xs text-destructive" role="alert">{errors.email}</p>}
            </div>

            <div>
                <label htmlFor="contact-company" className="text-sm font-medium text-foreground">
                    Company <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <input
                    id="contact-company"
                    type="text"
                    className={inputClass}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Where are you hiring from?"
                    autoComplete="organization"
                    disabled={status === "sending"}
                />
            </div>

            <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                    Message <span className="text-muted-foreground">(20+ characters)</span>
                </label>
                <textarea
                    id="contact-message"
                    className={`${inputClass} min-h-[120px] resize-y ${errors.message ? "border-destructive/60" : ""}`}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); clearError("message"); }}
                    placeholder="What are you building / hiring for?"
                    disabled={status === "sending"}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                />
                {errors.message && <p id="contact-message-error" className="mt-1 text-xs text-destructive" role="alert">{errors.message}</p>}
            </div>

            <button
                type="submit"
                className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={status === "sending"}
            >
                {status === "sending" ? (
                    <>
                        <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                        Sending…
                    </>
                ) : (
                    "Send message"
                )}
            </button>

            {status === "error" && (
                <p className="text-xs text-destructive" role="alert">
                    Something went wrong. Please try again or email me directly at {site.email}.
                </p>
            )}
        </form>
    );
}
