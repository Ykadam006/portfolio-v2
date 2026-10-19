import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Skills — Yogesh Kadam",
    description:
        "Every skill on my resume, grouped by layer, with the project or role where I used it.",
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
