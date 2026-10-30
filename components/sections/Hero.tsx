import { copy } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col justify-center px-6 pt-28 pb-[30svh] md:px-10 md:pb-[34svh] lg:px-14"
    >
      <div data-hero className="mx-auto w-full max-w-[1440px] text-center">
        <p className="eyebrow mb-8">{copy.hero.eyebrow}</p>
        <h1 id="hero-title" className="display mx-auto max-w-[15ch] text-[2.9rem] text-ink sm:text-6xl md:text-7xl lg:text-[5.75rem]">
          Great strategy deserves <em className="text-silver italic">precise</em> execution.
        </h1>
        <p className="lede mx-auto mt-8 max-w-[34rem] text-[0.98rem] md:text-[1.06rem]">
          {copy.hero.lede}
        </p>
        <div className="mt-11 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
          <a href="#contact" className="btn">
            Start a conversation <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a href="#services" className="link-quiet text-[0.8125rem] tracking-[0.04em]">
            What we take on
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-mist md:flex"
        aria-label="Scroll to About"
      >
        <span className="eyebrow text-[0.625rem]">Scroll</span>
        <span className="block h-10 w-px bg-gradient-to-b from-silver/60 to-transparent" />
      </a>
    </section>
  );
}
