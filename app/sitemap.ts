import { articles } from "@/lib/articles";
import { REVIEWED_AT } from "@/lib/learning";
import { siteConfig } from "@/config/site";
import { glossaryTerms } from "@/lib/glossary";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(REVIEWED_AT);
  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...articles.map((article) => ({ url: `${siteConfig.url}/articles/${article.slug}/`, lastModified, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...glossaryTerms.map((term) => ({
      url: `${siteConfig.url}/term/${term.id}/`,
      lastModified: new Date(term.reviewedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
