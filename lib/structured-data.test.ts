import { describe, expect, it } from "vitest";
import { glossaryTerms } from "./glossary";
import {
  createGlossarySetJsonLd,
  createTermJsonLd,
  serializeJsonLd,
} from "./structured-data";

describe("glossary structured data", () => {
  it("publishes every glossary entry as a DefinedTerm", () => {
    const data = createGlossarySetJsonLd();
    expect(data["@type"]).toBe("DefinedTermSet");
    expect(data.hasDefinedTerm).toHaveLength(glossaryTerms.length);
    expect(data.hasDefinedTerm.every((term) => term.url.startsWith("https://"))).toBe(true);
  });

  it("creates a stable DefinedTerm entity for a term page", () => {
    const term = glossaryTerms[0];
    const data = createTermJsonLd(term);
    expect(data["@type"]).toBe("DefinedTerm");
    expect(data.name).toBe(term.name);
    expect(data.inDefinedTermSet["@id"]).toContain("#glossary");
  });

  it("escapes less-than characters before embedding JSON-LD", () => {
    expect(serializeJsonLd({ value: "<script>" })).not.toContain("<script>");
  });
});
