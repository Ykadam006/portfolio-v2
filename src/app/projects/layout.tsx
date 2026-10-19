import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Work — Yogesh Kadam",
    description:
        "Ten projects with full case studies: a real-time workspace, an AI health navigator, Go and Spring Boot microservices on Kafka, and more.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return children;
}
