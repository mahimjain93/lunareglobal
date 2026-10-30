import { copy, mailtoHref, site } from "@/lib/site";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative flex min-h-svh flex-col justify-end px-6 pt-[52svh] pb-20 md:px-10 md:pb-24 lg:px-14 lg:pt-32 lg:pb-[22svh]"
    >
      <div className="mx-auto w-full max-w-[1440px] text-center lg:text-left">
        <p data-reveal className="eyebrow mb-7">05 — Contact</p>
        <h2 id="contact-title" data-reveal className="display mx-auto max-w-[18ch] lg:mx-0 lg:max-w-[14ch] text-[2.5rem] text-gold md:text-6xl lg:text-[4.25rem]">
          {copy.contact.title}
        </h2>
        <p data-reveal className="lede mx-auto mt-7 max-w-[32rem] text-[1rem] lg:mx-0">
          {copy.contact.body}
        </p>
        <div data-reveal className="mt-11 flex flex-col items-center gap-6 lg:items-start">
          <a href={mailtoHref()} className="btn">
            Start a conversation <span className="arrow" aria-hidden="true">→</span>
          </a>
          <a href={`mailto:${site.contact.email}`} className="link-quiet text-[0.9rem] tracking-[0.02em]">
            {site.contact.email}
          </a>
        </div>
      </div>
    </section>
  );
}
