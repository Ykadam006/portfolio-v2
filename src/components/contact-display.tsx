import { ResumeLink } from "@/components/resume-drawer";
import { LastStep } from "@/components/last-step";
import { site } from "@/lib/site-data";

const tel = `tel:+1${site.phone.replace(/\D/g, "")}`;

/** The ending: the email address as display type, on the cobalt field. */
export function ContactDisplay({
    heading = "Give me a hard problem and a stack I don't know yet.",
    curtain = false,
}: {
    heading?: string;
    /** The ending: the cobalt field wipes up from the bottom edge as it arrives, and the sun climbs one last step onto the address. */
    curtain?: boolean;
}) {
    const email = (
        <a
            href={`mailto:${site.email}`}
            data-rise={curtain ? undefined : true}
            className="email-display block whitespace-nowrap font-display font-semibold leading-[0.95] transition-colors duration-150 hover:text-sun focus-visible:text-sun"
        >
            {site.email}
        </a>
    );
    return (
        <section aria-labelledby="contact-heading" className={`flex min-h-[85svh] flex-col justify-between bg-field text-field-foreground ${curtain ? "curtain-rise" : ""}`}>
            <div className="frame grid gap-6 pt-20 lg:grid-cols-12">
                <h2 id="contact-heading" className="h2 lg:col-span-6">
                    {heading}
                </h2>
                <p className="text-field-muted lg:col-span-4 lg:col-start-9">
                    I reply within a day. {site.openTo}
                </p>
            </div>

            <div className="frame [container-type:inline-size]">
                {curtain ? <LastStep>{email}</LastStep> : email}
            </div>

            <div className="frame flex flex-wrap items-end justify-between gap-x-8 gap-y-3 pb-10 pt-12 text-field-muted">
                <p>
                    <a href={tel} className="text-field-foreground underline decoration-sun decoration-2 underline-offset-4">
                        {site.phone}
                    </a>{" "}
                    · {site.location}
                </p>
                <p className="flex gap-6">
                    <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="text-field-foreground underline decoration-sun decoration-2 underline-offset-4">
                        LinkedIn
                    </a>
                    <ResumeLink className="text-field-foreground underline decoration-sun decoration-2 underline-offset-4">Resume</ResumeLink>
                </p>
            </div>
        </section>
    );
}
