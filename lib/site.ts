/**
 * Site content and contact configuration.
 *
 * All business facts below are taken from the public lunareglobal.com site.
 * Before launch, confirm `contact.email` — it could not be verified from the
 * public site at build time (see README).
 */

export const site = {
  name: "Lunare Global",
  url: "https://lunareglobal.com",
  description:
    "Lunare Global is a paid media execution partner for in-house performance and growth teams — clean campaign builds, consistent optimisation and accurate reporting data across platforms and markets.",
  contact: {
    email: "hello@lunareglobal.com",
    subject: "Paid media execution — enquiry",
  },
};

/** Section copy shared by the page, /llms.txt and structured data. */
export const copy = {
  hero: {
    eyebrow: "Paid media execution partner",
    lede: "Lunare Global plugs into in-house performance and growth teams to build, optimise and maintain paid media with operational discipline — across every platform and market you run.",
  },
  about: {
    title: "Not an agency. An extension of your team.",
    body: "Lunare Global is built specifically for paid media operations. We don’t replace your in-house team or your strategy — we strengthen the execution layer beneath it, so campaigns are built cleanly, optimised consistently and reported accurately.",
    quote: "Strong strategy too often fails on weak execution.",
  },
  founder: {
    name: "Sanjana Morris",
    bio: "a paid media operator with deep experience in campaign execution, account structure and cross-platform performance environments",
    mission: "to restore precision and accountability to paid media delivery",
  },
  services: {
    title: "The execution layer, owned.",
    intro: "Four disciplines, focused on one outcome: paid media that runs exactly as your strategy intends.",
  },
  process: {
    title: "Built to plug in, not take over.",
    intro: "We fit around the way your team already works — and bring the structure that keeps execution consistent from one week, platform and market to the next.",
  },
  why: {
    title: "Built for teams that take execution seriously.",
  },
  audience:
    "Teams with an in-house performance or growth function, running paid media across multiple platforms and markets — where execution quality directly affects reporting and decisions.",
  contact: {
    title: "Bring precision to your paid media.",
    body: "Tell us how your programme runs today — platforms, markets, team — and where execution is getting in the way.",
  },
};

export const nav = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "How we work" },
  { href: "#why", label: "Why Lunare" },
];

export const services = [
  {
    title: "Campaign setup & structuring",
    body: "Clean, scalable account and campaign builds — structured so performance can be read, compared and acted on across every platform and market you run.",
  },
  {
    title: "Ongoing optimisation",
    body: "Consistent, disciplined in-platform optimisation that keeps live campaigns aligned with your team’s strategy, week after week.",
  },
  {
    title: "Execution quality & hygiene",
    body: "Routine checks on settings, naming, structure and delivery — catching the small errors that quietly distort spend and data.",
  },
  {
    title: "Reporting data support",
    body: "Accurate platform data pulls to support your internal reporting and performance reviews.",
  },
];

export const process = [
  {
    title: "Plug in",
    body: "We work inside your existing workflows, tools and reporting cadence. Nothing new for your team to adopt.",
  },
  {
    title: "Own the execution",
    body: "Clear ownership of execution, so it is always obvious who is responsible for what — and that it gets done.",
  },
  {
    title: "Document & check",
    body: "Documented processes and checks behind every build and every change, so quality never depends on memory.",
  },
  {
    title: "Communicate proactively",
    body: "You hear from us early and clearly — before small issues become reporting problems.",
  },
];

export const differentiators = [
  {
    title: "Built for paid media operations",
    body: "Not a full-service agency spread across everything. Lunare exists for one layer — execution — and does it with discipline.",
  },
  {
    title: "An extension, not a replacement",
    body: "We work alongside your in-house team and strategy, filling the operational gap that stretched teams can’t.",
  },
  {
    title: "Multi-platform, multi-market",
    body: "Comfortable where consistency is hardest to hold: programmes running across several platforms and markets at once.",
  },
  {
    title: "Execution you can report on",
    body: "Campaign quality that holds up in your reporting — and in the decisions your team makes from it.",
  },
];

export function mailtoHref(body?: string) {
  const params = new URLSearchParams({ subject: site.contact.subject });
  if (body) params.set("body", body);
  return `mailto:${site.contact.email}?${params.toString().replace(/\+/g, "%20")}`;
}
