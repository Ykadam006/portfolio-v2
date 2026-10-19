"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { site } from "@/lib/site-data";
import { Check } from "lucide-react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    // Honeypot — hidden from real users; bots that fill it get silently dropped.
    const [website, setWebsite] = useState("");
    const [errors, setErrors] = useState<Errors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const formRef = useRef<HTMLFormElement>(null);
    const sentRef = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

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
        if (Object.keys(e).length > 0) {
            /* Shake the first offending field. Validation should feel like the
               form noticed, not like it is telling you off. */
            if (!reduced) {
                const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
                if (first) {
                    gsap.fromTo(
                        first,
                        { x: -6 },
                        { x: 0, duration: 0.4, ease: "elastic.out(1, 0.35)", clearProps: "x" }
                    );
                    first.focus({ preventScroll: true });
                }
            }
            return;
        }

        setStatus("sending");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, company: company.trim() || undefined, message, website }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to send");
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    }

    /* Status choreography: the label scrambles while the request is in flight,
       and the confirmation checkmark strokes itself in rather than popping. */
    useGSAP(
        () => {
            if (reduced) return;

            if (status === "sending") {
                const label = formRef.current?.querySelector("[data-submit-label]");
                if (label) {
                    gsap.to(label, {
                        duration: 0.6,
                        scrambleText: { text: "SENDING…", chars: "upperCase", speed: 0.4 },
                    });
                }
            }

            if (status === "sent" && sentRef.current) {
                const tl = gsap.timeline();
                tl.from(sentRef.current.querySelector("[data-sent-badge]"), {
                    scale: 0.7,
                    duration: 0.45,
                    ease: "back.out(2)",
                })
                    .from(
                        sentRef.current.querySelectorAll("[data-sent-check] path"),
                        { drawSVG: "0%", duration: 0.45, ease: EASE.out },
                        "-=0.2"
                    )
                    .from(sentRef.current.querySelectorAll("[data-sent-copy]"), {
                        y: 12,
                        duration: 0.4,
                        ease: EASE.out,
                        stagger: 0.06,
                    }, "-=0.25");
            }
        },
        { dependencies: [status, reduced] }
    );

    function clearError(field: keyof Errors) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    }

    const inputClass = "field mt-1 bg-background disabled:opacity-60";

    if (status === "sent") {
        return (
            <div ref={sentRef} className="mt-4 flex flex-col items-center justify-center py-12 text-center">
                <span
                    data-sent-badge
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-sun text-sun-foreground"
                >
                    <Check data-sent-check className="h-7 w-7" />
                </span>
                <p data-sent-copy className="mt-4 font-semibold text-foreground text-lg">Message sent!</p>
                <p data-sent-copy className="mt-1 text-sm text-muted-foreground">
                    I&apos;ll reply to {email} within a day.
                </p>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={onSubmit} className="mt-4 space-y-4">
            {/* Honeypot — visually hidden and skipped by keyboard/screen readers */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="contact-website">Website</label>
                <input
                    id="contact-website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                    Name
                </label>
                <input
                    id="contact-name"
                    type="text"
                    className={`${inputClass} ${errors.name ? "!border-destructive" : ""}`}
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearError("name"); }}
                    placeholder="Your name"
                    autoComplete="name"
                    disabled={status === "sending"}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                />
                {errors.name && <p id="contact-name-error" className="mt-1 text-sm text-destructive" role="alert">{errors.name}</p>}
            </div>

            <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                    Email
                </label>
                <input
                    id="contact-email"
                    type="email"
                    className={`${inputClass} ${errors.email ? "!border-destructive" : ""}`}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={status === "sending"}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                />
                {errors.email && <p id="contact-email-error" className="mt-1 text-sm text-destructive" role="alert">{errors.email}</p>}
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
                    className={`${inputClass} min-h-[120px] resize-y ${errors.message ? "!border-destructive" : ""}`}
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); clearError("message"); }}
                    placeholder="What are you building / hiring for?"
                    disabled={status === "sending"}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                />
                {errors.message && <p id="contact-message-error" className="mt-1 text-sm text-destructive" role="alert">{errors.message}</p>}
            </div>

            <button
                type="submit"
                className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={status === "sending"}
            >
                {status === "sending" ? (
                    <>
                        <span className="h-4 w-4 rounded-full border-2 border-brand-foreground/40 border-t-brand-foreground animate-spin" />
                        <span data-submit-label>Sending…</span>
                    </>
                ) : (
                    "Send message"
                )}
            </button>

            {status === "error" && (
                <p className="text-sm text-destructive" role="alert">
                    Something went wrong. Please try again or email me directly at {site.email}.
                </p>
            )}
        </form>
    );
}
