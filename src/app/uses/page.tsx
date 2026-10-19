import { Container } from "@/components/container";

export const metadata = {
    title: "Uses — Yogesh Kadam",
    description: "My dev setup: the editor, AI tools, stack defaults, and where I keep learning.",
};

type UseItem = { name: string; note: string };

const sections: { title: string; items: UseItem[] }[] = [
    {
        title: "Editor & Terminal",
        items: [
            { name: "VS Code", note: "My main editor. I keep it lean: only the extensions I actually use." },
            { name: "Geist Mono", note: "Editor font. Easy to read at small sizes." },
            { name: "Prettier", note: "Formats on save, so style never comes up in review." },
            { name: "ESLint", note: "Catches mistakes before they run. I treat warnings as errors." },
            { name: "GitLens", note: "Inline blame and file history. Handy when I'm tracking down a regression." },
            { name: "Tailwind CSS IntelliSense", note: "Autocomplete and class sorting." },
            { name: "Auto Rename Tag", note: "Renames the closing tag when I rename the opening one. Small, but I'd miss it." },
            { name: "Error Lens", note: "Shows each error on the line it happens, so I don't have to open the Problems panel." },
        ],
    },
    {
        title: "AI Tools",
        items: [
            { name: "Claude Code", note: "Every day, in the terminal, for multi-file changes and refactors. I read every diff before it merges." },
            { name: "Codex", note: "Every day, alongside Claude Code. Same rule: I read what it writes before it merges." },
            { name: "Cursor", note: "Inline edits and tab completion for small changes." },
            { name: "ChatGPT", note: "For talking through an architecture decision or a tricky query before I write it." },
            { name: "GitHub Copilot", note: "A second opinion on boilerplate-heavy files." },
        ],
    },
    {
        title: "Browser & DevTools",
        items: [
            { name: "Chrome", note: "My main browser for development, mostly for DevTools." },
            { name: "React Developer Tools", note: "The component tree, props and state, and the profiler when something re-renders too much." },
            { name: "Lighthouse", note: "Performance, accessibility, and SEO audits. I run it before I ship anything people will use." },
            { name: "Network tab", note: "Where most API bugs show up: payload shape, timing, headers, and CORS." },
        ],
    },
    {
        title: "Design",
        items: [
            { name: "Figma", note: "Every day. I build from other people's designs, and I sketch my own before I write code." },
            { name: "FigJam", note: "I draw the architecture and the component tree before any non-trivial feature. It saves refactoring later." },
            { name: "Framer Motion", note: "What I reach for first for animation in React." },
        ],
    },
    {
        title: "Stack Defaults",
        items: [
            { name: "Next.js + TypeScript", note: "Where most of my web work starts: server-rendered routes and strict TypeScript." },
            { name: "Tailwind CSS + Radix UI", note: "Tailwind for speed, and Radix for accessible pieces I can style without fighting them." },
            { name: "PostgreSQL + Prisma", note: "Relational by default, with migrations checked into the repo." },
            { name: "Docker Compose", note: "Every multi-service project runs locally with one command." },
            { name: "Vercel", note: "Where my Next.js apps deploy: a preview URL for every branch, and quick rollbacks." },
        ],
    },
    {
        title: "What I Always Add First",
        items: [
            { name: "ESLint + Prettier", note: "Set up before the first commit, so I never argue about formatting later." },
            { name: "GitHub Actions", note: "Lint, type-check, test, and build on every push." },
        ],
    },
    {
        title: "Learning Resources",
        items: [
            { name: "Josh Comeau", note: "The best CSS course I've taken. His interactive explanations finally made flexbox and grid make sense to me." },
            { name: "Kent C. Dodds", note: "Where I learned to test behavior, not implementation. It changed how I write tests." },
            { name: "Theo (t3.gg)", note: "How I keep up with Next.js and TypeScript, and what's actually worth adopting." },
            { name: "Next.js & Vercel documentation", note: "My main reference. Accurate, kept up to date, and the examples hold up in production." },
        ],
    },
];

export default function UsesPage() {
    return (
        <Container className="pb-24 pt-14 sm:pb-32">
            <h1 className="h1">Uses</h1>
            <p className="lead mt-6">The tools I use every day to design, build, and ship. Last updated October 2026.</p>

            <div className="mt-24 space-y-20">
                {sections.map((section) => (
                    <section key={section.title} className="grid gap-x-6 gap-y-6 lg:grid-cols-12">
                        <h2 className="h2 lg:col-span-4">{section.title}</h2>
                        <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8 lg:col-start-5">
                            {section.items.map((item) => (
                                <li key={item.name}>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="mt-1 text-muted-foreground">{item.note}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </Container>
    );
}
