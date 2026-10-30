import { copy, differentiators, services, site } from "./site";

/** schema.org graph describing the organisation, its services and the page. */
export function structuredData() {
  const org = `${site.url}/#organization`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": org,
        name: site.name,
        url: site.url,
        logo: `${site.url}/icon.svg`,
        image: `${site.url}/og.jpg`,
        description: site.description,
        slogan: copy.why.title,
        email: site.contact.email,
        founder: {
          "@type": "Person",
          name: copy.founder.name,
          description: `${copy.founder.name} is ${copy.founder.bio}.`,
        },
        knowsAbout: [
          "Paid media",
          "Paid media operations",
          "Campaign setup and structuring",
          "Campaign optimisation",
          "Cross-platform advertising",
          "Paid media reporting",
        ],
        audience: { "@type": "BusinessAudience", audienceType: copy.audience },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Paid media execution services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.title, description: s.body, provider: { "@id": org } },
          })),
        },
        additionalProperty: differentiators.map((d) => ({
          "@type": "PropertyValue",
          name: d.title,
          value: d.body,
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        publisher: { "@id": org },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${site.url}/#webpage`,
        url: site.url,
        name: `${site.name} — Paid media execution partner`,
        description: site.description,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": org },
        inLanguage: "en",
      },
    ],
  };
}
