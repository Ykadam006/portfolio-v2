import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { ContactDisplay } from "@/components/contact-display";
import { site } from "@/lib/site-data";

export const metadata: Metadata = {
    title: "Contact — Yogesh Kadam",
    description:
        "Open to full-stack, frontend and backend software engineering roles across the US. Chicago, IL; replies within a day.",
};

export default function ContactPage() {
    return (
        <>
            <section className="frame grid gap-x-6 gap-y-12 pb-24 pt-14 lg:grid-cols-12">
                <div className="lg:col-span-5">
                    <h1 className="h1">Let&apos;s talk.</h1>
                    <p className="lead mt-6">{site.openTo}</p>
                    <p className="mt-4 text-muted-foreground">
                        Email is fastest. The form lands in the same inbox, and I reply within a day.
                    </p>
                </div>
                <section aria-labelledby="form-heading" className="rounded-[var(--radius)] bg-card p-6 sm:p-8 lg:col-span-6 lg:col-start-7">
                    <h2 id="form-heading" className="font-display text-3xl font-bold">
                        Send a message
                    </h2>
                    <ContactForm />
                </section>
            </section>
            <ContactDisplay heading="Or write to me directly." />
        </>
    );
}
