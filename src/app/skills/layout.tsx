import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Skills — Yogesh Kadam",
    description:
        "A focused stack for building modern, accessible UIs and reliable full-stack workflows. React, Next.js, TypeScript, and more.",
};

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
