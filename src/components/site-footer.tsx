import Link from "next/link";
import { ResumeLink } from "@/components/resume-drawer";
import { site } from "@/lib/site-data";

const NAV = [
    { href: "/projects", label: "Work" },
    { href: "/experience", label: "Experience" },
    { href: "/skills", label: "Skills" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Writing" },
    { href: "/uses", label: "Uses" },
    { href: "/contact", label: "Contact" },
];

const link = "text-background/75 transition-colors hover:text-background";

/** Inverted close: plain lists, then the copyright line. */
export function SiteFooter() {
    return (
        <footer className="bg-foreground text-background">
            <div className="frame grid gap-10 pt-16 sm:grid-cols-2 lg:grid-cols-12">
                <div className="lg:col-span-4">
                    <p className="font-semibold">{site.name}</p>
                    <p className="mt-1 text-background/75">
                        {site.role}
                        <br />
                        {site.location}
                    </p>
                </div>
                <nav aria-label="Footer" className="lg:col-span-3">
                    <p className="font-semibold">Pages</p>
                    <ul className="mt-1 grid grid-cols-2 gap-x-6">
                        {NAV.map((n) => (
                            <li key={n.href}>
                                <Link href={n.href} className={link}>
                                    {n.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="lg:col-span-3">
                    <p className="font-semibold">Elsewhere</p>
                    <ul className="mt-1">
                        <li>
                            <a href={`mailto:${site.email}`} className={link}>
                                {site.email}
                            </a>
                        </li>
                        <li>
                            <a href={site.links.linkedin} target="_blank" rel="noreferrer" className={link}>
                                LinkedIn
                            </a>
                        </li>
                        {site.links.github && (
                            <li>
                                <a href={site.links.github} target="_blank" rel="noreferrer" className={link}>
                                    GitHub
                                </a>
                            </li>
                        )}
                        <li>
                            <ResumeLink className={link}>Resume (PDF)</ResumeLink>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="frame mt-16 flex flex-col gap-2 pb-8 text-sm text-background/75 md:flex-row md:justify-between">
                <p>© {new Date().getFullYear()} {site.name}</p>
            </div>
        </footer>
    );
}
