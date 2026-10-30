import { copy, services } from "@/lib/site";
import SectionHeader from "./SectionHeader";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative px-6 py-32 md:px-10 md:py-48 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[40rem] text-shadow-soft">
          <SectionHeader index="02" label="Services" />
          <h2 id="services-title" data-reveal className="display text-[2.4rem] text-ink md:text-6xl">
            {copy.services.title}
          </h2>
          <p data-reveal className="lede mt-8 max-w-[34rem] text-[1.02rem]">
            {copy.services.intro}
          </p>

          <ol data-reveal-group className="mt-16 border-t border-line md:mt-20">
            {services.map((s, i) => (
              <li key={s.title} className="group grid grid-cols-[3rem_1fr] gap-x-4 border-b border-line py-9 md:grid-cols-[4.5rem_1fr] md:py-11">
                <span className="font-display pt-1 text-base text-gold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-[1.65rem] leading-tight text-ink transition-colors duration-500 md:text-[2.1rem]">
                    {s.title}
                  </h3>
                  <p className="copy mt-4 max-w-[32rem] text-[0.97rem]">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
