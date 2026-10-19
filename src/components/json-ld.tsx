import { site } from "@/lib/site-data";
import { SITE_URL } from "@/lib/site-url";

const PERSON_ID = `${SITE_URL}/#person`;

/** Person + WebSite structured data, rendered once in the root layout. */
const graph = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": PERSON_ID,
            name: "Yogesh Kadam",
            url: SITE_URL,
            jobTitle: site.role,
            email: `mailto:${site.email}`,
            image: `${SITE_URL}/avatar.png`,
            address: {
                "@type": "PostalAddress",
                addressLocality: "Chicago",
                addressRegion: "IL",
                addressCountry: "US",
            },
            alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Illinois Institute of Technology",
            },
            sameAs: [site.links.linkedin, site.links.github].filter(Boolean),
            knowsAbout: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Spring Boot", "Kafka", "Go", "FastAPI"],
        },
        {
            "@type": "WebSite",
            "@id": `${SITE_URL}/#website`,
            name: "Yogesh Kadam",
            url: SITE_URL,
            author: { "@id": PERSON_ID },
        },
    ],
};

export function JsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}
