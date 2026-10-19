import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experience — Yogesh Kadam",
    description:
        "Junior Full-Stack Developer at Looks For Lease, plus web, campus, and leadership roles in Chicago. MAS from Illinois Tech, 4.0 GPA.",
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
