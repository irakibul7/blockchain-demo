import type { Article } from "./articles";
import { author, REVIEWED_AT } from "./learning";
import { siteConfig } from "../config/site";
import { glossaryTerms, type GlossaryTerm } from "./glossary";

const glossaryId = `${siteConfig.url}/#glossary`;

function definedTerm(term: GlossaryTerm) {
  return {
    "@type": "DefinedTerm",
    "@id": `${siteConfig.url}/term/${term.id}/#term`,
    name: term.name,
    description: term.summary,
    url: `${siteConfig.url}/term/${term.id}/`,
    inDefinedTermSet: { "@id": glossaryId },
  };
}

export function createGlossarySetJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": glossaryId,
    name: `${siteConfig.name} glossary`,
    description: siteConfig.description,
    url: `${siteConfig.url}/#glossary-title`,
    hasDefinedTerm: glossaryTerms.map(definedTerm),
  };
}

export function createTermJsonLd(term: GlossaryTerm) {
  return {
    "@context": "https://schema.org",
    ...definedTerm(term),
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function createArticleJsonLd(article: Article) {
  const url = `${siteConfig.url}/articles/${article.slug}/`;
  return {
    "@context": "https://schema.org", "@type": "Article",
    "@id": `${url}#article`, url,
    headline: article.title, description: article.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Person", "@id": `${author.url}#person`, ...author },
    dateModified: REVIEWED_AT,
    inLanguage: "en", articleSection: "Blockchain education",
    image: `${siteConfig.url}/opengraph-image.png`,
  };
}
