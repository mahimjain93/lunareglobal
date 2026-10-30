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
