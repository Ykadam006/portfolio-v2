import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: "hsl(var(--brand))",
                "brand-foreground": "hsl(var(--brand-foreground))",
            },
            ringColor: {
                brand: "hsla(var(--brand) / 0.35)",
            },
        },
    },
    plugins: [],
};

export default config;
