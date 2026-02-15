"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { projects, type ProjectCategory } from "@/lib/site-data";

const categories: ProjectCategory[] = ["Full-stack", "Frontend", "Research"];

export default function ProjectsPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<ProjectCategory | "All">("All");

    const filtered = useMemo(() => {
        return projects.filter((p) => {
            const matchSearch =
                !search.trim() ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
                p.stack.some((s) => s.toLowerCase().includes(search.toLowerCase()));
            const matchFilter = filter === "All" || p.category === filter;
            return matchSearch && matchFilter;
        });
    }, [search, filter]);

    return (
        <section className="section">
            <Container>
                <h1 className="h1">Projects</h1>
                <p className="p mt-4 max-w-2xl">
                    Case studies with architecture notes and measurable impact.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground mr-1">Filter:</span>
                        {(["All", ...categories] as const).map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFilter(cat)}
                                className={`rounded-xl border px-3 py-2 text-sm font-medium transition min-h-[44px] min-w-[44px] ${
                                    filter === cat
                                        ? "border-brand bg-brand/10 text-brand ring-2 ring-brand/20"
                                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border hover:shadow-sm"
                                }`}
                                aria-pressed={filter === cat}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="w-full sm:w-auto sm:max-w-[280px]">
                        <label htmlFor="project-search" className="sr-only">
                            Search projects by technology or title
                        </label>
                        <input
                            id="project-search"
                            type="search"
                            placeholder="Search by tech or title…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            aria-label="Search projects by technology or title"
                            className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
                        />
                    </div>
                </div>

                <div className="mt-8 space-y-6 sm:space-y-8">
                    {filtered.map((p) => (
                        <ProjectCard key={p.slug} p={p} mode="page" />
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="mt-12 text-center py-16 px-6 rounded-2xl border border-dashed border-border bg-muted/30">
                        <p className="text-muted-foreground font-medium">No projects match your search or filter.</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Try clearing the search or selecting &quot;All&quot; categories.
                        </p>
                        <button
                            type="button"
                            onClick={() => { setSearch(""); setFilter("All"); }}
                            className="mt-4 btn-secondary"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </Container>
        </section>
    );
}
