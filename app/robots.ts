import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// AI and LLM crawlers are welcome. Listed explicitly so the intent is
// unambiguous to bots that only honour a rule naming them.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent",
  "CCBot",
  "cohere-ai",
  "DuckAssistBot",
  "MistralAI-User",
  "YouBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, { userAgent: AI_CRAWLERS, allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
