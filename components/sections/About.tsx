import { copy } from "@/lib/site";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative px-6 py-32 md:px-10 md:py-48 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="panel panel-paper max-w-[47rem]">
          <SectionHeader index="01" label="About Lunare" />
          <h2 id="about-title" data-reveal className="display text-[2.4rem] text-ink md:text-6xl">
            {copy.about.title}
          </h2>
          <p data-reveal className="lede mt-10 text-[1.02rem] md:text-lg">
            {copy.about.body}
          </p>

          <figure data-reveal className="mt-16 border-l border-line pl-6 md:pl-8">
            <blockquote className="font-display text-[1.45rem] leading-snug text-gold-hi italic md:text-[1.7rem]">
              {copy.about.quote}
            </blockquote>
            <figcaption className="copy mt-6 text-[0.95rem]">
              Lunare was founded by <span className="text-ink">{copy.founder.name}</span>, {copy.founder.bio} —{" "}
              {copy.founder.mission}.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
