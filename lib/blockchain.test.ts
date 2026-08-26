import { describe, expect, it } from "vitest";
import {
  appendBlock,
  calculateBlockHash,
  createInitialChain,
  getBlockValidity,
  isChainValid,
  remineFrom,
  updateBlockData,
} from "./blockchain";

describe("blockchain model", () => {
  it("starts with a valid four-block chain", () => {
    const chain = createInitialChain();
    expect(chain).toHaveLength(4);
    expect(isChainValid(chain)).toBe(true);
    expect(chain.every((block) => block.hash === calculateBlockHash(block))).toBe(true);
  });

  it("makes an edited block and its descendants invalid for distinct reasons", () => {
    const chain = updateBlockData(createInitialChain(), 1, "Payment of 250 to Alice");
    const edited = getBlockValidity(chain[1], chain[0]);
    const descendant = getBlockValidity(chain[2], chain[1]);

    expect(edited.hashMatches).toBe(true);
    expect(edited.meetsDifficulty).toBe(false);
    expect(descendant.previousHashMatches).toBe(false);
    expect(isChainValid(chain)).toBe(false);
  });

  it("re-mines an edited block and every descendant", async () => {
    const edited = updateBlockData(createInitialChain(), 1, "Payment of 250 to Alice");
    const repaired = await remineFrom(edited, 1, 2);

    expect(isChainValid(repaired, 2)).toBe(true);
    expect(repaired[2].previousHash).toBe(repaired[1].hash);
    expect(repaired[3].previousHash).toBe(repaired[2].hash);
  });

  it("mines and appends a linked block", async () => {
    const chain = createInitialChain();
    const next = await appendBlock(
      chain,
      "Certificate issued",
      2,
      undefined,
      "2026-08-26T10:05:00.000Z",
    );

    expect(next).toHaveLength(5);
    expect(next[4].previousHash).toBe(next[3].hash);
    expect(getBlockValidity(next[4], next[3], 2).isValid).toBe(true);
  });
});
