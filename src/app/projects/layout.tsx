import type { Metadata } from "next";
import { ProjectViewTracker } from "@/components/project-view-tracker";

export const metadata: Metadata = {
    title: "Projects — Yogesh Kadam",
    description:
        "Full-stack and frontend projects — each with a problem worth solving, a stack worth explaining, and a result worth measuring.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ProjectViewTracker />
            {children}
        </>
    );
}
