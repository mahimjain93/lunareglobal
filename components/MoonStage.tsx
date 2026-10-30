"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Starfield from "./Starfield";

gsap.registerPlugin(ScrollTrigger);

/**
 * A moon state for each section of the page. `x`/`y` are the moon's centre as
 * a fraction of the viewport; `shade` is the shadow overlay (1 = mostly dark),
 * `glow`/`light` drive the halo and ambient sky lighting.
 */
type MoonState = {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  shade: number;
  glow: number;
  light: number;
  horizon: number;
  scrim: number;
  orbit: number;
};

// Order matches the sections in the page: hero, about, services, process, why, contact.
const DESKTOP: MoonState[] = [
  { x: 0.5, y: 1.0, scale: 0.95, opacity: 1, shade: 0.62, glow: 0.45, light: 0.25, horizon: 1, scrim: 0, orbit: 0 },
  { x: 0.72, y: 0.58, scale: 0.98, opacity: 0.92, shade: 0.45, glow: 0.55, light: 0.45, horizon: 0, scrim: 0.6, orbit: 0 },
  { x: 0.77, y: 0.52, scale: 1.16, opacity: 0.95, shade: 0.28, glow: 0.75, light: 0.7, horizon: 0, scrim: 1, orbit: 0 },
  { x: 0.75, y: 0.5, scale: 1.0, opacity: 1, shade: 0.12, glow: 0.85, light: 0.8, horizon: 0, scrim: 1, orbit: 1 },
  { x: 0.76, y: 0.5, scale: 1.04, opacity: 1, shade: 0, glow: 1, light: 1, horizon: 0, scrim: 1, orbit: 0 },
  { x: 0.5, y: 0.34, scale: 0.6, opacity: 1, shade: 0, glow: 1, light: 0.9, horizon: 0, scrim: 0, orbit: 0 },
];

// Below 1024px the moon stays centred and sits behind the copy, dimmed.
const MOBILE: MoonState[] = [
  { x: 0.5, y: 0.98, scale: 1.0, opacity: 1, shade: 0.6, glow: 0.45, light: 0.25, horizon: 1, scrim: 0, orbit: 0 },
  { x: 0.5, y: 0.62, scale: 1.0, opacity: 0.5, shade: 0.55, glow: 0.5, light: 0.4, horizon: 0, scrim: 1, orbit: 0 },
  { x: 0.5, y: 0.5, scale: 1.12, opacity: 0.4, shade: 0.3, glow: 0.65, light: 0.6, horizon: 0, scrim: 1, orbit: 0 },
  { x: 0.5, y: 0.5, scale: 1.05, opacity: 0.4, shade: 0.15, glow: 0.75, light: 0.7, horizon: 0, scrim: 1, orbit: 0.6 },
  { x: 0.5, y: 0.48, scale: 1.0, opacity: 0.45, shade: 0, glow: 0.9, light: 0.85, horizon: 0, scrim: 1, orbit: 0 },
  { x: 0.5, y: 0.2, scale: 0.5, opacity: 0.95, shade: 0, glow: 0.9, light: 0.8, horizon: 0, scrim: 0, orbit: 0 },
];

// Reduced-motion composition: the moon rests at the right edge, clear of copy.
const STATIC_DESKTOP: MoonState = { ...DESKTOP[4], x: 0.9, y: 0.55, scale: 0.95 };

const SECTION_IDS = ["top", "about", "services", "process", "why", "contact"];
// Where (as a fraction of viewport height) each section's top sits when its
// keyframe lands. The closing state lands late so the moon leaves "Why" intact.
const LAND_AT = [0, 0.5, 0.5, 0.5, 0.5, 0.15];
// Optionally hold the previous state until a section's top is this far down
// the viewport (1 = just entering). Keeps the moon off "Why" until it leaves.
const LEAVE_AT: (number | null)[] = [null, null, null, null, null, 1];

export default function MoonStage() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const q = gsap.utils.selector(el);
    const moon = q(".moon")[0] as HTMLElement;
    const parts = {
      moon,
      shade: q(".moon-shade"),
      glow: q(".moon-glow"),
      orbit: q(".orbit"),
      orbitSpin: q(".orbit-spin"),
      light: q(".stage-light"),
      horizon: q(".horizon"),
      scrim: q(".scrim"),
      stars: q(".stars"),
    };

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
        mobile: "(max-width: 1023px)",
      },
      (ctx) => {
        const { motion, mobile } = ctx.conditions as { motion: boolean; mobile: boolean };
        const states = mobile ? MOBILE : DESKTOP;

        // Moon centre in px, relative to the CSS default (left/top 0, centred).
        const place = (s: MoonState) => ({
          x: () => s.x * window.innerWidth,
          y: () => s.y * window.innerHeight,
          scale: s.scale,
          opacity: s.opacity,
        });
        const apply = (s: MoonState, tl?: gsap.core.Timeline, at?: number, dur = 0) => {
          const vars = (v: gsap.TweenVars) => ({ ...v, duration: dur, ease: "none" });
          const go = (target: gsap.TweenTarget, v: gsap.TweenVars) =>
            tl ? tl.to(target, vars(v), at) : gsap.set(target, v);
          go(parts.moon, place(s));
          go(parts.shade, { opacity: s.shade });
          go(parts.glow, { opacity: s.glow });
          go(parts.light, { opacity: s.light });
          go(parts.horizon, { opacity: s.horizon });
          go(parts.scrim, { opacity: s.scrim });
          go(parts.orbit, { opacity: s.orbit });
        };

        gsap.set(moon, { left: 0, top: 0, xPercent: -50, yPercent: -50 });

        if (!motion) {
          // Reduced motion: one calm, fully-risen composition. No scrubbing.
          apply(mobile ? states[4] : STATIC_DESKTOP);
          return;
        }

        // Keyframes land when each section's top crosses mid-viewport, so the
        // moon arrives with the content instead of after it.
        const boundaries = () => {
          const max = ScrollTrigger.maxScroll(window);
          const vh = window.innerHeight;
          return SECTION_IDS.map((id, i) => {
            if (i === 0) return 0;
            const sec = document.getElementById(id);
            if (!sec) return max;
            const top = sec.getBoundingClientRect().top + window.scrollY;
            return gsap.utils.clamp(0, max, top - vh * LAND_AT[i]);
          }).concat(max);
        };
        const legStart = (i: number, prev: number) => {
          const at = LEAVE_AT[i];
          const sec = document.getElementById(SECTION_IDS[i]);
          if (at == null || !sec) return prev;
          const top = sec.getBoundingClientRect().top + window.scrollY;
          return Math.max(prev, top - window.innerHeight * at);
        };

        let b: number[] = [];
        let inner: gsap.Context | null = null;

        const build = () => {
          inner?.revert();
          inner = gsap.context(() => {
            b = boundaries();
            const total = Math.max(1, b[b.length - 1]);
            const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } });

            apply(states[0]);
            for (let i = 1; i < states.length; i++) {
              // Ease each leg gently so the moon settles rather than slides.
              const leg = gsap.timeline({ defaults: { ease: "sine.inOut" } });
              apply(states[i], leg, 0, 1);
              const from = Math.min(legStart(i, b[i - 1]), b[i]);
              leg.duration(Math.max(0.0001, (b[i] - from) / total));
              tl.add(leg, from / total);
            }

            // Slow, constant motion that represents precision: orbit + stars.
            tl.fromTo(parts.orbitSpin, { rotation: 0 }, { rotation: 300, duration: 1, svgOrigin: "100 100" }, 0);
            tl.fromTo(parts.stars, { yPercent: 0 }, { yPercent: -8, duration: 1 }, 0);

            ScrollTrigger.create({
              start: 0,
              end: "max",
              animation: tl,
              scrub: mobile ? 0.4 : 0.8,
              invalidateOnRefresh: true,
            });
          });
        };

        build();

        // Section heights change with the viewport; rebuild keyframes when
        // a refresh moves any section boundary.
        let raf = 0;
        const onRefresh = () => {
          const nb = boundaries();
          if (nb.length === b.length && nb.every((v, i) => Math.abs(v - b[i]) < 2)) return;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(build);
        };
        ScrollTrigger.addEventListener("refresh", onRefresh);

        return () => {
          cancelAnimationFrame(raf);
          ScrollTrigger.removeEventListener("refresh", onRefresh);
          inner?.revert();
        };
      },
    );

    el.dataset.ready = "true";
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="stage" aria-hidden="true">
      <div className="stage-light" />
      <Starfield />
      <div className="moon">
        <div className="moon-glow" />
        <svg className="orbit" viewBox="0 0 200 200" fill="none">
          <g className="orbit-spin">
            <circle cx="100" cy="100" r="96" stroke="rgb(216 187 149 / 0.32)" strokeWidth="0.25" />
            <circle cx="100" cy="100" r="88" stroke="rgb(216 187 149 / 0.14)" strokeWidth="0.2" strokeDasharray="0.6 2.4" />
            {Array.from({ length: 72 }, (_, i) => {
              const a = (i / 72) * Math.PI * 2;
              const long = i % 6 === 0;
              const r1 = long ? 92.5 : 94;
              return (
                <line
                  key={i}
                  x1={(100 + Math.cos(a) * r1).toFixed(2)}
                  y1={(100 + Math.sin(a) * r1).toFixed(2)}
                  x2={(100 + Math.cos(a) * 96).toFixed(2)}
                  y2={(100 + Math.sin(a) * 96).toFixed(2)}
                  stroke="rgb(216 187 149 / 0.45)"
                  strokeWidth={long ? 0.3 : 0.18}
                />
              );
            })}
            <circle cx="196" cy="100" r="1.1" fill="#d8bb95" />
            <circle cx="12" cy="100" r="0.7" fill="rgb(216 187 149 / 0.6)" />
          </g>
        </svg>
        <img
          className="moon-img"
          src="/moon/moon-1000.webp"
          srcSet="/moon/moon-1000.webp 1000w, /moon/moon-1800.webp 1800w"
          sizes="(min-width: 1024px) 66vh, 88vw"
          alt=""
          width={1000}
          height={1000}
          decoding="async"
          fetchPriority="high"
          draggable={false}
        />
        <div className="moon-shade" />
        <div className="moon-rim" />
      </div>
      <div className="horizon" />
      <div className="scrim" />
      <div className="grain" />
    </div>
  );
}
