"use client";

import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { projects, type ProjectCategory } from "@/lib/site-data";

const FILTERS: ("All" | ProjectCategory)[] = ["All", "Full-stack", "Microservices", "Frontend"];

export default function ProjectsPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        return projects.filter(
            (p) =>
                (filter === "All" || p.category === filter) &&
                (!q || [p.title, p.kind, p.summary, ...p.stack].some((s) => s.toLowerCase().includes(q)))
        );
    }, [search, filter]);

    return (
        <div className="frame pb-24 pt-14 sm:pb-32">
            <h1 className="h1">Work</h1>
            <p className="lead mt-6">
                {projects.length} projects, from real-time apps to event-driven microservices. Each case study shows the steps a request
                takes, the decisions I made, and the numbers.
            </p>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
                    {FILTERS.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setFilter(cat)}
                            aria-pressed={filter === cat}
                            className="btn-secondary !min-h-11 aria-pressed:bg-foreground aria-pressed:text-background"
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="relative w-full sm:w-72">
                    <label htmlFor="project-search" className="sr-only">
                        Search projects by technology or name
                    </label>
                    <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        id="project-search"
                        type="search"
                        placeholder="Search: Kafka, Next.js…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="field pl-9 pr-10"
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="absolute right-1 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>

            <p aria-live="polite" className="small mt-6">
                {filtered.length} {filtered.length === 1 ? "project" : "projects"}
                {filter !== "All" && ` · ${filter}`}
            </p>

            <div className="mt-8 grid gap-x-6 gap-y-20 md:grid-cols-2">
                {filtered.map((p, i) => (
                    <ProjectCard key={p.slug} p={p} priority={i === 0} />
                ))}
            </div>

            {filtered.length === 0 && (
                <div className="mt-6 rounded-[var(--radius)] bg-card px-6 py-14">
                    <p className="font-semibold">No project matches “{search}”.</p>
                    <p className="mt-1 text-muted-foreground">Try a technology name, or clear the filters.</p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setFilter("All");
                        }}
                        className="btn-secondary mt-5"
                    >
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}
