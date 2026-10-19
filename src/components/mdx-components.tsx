import type { MDXComponents } from "mdx/types";

/** Plain object factory for MDX — not a React hook (safe in Server Components). */
export function getMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="h2 mt-12 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="h2 mt-16 mb-4">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="font-display text-2xl font-bold mt-10 mb-2">{children}</h3>
        ),
        p: ({ children }) => <p className="my-5 leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-6 my-5 space-y-2 marker:text-brand">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 my-5 space-y-2 marker:text-brand">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        code: ({ children }) => (
            <code className="rounded bg-foreground/[0.07] px-1.5 py-0.5 font-mono text-[0.85em]">{children}</code>
        ),
        pre: ({ children }) => (
            <pre tabIndex={0} className="my-8 overflow-x-auto rounded-[var(--radius)] bg-card p-5 text-sm [&_code]:bg-transparent [&_code]:p-0">
                {children}
            </pre>
        ),
        blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-sun pl-4 font-medium">
                {children}
            </blockquote>
        ),
        table: ({ children }) => (
            <div className="my-8 overflow-x-auto rounded-[var(--radius)] bg-card">
                <table className="w-full text-sm">{children}</table>
            </div>
        ),
        th: ({ children }) => (
            <th className="px-4 py-3 text-left font-semibold">{children}</th>
        ),
        td: ({ children }) => <td className="px-4 py-3 align-top">{children}</td>,
        a: ({ href, children }) => (
            <a href={href} className="underline decoration-sun decoration-2 underline-offset-4">
                {children}
            </a>
        ),
        ...components,
    };
}
