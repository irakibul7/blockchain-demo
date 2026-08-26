import { siteConfig } from "@/config/site";
import { glossaryTerms } from "@/lib/glossary";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-26T00:00:00.000Z");
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...glossaryTerms.map((term) => ({
      url: `${siteConfig.url}/term/${term.id}/`,
      lastModified: new Date(term.reviewedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
