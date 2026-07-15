import React from "react";
import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";
import {
    siPrettier,
    siEslint,
    siTailwindcss,
    siGit,
    siAnthropic,
    siGithubcopilot,
    siGooglechrome,
    siReact,
    siFigma,
    siNextdotjs,
    siVercel,
    siMongodb,
    siGithubactions,
    siFramer,
    siCursor,
} from "simple-icons";
import { Code2, Type, Tag, AlertCircle, Gauge, Network, BarChart2, BookOpen, Bot } from "lucide-react";

export const metadata = {
    title: "Uses — Yogesh Kadam",
    description: "My dev setup: editor, AI tools, stack defaults, learning resources. What I use to build every day.",
};

type SimpleIcon = { title: string; hex: string; path: string };
type LucideIconComp = React.FC<{ size?: number; className?: string }>;
type UseItem = { name: string; note: string; icon?: SimpleIcon; lucideIcon?: LucideIconComp; link?: string };

const CURRENT_COLOR_ICONS = new Set(["Next.js 15 (App Router) + TypeScript"]);

function ToolIcon({ icon, lucideIcon, name }: { icon?: SimpleIcon; lucideIcon?: LucideIconComp; name: string }) {
    if (lucideIcon) {
        const LucideComp = lucideIcon;
        return (
            <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-muted/70 shrink-0">
                <LucideComp size={18} className="text-foreground/70" />
            </div>
        );
    }
    if (!icon) {
        return (
            <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-muted/70 shrink-0 text-xs font-bold text-muted-foreground">
                {name.slice(0, 2).toUpperCase()}
            </div>
        );
    }
    const useCurrent = CURRENT_COLOR_ICONS.has(name);
    return (
        <div className="h-9 w-9 rounded-xl flex items-center justify-center bg-muted/70 shrink-0">
            <svg
                role="img"
                viewBox="0 0 24 24"
                width={20}
                height={20}
                fill={useCurrent ? "currentColor" : `#${icon.hex}`}
                aria-label={icon.title}
            >
                <path d={icon.path} />
            </svg>
        </div>
    );
}

const sections: { title: string; items: UseItem[] }[] = [
    {
        title: "Editor & Terminal",
        items: [
            { name: "VS Code", note: "Primary editor — dark theme, always. I keep it lean with only the extensions I actually use.", lucideIcon: Code2 },
            { name: "Geist Mono", note: "Editor font. Clean, readable at small sizes, designed specifically for code.", lucideIcon: Type },
            { name: "Prettier", note: "Format on save. Non-negotiable. Eliminates all style debates.", icon: siPrettier },
            { name: "ESLint", note: "Catch errors before runtime. Configured strictly — I treat warnings as errors.", icon: siEslint },
            { name: "GitLens", note: "Inline blame, history at a glance. Indispensable when tracing down a regression.", icon: siGit },
            { name: "Tailwind CSS IntelliSense", note: "Autocomplete + class sorting. Speeds up styling significantly.", icon: siTailwindcss },
            { name: "Auto Rename Tag", note: "Renames closing tag automatically. Saves 5 seconds 40 times a day.", lucideIcon: Tag },
            { name: "Error Lens", note: "Surfaces errors inline on the line they occur — no alt-tab to the Problems panel.", lucideIcon: AlertCircle },
        ],
    },
    {
        title: "AI Tools",
        items: [
            { name: "Cursor", note: "My primary editor setup. The tab-completion and inline edits are the best I've used. I use it for refactoring, exploring unfamiliar APIs, and drafting components.", icon: siCursor },
            { name: "ChatGPT (GPT-4o)", note: "For reasoning through architecture decisions, writing/reviewing SQL, and anything that needs a back-and-forth conversation.", lucideIcon: Bot },
            { name: "Claude", note: "Long-context tasks — reading and summarizing large codebases, drafting documentation, reviewing PRs end-to-end.", icon: siAnthropic },
            { name: "Vercel AI SDK", note: "For streaming AI features in Next.js when a project needs them.", icon: siVercel },
            { name: "GitHub Copilot", note: "Occasional second opinion when Cursor suggestions aren't clicking. Useful for boilerplate-heavy files.", icon: siGithubcopilot },
        ],
    },
    {
        title: "Browser & DevTools",
        items: [
            { name: "Chrome", note: "Primary browser for development. DevTools is still the best in class.", icon: siGooglechrome },
            { name: "React Developer Tools", note: "Component tree inspection, props/state drill-down, profiler for render performance.", icon: siReact },
            { name: "Lighthouse", note: "Performance, accessibility, SEO audits. I run it on every major PR before merging.", lucideIcon: Gauge },
            { name: "Network tab", note: "My primary debugging tool for API issues — payload shape, timing, headers, CORS.", lucideIcon: Network },
        ],
    },
    {
        title: "Design",
        items: [
            { name: "Figma", note: "Daily. I use it both to build from existing designs and to sketch my own before writing a line of code.", icon: siFigma },
            { name: "FigJam", note: "Architecture diagrams before I start any non-trivial feature. Drawing the component tree first saves significant refactoring time.", lucideIcon: BarChart2 },
            { name: "Framer Motion", note: "My go-to for production animations. The mental model just clicks for me.", icon: siFramer },
        ],
    },
    {
        title: "Stack Defaults",
        items: [
            { name: "Next.js 15 (App Router) + TypeScript", note: "Starting point for every web project. App Router co-locates data fetching with components. TypeScript prevents entire categories of bugs.", icon: siNextdotjs },
            { name: "Tailwind CSS + Shadcn/UI", note: "Tailwind for utility-first speed; Shadcn for accessible, unstyled primitives I can customize without fighting a design system.", icon: siTailwindcss },
            { name: "Vercel", note: "Deploy target of choice. Preview URLs per branch, instant rollbacks, Edge Runtime when needed.", icon: siVercel },
            { name: "MongoDB Atlas or PostgreSQL on RDS", note: "Atlas for flexible, document-shaped data. PostgreSQL (on RDS) when the data is relational and needs joins and indexes.", icon: siMongodb },
        ],
    },
    {
        title: "What I Always Add First",
        items: [
            { name: "ESLint + Prettier + Husky pre-commit hooks", note: "Enforces code quality before a commit lands. Eliminates the 'I'll clean it up later' problem.", icon: siEslint },
            { name: "GitHub Actions", note: "Lint + type check + build on every PR. If it doesn't pass CI it doesn't merge.", icon: siGithubactions },
            { name: "Lighthouse CI on PRs", note: "Catches performance regressions before they hit production — not after a user complains." },
        ],
    },
    {
        title: "Learning Resources",
        items: [
            { name: "Josh Comeau", note: "The best CSS course I've taken. His interactive explanations of layout algorithms finally made flexbox and grid click.", lucideIcon: BookOpen },
            { name: "Kent C. Dodds", note: "The definitive source on testing patterns. His philosophy — test behavior, not implementation — changed how I write tests.", lucideIcon: BookOpen },
            { name: "Theo (t3.gg)", note: "Keeps me current on the Next.js + TypeScript ecosystem. Good signal-to-noise ratio on what's worth adopting.", lucideIcon: BookOpen },
            { name: "Next.js & Vercel documentation", note: "Primary reference. Well-maintained, accurate, and the examples are production-quality.", icon: siNextdotjs },
        ],
    },
];

export default function UsesPage() {
    return (
        <div className="section">
            <Container className="max-w-3xl">
                <FadeIn>
                    <h1 className="h1">Uses</h1>
                    <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed">
                        The tools I use every day to design, build, and ship.
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Last updated{" "}
                        <time dateTime="2026-02-01" className="font-medium text-foreground/70">
                            February 2026
                        </time>
                    </p>
                </FadeIn>

                <div className="mt-14 space-y-14">
                    {sections.map((section, si) => (
                        <FadeIn key={section.title} delay={0.05 * (si + 1)}>
                            <div>
                                {/* Section header with pink left accent */}
                                <div className="flex items-center gap-3 mb-5 pl-3 border-l-2 border-brand/50">
                                    <h2 className="font-semibold tracking-tight text-foreground">
                                        <code className="font-mono text-base">{section.title}</code>
                                    </h2>
                                </div>

                                {/* Icon card grid */}
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {section.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className="card p-4 flex items-start gap-3 hover:border-brand/20 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                                        >
                                            <ToolIcon icon={item.icon} lucideIcon={item.lucideIcon} name={item.name} />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-foreground leading-snug">{item.name}</p>
                                                <p className="mt-1 text-xs text-muted-foreground leading-relaxed line-clamp-3">{item.note}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.4}>
                    <p className="mt-16 text-sm text-muted-foreground border-t border-border pt-8">
                        Inspired by{" "}
                        <a
                            href="https://uses.tech"
                            target="_blank"
                            rel="noreferrer"
                            className="text-brand underline underline-offset-4 hover:opacity-80"
                        >
                            uses.tech
                        </a>
                        {" "}— a community-maintained directory of developer setups.
                    </p>
                </FadeIn>
            </Container>
        </div>
    );
}
