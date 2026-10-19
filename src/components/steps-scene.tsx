"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

/** An HSL token from :root, in the comma syntax three.js Color understands. */
function token(name: string) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(name).split("/")[0].trim();
    return `hsl(${raw.replace(/\s+/g, ", ")})`;
}

const HOP = 0.55; // seconds in the air between steps
const REST = 0.4; // seconds standing on each step

/* The camera: it opens on a three-quarter view from the foot of the stairs
   and, as the hero is scrolled, swings round to face them and down to eye
   level, where they flatten into the same profile the journey below is drawn
   in, rising left to right. */
const FROM = -Math.atan2(7, 9);
const LIFT = Math.atan2(5.6, Math.hypot(7, 9));
const DIST = Math.hypot(7, 5.6, 9);

/* Opening titles: the steps rise from the floor one after another, then the
   request drops onto the first one. */
const BUILD = 0.08; // stagger between steps
const GROW = 0.55; // each step's rise
const DROP = 0.45; // the request's fall

/**
 * Kadam — "a step". The stack drawn as a staircase in line-and-tone, one step
 * per layer (first: frontend, top: ops), with a sun-yellow request climbing
 * them one step at a time. `active` lights a step from the HTML list beside it.
 * Scrolling walks the request up and swings the camera round to the profile.
 *
 * Decorative and aria-hidden: the list next to it carries the information.
 * three.js loads after the page is idle, the loop pauses offscreen and in
 * background tabs, and reduced motion gets a single still frame.
 */
export function StepsScene({
    count,
    active,
    scroll,
    onStep,
    className = "",
}: {
    count: number;
    active: number | null;
    /** 0–1 as the hero is scrolled; above 0 the request is walked up by the scroll instead of by the clock, and the camera cranes round. */
    scroll?: React.RefObject<number>;
    /** Called when the scroll-driven request lands on a new step (or leaves the walk: null). */
    onStep?: (step: number | null) => void;
    className?: string;
}) {
    const host = useRef<HTMLDivElement>(null);
    const activeRef = useRef<number | null>(active);
    const onStepRef = useRef(onStep);
    onStepRef.current = onStep;
    const redraw = useRef<() => void>(() => {});
    const reduced = useReducedMotion();

    useEffect(() => {
        activeRef.current = active;
        redraw.current();
    }, [active]);

    useEffect(() => {
        const el = host.current;
        if (!el) return;
        let disposed = false;
        let teardown = () => {};

        const start = async () => {
            const THREE = await import("three");
            const { LineSegments2 } = await import("three/examples/jsm/lines/LineSegments2.js");
            const { LineSegmentsGeometry } = await import("three/examples/jsm/lines/LineSegmentsGeometry.js");
            const { LineMaterial } = await import("three/examples/jsm/lines/LineMaterial.js");
            if (disposed) return;

            let renderer: InstanceType<typeof THREE.WebGLRenderer>;
            try {
                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            } catch {
                return; // no WebGL — the list beside the scene still says everything
            }
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            el.appendChild(renderer.domElement);
            renderer.domElement.style.display = "block";
            /* Opening titles build the steps from nothing; otherwise the scene fades in rather than popping. */
            let introAt = !reduced && document.documentElement.hasAttribute("data-intro") ? performance.now() : -1;
            if (introAt < 0 && !reduced) {
                renderer.domElement.style.opacity = "0";
                renderer.domElement.style.transition = "opacity 300ms ease-out";
                requestAnimationFrame(() => requestAnimationFrame(() => (renderer.domElement.style.opacity = "1")));
            }

            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 100);

            /* Steps: W wide, D deep, each one R higher than the last. */
            const W = 1.15, D = 2.4, R = 0.46;
            const group = new THREE.Group();
            scene.add(group);

            const faceTop = new THREE.MeshBasicMaterial({ polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
            const faceFront = faceTop.clone();
            const faceSide = faceTop.clone();
            const lit = faceTop.clone();
            const lineMat = new LineMaterial({ linewidth: 1.6, worldUnits: false });

            const tops: { mesh: InstanceType<typeof THREE.Mesh>; seg: InstanceType<typeof LineSegments2>; h: number; at: InstanceType<typeof THREE.Vector3> }[] = [];
            const geoms: { dispose(): void }[] = [];
            for (let i = 0; i < count; i++) {
                const h = (i + 1) * R;
                const box = new THREE.BoxGeometry(W, h, D);
                geoms.push(box);
                // Face order: +x, -x, +y, -y, +z, -z — the camera sees -x (the risers), +y, +z.
                const mesh = new THREE.Mesh(box, [faceSide, faceSide, faceTop, faceTop, faceFront, faceFront]);
                mesh.position.set(i * W, h / 2, 0);
                group.add(mesh);

                const edges = new THREE.EdgesGeometry(box);
                const lines = new LineSegmentsGeometry().fromEdgesGeometry(edges);
                edges.dispose();
                geoms.push(lines);
                const seg = new LineSegments2(lines, lineMat);
                seg.position.copy(mesh.position);
                group.add(seg);

                tops.push({ mesh, seg, h, at: new THREE.Vector3(i * W, h, 0) });
            }
            group.position.set(-((count - 1) * W) / 2, -(count * R) / 2, 0);

            /* The request: a flat sun disc with an ink rim (back-face outline). */
            const dotGeo = new THREE.SphereGeometry(0.17, 32, 16);
            const rimGeo = new THREE.SphereGeometry(0.205, 32, 16);
            geoms.push(dotGeo, rimGeo);
            const dotMat = new THREE.MeshBasicMaterial();
            const rimMat = new THREE.MeshBasicMaterial({ side: THREE.BackSide });
            const dot = new THREE.Mesh(dotGeo, dotMat);
            dot.add(new THREE.Mesh(rimGeo, rimMat));
            group.add(dot);

            const paint = () => {
                faceTop.color.setStyle(token("--card"));
                faceFront.color.setStyle(token("--background"));
                faceSide.color.setStyle(token("--muted"));
                lit.color.setStyle(token("--sun"));
                lineMat.color.setStyle(token("--brand"));
                dotMat.color.setStyle(token("--sun"));
                rimMat.color.setStyle(token("--foreground"));
            };
            paint();

            let aspect = 1;
            const fit = () => {
                const w = el.clientWidth, h = el.clientHeight;
                if (!w || !h) return;
                renderer.setSize(w, h, false);
                renderer.domElement.style.width = `${w}px`;
                renderer.domElement.style.height = `${h}px`;
                aspect = w / h;
                lineMat.resolution.set(w, h);
            };
            fit();

            /* Framing: wherever the camera is on its crane, the staircase (and
               the air the request hops through) is fitted and centred in frame. */
            const corners: InstanceType<typeof THREE.Vector3>[] = [];
            for (const x of [-W / 2, (count - 1) * W + W / 2])
                for (const y of [0, count * R + 0.9])
                    for (const z of [-D / 2, D / 2]) corners.push(new THREE.Vector3(x, y, z).add(group.position));
            const v = new THREE.Vector3();
            const aim = (p: number) => {
                const o = p * p * (3 - 2 * p);
                const theta = FROM * (1 - o);
                const phi = LIFT * (1 - o);
                camera.position.set(DIST * Math.cos(phi) * Math.sin(theta), DIST * Math.sin(phi), DIST * Math.cos(phi) * Math.cos(theta));
                camera.lookAt(0, 0, 0);
                camera.updateMatrixWorld();
                let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
                for (const c of corners) {
                    v.copy(c).applyMatrix4(camera.matrixWorldInverse);
                    x0 = Math.min(x0, v.x); x1 = Math.max(x1, v.x);
                    y0 = Math.min(y0, v.y); y1 = Math.max(y1, v.y);
                }
                let hw = ((x1 - x0) / 2) * 1.08, hh = ((y1 - y0) / 2) * 1.08;
                if (hw / hh > aspect) hh = hw / aspect;
                else hw = hh * aspect;
                const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
                camera.left = cx - hw;
                camera.right = cx + hw;
                camera.top = cy + hh;
                camera.bottom = cy - hh;
                camera.updateProjectionMatrix();
            };

            /* Where the request is, t seconds into its loop. */
            const cycle = count * (HOP + REST);
            const place = (t: number) => {
                const k = Math.floor(t / (HOP + REST));
                const u = t - k * (HOP + REST);
                const from = tops[k].at;
                const to = tops[Math.min(k + 1, count - 1)].at;
                const last = k === count - 1;
                const s = u < REST || last ? 0 : (u - REST) / HOP;
                const e = s * s * (3 - 2 * s);
                dot.position.set(from.x + (to.x - from.x) * e, from.y + (to.y - from.y) * e + Math.sin(Math.PI * s) * 0.55 + 0.21, 0);
                // On the top step it shrinks away, and grows back on the first one.
                const scale = last ? Math.max(0.001, 1 - Math.max(0, u - REST) / HOP) : k === 0 && u < 0.2 ? u / 0.2 : 1;
                dot.scale.setScalar(scale);
            };

            const pointer = { x: 0, y: 0 };
            const tilt = { x: 0, y: 0 };
            const onMove = (e: PointerEvent) => {
                pointer.x = e.clientX / window.innerWidth - 0.5;
                pointer.y = e.clientY / window.innerHeight - 0.5;
            };

            /* Scroll walk: the request rests on each step for 30% of its share of
               the scroll and hops for the rest, landing on the top step at 1. */
            let lastStep: number | null = null;
            const walk = (p: number) => {
                const hops = count - 1;
                const k = Math.min(Math.floor(p * hops), hops - 1);
                const u = p * hops - k;
                const s = u < 0.3 ? 0 : (u - 0.3) / 0.7;
                const e = s * s * (3 - 2 * s);
                const from = tops[k].at, to = tops[k + 1].at;
                dot.position.set(from.x + (to.x - from.x) * e, from.y + (to.y - from.y) * e + Math.sin(Math.PI * s) * 0.55 + 0.21, 0);
                dot.scale.setScalar(1);
                return s > 0.5 ? k + 1 : k;
            };

            /* The opening build: each step grows from the floor, then the request falls onto the first one. */
            const introLength = (count - 1) * BUILD + GROW + DROP;
            let loopFrom = 0; // clock time the hop loop counts from
            const build = (u: number) => {
                tops.forEach((s, i) => {
                    const k = Math.min(1, Math.max(0, (u - i * BUILD) / GROW));
                    const e = Math.max(0.001, 1 - (1 - k) ** 3);
                    s.mesh.scale.y = s.seg.scale.y = e;
                    s.mesh.position.y = s.seg.position.y = (s.h * e) / 2;
                });
                const k = Math.min(1, Math.max(0, (u - (count - 1) * BUILD - GROW) / DROP));
                const first = tops[0].at;
                dot.position.set(first.x, first.y + 0.21 + (1 - k) ** 2 * 1.6, 0);
                dot.scale.setScalar(k > 0 ? 1 : 0.001);
            };

            /* The camera operator: eases toward the scroll position, so a wheel's steps glide. */
            let eased = 0;
            let last = performance.now();
            const draw = (t: number) => {
                const now = performance.now();
                const target = Math.min(scroll?.current ?? 0, 1);
                eased = raf ? eased + (target - eased) * (1 - Math.pow(0.88, ((now - last) / 1000) * 60)) : target;
                last = now;
                if (Math.abs(target - eased) < 0.0005) eased = target;
                const p = eased;
                if (introAt >= 0 && (p > 0.002 || !document.documentElement.hasAttribute("data-intro") || now - introAt > introLength * 1000)) {
                    introAt = -1; // finished, or skipped by scrolling, a key or a click
                    build(introLength);
                    loopFrom = t - 0.2;
                }
                const step = p > 0.002 ? walk(p) : null;
                if (step !== lastStep) {
                    lastStep = step;
                    onStepRef.current?.(step);
                }
                const lightUp = step ?? activeRef.current;
                tops.forEach((s, i) => {
                    const mats = s.mesh.material as InstanceType<typeof THREE.MeshBasicMaterial>[];
                    mats[2] = mats[3] = i === lightUp ? lit : faceTop;
                });
                if (introAt >= 0) build((now - introAt) / 1000);
                else if (step === null) place((((t - loopFrom) % cycle) + cycle) % cycle);
                aim(p);
                if (!reduced) {
                    tilt.x += (pointer.y * 0.08 - tilt.x) * 0.06;
                    tilt.y += (pointer.x * 0.18 - tilt.y) * 0.06;
                    group.rotation.set(tilt.x, tilt.y, 0);
                }
                renderer.render(scene, camera);
            };

            const clock = new THREE.Clock();
            let raf = 0;
            let visible = false;
            const loop = () => {
                raf = requestAnimationFrame(loop);
                draw(clock.getElapsedTime());
            };
            const play = () => {
                if (reduced || raf || !visible || document.hidden) return;
                clock.start();
                loop();
            };
            const pause = () => {
                cancelAnimationFrame(raf);
                raf = 0;
            };
            /* Still frame for reduced motion: the request resting on the first step. */
            const still = () => draw(REST / 2);
            redraw.current = () => (reduced || !raf ? still() : undefined);

            const io = new IntersectionObserver(([entry]) => {
                visible = entry.isIntersecting;
                if (visible) play();
                else pause();
            });
            io.observe(el);
            const ro = new ResizeObserver(() => {
                fit();
                if (!raf) still();
            });
            ro.observe(el);
            const onVisibility = () => (document.hidden ? pause() : play());
            document.addEventListener("visibilitychange", onVisibility);
            const mo = new MutationObserver(() => {
                paint();
                if (!raf) still();
            });
            mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
            if (!reduced) window.addEventListener("pointermove", onMove, { passive: true });
            still();

            teardown = () => {
                pause();
                io.disconnect();
                ro.disconnect();
                mo.disconnect();
                document.removeEventListener("visibilitychange", onVisibility);
                window.removeEventListener("pointermove", onMove);
                geoms.forEach((g) => g.dispose());
                [faceTop, faceFront, faceSide, lit, lineMat, dotMat, rimMat].forEach((m) => m.dispose());
                renderer.dispose();
                renderer.domElement.remove();
                redraw.current = () => {};
            };
        };

        const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
        const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
        const handle = idle(() => void start());

        return () => {
            disposed = true;
            cancelIdle(handle);
            teardown();
        };
    }, [count, reduced, scroll]);

    return <div ref={host} aria-hidden="true" className={className} />;
}
