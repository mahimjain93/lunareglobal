import { copy, process } from "@/lib/site";
import SectionHeader from "./SectionHeader";

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="relative px-6 py-32 md:px-10 md:py-48 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[40rem] text-shadow-soft">
          <SectionHeader index="03" label="How we work" />
          <h2 id="process-title" data-reveal className="display text-[2.4rem] text-ink md:text-6xl">
            {copy.process.title}
          </h2>
          <p data-reveal className="lede mt-8 text-[1.02rem]">
            {copy.process.intro}
          </p>

          <div className="relative mt-16 md:mt-20">
            {/* The track draws itself as you move through the steps. */}
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-line" />
            <span aria-hidden="true" data-draw className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-silver/70" />

            <ol data-reveal-group className="space-y-14 md:space-y-16">
              {process.map((step, i) => (
                <li key={step.title} className="relative pl-12 md:pl-16">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.55rem] left-0 h-[11px] w-[11px] rounded-full border border-silver/70 bg-night"
                  />
                  <p className="eyebrow mb-3">Step {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-display text-[1.65rem] leading-tight text-ink md:text-[2rem]">{step.title}</h3>
                  <p className="copy mt-3 max-w-[30rem] text-[0.97rem]">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
