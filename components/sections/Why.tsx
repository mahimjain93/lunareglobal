import { differentiators } from "@/lib/site";
import SectionHeader from "./SectionHeader";

export default function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="relative px-6 py-32 md:px-10 md:py-48 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[42rem] text-shadow-soft">
          <SectionHeader index="04" label="Why Lunare" />
          <h2 id="why-title" data-reveal className="display text-[2.4rem] text-ink md:text-6xl">
            Built for teams that take execution seriously.
          </h2>

          <dl data-reveal-group className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 md:mt-20">
            {differentiators.map((d) => (
              <div key={d.title} className="border-t border-line pt-7">
                <dt className="font-display text-[1.45rem] leading-snug text-ink">{d.title}</dt>
                <dd className="copy mt-3 text-[0.95rem]">{d.body}</dd>
              </div>
            ))}
          </dl>

          <div data-reveal className="mt-20 max-w-[36rem]">
            <p className="eyebrow mb-4">Who we work with</p>
            <p className="lede text-[1.02rem]">
              Teams with an in-house performance or growth function, running paid media across multiple platforms and
              markets — where execution quality directly affects reporting and decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
