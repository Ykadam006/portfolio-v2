import { projectBySlug } from "@/lib/site-data";

/**
 * A project's picture. Projects with a real screenshot show it; the backend
 * ones show a line drawing of the mechanism their case study is about — the
 * honest picture of work that has no screen worth framing. One treatment for
 * every photograph on the site: greyscale. Drawings take currentColor, with
 * sun yellow on the one thing each story is about.
 */
export function ProjectArt({
    slug,
    tone = "plain",
    priority = false,
    className = "",
}: {
    slug: string;
    /** "field" sits on the cobalt field: beige lines, screenshots as a cobalt duotone. */
    tone?: "plain" | "field";
    priority?: boolean;
    className?: string;
}) {
    const p = projectBySlug(slug);
    if (p.shot) {
        return (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
                src={`/projects/${slug}.webp`}
                alt={`${p.title} interface`}
                width={1440}
                height={810}
                loading={priority ? "eager" : "lazy"}
                fetchPriority={priority ? "high" : undefined}
                className={`h-full w-full object-cover object-top grayscale transition-[filter] duration-300 ${
                    tone === "field" ? "mix-blend-luminosity" : "group-hover:grayscale-0"
                } ${className}`}
            />
        );
    }
    const Drawing = DRAWINGS[slug];
    return (
        <svg
            viewBox="0 0 400 300"
            role="img"
            aria-label={`${p.title}: ${p.kind.toLowerCase()}, drawn`}
            className={`h-full w-full ${tone === "field" ? "text-field-foreground/80" : "text-brand"} ${className}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {Drawing && <Drawing />}
        </svg>
    );
}

const SUN = "hsl(var(--sun))";
const INK = "hsl(var(--sun-foreground))";

const Cursor = ({ x, y }: { x: number; y: number }) => (
    <path d="M0 0v20l5.5-5 4 9 3.5-1.5-4-8.5h7.5z" transform={`translate(${x} ${y})`} fill="currentColor" stroke="none" />
);

const DRAWINGS: Record<string, () => React.ReactElement> = {
    /* A board; one card mid-drag in sun, its snapshot left behind dashed, a rollback arrow home. */
    orbitdesk: () => (
        <>
            {[40, 150, 260].map((x) => (
                <g key={x}>
                    <rect x={x} y={50} width={100} height={210} rx={6} />
                    <path d={`M${x + 14} 72h40`} />
                </g>
            ))}
            {[92, 172].map((y) => <rect key={y} x={52} y={y} width={76} height={30} rx={4} />)}
            <rect x={52} y={132} width={76} height={30} rx={4} strokeDasharray="5 6" />
            {[92, 132].map((y) => <rect key={y} x={162} y={y} width={76} height={30} rx={4} />)}
            <rect x={272} y={92} width={76} height={30} rx={4} />
            <path d="M158 205c-20 22-58 22-74-24" strokeDasharray="4 6" />
            <path d="M78 190l6-10 9 7" />
            <rect x={150} y={170} width={76} height={30} rx={4} transform="rotate(-8 188 185)" fill={SUN} stroke={INK} />
            <Cursor x={214} y={190} />
            <Cursor x={300} y={150} />
        </>
    ),
    /* Words in, a gate of rules, three routes out — the one rules chose in sun. */
    bridgecare: () => (
        <>
            <path d="M30 100a10 10 0 0 1 10-10h90a10 10 0 0 1 10 10v50a10 10 0 0 1-10 10H70l-18 16v-16H40a10 10 0 0 1-10-10z" />
            {[110, 125, 140].map((y, i) => <path key={y} d={`M48 ${y}h${[70, 56, 64][i]}`} />)}
            <path d="M146 130h22" />
            <path d="M162 124l8 6-8 6" />
            <rect x={176} y={70} width={52} height={160} rx={6} />
            {[94, 118, 142, 166, 190, 214].map((y) => <path key={y} d={`M186 ${y}h32`} />)}
            <path d="M228 150c40 0 50-60 92-60M228 150h92M228 150c40 0 50 60 92 60" />
            <circle cx={338} cy={90} r={16} />
            <circle cx={338} cy={150} r={16} fill={SUN} stroke={INK} />
            <circle cx={338} cy={210} r={16} />
        </>
    ),
    /* Noisy spikes on the left, every alert folding into one incident and its timeline. */
    sentinelmesh: () => (
        <>
            <path d="M24 200h20l8-60 10 60h18l8-90 10 90h16l8-50 10 50h20" />
            {[52, 88, 124].map((x, i) => <path key={x} d={`M${x} ${[140, 110, 150][i]}L214 150`} strokeDasharray="3 7" />)}
            <circle cx={240} cy={150} r={26} fill={SUN} stroke={INK} />
            <path d="M266 150h112" />
            {[292, 318, 344, 370].map((x) => <circle key={x} cx={x} cy={150} r={5} fill="currentColor" />)}
            <path d="M24 240h120" strokeOpacity={0.4} />
        </>
    ),
    /* A claim walks through state gates; one illegal turn is stopped; its event leaves by the outbox. */
    claimforge: () => (
        <>
            <path d="M30 108h40l14 14v58H30z" />
            <path d="M70 108v14h14" />
            {[134, 148, 162].map((y) => <path key={y} d={`M40 ${y}h32`} />)}
            <path d="M92 144h282" />
            {[140, 204, 268, 332].map((x) => <rect key={x} x={x} y={114} width={10} height={60} rx={2} />)}
            <path d="M209 114l40-52" strokeDasharray="4 6" />
            <path d="M242 46l18 18M260 46l-18 18" strokeWidth={3.5} />
            <rect x={196} y={214} width={60} height={40} rx={4} />
            <path d="M226 174v40" strokeDasharray="4 6" />
            <path d="M256 234h66" />
            <rect x={322} y={220} width={44} height={30} rx={3} fill={SUN} stroke={INK} />
            <path d="M322 222l22 15 22-15" stroke={INK} />
        </>
    ),
    /* Two roles meeting at one shared board. */
    iscp: () => (
        <>
            <rect x={150} y={70} width={100} height={160} rx={6} />
            {[100, 130, 160, 190].map((y) => <path key={y} d={`M166 ${y}h68`} />)}
            <rect x={160} y={150} width={80} height={20} rx={3} fill={SUN} stroke={INK} />
            {[70, 330].map((cx) => (
                <g key={cx}>
                    <circle cx={cx} cy={118} r={18} />
                    <path d={`M${cx - 32} 196c0-30 14-46 32-46s32 16 32 46`} />
                </g>
            ))}
            <path d="M104 150h40M256 150h40" strokeDasharray="4 6" />
        </>
    ),
};
