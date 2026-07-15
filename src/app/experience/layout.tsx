import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Experience — Yogesh Kadam",
    description:
        "Internships, campus leadership, and programs where I shipped production UI, supported 300+ students, and delivered measurable outcomes.",
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
