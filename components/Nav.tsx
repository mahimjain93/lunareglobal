"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import Logo from "./Logo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ease-(--ease-lunar) ${
          scrolled && !open
            ? "border-b border-line bg-night/55 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-18 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10 lg:px-14"
        >
          <a href="#top" className="relative z-10" aria-label="Lunare Global — back to top" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-quiet text-[0.8125rem] tracking-[0.04em]">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden text-[0.6875rem] font-medium tracking-[0.24em] text-ink uppercase lg:inline-flex lg:items-center lg:gap-3 group"
          >
            <span className="h-px w-6 bg-silver/60 transition-all duration-500 group-hover:w-10" />
            Start a conversation
          </a>

          <button
            type="button"
            className="relative z-10 -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </nav>
      </header>
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 z-40 overflow-y-auto bg-night/96 px-6 pt-28 pb-12 lg:hidden"
      >
        <ul className="space-y-6">
          {[...nav, { href: "#contact", label: "Contact" }].map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)} className="display block text-4xl text-ink">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
