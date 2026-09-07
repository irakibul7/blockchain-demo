import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { articles } from "./articles";
import { experiments, author, REVIEWED_AT } from "./learning";
import { glossaryById } from "./glossary";
import { createArticleJsonLd } from "./structured-data";
import { createInitialChain, updateBlockData, getBlockValidity, isChainValid, appendBlock, remineFrom } from "./blockchain";

describe("guided learning contracts", () => {
  it("restoring text restores the hash and leaves descendants untouched", () => {
    const original = createInitialChain();
    const edited = updateBlockData(original, 1, "Payment of 250 to Alice");
    expect(edited.slice(2)).toEqual(original.slice(2));
    expect(getBlockValidity(edited[3], edited[2]).isValid).toBe(true);
    expect(isChainValid(edited)).toBe(false);
    expect(updateBlockData(edited, 1, original[1].data)).toEqual(original);
  });
  it("a new mined block cannot repair an invalid ancestor", async () => {
    const edited = updateBlockData(createInitialChain(), 1, "Payment of 250 to Alice");
    const extended = await appendBlock(edited, "Classroom record", 2, undefined, "2026-09-07T00:00:00Z");
    expect(getBlockValidity(extended[4], extended[3], 2).isValid).toBe(true);
    expect(isChainValid(extended, 2)).toBe(false);
    const repaired = await remineFrom(extended, 1, 2);
    expect(isChainValid(repaired, 2)).toBe(true);
    expect(await remineFrom(extended, 1, 2)).toEqual(repaired);
  });
  it("keeps article metadata, authored dates and linked learning targets consistent", () => {
    expect(new Set(articles.map((a) => a.slug)).size).toBe(3);
    expect(new Set(articles.map((a) => a.description)).size).toBe(3);
    for (const article of articles) {
      const data = createArticleJsonLd(article);
      expect(data.headline).toBe(article.title);
      expect(data.author.url).toBe(author.url);
      expect(data.dateModified).toBe(REVIEWED_AT);
      expect(data.mainEntityOfPage["@id"]).toBe(data.url);
      for (const term of article.terms) expect(glossaryById.has(term)).toBe(true);
      for (const id of article.experiments) expect(experiments.some((e) => e.id === id)).toBe(true);
    }
    for (const experiment of experiments) {
      for (const id of experiment.terms) expect(glossaryById.has(id)).toBe(true);
    }
  });
  it("runs the downloadable hash example against the simulator fixture", () => {
    const output = execFileSync(process.execPath, ["public/examples/hash-change.mjs"], { encoding: "utf8" });
    expect(output).toContain(createInitialChain()[1].hash);
  });
  it("runs the lost-response, concurrent-retry and payload-conflict assertions", () => {
    const output = execFileSync(process.execPath, ["public/examples/retry-payments.mjs"], { encoding: "utf8" });
    expect(output).toContain("simulated effects: 1");
    expect(output).toContain("same intent on concurrent retries: true");
    expect(output).toContain("conflicting retry: rejected");
  });
});
