export type GlossarySource = { label: string; url: string };

export type GlossaryTerm = {
  id: string;
  name: string;
  section: "Foundations" | "Proof of Work" | "Networks & Consensus" | "Ownership & Applications";
  summary: string;
  explanation: string;
  aliases: string[];
  related: string[];
  sources: GlossarySource[];
  reviewedAt: string;
};

const bitcoinPaper: GlossarySource = {
  label: "Nakamoto — Bitcoin: A Peer-to-Peer Electronic Cash System",
  url: "https://bitcoin.org/bitcoin.pdf",
};

const nistHash: GlossarySource = {
  label: "NIST FIPS 180-4 — Secure Hash Standard",
  url: "https://csrc.nist.gov/pubs/fips/180-4/upd1/final",
};

const nistSignature: GlossarySource = {
  label: "NIST FIPS 186-5 — Digital Signature Standard",
  url: "https://csrc.nist.gov/pubs/fips/186-5/final",
};

const bitcoinBlockReference: GlossarySource = {
  label: "Bitcoin Developer Reference — Block chain",
  url: "https://developer.bitcoin.org/reference/block_chain.html",
};

const ethereumBlocks: GlossarySource = {
  label: "Ethereum.org — Blocks",
  url: "https://ethereum.org/developers/docs/blocks/",
};

const ethereumTransactions: GlossarySource = {
  label: "Ethereum.org — Transactions",
  url: "https://ethereum.org/developers/docs/transactions/",
};

const ethereumAccounts: GlossarySource = {
  label: "Ethereum.org — Ethereum accounts",
  url: "https://ethereum.org/developers/docs/accounts/",
};

const ethereumContracts: GlossarySource = {
  label: "Ethereum.org — Introduction to smart contracts",
  url: "https://ethereum.org/developers/docs/smart-contracts/",
};

function term(
  id: string,
  name: string,
  section: GlossaryTerm["section"],
  summary: string,
  explanation: string,
  related: string[],
  sources: GlossarySource[],
  aliases: string[] = [],
): GlossaryTerm {
  return {
    id,
    name,
    section,
    summary,
    explanation,
    related,
    sources,
    aliases,
    reviewedAt: "2026-08-26",
  };
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    "id": "confirmations",
    "name": "Confirmations",
    "section": "Networks & Consensus",
    "summary": "How deeply a transaction’s block is buried in the currently selected chain.",
    "explanation": "In the usual Bitcoin convention, inclusion counts as one confirmation and each following active-chain block adds one. The count is meaningful only while the containing block remains in the selected history. A reorganization can reduce it or remove the inclusion. A confirmation threshold is an application risk policy, not a universal guarantee of settlement.",
    "aliases": [],
    "related": [
      "transaction",
      "reorganization",
      "finality"
    ],
    "sources": [
      {
        "label": "Primary documentation: Confirmations",
        "url": "https://developer.bitcoin.org/devguide/payment_processing.html"
      }
    ],
    "reviewedAt": "2026-09-07"
  },
  {
    "id": "finality",
    "name": "Finality",
    "section": "Networks & Consensus",
    "summary": "A protocol-dependent assurance about whether accepted history can be replaced.",
    "explanation": "Finality is not a synonym for an HTTP success response or one block of inclusion. Bitcoin provides probabilistic settlement confidence through accumulated work. Ethereum proof of stake uses checkpoint finalization with supermajority stake votes and economic penalties under its safety assumptions. Finalization may stall; an application must observe the relevant network state rather than assume a timer guarantees it.",
    "aliases": [],
    "related": [
      "consensus",
      "confirmations",
      "reorganization"
    ],
    "sources": [
      {
        "label": "Primary documentation: Finality",
        "url": "https://ethereum.org/developers/docs/consensus-mechanisms/pos/"
      }
    ],
    "reviewedAt": "2026-09-07"
  },
  {
    "id": "reorganization",
    "name": "Reorganization",
    "section": "Networks & Consensus",
    "summary": "A change to the selected chain that replaces a previously observed suffix.",
    "explanation": "When fork choice selects a different valid history, blocks previously treated as canonical can leave the active chain. A transaction in those blocks may be included elsewhere, return to pending, or conflict with the new history. Applications should retain inclusion block hashes and revisit unsettled observations. This local simulator demonstrates broken ancestry but does not implement competing branches or network reorganizations.",
    "aliases": [],
    "related": [
      "fork",
      "chain-selection",
      "confirmations"
    ],
    "sources": [
      {
        "label": "Primary documentation: Reorganization",
        "url": "https://ethereum.org/developers/docs/consensus-mechanisms/pos/gasper/"
      }
    ],
    "reviewedAt": "2026-09-07"
  },
  {
    "id": "idempotency",
    "name": "Idempotency",
    "section": "Networks & Consensus",
    "summary": "Repeated attempts at the same logical operation preserve a single intended effect.",
    "explanation": "For a payment API, retries should reuse one durable operation identity bound to the same normalized parameters. Reusing that identity with a different payment must be rejected. Blockchain spending rules do not automatically deduplicate an order refund sent twice as two different valid transfers. Application idempotency requires durable storage, concurrency control, and reconciliation after ambiguous submission outcomes.",
    "aliases": [],
    "related": [
      "transaction",
      "nonce",
      "confirmations"
    ],
    "sources": [
      {
        "label": "Primary documentation: Idempotency",
        "url": "https://docs.stripe.com/api/idempotent_requests"
      }
    ],
    "reviewedAt": "2026-09-07"
  },
  term(
    "blockchain",
    "Blockchain",
    "Foundations",
    "A sequence of records linked by cryptographic hashes and maintained under shared validation rules.",
    "A blockchain groups data into ordered blocks and includes a reference to the previous block in each new block. That structure makes historical edits visible because changing one block changes its hash and breaks the reference held by the next block. Real blockchains also need a network and consensus rules; this field guide demonstrates only a small local chain.",
    ["block", "previous-hash", "consensus", "tamper-evidence"],
    [bitcoinPaper, ethereumBlocks],
    ["chain", "distributed ledger"],
  ),
  term(
    "block",
    "Block",
    "Foundations",
    "An ordered container of data plus metadata used to verify and connect it to a chain.",
    "A block typically contains or commits to transactions, a timestamp or slot, a reference to earlier history, and consensus-specific fields. This demo uses index, timestamp, data, previous hash, nonce, and current hash so the linking mechanism stays visible. Production block formats differ across protocols.",
    ["blockchain", "genesis-block", "hash", "transaction"],
    [ethereumBlocks],
  ),
  term(
    "genesis-block",
    "Genesis block",
    "Foundations",
    "The first block in a chain, created without a normal previous block reference.",
    "The genesis block establishes the starting point from which later blocks derive their history. Its parameters are defined by the protocol or the local experiment. In this simulator its previous hash is represented by zero, while real networks define a specific genesis block and initial state.",
    ["block", "blockchain", "previous-hash"],
    [bitcoinPaper, bitcoinBlockReference],
    ["block zero"],
  ),
  term(
    "hash",
    "Hash",
    "Foundations",
    "A fixed-length digest calculated from data so that even a tiny input change produces a very different result.",
    "A cryptographic hash function maps an input message to a fixed-size digest. The digest is fast to recompute and helps detect whether the input changed, but it does not encrypt the original data and cannot by itself prove who created it. Blockchains use hashes inside block references, transaction identifiers, signatures, and proof-of-work schemes.",
    ["sha-256", "previous-hash", "tamper-evidence", "digital-signature"],
    [nistHash],
    ["digest", "fingerprint"],
  ),
  term(
    "sha-256",
    "SHA-256",
    "Foundations",
    "A standardized cryptographic hash algorithm that produces a 256-bit message digest.",
    "SHA-256 is one member of the Secure Hash Algorithm 2 family specified by NIST. This field guide uses it once over a simple serialized block for teaching. Bitcoin's actual block-header proof-of-work applies SHA-256 twice and compares the numeric result with a target, so the simulator is intentionally simplified.",
    ["hash", "proof-of-work", "difficulty"],
    [nistHash, bitcoinPaper, bitcoinBlockReference],
  ),
  term(
    "previous-hash",
    "Previous hash",
    "Foundations",
    "A block field that points to the cryptographic hash of the block immediately before it.",
    "The previous-hash reference creates the visible chain. If an earlier block changes, its new hash no longer matches the value stored by its successor. Rebuilding a valid proof-of-work chain means updating that reference and redoing the required work for every affected descendant.",
    ["hash", "block", "chain-validity", "tamper-evidence"],
    [bitcoinPaper, ethereumBlocks],
    ["parent hash"],
  ),
  term(
    "nonce",
    "Nonce",
    "Proof of Work",
    "A value miners vary to produce different candidate hashes for the same block data.",
    "In this simulator the nonce starts at zero and increments until the SHA-256 digest begins with the required number of zero characters. A real protocol defines exactly which header fields miners can change and evaluates a numeric target rather than a text prefix, but the repeated-trial principle is the same.",
    ["mining", "difficulty", "proof-of-work", "hash"],
    [bitcoinPaper, bitcoinBlockReference],
  ),
  term(
    "difficulty",
    "Difficulty",
    "Proof of Work",
    "A measure related to how hard it is to find a proof-of-work hash that satisfies the network target.",
    "A stricter target leaves fewer acceptable hashes, so miners need more attempts on average. Networks such as Bitcoin adjust the target over time to regulate block production. This demo fixes difficulty at three leading hexadecimal zeros so mining finishes quickly enough for a browser lesson.",
    ["proof-of-work", "mining", "nonce", "hash"],
    [bitcoinPaper, bitcoinBlockReference],
    ["target", "mining difficulty"],
  ),
  term(
    "proof-of-work",
    "Proof of work",
    "Proof of Work",
    "A mechanism that makes producing an acceptable block computationally costly while keeping verification cheap.",
    "A miner repeatedly hashes candidate block headers until one falls below the required target. Other nodes can verify the result with a small amount of work. In a chain, altering history requires repeating proof-of-work for the changed block and its descendants, then competing with the work of the accepted network chain.",
    ["mining", "difficulty", "nonce", "chain-selection"],
    [bitcoinPaper, bitcoinBlockReference],
    ["PoW"],
  ),
  term(
    "mining",
    "Mining",
    "Proof of Work",
    "The process of constructing candidate blocks and searching for proof-of-work that satisfies the target.",
    "Mining is more than guessing a nonce in a real cryptocurrency network: miners also select transactions, construct a candidate block, validate rules, and propagate a successful block. The field guide isolates the nonce-search step so learners can see attempts, the resulting hash, and the cost of repairing descendants.",
    ["proof-of-work", "nonce", "difficulty", "block"],
    [bitcoinPaper, bitcoinBlockReference],
  ),
  term(
    "chain-validity",
    "Chain validity",
    "Proof of Work",
    "The result of checking every block's contents, proof, and link against the chain's rules.",
    "This simulator calls a block valid when its stored hash matches its current fields, its hash meets the teaching difficulty, and its previous hash matches the actual predecessor. Real nodes enforce many additional consensus and transaction rules. A locally consistent chain is therefore not automatically accepted by any real network.",
    ["blockchain", "previous-hash", "consensus", "proof-of-work"],
    [bitcoinPaper, bitcoinBlockReference],
    ["validation"],
  ),
  term(
    "tamper-evidence",
    "Tamper evidence",
    "Proof of Work",
    "The ability to detect that recorded data or its chain of references has changed.",
    "Hash links make edits evident because the changed block gets a different digest and later blocks still point to the old value. Proof-of-work raises the cost of rebuilding that history, while a distributed consensus process decides which history participants accept. This is why “tamper-evident” is more accurate than saying data is literally impossible to change.",
    ["hash", "previous-hash", "proof-of-work", "consensus"],
    [bitcoinPaper, nistHash],
    ["immutability", "tamper detection"],
  ),
  term(
    "node",
    "Node",
    "Networks & Consensus",
    "A computer running protocol software that exchanges, verifies, or stores blockchain data.",
    "Nodes have different roles and capabilities. A validating node independently checks blocks and transactions against consensus rules, while lightweight clients may rely on compact proofs or other nodes for some data. The browser field guide has no peers, so it should not be mistaken for a node on a public network.",
    ["peer-to-peer-network", "consensus", "transaction", "block"],
    [bitcoinPaper, bitcoinBlockReference],
  ),
  term(
    "peer-to-peer-network",
    "Peer-to-peer network",
    "Networks & Consensus",
    "A network in which participants exchange blocks and transactions directly rather than through one central server.",
    "In Bitcoin's design, transactions and newly found blocks are broadcast among nodes. Peer-to-peer communication helps the network propagate a shared view without a single central publisher, but it does not eliminate protocol rules, unequal connectivity, operational concentration, or the need to handle conflicting messages.",
    ["node", "consensus", "fork", "transaction"],
    [bitcoinPaper, bitcoinBlockReference],
    ["P2P"],
  ),
  term(
    "consensus",
    "Consensus",
    "Networks & Consensus",
    "The rules and process nodes use to agree on which state and history they will accept.",
    "Consensus combines validation rules with a method for resolving competing histories. Proof-of-work is one ingredient in Bitcoin's consensus, not a synonym for every blockchain consensus system. This local simulator validates one chain in one browser and therefore does not demonstrate distributed agreement.",
    ["node", "proof-of-work", "fork", "chain-selection"],
    [bitcoinPaper, bitcoinBlockReference],
  ),
  term(
    "fork",
    "Fork",
    "Networks & Consensus",
    "A point where nodes temporarily or deliberately follow different valid-looking blockchain histories or rules.",
    "A temporary chain fork can occur when miners produce competing blocks near the same time. Nodes keep track of alternatives and converge according to the protocol's chain-selection rule. The word also describes a lasting rule change that creates incompatible networks, so the surrounding context matters.",
    ["consensus", "chain-selection", "node", "block"],
    [bitcoinPaper],
  ),
  term(
    "chain-selection",
    "Chain selection",
    "Networks & Consensus",
    "The consensus rule nodes apply when more than one candidate blockchain history exists.",
    "Bitcoin nodes select the valid chain with the most accumulated proof-of-work, often described informally as the longest chain. Raw block count alone is not the precise rule. Chain selection lets independently operating nodes converge after temporary forks when one history accumulates more accepted work.",
    ["fork", "proof-of-work", "consensus", "51-percent-attack"],
    [bitcoinPaper, bitcoinBlockReference],
    ["longest chain", "heaviest chain"],
  ),
  term(
    "51-percent-attack",
    "51% attack",
    "Networks & Consensus",
    "A majority-hash-power attack in which one actor can outpace honest proof-of-work miners and reorganize recent history.",
    "An attacker controlling most active hash power can build an alternative chain faster than the honest network, potentially reversing the attacker's own recent payments or censoring transactions. It does not reveal private keys or allow arbitrary signatures, and its feasibility and impact depend on the network and duration.",
    ["proof-of-work", "chain-selection", "consensus", "digital-signature"],
    [bitcoinPaper, bitcoinBlockReference],
    ["majority attack"],
  ),
  term(
    "transaction",
    "Transaction",
    "Ownership & Applications",
    "A protocol-formatted instruction, usually authorized by a digital signature, that proposes a state change.",
    "A transaction can transfer value, call a smart contract, or perform another network-defined action. Nodes validate its authorization, format, and state-dependent conditions, including a signature when the protocol requires one. Broadcasting a transaction is not the same as having it included and confirmed in an accepted block.",
    ["digital-signature", "block", "wallet", "smart-contract"],
    [ethereumTransactions],
  ),
  term(
    "wallet",
    "Wallet",
    "Ownership & Applications",
    "An interface, application, or device that manages keys and helps a user interact with blockchain accounts.",
    "A wallet does not normally store coins as files inside the device; the network records state while the wallet controls the credentials used to authorize actions. Wallet designs range from self-custody tools to services where another party holds keys, so users need to understand who can sign and recover access.",
    ["private-key", "public-key", "digital-signature", "transaction"],
    [ethereumAccounts],
  ),
  term(
    "public-key",
    "Public key",
    "Ownership & Applications",
    "The non-secret value in an asymmetric key pair, used to verify signatures or derive identifiers.",
    "A public key can be distributed without revealing the private key. Depending on the protocol, addresses are derived from public keys rather than being identical to them. Others use the public key and signature to verify that a transaction was authorized by the corresponding private key.",
    ["private-key", "digital-signature", "wallet", "transaction"],
    [ethereumAccounts],
  ),
  term(
    "private-key",
    "Private key",
    "Ownership & Applications",
    "A secret value used to produce digital signatures that authorize actions for a blockchain account.",
    "Control of a private key usually means control of the actions that key can authorize. It should not be shared or placed in a website form. Losing it can make self-custodied assets inaccessible, while exposing it lets someone else sign. Wallets often protect or derive keys from recovery material.",
    ["public-key", "digital-signature", "wallet", "transaction"],
    [ethereumAccounts],
    ["secret key"],
  ),
  term(
    "digital-signature",
    "Digital signature",
    "Ownership & Applications",
    "A cryptographic value used to verify that the corresponding private key signed a specific message.",
    "A signing algorithm combines a private key with a message digest to create a signature. Verifiers use the corresponding public key to check it. Signatures provide authorization and integrity evidence, but application rules still determine whether a signed transaction is valid, timely, and permitted.",
    ["private-key", "public-key", "transaction", "hash"],
    [ethereumTransactions, ethereumAccounts, nistSignature],
    ["signature"],
  ),
  term(
    "smart-contract",
    "Smart contract",
    "Ownership & Applications",
    "Program code deployed to a blockchain that executes according to the network's rules when called.",
    "A smart contract stores code and often state at a blockchain address. Transactions invoke its functions, and every validating node reproduces the resulting state transition. The name does not guarantee that the program is legally a contract, intelligent, secure, upgradeable, or able to access off-chain facts without an additional mechanism.",
    ["transaction", "blockchain", "consensus", "wallet"],
    [ethereumContracts],
  ),
];

export const glossarySections = [
  "Foundations",
  "Proof of Work",
  "Networks & Consensus",
  "Ownership & Applications",
] as const;

export const glossaryById = new Map(glossaryTerms.map((item) => [item.id, item]));

export function searchGlossary(query: string): GlossaryTerm[] {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return glossaryTerms;

  return glossaryTerms
    .map((item) => {
      const name = item.name.toLocaleLowerCase();
      const aliases = item.aliases.join(" ").toLocaleLowerCase();
      const body = `${item.section} ${item.summary} ${item.explanation}`.toLocaleLowerCase();
      const score = name === normalized ? 100 : name.startsWith(normalized) ? 60 : aliases.includes(normalized) ? 40 : body.includes(normalized) ? 20 : 0;
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
    .map(({ item }) => item);
}
