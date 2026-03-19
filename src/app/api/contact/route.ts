import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message, company } = body;

        if (!name?.trim() || !email?.trim() || !message?.trim()) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error("RESEND_API_KEY is not set");
            return NextResponse.json(
                { error: "Email service is not configured." },
                { status: 500 }
            );
        }

        const resend = new Resend(apiKey);

        const recipient = process.env.CONTACT_EMAIL || "y.kadam2026@outlook.com";
        const fromDomain = process.env.RESEND_FROM_DOMAIN || "onboarding@resend.dev";

        const { data, error } = await resend.emails.send({
            from: `Portfolio Contact <${fromDomain}>`,
            to: [recipient],
            replyTo: [email],
            subject: `Portfolio inquiry — ${name}`,
            html: `
                <h2>New message from portfolio</h2>
                <p><strong>Name:</strong> ${escapeHtml(name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(email)}</p>
                ${company ? `<p><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
                <p><strong>Message:</strong></p>
                <pre style="white-space: pre-wrap; font-family: inherit; background: #f4f4f4; padding: 1rem; border-radius: 8px;">${escapeHtml(message)}</pre>
                <p style="color: #888; font-size: 12px;">— Sent from your portfolio contact form</p>
            `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: "Failed to send email." },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}
