export const REVIEWED_AT = "2026-09-07";
export const REVIEWED_LABEL = "September 7, 2026";
export const author = { name: "Rakibul Islam", url: "https://therakibul.me/" };
export const sources = {
  hash: { label: "NIST · Secure Hash Standard", url: "https://csrc.nist.gov/pubs/fips/180-4/upd1/final" },
  blocks: { label: "Bitcoin · Block headers and target", url: "https://developer.bitcoin.org/reference/block_chain.html" },
  chain: { label: "Bitcoin · Block chain and validation", url: "https://developer.bitcoin.org/devguide/block_chain.html" },
  paper: { label: "Bitcoin white paper · Sections 4–6 and 11", url: "https://bitcoin.org/bitcoin.pdf" },
  payments: { label: "Bitcoin · Payment processing", url: "https://developer.bitcoin.org/devguide/payment_processing.html" },
  broadcast: { label: "Bitcoin · sendrawtransaction", url: "https://developer.bitcoin.org/reference/rpc/sendrawtransaction.html" },
  transactions: { label: "Ethereum · Transactions", url: "https://ethereum.org/developers/docs/transactions/" },
  rpc: { label: "Ethereum · JSON-RPC receipts and block tags", url: "https://ethereum.org/developers/docs/apis/json-rpc/" },
  finality: { label: "Ethereum · Proof of stake and finality", url: "https://ethereum.org/developers/docs/consensus-mechanisms/pos/" },
  gasper: { label: "Ethereum · Gasper fork choice and finality", url: "https://ethereum.org/developers/docs/consensus-mechanisms/pos/gasper/" },
  accounts: { label: "Ethereum · Account nonce", url: "https://ethereum.org/developers/docs/accounts/" },
  idempotency: { label: "Stripe · Idempotent API requests (API example, not a blockchain rule)", url: "https://docs.stripe.com/api/idempotent_requests" },
  database: { label: "PostgreSQL · INSERT and ON CONFLICT", url: "https://www.postgresql.org/docs/current/sql-insert.html" },
};
export type SourceId = keyof typeof sources;
export const experiments = [
  {
    id: "hashing", title: "01 · Hashing: change one character", learn: "Recognize a deterministic hash: identical bytes give the same digest, while a small edit usually changes many hexadecimal digits.",
    steps: ["Press Reset in the workbench to restore the valid four-block chain.", "Read block 02: Payment of 25 to Alice. Compare Before edit and Current; they match.", "Change 25 to 250. Compare the full hashes, then restore the exact original text without re-mining."],
    result: "The edit produces a different 64-character SHA-256 digest. Restoring the original text restores the original hash because the timestamp, nonce, index, and parent hash stayed fixed. The hash is computed from all of those fields, not the transaction text alone.",
    mistakes: "A trailing space counts as data. Reset before comparing: re-mining can change the nonce. A hash is not encryption, and a different-looking digest does not tell you who changed the text.",
    limits: "This app hashes a pipe-delimited string once. Real protocols define exact byte encodings and data commitments. Hash collisions are possible in principle; they are not a practical way to repair this example.",
    question: "Why does restoring the text after re-mining not necessarily restore the Before edit hash?",
    answer: "Re-mining searches from nonce zero. If the nonce changed, the full hash input is different even when the text matches.",
    terms: ["hash", "sha-256", "nonce"], sources: ["hash", "blocks"] as SourceId[],
  },
  {
    id: "chaining", title: "02 · Chaining: validate the whole history", learn: "Separate a block’s own checks from the validity of the history it extends.",
    steps: ["Press Reset. Match each block’s Previous hash to its parent’s Hash in the timeline.", "Edit block 02 to Payment of 250 to Alice. Read the reason below blocks 02, 03, and 04; scroll the timeline sideways on a phone.", "Use Add block, enter Classroom record, then Mine and add block. Predict whether a new mined block can repair the earlier history.", "Re-mine from block 02 and check every link again."],
    result: "Block 03 keeps its old parent reference, so it no longer matches block 02. Block 04 can pass its own checks yet extend invalid history. Adding block 05 does not fix that. Re-mining in order updates each parent reference and restores the local chain.",
    mistakes: "Do not treat a leading-zero hash as a complete validation result. A new valid tip does not cure a bad ancestor. Displayed hashes are shortened; the program compares all 64 characters.",
    limits: "These checks cover hash consistency, parent references, and a toy target. Real validation also checks transactions, authorization, spending rules, and protocol-defined genesis and block structure. No peers vote on this local result.",
    question: "If block 04’s hash stays unchanged after an edit to block 02, why does block 04 show Invalid?",
    answer: "Its own fields can be internally consistent while its ancestry is invalid. The UI labels cumulative history, not just the current block.",
    terms: ["previous-hash", "chain-validity", "consensus"], sources: ["chain"] as SourceId[],
  },
  {
    id: "transaction-tampering", title: "03 · Tampering: rewrite a payment record", learn: "Trace an attempted historical edit without confusing a local rewrite with a network accepting it.",
    steps: ["Press Reset and note the payment in block 02.", "Change Payment of 25 to Alice to Payment of 250 to Alice.", "Check that block 02’s hash changes but block 03’s stored Previous hash does not.", "Re-mine from block 02. Compare the now-valid chain with the Before edit hash. Reset to discard the rewrite."],
    result: "The new text breaks the original hash commitment. For this chosen edit, block 02 also misses the target. Repairing the local chain changes the descendants’ commitments; it does not make the new payment authorized or rewrite anyone else’s copy.",
    mistakes: "Do not say all later stored hashes change immediately: they remain unchanged until re-mining. An arbitrary edit could happen to meet the target, but that would not fix the child’s old reference. The dollar sign in the initial demonstration is only text.",
    limits: "The browser deliberately lets you edit historical text. It has no signatures, balances, transaction execution, or competing honest chain. A real node would reject an unauthorized spend even inside a block with valid proof of work.",
    question: "Does a green chain prove Alice received a payment?",
    answer: "No. Green means the local teaching checks pass. The simulator never sends or executes payments.",
    terms: ["tamper-evidence", "transaction", "digital-signature"], sources: ["chain", "paper"] as SourceId[],
  },
  {
    id: "proof-of-work", title: "04 · Proof of work: search, then verify", learn: "Explain why finding a suitable nonce takes repeated attempts but checking a candidate requires one hash calculation here.",
    steps: ["Reset, then change block 02 to Payment of 250 to Alice.", "Read the target: three leading hexadecimal zeros. Re-mine from block 02 and watch the current-block attempt counter.", "Inspect the resulting nonces and hashes. Each repaired block meets the target.", "Reset and repeat the same edit. Compare nonces. Then try different text and compare again."],
    result: "The same starting fields and search order give the same nonces. Different input changes the search. With uniformly distributed digests, a three-zero target succeeds with probability 1/4096 per attempt, giving an expected 4096 attempts, not a deadline or guarantee. Attempts shown during mining restart for each block.",
    mistakes: "A larger nonce is not a measure of a miner’s intelligence. One run cannot establish a timing benchmark. The simulator yields between batches, so wall-clock time includes browser scheduling.",
    limits: "Bitcoin compares a double-SHA-256 block-header hash against a numeric target and adjusts difficulty under its rules. This fixed target, single-hash demo has no hardware competition or rewards. Ethereum uses proof of stake, not this mining process.",
    question: "If a valid nonce is given to you, must you repeat all preceding failed attempts?",
    answer: "No. Recalculate the candidate hash and check the target. Real nodes must additionally validate the entire block and its transactions.",
    terms: ["proof-of-work", "difficulty", "mining"], sources: ["blocks", "finality"] as SourceId[],
  },
];
