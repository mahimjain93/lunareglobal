import { nav, site } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-night/60 px-6 py-8 backdrop-blur-sm md:py-10 md:px-10 lg:px-14">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-8">
          <Logo />
          <p className="hidden text-[0.8125rem] text-mist md:block">Paid media execution partner</p>
        </div>
        <ul className="hidden flex-wrap md:flex gap-x-7 gap-y-3 text-[0.8125rem]">
          {nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="link-quiet text-mist">
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.contact.email}`} className="link-quiet text-mist">
              Contact
            </a>
          </li>
        </ul>
        <p className="text-[0.75rem] text-dim">© {new Date().getFullYear()} {site.name}</p>
      </div>
    </footer>
  );
}
