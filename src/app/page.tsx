import { Hero } from "@/components/hero";
import { Journey } from "@/components/journey";
import { WorkIndex } from "@/components/work-index";
import { Principles } from "@/components/principles";
import { ContactDisplay } from "@/components/contact-display";
import { site } from "@/lib/site-data";

/* Opening titles, first landing of a session only. Runs before the hero is
   parsed, so the name starts behind its masks with no flash; any scroll, key,
   click or touch ends it. A script React renders on the client never runs, so
   arriving here by a link inside the site never replays it. */
const INTRO = `try{var d=document.documentElement,s=sessionStorage;if(!s.getItem("yk-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){s.setItem("yk-intro","1");d.setAttribute("data-intro","");var e=["pointerdown","keydown","wheel","touchstart"],f=function(){d.removeAttribute("data-intro");e.forEach(function(n){removeEventListener(n,f)})};e.forEach(function(n){addEventListener(n,f,{passive:true})});setTimeout(f,4000)}}catch(_){}`;

export default function HomePage() {
    const [first, ...rest] = site.summary.split(". ");

    return (
        <>
            <script dangerouslySetInnerHTML={{ __html: INTRO }} />
            <Hero />

            {/* The steps so far — Pune to Chicago */}
            <section aria-labelledby="journey-heading" className="section">
                <div className="frame grid gap-x-6 gap-y-6 lg:grid-cols-12">
                    <h2 id="journey-heading" className="h2 lg:col-span-4">
                        Every step so far
                    </h2>
                    <div className="lg:col-span-7 lg:col-start-6">
                        <p className="lead text-foreground">{first}.</p>
                        <p className="p mt-5 text-muted-foreground">{rest.join(". ")}</p>
                    </div>
                </div>
                <div className="frame mt-16 lg:mt-24">
                    <Journey />
                </div>
            </section>

            {/* Work — the cobalt field. A title card first: a lone sun dot on the
                page, and the field opens out of it like an iris (globals.css). */}
            <section aria-labelledby="work-heading" className="iris relative bg-field text-field-foreground">
                <span aria-hidden className="iris-sun absolute rounded-full border-2 border-sun-foreground bg-sun" />
                <div className="frame flex min-h-[80svh] items-end pb-10 sm:pb-14">
                    <h2 id="work-heading" className="display text-[clamp(5rem,17vw,16rem)]">
                        Work
                    </h2>
                </div>
                <div className="frame pb-24 sm:pb-32">
                    <WorkIndex />
                </div>
            </section>

            <section className="section">
                <div className="frame">
                    <Principles />
                </div>
            </section>

            <ContactDisplay curtain />
        </>
    );
}
