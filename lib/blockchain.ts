import sha256 from "crypto-js/sha256";

export const DEFAULT_DIFFICULTY = 3;

export type BlockRecord = {
  index: number;
  timestamp: string;
  data: string;
  previousHash: string;
  nonce: number;
  hash: string;
};

export type BlockValidity = {
  isValid: boolean;
  hashMatches: boolean;
  previousHashMatches: boolean;
  meetsDifficulty: boolean;
};

export type MiningProgress = {
  blockIndex: number;
  attempts: number;
  nonce: number;
};

const seedChain: BlockRecord[] = [
  {
    index: 0,
    timestamp: "2026-08-26T10:00:00.000Z",
    data: "Genesis block",
    previousHash: "0",
    nonce: 8299,
    hash: "000d15874e8c9c7ef4d1fc3d005f4fd88b8f9d5ae86dd4e98a4753c0bcdf5c2a",
  },
  {
    index: 1,
    timestamp: "2026-08-26T10:01:15.000Z",
    data: "Payment of 25 to Alice",
    previousHash: "000d15874e8c9c7ef4d1fc3d005f4fd88b8f9d5ae86dd4e98a4753c0bcdf5c2a",
    nonce: 1772,
    hash: "000e0e0873804d95b512b7f381fda2b2e0b5ef21f85a7c63783cea954f5c9936",
  },
  {
    index: 2,
    timestamp: "2026-08-26T10:02:30.000Z",
    data: "Order #1024 shipped",
    previousHash: "000e0e0873804d95b512b7f381fda2b2e0b5ef21f85a7c63783cea954f5c9936",
    nonce: 513,
    hash: "000c61367e34836d99bdd6228afddcfb3b47d1b7dd15531a4848c0bec1f15f44",
  },
  {
    index: 3,
    timestamp: "2026-08-26T10:03:45.000Z",
    data: "Inventory update",
    previousHash: "000c61367e34836d99bdd6228afddcfb3b47d1b7dd15531a4848c0bec1f15f44",
    nonce: 1059,
    hash: "000d4de39c97a07703a1840f066a5152c0a747660012e4d7cc4a1fbe03bc0879",
  },
];

export function createInitialChain(): BlockRecord[] {
  return seedChain.map((block) => ({ ...block }));
}

export function calculateBlockHash(
  block: Pick<BlockRecord, "index" | "timestamp" | "data" | "previousHash" | "nonce">,
): string {
  return sha256(
    [block.index, block.timestamp, block.data, block.previousHash, block.nonce].join("|"),
  ).toString();
}

export function getBlockValidity(
  block: BlockRecord,
  previousBlock: BlockRecord | undefined,
  difficulty = DEFAULT_DIFFICULTY,
): BlockValidity {
  const hashMatches = block.hash === calculateBlockHash(block);
  const previousHashMatches = previousBlock
    ? block.previousHash === previousBlock.hash
    : block.previousHash === "0";
  const meetsDifficulty = block.hash.startsWith("0".repeat(difficulty));

  return {
    hashMatches,
    previousHashMatches,
    meetsDifficulty,
    isValid: hashMatches && previousHashMatches && meetsDifficulty,
  };
}

export function updateBlockData(
  chain: BlockRecord[],
  index: number,
  data: string,
): BlockRecord[] {
  return chain.map((block) => {
    if (block.index !== index) return { ...block };
    const updated = { ...block, data };
    return { ...updated, hash: calculateBlockHash(updated) };
  });
}

export function isChainValid(
  chain: BlockRecord[],
  difficulty = DEFAULT_DIFFICULTY,
): boolean {
  return chain.every((block, index) =>
    getBlockValidity(block, chain[index - 1], difficulty).isValid,
  );
}

async function mineBlock(
  candidate: Omit<BlockRecord, "hash">,
  difficulty: number,
  onProgress?: (progress: MiningProgress) => void,
): Promise<BlockRecord> {
  const target = "0".repeat(difficulty);
  let nonce = 0;
  let attempts = 0;

  while (true) {
    const next = { ...candidate, nonce };
    const hash = calculateBlockHash(next);
    attempts += 1;

    if (hash.startsWith(target)) {
      onProgress?.({ blockIndex: candidate.index, attempts, nonce });
      return { ...next, hash };
    }

    nonce += 1;
    if (attempts % 250 === 0) {
      onProgress?.({ blockIndex: candidate.index, attempts, nonce });
      await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
  }
}

export async function remineFrom(
  chain: BlockRecord[],
  startIndex: number,
  difficulty = DEFAULT_DIFFICULTY,
  onProgress?: (progress: MiningProgress) => void,
): Promise<BlockRecord[]> {
  const nextChain = chain.map((block) => ({ ...block }));

  for (let index = startIndex; index < nextChain.length; index += 1) {
    const previousHash = index === 0 ? "0" : nextChain[index - 1].hash;
    nextChain[index] = await mineBlock(
      { ...nextChain[index], previousHash, nonce: 0 },
      difficulty,
      onProgress,
    );
  }

  return nextChain;
}

export async function appendBlock(
  chain: BlockRecord[],
  data: string,
  difficulty = DEFAULT_DIFFICULTY,
  onProgress?: (progress: MiningProgress) => void,
  timestamp = new Date().toISOString(),
): Promise<BlockRecord[]> {
  const previous = chain.at(-1);
  if (!previous) throw new Error("A chain needs a genesis block before another block can be added.");

  const mined = await mineBlock(
    {
      index: chain.length,
      timestamp,
      data,
      previousHash: previous.hash,
      nonce: 0,
    },
    difficulty,
    onProgress,
  );

  return [...chain.map((block) => ({ ...block })), mined];
}

export function shortenHash(hash: string, length = 16): string {
  if (hash === "0") return "0 (genesis)";
  return `${hash.slice(0, length)}…`;
}
