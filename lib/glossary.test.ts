import { describe, expect, it } from "vitest";
import { glossaryById, glossaryTerms, searchGlossary } from "./glossary";

describe("blockchain glossary", () => {
  it("contains 24 reviewed and sourced terms", () => {
    expect(glossaryTerms).toHaveLength(24);
    expect(new Set(glossaryTerms.map((item) => item.id)).size).toBe(24);

    for (const item of glossaryTerms) {
      expect(item.reviewedAt).toBe("2026-08-26");
      expect(item.explanation.length).toBeGreaterThan(180);
      expect(item.sources.length).toBeGreaterThan(0);
      expect(item.sources[0].url).toMatch(/^https:\/\//);
      for (const related of item.related) expect(glossaryById.has(related)).toBe(true);
    }
  });

  it("ranks exact matches and understands aliases", () => {
    expect(searchGlossary("hash")[0]?.id).toBe("hash");
    expect(searchGlossary("PoW")[0]?.id).toBe("proof-of-work");
    expect(searchGlossary("immutability").some((item) => item.id === "tamper-evidence")).toBe(true);
  });
});
