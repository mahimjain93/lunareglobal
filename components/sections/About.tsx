import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative px-6 py-32 md:px-10 md:py-48 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <div className="max-w-[40rem] text-shadow-soft">
          <SectionHeader index="01" label="About Lunare" />
          <h2 id="about-title" data-reveal className="display text-[2.4rem] text-ink md:text-6xl">
            Not an agency. An extension of your team.
          </h2>
          <p data-reveal className="lede mt-10 text-[1.02rem] md:text-lg">
            Lunare Global is built specifically for paid media operations. We don’t replace your in-house team or
            your strategy — we strengthen the execution layer beneath it, so campaigns are built cleanly, optimised
            consistently and reported accurately.
          </p>

          <figure data-reveal className="mt-16 border-l border-line pl-6 md:pl-8">
            <blockquote className="font-display text-[1.45rem] leading-snug text-silver italic md:text-[1.7rem]">
              Strong strategy too often fails on weak execution.
            </blockquote>
            <figcaption className="copy mt-6 text-[0.95rem]">
              Lunare was founded by <span className="text-ink">Sanjana Morris</span>, a paid media operator with deep
              experience in campaign execution, account structure and cross-platform performance environments — to
              restore precision and accountability to paid media delivery.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
