export type ContributionDay = {
    date: string;
    count: number;
};

export type ContributionsData = {
    days: ContributionDay[];
    total: number;
} | null;

const QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function fetchContributions(): Promise<ContributionsData> {
    const token = process.env.GITHUB_TOKEN;
    if (!token) return null;

    const now = new Date();
    const from = new Date(now);
    from.setFullYear(now.getFullYear() - 1);

    try {
        const res = await fetch("https://api.github.com/graphql", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: QUERY,
                variables: {
                    username: "Ykadam006",
                    from: from.toISOString(),
                    to: now.toISOString(),
                },
            }),
            next: { revalidate: 21600 }, // revalidate every 6 hours
        });

        if (!res.ok) return null;

        const json = await res.json();
        const calendar =
            json?.data?.user?.contributionsCollection?.contributionCalendar;
        if (!calendar) return null;

        const days: ContributionDay[] = [];
        for (const week of calendar.weeks) {
            for (const day of week.contributionDays) {
                days.push({ date: day.date, count: day.contributionCount });
            }
        }

        return { days, total: calendar.totalContributions };
    } catch {
        return null;
    }
}
