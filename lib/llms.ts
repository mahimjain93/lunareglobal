import { copy, differentiators, process, services, site } from "./site";

/**
 * Markdown renderings of the site for LLM crawlers (https://llmstxt.org).
 * Built from the same content as the page, so they never drift.
 */

const header = () =>
  [`# ${site.name}`, "", `> ${site.description}`, ""].join("\n");

const contactLines = () => [
  `- Email: [${site.contact.email}](mailto:${site.contact.email})`,
  `- Website: ${site.url}`,
];

export function llmsTxt() {
  return [
    header(),
    `${site.name} is not a full-service agency. It works as an extension of in-house performance and growth teams, owning the execution layer of paid media: campaign builds, ongoing optimisation, execution quality and reporting data.`,
    "",
    "## Site",
    "",
    `- [About](${site.url}/#about): ${copy.about.title}`,
    `- [Services](${site.url}/#services): ${services.map((s) => s.title).join("; ")}`,
    `- [How we work](${site.url}/#process): ${process.map((s) => s.title).join("; ")}`,
    `- [Why Lunare](${site.url}/#why): ${copy.why.title}`,
    `- [Contact](${site.url}/#contact): ${copy.contact.title}`,
    "",
    "## Details",
    "",
    `- [Full content](${site.url}/llms-full.txt): every section of the site as plain markdown`,
    "",
    "## Contact",
    "",
    ...contactLines(),
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const list = (items: { title: string; body: string }[], numbered = false) =>
    items.flatMap((item, i) => [`### ${numbered ? `${i + 1}. ` : ""}${item.title}`, "", item.body, ""]);

  return [
    header(),
    `${copy.hero.lede}`,
    "",
    "## About",
    "",
    `**${copy.about.title}**`,
    "",
    copy.about.body,
    "",
    `> ${copy.about.quote}`,
    "",
    `${site.name} was founded by ${copy.founder.name}, ${copy.founder.bio}, ${copy.founder.mission}.`,
    "",
    "## Services",
    "",
    copy.services.intro,
    "",
    ...list(services),
    "## How we work",
    "",
    copy.process.intro,
    "",
    ...list(process, true),
    "## Why Lunare",
    "",
    ...list(differentiators),
    "## Who we work with",
    "",
    copy.audience,
    "",
    "## Contact",
    "",
    copy.contact.body,
    "",
    ...contactLines(),
    "",
  ].join("\n");
}
