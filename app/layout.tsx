import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/400.css";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} — Paid media execution partner`,
  description: site.description,
  alternates: {
    canonical: "/",
    // Plain-markdown version of the site for LLMs (llmstxt.org).
    types: { "text/markdown": "/llms.txt" },
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Paid media execution partner`,
    description: site.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Lunare Global" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#04060b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/moon/moon-1000.webp" type="image/webp" />
      </head>
      <body>{children}</body>
    </html>
  );
}
