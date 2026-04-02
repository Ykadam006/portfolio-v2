"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
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
            if (filter === "Featured") return matchSearch && "featured" in p && p.featured;
            if (filter === "All") return matchSearch && !("hideFromAll" in p && p.hideFromAll);
            return matchSearch && p.category === filter;
        });
    }, [search, filter]);

    return (
        <section className="section">
            <Container>
                <div className="mb-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground mb-1">
                        all work
                    </p>
                    <h1 className="h1">Projects</h1>
                </div>
                <p className="p mt-3 max-w-2xl">
                    Things I&apos;ve built — each with a problem worth solving, a stack worth explaining, and a result worth measuring.
                </p>

                {/* Filter + Search */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative flex flex-wrap items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground mr-1">Filter:</span>
                        {(["All", ...categories] as const).map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFilter(cat)}
                                className={`relative rounded-xl border px-3 py-2 text-sm font-medium transition min-h-[44px] min-w-[44px] z-[1] ${
                                    filter === cat
                                        ? "border-transparent bg-brand text-white shadow-md"
                                        : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border hover:shadow-sm"
                                }`}
                                aria-pressed={filter === cat}
                            >
                                {filter === cat && (
                                    <motion.span
                                        layoutId="filter-indicator"
                                        className="absolute inset-0 rounded-xl -z-[1]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.35 }}
                                    />
                                )}
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search input */}
                    <div className="relative w-full sm:w-auto sm:min-w-[240px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <label htmlFor="project-search" className="sr-only">Search projects by technology or title</label>
                        <input
                            id="project-search"
                            type="search"
                            placeholder="Search by tech or title…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl border border-border bg-card pl-9 pr-8 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:border-brand transition"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                                aria-label="Clear search"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Project list */}
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
