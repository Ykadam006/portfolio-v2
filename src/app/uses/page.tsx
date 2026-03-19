import { Container } from "@/components/container";
import { FadeIn } from "@/components/fade-in";

export const metadata = {
    title: "Uses — Yogesh Kadam",
    description: "My dev setup: editor, AI tools, stack defaults, learning resources. What I use to build every day.",
};

type UseItem = { name: string; note: string };

const sections: { title: string; emoji: string; items: UseItem[] }[] = [
    {
        title: "Editor & Terminal",
        emoji: "⌨️",
        items: [
            { name: "VS Code", note: "Primary editor — dark theme, always. I keep it lean with only the extensions I actually use." },
            { name: "Geist Mono", note: "Editor font. Clean, readable at small sizes, designed specifically for code." },
            { name: "Prettier", note: "Format on save. Non-negotiable. Eliminates all style debates." },
            { name: "ESLint", note: "Catch errors before runtime. Configured strictly — I treat warnings as errors." },
            { name: "GitLens", note: "Inline blame, history at a glance. Indispensable when tracing down a regression." },
            { name: "Tailwind CSS IntelliSense", note: "Autocomplete + class sorting. Speeds up styling significantly." },
            { name: "Auto Rename Tag", note: "Renames closing tag automatically. Saves 5 seconds 40 times a day." },
            { name: "Error Lens", note: "Surfaces errors inline on the line they occur — no alt-tab to the Problems panel." },
        ],
    },
    {
        title: "AI Tools",
        emoji: "🤖",
        items: [
            { name: "Cursor", note: "My primary editor setup. The tab-completion and inline edits are the best I've used. I use it for refactoring, exploring unfamiliar APIs, and drafting components." },
            { name: "ChatGPT (GPT-4o)", note: "For reasoning through architecture decisions, writing/reviewing SQL, and anything that needs a back-and-forth conversation." },
            { name: "Claude", note: "Long-context tasks — reading and summarizing large codebases, drafting documentation, reviewing PRs end-to-end." },
            { name: "Vercel AI SDK", note: "For building AI features into products. The streaming + useChat hook makes chat interfaces trivial to implement." },
            { name: "GitHub Copilot", note: "Occasional second opinion when Cursor suggestions aren't clicking. Useful for boilerplate-heavy files." },
        ],
    },
    {
        title: "Browser & DevTools",
        emoji: "🌐",
        items: [
            { name: "Chrome", note: "Primary browser for development. DevTools is still the best in class." },
            { name: "React Developer Tools", note: "Component tree inspection, props/state drill-down, profiler for render performance." },
            { name: "Lighthouse", note: "Performance, accessibility, SEO audits. I run it on every major PR before merging." },
            { name: "Network tab", note: "My primary debugging tool for API issues — payload shape, timing, headers, CORS." },
        ],
    },
    {
        title: "Design",
        emoji: "🎨",
        items: [
            { name: "Figma", note: "Daily. I use it both to build from existing designs and to sketch my own before writing a line of code. Understanding the design intent speeds up implementation." },
            { name: "FigJam", note: "Architecture diagrams before I start any non-trivial feature. Drawing the component tree first saves significant refactoring time." },
        ],
    },
    {
        title: "Stack Defaults",
        emoji: "🗂️",
        items: [
            { name: "Next.js 15 (App Router) + TypeScript", note: "Starting point for every web project. App Router co-locates data fetching with components. TypeScript prevents entire categories of bugs." },
            { name: "Tailwind CSS + Shadcn/UI", note: "Tailwind for utility-first speed; Shadcn for accessible, unstyled primitives I can customize without fighting a design system." },
            { name: "Vercel", note: "Deploy target of choice. Preview URLs per branch, instant rollbacks, Edge Runtime when needed." },
            { name: "MongoDB Atlas or PostgreSQL on RDS", note: "Atlas for flexible, document-shaped data. PostgreSQL (on RDS) when the data is relational and needs joins and indexes." },
        ],
    },
    {
        title: "What I Always Add First",
        emoji: "🔧",
        items: [
            { name: "ESLint + Prettier + Husky pre-commit hooks", note: "Enforces code quality before a commit lands. Eliminates the 'I'll clean it up later' problem." },
            { name: "GitHub Actions", note: "Lint + type check + build on every PR. If it doesn't pass CI it doesn't merge." },
            { name: "Lighthouse CI on PRs", note: "Catches performance regressions before they hit production — not after a user complains." },
        ],
    },
    {
        title: "Learning Resources",
        emoji: "📚",
        items: [
            { name: "Josh Comeau", note: "The best CSS course I've taken. His interactive explanations of layout algorithms finally made flexbox and grid click." },
            { name: "Kent C. Dodds", note: "The definitive source on testing patterns. His philosophy — test behavior, not implementation — changed how I write tests." },
            { name: "Theo (t3.gg)", note: "Keeps me current on the Next.js + TypeScript ecosystem. Good signal-to-noise ratio on what's worth adopting." },
            { name: "Next.js & Vercel documentation", note: "Primary reference. Well-maintained, accurate, and the examples are production-quality." },
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
                        The tools I use every day to design, build, and ship. Keeping this page updated — last updated February 2026.
                    </p>
                </FadeIn>

                <div className="mt-14 space-y-14">
                    {sections.map((section, si) => (
                        <FadeIn key={section.title} delay={0.05 * (si + 1)}>
                            <div>
                                <h2 className="text-xl font-semibold tracking-tight flex items-center gap-2">
                                    <span aria-hidden="true">{section.emoji}</span>
                                    {section.title}
                                </h2>
                                <div className="mt-5 divide-y divide-border rounded-2xl border border-border overflow-hidden">
                                    {section.items.map((item) => (
                                        <div
                                            key={item.name}
                                            className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 px-5 py-4 bg-card hover:bg-muted/40 transition-colors"
                                        >
                                            <span className="shrink-0 text-sm font-medium w-full sm:w-48">
                                                {item.name}
                                            </span>
                                            <span className="text-sm text-muted-foreground leading-relaxed">
                                                {item.note}
                                            </span>
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
