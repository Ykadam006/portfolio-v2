import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({ children }) => (
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mt-8 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-semibold tracking-tight mt-10 mb-3 border-b border-border pb-2">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
        ),
        p: ({ children }) => <p className="my-4 text-muted-foreground leading-relaxed">{children}</p>,
        ul: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2 text-muted-foreground">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2 text-muted-foreground">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        code: ({ children }) => (
            <code className="rounded-md bg-muted px-1.5 py-0.5 text-sm font-mono">{children}</code>
        ),
        pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-muted/50 p-4 text-sm">
                {children}
            </pre>
        ),
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-brand pl-4 my-4 italic text-muted-foreground">
                {children}
            </blockquote>
        ),
        table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-sm">{children}</table>
            </div>
        ),
        th: ({ children }) => (
            <th className="border-b border-border bg-muted/50 px-4 py-3 text-left font-medium">{children}</th>
        ),
        td: ({ children }) => <td className="border-b border-border px-4 py-3">{children}</td>,
        a: ({ href, children }) => (
            <a href={href} className="text-brand hover:underline underline-offset-4">
                {children}
            </a>
        ),
        ...components,
    };
}
