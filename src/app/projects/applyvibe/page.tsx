import { CaseSection, CaseStudyShell } from "@/components/case-study";
import { projects } from "@/lib/site-data";

const p = projects.find((x) => x.slug === "applyvibe")!;

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
            heroPreviewUrl={p.links.live || undefined}
        >
            <CaseSection title="Problem">
                <p>{p.problem}</p>
                <p className="mt-2">
                    Students applying to hundreds of internships and full-time roles need to track stage progression, follow-up deadlines, and which sources are actually converting — not just a static list of companies. Notion templates and spreadsheets don&apos;t surface patterns or send reminders.
                </p>
            </CaseSection>

            <CaseSection title="Solution">
                <p>{p.solution}</p>
            </CaseSection>

            <CaseSection title="Architecture">
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

            <CaseSection title="Key Features">
                <ul className="list-disc pl-5 space-y-2">
                    {p.keyFeatures.map((f) => (
                        <li key={f}>{f}</li>
                    ))}
                </ul>
            </CaseSection>

            <CaseSection title="Authentication System">
                <p>
                    Auth is fully custom — no third-party identity providers, no vendor lock-in. Users sign up with name, email, and password (bcrypt 12 rounds). Auth.js v5 issues a JWT session on successful login.
                </p>
                <p className="mt-2">
                    Route protection runs in <code className="text-xs bg-muted px-1 py-0.5 rounded">proxy.ts</code> (Next.js 16 Middleware) — every request to <code className="text-xs bg-muted px-1 py-0.5 rounded">/dashboard</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">/kanban</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">/analytics</code>, and <code className="text-xs bg-muted px-1 py-0.5 rounded">/settings</code> is checked at the edge — unauthenticated users are redirected to <code className="text-xs bg-muted px-1 py-0.5 rounded">/login</code> before the page renders. Logged-in users trying to visit <code className="text-xs bg-muted px-1 py-0.5 rounded">/login</code> or <code className="text-xs bg-muted px-1 py-0.5 rounded">/signup</code> are redirected to <code className="text-xs bg-muted px-1 py-0.5 rounded">/dashboard</code>.
                </p>
                <p className="mt-2">
                    The PrismaAdapter is already wired to the Auth.js config — adding OAuth providers (GitHub, Google) in the future requires only provider configuration, not a schema change.
                </p>
            </CaseSection>

            <CaseSection title="Kanban Board">
                <p>
                    The Kanban board spans 11 columns: <b>Saved → Applied → OA → Recruiter Screen → Interview 1 → Interview 2 → Final Round → Offer → Rejected → Ghosted → Withdrawn</b>.
                </p>
                <p className="mt-2">
                    Built with <b>dnd-kit</b> using a <code className="text-xs bg-muted px-1 py-0.5 rounded">PointerSensor</code> with an 8px activation threshold (prevents accidental drags on click). When a card is dropped, a <code className="text-xs bg-muted px-1 py-0.5 rounded">PATCH /api/applications/[id]</code> call fires immediately with the new stage — the UI updates optimistically so there&apos;s no visible lag.
                </p>
                <p className="mt-2">
                    To fix a dnd-kit bug where <code className="text-xs bg-muted px-1 py-0.5 rounded">DragOverlay</code> and the source card shared the same ID (causing console warnings and flaky drag behavior), the card was split into two components: <code className="text-xs bg-muted px-1 py-0.5 rounded">KanbanCard</code> (uses <code className="text-xs bg-muted px-1 py-0.5 rounded">useDraggable</code>) and <code className="text-xs bg-muted px-1 py-0.5 rounded">KanbanCardOverlay</code> (pure JSX, no hooks). The overlay renders a visual clone without registering another ID.
                </p>
            </CaseSection>

            <CaseSection title="Analytics Dashboard">
                <p>The dashboard is a <b>server component</b> — data is fetched at request time from Neon PostgreSQL via Prisma, so the initial render always shows fresh data with no client loading flash. The heavy chart logic is delegated to a <code className="text-xs bg-muted px-1 py-0.5 rounded">DashboardClient</code> component.</p>
                <ul className="list-disc pl-5 space-y-2 mt-3">
                    <li><b>5 KPI cards</b> — total applications, interviews, offers, rejections, response rate</li>
                    <li><b>7-day activity area chart</b> — applications submitted per day, computed from real data</li>
                    <li><b>Pipeline distribution donut</b> — proportion of applications at each stage</li>
                    <li><b>Source performance bars</b> — which job board (LinkedIn, Handshake, referral, etc.) produces the best response rate for you specifically</li>
                    <li><b>Smart Insights engine</b> — rule-based analysis: low response rate warnings, overdue follow-up alerts, referral vs. LinkedIn comparison, OA bottleneck detection</li>
                </ul>
                <p className="mt-3">
                    The analytics page adds a full funnel chart (Recharts <code className="text-xs bg-muted px-1 py-0.5 rounded">FunnelChart</code>), weekly trend line (8 weeks), applications-by-stage bar chart, and a sortable source breakdown table.
                </p>
            </CaseSection>

            <CaseSection title="Challenges & Decisions">
                <div className="space-y-5">
                    <div>
                        <p className="font-medium text-foreground">1. Next.js 16 renamed middleware.ts → proxy.ts</p>
                        <p className="mt-1"><b>Problem:</b> Route protection was silently failing — requests showed 0ms response time and the deprecation warning appeared: <em>&quot;middleware&quot; file convention is deprecated. Please use &quot;proxy&quot; instead.</em></p>
                        <p className="mt-1"><b>Fix:</b> Renamed to <code className="text-xs bg-muted px-1 py-0.5 rounded">proxy.ts</code> and changed to <code className="text-xs bg-muted px-1 py-0.5 rounded">export default</code> (named exports also don&apos;t work in this convention).</p>
                    </div>
                    <div>
                        <p className="font-medium text-foreground">2. Turbopack crashing in dev</p>
                        <p className="mt-1"><b>Problem:</b> <code className="text-xs bg-muted px-1 py-0.5 rounded">npm run dev</code> crashed with <code className="text-xs bg-muted px-1 py-0.5 rounded">FATAL: An unexpected Turbopack error</code> every few requests.</p>
                        <p className="mt-1"><b>Fix:</b> Added <code className="text-xs bg-muted px-1 py-0.5 rounded">--webpack</code> flag to the dev script. Next.js 16 enables Turbopack by default; <code className="text-xs bg-muted px-1 py-0.5 rounded">--webpack</code> forces the stable Webpack bundler for local dev only. Production builds are unaffected.</p>
                    </div>
                    <div>
                        <p className="font-medium text-foreground">3. Prisma generate failing on Vercel during npm install</p>
                        <p className="mt-1"><b>Problem:</b> Three root causes stacked — no <code className="text-xs bg-muted px-1 py-0.5 rounded">postinstall</code> script, then Prisma&apos;s <code className="text-xs bg-muted px-1 py-0.5 rounded">env(&quot;DATABASE_URL&quot;)</code> threw during install before env vars were injected, then old commits being deployed from the dashboard.</p>
                        <p className="mt-1"><b>Fix:</b> Removed <code className="text-xs bg-muted px-1 py-0.5 rounded">postinstall</code> entirely. Changed <code className="text-xs bg-muted px-1 py-0.5 rounded">prisma.config.ts</code> to <code className="text-xs bg-muted px-1 py-0.5 rounded">process.env.DATABASE_URL ?? &quot;postgresql://localhost/placeholder&quot;</code> — <code className="text-xs bg-muted px-1 py-0.5 rounded">prisma generate</code> doesn&apos;t connect to the DB so a fallback URL is safe. Generation now runs only in the <code className="text-xs bg-muted px-1 py-0.5 rounded">build</code> script where env vars are available.</p>
                    </div>
                    <div>
                        <p className="font-medium text-foreground">4. Analytics funnel showing wrong counts</p>
                        <p className="mt-1"><b>Problem:</b> The funnel <code className="text-xs bg-muted px-1 py-0.5 rounded">stageOrder</code> array only had 5 stages — <code className="text-xs bg-muted px-1 py-0.5 rounded">indexOf()</code> returned <code className="text-xs bg-muted px-1 py-0.5 rounded">-1</code> for interview_2, final_round, saved, rejected, ghosted, and withdrawn, making those applications invisible in the funnel.</p>
                        <p className="mt-1"><b>Fix:</b> Rewrote funnel logic with 7 pipeline stages and explicit handling of terminal stages — rejected/ghosted/withdrawn count in the &quot;applied&quot; bucket since stage history isn&apos;t stored yet.</p>
                    </div>
                    <div>
                        <p className="font-medium text-foreground">5. PATCH API had no validation</p>
                        <p className="mt-1"><b>Problem:</b> The PATCH route built <code className="text-xs bg-muted px-1 py-0.5 rounded">updateData</code> from raw request body — any string could be set as <code className="text-xs bg-muted px-1 py-0.5 rounded">currentStage</code> (breaking DB enums), and an empty body produced a 500 from Prisma.</p>
                        <p className="mt-1"><b>Fix:</b> Added <code className="text-xs bg-muted px-1 py-0.5 rounded">applicationSchema.partial()</code> Zod validation at the top of PATCH. Empty <code className="text-xs bg-muted px-1 py-0.5 rounded">updateData</code> returns 400. All fields validated against proper enums before touching the DB.</p>
                    </div>
                    <div>
                        <p className="font-medium text-foreground">6. dnd-kit DragOverlay duplicate ID bug</p>
                        <p className="mt-1"><b>Problem:</b> <code className="text-xs bg-muted px-1 py-0.5 rounded">DragOverlay</code> rendered <code className="text-xs bg-muted px-1 py-0.5 rounded">KanbanCard</code> which called <code className="text-xs bg-muted px-1 py-0.5 rounded">useDraggable(&#123; id: app.id &#125;)</code> — two components shared the same dnd-kit ID, causing flaky drag behavior and console warnings.</p>
                        <p className="mt-1"><b>Fix:</b> Split into <code className="text-xs bg-muted px-1 py-0.5 rounded">KanbanCardContent</code> (pure JSX, no hooks) and <code className="text-xs bg-muted px-1 py-0.5 rounded">KanbanCardOverlay</code> (wraps content, no <code className="text-xs bg-muted px-1 py-0.5 rounded">useDraggable</code>). The draggable card registers the ID; the overlay is a visual clone only.</p>
                    </div>
                </div>
            </CaseSection>

            <CaseSection title="Design Note">
                <p>{p.designNote}</p>
                <p className="mt-2">
                    Data models use <b>snake_case throughout frontend types</b> (<code className="text-xs bg-muted px-1 py-0.5 rounded">company_name</code>, <code className="text-xs bg-muted px-1 py-0.5 rounded">current_stage</code>) with an explicit <code className="text-xs bg-muted px-1 py-0.5 rounded">dbToApp()</code> mapping from Prisma&apos;s camelCase — keeps frontend code readable and consistent with what engineers expect in a job-tracking domain.
                </p>
            </CaseSection>

            <CaseSection title="Impact">
                <ul className="list-disc pl-5 space-y-2">
                    {p.impact.map((i) => (
                        <li key={i}>{i}</li>
                    ))}
                </ul>
            </CaseSection>

            <CaseSection title="What I'd Improve Next">
                <ul className="list-disc pl-5 space-y-2">
                    <li><b>P0 — Stage history:</b> Write to <code className="text-xs bg-muted px-1 py-0.5 rounded">ApplicationEvent</code> on every Kanban drag. Powers a real timeline view per application. Schema already exists.</li>
                    <li><b>P0 — Rate limiting:</b> Add Upstash Redis or Vercel Edge Config to <code className="text-xs bg-muted px-1 py-0.5 rounded">/api/register</code> to prevent bot signups.</li>
                    <li><b>P1 — Reflections:</b> Post-interview notes form per application. Schema already exists, just needs UI.</li>
                    <li><b>P1 — Reminders:</b> Scheduled follow-up alerts via cron + email/push. Schema already exists.</li>
                    <li><b>P1 — React Query / SWR:</b> Replace the manual <code className="text-xs bg-muted px-1 py-0.5 rounded">useApplications</code> hook with a proper cache layer to avoid re-fetching on every page navigation.</li>
                    <li><b>P2 — OAuth:</b> GitHub and Google login. PrismaAdapter is already wired — just needs provider config.</li>
                    <li><b>P2 — CSV export:</b> One-click download of all applications.</li>
                    <li><b>P2 — Prisma enums:</b> Replace <code className="text-xs bg-muted px-1 py-0.5 rounded">String</code> fields for <code className="text-xs bg-muted px-1 py-0.5 rounded">currentStage</code> and <code className="text-xs bg-muted px-1 py-0.5 rounded">source</code> with proper Prisma enums to enforce valid values at the DB level.</li>
                    <li><b>P3 — PWA:</b> Add <code className="text-xs bg-muted px-1 py-0.5 rounded">manifest.json</code> and service worker so users can install it on their phone.</li>
                </ul>
            </CaseSection>
        </CaseStudyShell>
    );
}
