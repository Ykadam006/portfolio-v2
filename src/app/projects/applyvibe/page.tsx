import type { Metadata } from "next";
import { CaseSection, CaseStudyShell, ChallengeBlock, ImprovementsCallout, WhyItMatters } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "applyvibe")!;

export const metadata: Metadata = { title: `${p.title} — Yogesh Kadam`, description: p.subtitle };

export default function ApplyVibeCaseStudy() {
    return (
        <CaseStudyShell
            title={p.title}
            subtitle={p.subtitle}
            stack={p.stack}
            metrics={p.metrics}
            live={p.links.live}
            github={p.links.github}
            architecture={p.architecture}
            archFlow={"archFlow" in p ? p.archFlow : undefined}
            slug={p.slug}
        >
            <CaseSection num="01" title="Problem">
                <p>{p.problem}</p>
                <WhyItMatters>{p.whyItMatters}</WhyItMatters>
                <p className="mt-2">
                    Students applying to hundreds of internships and full-time roles need to track stage progression, follow-up deadlines, and which sources are actually converting — not just a static list of companies. Notion templates and spreadsheets don&apos;t surface patterns or send reminders.
                </p>
            </CaseSection>

            <CaseSection num="02" title="Solution">
                <p>{p.solution}</p>
            </CaseSection>

            <CaseSection num="03" title="Architecture">
                <p><b>Frontend:</b> {p.architecture.frontend}</p>
                <p><b>Backend:</b> {p.architecture.backend}</p>
                <p><b>Infra:</b> {p.architecture.infra}</p>
                <div className="mt-4 rounded-lg bg-muted/40 border border-border p-4 font-mono text-xs text-muted-foreground leading-relaxed whitespace-pre">
{`Browser
  │
  ├── proxy.ts  (Next.js 16 Middleware — JWT check → redirect)
  │
  ├── App Routes
  │     ├── /              Landing page (static)
  │     ├── /login  /signup  Auth.js credentials
  │     ├── /dashboard     Server Component → DB fetch → DashboardClient
  │     ├── /applications  Client Component → useApplications hook
  │     ├── /kanban        Client Component → dnd-kit drag/drop
  │     ├── /analytics     Client Component → Recharts
  │     └── /settings      Client Component → profile form
  │
  ├── API Routes
  │     ├── POST   /api/register
  │     ├── GET    /api/applications
  │     ├── POST   /api/applications
  │     ├── PATCH  /api/applications/[id]
  │     ├── DELETE /api/applications/[id]
  │     ├── GET    /api/profile
  │     └── PATCH  /api/profile
  │
  └── Neon PostgreSQL  (via Prisma ORM)
        ├── User           (auth + profile)
        ├── Application    (all job data — fully wired)
        ├── ApplicationEvent  (stage history — schema ready)
        ├── Reflection        (interview notes — schema ready)
        └── Reminder          (follow-up alerts — schema ready)`}
                </div>
            </CaseSection>

            <CaseSection num="04" title="Key Features">
                <ul className="list-disc pl-5 space-y-2">
                    {p.keyFeatures.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </CaseSection>

            <CaseSection num="05" title="Authentication System">
                <p>
                    Auth is fully custom — no third-party identity providers, no vendor lock-in. Users sign up with name, email, and password (bcrypt 12 rounds). Auth.js v5 issues a JWT session on successful login.
                </p>
                <p className="mt-2">
                    Route protection runs in <code className="text-xs bg-muted px-1 py-0.5 rounded">proxy.ts</code> (Next.js 16 Middleware) — every request to <code className="text-xs bg-muted px-1 py-0.5 rounded">/dashboard</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">/kanban</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">/analytics</code>, and <code className="text-xs bg-muted px-1 py-0.5 rounded">/settings</code> is checked at the edge — unauthenticated users are redirected to <code className="text-xs bg-muted px-1 py-0.5 rounded">/login</code> before the page renders.
                </p>
                <p className="mt-2">
                    The PrismaAdapter is already wired to the Auth.js config — adding OAuth providers (GitHub, Google) in the future requires only provider configuration, not a schema change.
                </p>
            </CaseSection>

            <CaseSection num="06" title="Kanban Board">
                <p>
                    The Kanban board spans 11 columns: <b>Saved → Applied → OA → Recruiter Screen → Interview 1 → Interview 2 → Final Round → Offer → Rejected → Ghosted → Withdrawn</b>.
                </p>
                <p className="mt-2">
                    Built with <b>dnd-kit</b> using a <code className="text-xs bg-muted px-1 py-0.5 rounded">PointerSensor</code> with an 8px activation threshold. When a card is dropped, a <code className="text-xs bg-muted px-1 py-0.5 rounded">PATCH /api/applications/[id]</code> call fires immediately — UI updates optimistically so there&apos;s no visible lag.
                </p>
            </CaseSection>

            <CaseSection num="07" title="Analytics Dashboard">
                <p>The dashboard is a <b>server component</b> — data is fetched at request time from Neon PostgreSQL via Prisma, so the initial render always shows fresh data with no client loading flash.</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                    <li><b>5 KPI cards</b> — total applications, interviews, offers, rejections, response rate</li>
                    <li><b>7-day activity area chart</b> — applications submitted per day</li>
                    <li><b>Pipeline distribution donut</b> — proportion of applications at each stage</li>
                    <li><b>Source performance bars</b> — which job board produces the best response rate</li>
                    <li><b>Smart Insights engine</b> — rule-based analysis: low response rate warnings, overdue follow-ups, OA bottleneck detection</li>
                </ul>
            </CaseSection>

            <CaseSection num="08" title="Challenges &amp; Decisions">
                <div className="space-y-3">
                    <ChallengeBlock
                        number={1}
                        title="Next.js 16 renamed middleware.ts → proxy.ts"
                        problem='Route protection was silently failing — requests showed 0ms response time and a deprecation warning appeared: "middleware file convention is deprecated."'
                        fix='Renamed to proxy.ts and changed to export default (named exports also break in this convention).'
                    />
                    <ChallengeBlock
                        number={2}
                        title="Turbopack crashing in dev"
                        problem="npm run dev crashed with FATAL: An unexpected Turbopack error every few requests."
                        fix="Added --webpack flag to the dev script. Next.js 16 enables Turbopack by default; --webpack forces stable Webpack for local dev only. Production builds unaffected."
                    />
                    <ChallengeBlock
                        number={3}
                        title="Prisma generate failing on Vercel during npm install"
                        problem="Three root causes stacked: no postinstall script, Prisma's env() throwing before env vars were injected, then old commits being deployed."
                        fix='Removed postinstall entirely. Changed prisma.config.ts to use process.env.DATABASE_URL ?? "postgresql://localhost/placeholder" — prisma generate doesn&apos;t connect to the DB so a fallback URL is safe.'
                    />
                    <ChallengeBlock
                        number={4}
                        title="Analytics funnel showing wrong counts"
                        problem="The stageOrder array only had 5 stages — indexOf() returned -1 for interview_2, final_round, rejected, ghosted, withdrawn, making those applications invisible."
                        fix="Rewrote funnel logic with 7 pipeline stages and explicit handling of terminal stages — rejected/ghosted/withdrawn count in the 'applied' bucket since stage history isn't stored yet."
                    />
                    <ChallengeBlock
                        number={5}
                        title="PATCH API had no validation"
                        problem="The PATCH route built updateData from raw request body — any string could be set as currentStage (breaking DB enums), and an empty body produced a 500 from Prisma."
                        fix="Added applicationSchema.partial() Zod validation at the top of PATCH. Empty updateData returns 400. All fields validated against proper enums before touching the DB."
                    />
                    <ChallengeBlock
                        number={6}
                        title="dnd-kit DragOverlay duplicate ID bug"
                        problem="DragOverlay rendered KanbanCard which called useDraggable({ id: app.id }) — two components shared the same dnd-kit ID, causing flaky drag behavior and console warnings."
                        fix="Split into KanbanCardContent (pure JSX, no hooks) and KanbanCardOverlay (wraps content, no useDraggable). The draggable card registers the ID; the overlay is a visual clone only."
                    />
                </div>
            </CaseSection>

            <CaseSection num="09" title="Design Note">
                <p>{p.designNote}</p>
                <p className="mt-2">
                    Data models use <b>snake_case throughout frontend types</b> (<code className="text-xs bg-muted px-1 py-0.5 rounded">company_name</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">current_stage</code>) with an explicit <code className="text-xs bg-muted px-1 py-0.5 rounded">dbToApp()</code> mapping from Prisma&apos;s camelCase.
                </p>
            </CaseSection>

            <CaseSection num="10" title="Impact">
                <ul className="list-disc pl-5 space-y-2">
                    {p.impact.map((i) => (
                        <li key={i}>{i}</li>
                    ))}
                </ul>
            </CaseSection>

            {/* "What I'd Improve Next" as a featured callout — signals senior thinking */}
            <ImprovementsCallout>
                <ul className="space-y-2">
                    <li><span className="inline-flex items-center rounded-full bg-destructive/10 border border-destructive/20 px-2 py-0.5 text-[10px] font-bold text-destructive mr-2">P0</span><b>Stage history:</b> Write to <code className="text-xs bg-muted px-1 py-0.5 rounded">ApplicationEvent</code> on every Kanban drag. Schema already exists.</li>
                    <li><span className="inline-flex items-center rounded-full bg-destructive/10 border border-destructive/20 px-2 py-0.5 text-[10px] font-bold text-destructive mr-2">P0</span><b>Rate limiting:</b> Upstash Redis or Vercel Edge Config on <code className="text-xs bg-muted px-1 py-0.5 rounded">/api/register</code>.</li>
                    <li><span className="inline-flex items-center rounded-full bg-brand/10 border border-brand/20 px-2 py-0.5 text-[10px] font-bold text-brand mr-2">P1</span><b>Reflections + Reminders:</b> Schema already exists, just needs UI.</li>
                    <li><span className="inline-flex items-center rounded-full bg-brand/10 border border-brand/20 px-2 py-0.5 text-[10px] font-bold text-brand mr-2">P1</span><b>React Query / SWR:</b> Replace manual <code className="text-xs bg-muted px-1 py-0.5 rounded">useApplications</code> hook with a proper cache layer.</li>
                    <li><span className="inline-flex items-center rounded-full bg-muted border border-border px-2 py-0.5 text-[10px] font-bold text-muted-foreground mr-2">P2</span><b>OAuth:</b> GitHub and Google — PrismaAdapter already wired, just needs provider config.</li>
                    <li><span className="inline-flex items-center rounded-full bg-muted border border-border px-2 py-0.5 text-[10px] font-bold text-muted-foreground mr-2">P2</span><b>CSV export</b> + <b>Prisma enums</b> for <code className="text-xs bg-muted px-1 py-0.5 rounded">currentStage</code>/<code className="text-xs bg-muted px-1 py-0.5 rounded">source</code>.</li>
                </ul>
            </ImprovementsCallout>
        </CaseStudyShell>
    );
}
