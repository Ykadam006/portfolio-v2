"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import { projects, type ProjectCategory } from "@/lib/site-data";

const categories: (ProjectCategory | "Featured")[] = ["Featured", "Full-stack", "Frontend", "Research"];

export default function ProjectsPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"All" | ProjectCategory | "Featured">("All");

    const filtered = useMemo(() => {
        return projects.filter((p) => {
            const matchSearch =
                !search.trim() ||
                p.title.toLowerCase().includes(search.toLowerCase()) ||
                p.subtitle.toLowerCase().includes(search.toLowerCase()) ||
                p.stack.some((s) => s.toLowerCase().includes(search.toLowerCase()));
            if (filter === "Featured") {
                return matchSearch && "featured" in p && p.featured;
            }
            if (filter === "All") {
                const hideFromAll = "hideFromAll" in p && p.hideFromAll;
                return matchSearch && !hideFromAll;
            }
            return matchSearch && p.category === filter;
        });
    }, [search, filter]);

    return (
        <section className="section">
            <Container>
                <h1 className="h1">Projects</h1>
                <p className="p mt-4 max-w-2xl">
                    Things I&apos;ve built — each with a problem worth solving, a stack worth explaining, and a result worth measuring.
                </p>

                <div className="mt-8 flex flex-col gap-4">
                    <div className="relative flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground mr-1">Filter:</span>
                        {(["All", ...categories] as const).map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFilter(cat)}
                                className={`relative rounded-xl border px-3 py-2 text-sm font-medium transition min-h-[44px] min-w-[44px] z-[1] ${
                                    filter === cat
                                        ? "border-transparent text-brand"
                                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border hover:shadow-sm"
                                }`}
                                aria-pressed={filter === cat}
                            >
                                {filter === cat && (
                                    <motion.span
                                        layoutId="filter-indicator"
                                        className="absolute inset-0 rounded-xl bg-brand/10 ring-2 ring-brand/20 -z-[1]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                                    />
                                )}
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
