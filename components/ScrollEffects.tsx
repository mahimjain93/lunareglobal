"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Restrained content reveals. Content is fully visible in the HTML; these
 * only run when motion is allowed, so nothing is hidden if JS fails.
 *
 *   [data-reveal]        fades/rises once as it enters
 *   [data-reveal-group]  reveals its direct children in sequence
 *   [data-draw]          a line that draws with scroll progress
 */
export default function ScrollEffects() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 1.3,
          ease: "power3.out",
          delay: Number(el.dataset.revealDelay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
        gsap.from(group.children, {
          autoAlpha: 0,
          y: 32,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: group, start: "top 82%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: { trigger: line.parentElement, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          },
        );
      });

      // Hero copy settles in on load.
      gsap.from("[data-hero] > *", {
        autoAlpha: 0,
        y: 20,
        duration: 1.6,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.15,
      });
    });

    // Fonts can shift layout; recompute trigger positions once they land.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, []);

  return null;
}
