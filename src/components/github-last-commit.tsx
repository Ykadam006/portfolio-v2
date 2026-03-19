export type GitHubCommit = { message: string; repo: string; createdAt: string } | null;

export async function fetchLastCommit(): Promise<GitHubCommit> {
    try {
        const res = await fetch("https://api.github.com/users/Ykadam006/events?per_page=10", {
            headers: { Accept: "application/vnd.github.v3+json" },
            next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        const events = await res.json();
        const push = events.find((e: { type: string }) => e.type === "PushEvent");
        if (!push?.payload?.commits?.[0]) return null;
        const commit = push.payload.commits[0];
        const repo = push.repo?.name?.replace("Ykadam006/", "") ?? "repo";
        return { message: commit.message, repo, createdAt: push.created_at ?? "" };
    } catch {
        return null;
    }
}

export function timeAgo(iso: string): string {
    const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (secs < 60) return "just now";
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
}
