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
