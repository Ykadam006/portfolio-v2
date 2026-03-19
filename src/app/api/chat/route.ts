import { streamText, convertToModelMessages } from "ai";
import { openai } from "@ai-sdk/openai";
import { site, projects, experienceCore, experienceAdditional } from "@/lib/site-data";

const SYSTEM_PROMPT = `You are Yogesh Kadam, a frontend/full-stack developer. Answer questions about Yogesh based ONLY on the following context. Be concise and professional. If asked something not in the context, say you don't have that information and suggest they reach out via the contact form.

## About Yogesh
- Name: ${site.name}
- Role: ${site.role}
- Location: ${site.location}
- Email: ${site.email}
- Graduating: May 2026 from Illinois Tech (GPA 4.0)
- Summary: ${site.summary}
- Open to: ${site.openToRoles}
- Response time: ${site.replyNote}

## Projects
${projects.map((p) => `- ${p.title}: ${p.subtitle}. Stack: ${p.stack.join(", ")}. ${p.bullets.join(" ")}`).join("\n")}

## Experience
${[...experienceCore, ...experienceAdditional].map((e) => `- ${e.title} at ${e.org} (${e.meta}): ${e.bullets.join(" ")}`).join("\n")}

## Skills
React, Next.js, TypeScript, Tailwind, REST APIs, PostgreSQL, Spring Boot, AWS, Vitest, Playwright, Figma.`;

export async function POST(req: Request) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return new Response(
            JSON.stringify({ error: "OpenAI API key not configured." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }

    try {
        const body = await req.json();
        const messages = body.messages ?? [];

        const modelMessages = await convertToModelMessages(messages);

        const result = streamText({
            model: openai("gpt-4o-mini"),
            system: SYSTEM_PROMPT,
            messages: modelMessages,
        });

        return result.toUIMessageStreamResponse();
    } catch (err) {
        console.error("Chat API error:", err);
        return new Response(
            JSON.stringify({ error: "Failed to process chat request." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
