import type { SourceId } from "./learning";

export type Article = {
  slug: string; title: string; description: string; scope: string;
  experiments: string[]; terms: string[]; example?: string;
  sections: { id: string; title: string; paragraphs: string[]; sources: SourceId[] }[];
};

export const articles: Article[] = [
  {
    slug: "why-changing-one-transaction-breaks-a-blockchain",
    title: "Why changing one transaction breaks a blockchain",
    description: "Follow a transaction edit through hashes, parent links, and proof of work, and learn why repairing a local chain does not rewrite a real network.",
    scope: "General hash-link concepts, with Bitcoin-specific proof of work and explicit simulator limits.",
    experiments: ["transaction-tampering", "hashing", "chaining", "proof-of-work"],
    terms: ["hash", "previous-hash", "tamper-evidence", "chain-validity", "digital-signature"],
    example: "hash-change.mjs",
    sections: [
      { id: "one-edit", title: "Start with a concrete edit", paragraphs: [
        "Reset the workbench, then change block 02 from Payment of 25 to Alice to Payment of 250 to Alice. The original chain records one statement; your edited copy records another. The immediate problem is not that text became unreadable. It is that the cryptographic references no longer describe one consistent history.",
        "The workbench recalculates the edited block’s hash immediately. Block 03 still holds the old hash as its parent reference. Block 04 still points correctly to block 03, but the history beneath it is broken. This is why the interface distinguishes Previous hash mismatch from Earlier history invalid. Later stored hashes do not spontaneously change when you type."
      ], sources: [] },
      { id: "commitment", title: "A hash commits to bytes, not intentions", paragraphs: [
        "A hash summarizes an exact input. Changing a character, whitespace, or another hashed field normally changes the digest. Repeating the same input gives the same output. SHA-256 produces 256 bits, displayed here as 64 hexadecimal characters. Collisions must exist because there are more possible messages than digests; practical collision resistance, rather than mathematical uniqueness, is the useful property.",
        "In this simulator, index, timestamp, data, previous hash, and nonce are joined with a pipe character and hashed once. The downloadable example below uses that same encoding. Restoring only the text after changing the nonce is not restoring the complete input. Nor does a matching digest establish who authorized a transaction: that is a separate question."
      ], sources: ["hash"] },
      { id: "bitcoin", title: "Bitcoin commits through a block header", paragraphs: [
        "Bitcoin does not concatenate payment sentences. Its serialized transactions feed a Merkle tree whose root is in the block header. The header also contains a previous-header hash. Altering transaction data changes the commitment and therefore the header hash, except for a cryptographic collision. Bitcoin hashes the header twice with SHA-256 for proof of work.",
        "An edited header usually loses its acceptable proof of work. Even if it accidentally still meets the target, the next block’s old reference does not point to it. Rebuilding the affected suffix means updating those references and finding acceptable work again. Counting blocks alone misses a crucial Bitcoin rule: chain selection compares accumulated work among valid chains."
      ], sources: ["blocks", "chain"] },
      { id: "repair", title: "Repairing your copy is not winning consensus", paragraphs: [
        "Click Re-mine from block 02. The app rebuilds one local suffix in order and shows green when its checks pass. It deliberately gives you control over that copy. There is no race against honest miners, no propagation delay, and no other node deciding whether to accept your rewrite.",
        "On Bitcoin, an attacker trying to replace accepted history must contend with work added by the network. The white paper analyzes that race under stated assumptions; it does not make rewriting mathematically impossible. More buried history generally makes an attack harder under those assumptions. A reorganization can still replace recent blocks."
      ], sources: ["paper"] },
      { id: "authorization", title: "Valid work cannot authorize an invalid payment", paragraphs: [
        "Changing an amount in an ordinary signed payment also changes data that authorization commits to. Validating nodes check spending and authorization rules, not just a hash target. An attacker cannot make an unauthorized spend acceptable merely by mining a good-looking header. The exact signature coverage and transaction rules depend on the protocol and transaction type.",
        "The simulator omits those checks. Payment of 250 to Alice is a label, not an executed transfer. Its green state is evidence only of local hash, link, and target consistency. Use the chain-validation exercise to see why even a newly mined tip cannot repair an invalid ancestor."
      ], sources: ["chain"] },
      { id: "take-away", title: "What the experiment establishes", paragraphs: [
        "The useful claim is tamper evidence: a modified record conflicts with existing commitments. Resistance to replacing that history comes from the surrounding validation and consensus system. Hashing, signatures, proof of work, and chain selection solve different parts of the problem.",
        "Try the edit, restore the exact original text before mining, and watch the original digest return. Then repeat with re-mining in between. Explain the difference using the nonce. Next, read Transaction submitted versus transaction confirmed to connect local history to the uncertainty a payment application must track."
      ], sources: [] },
    ],
  },
  {
    slug: "transaction-submitted-versus-confirmed",
    title: "Transaction submitted versus transaction confirmed",
    description: "Separate broadcast, inclusion, execution success, confirmations, and finality, with Bitcoin and Ethereum examples and a plan for reorganizations.",
    scope: "General transaction lifecycle; Bitcoin confirmations and Ethereum receipts/finality are labeled separately.",
    experiments: ["chaining", "transaction-tampering"], terms: ["transaction", "node", "fork", "consensus", "chain-selection", "confirmations", "finality", "reorganization"],
    sections: [
      { id: "acknowledgment", title: "A submission response is an acknowledgment", paragraphs: [
        "A user clicks Pay, the application calls a node, and a transaction identifier appears. That identifier is useful for tracking, but it is not proof that the recipient was paid. A transaction can be constructed and identified before any block includes it. A node’s response describes what that node knows, not a promise from every participant.",
        "Separate the application’s states: prepared; submission outcome unknown or acknowledged; pending; included; execution failed or succeeded where applicable; and settled under a declared policy. These are application labels, not a universal protocol enum. Preserve uncertainty instead of turning every timeout into Failed or every successful HTTP response into Paid."
      ], sources: ["broadcast", "transactions"] },
      { id: "pending", title: "Pending is a local observation", paragraphs: [
        "Pending often means a node knows a candidate transaction that is not yet included. Nodes can have different transaction pools. A request may be rejected, a transaction may be evicted, or a conflicting candidate may be selected. Fees and transaction validity influence what happens next; merely waiting does not guarantee inclusion.",
        "If submission times out, first look up the already-known transaction identifier. A missing result can reflect the queried node’s limited view, not proof that no transaction exists. Keep the operation unresolved while reconciling. Creating another payment immediately can turn a transport failure into a duplicate business payment."
      ], sources: ["payments", "rpc"] },
      { id: "bitcoin-confirmations", title: "Bitcoin: inclusion begins the confirmation count", paragraphs: [
        "For a transaction in the active Bitcoin chain, its containing block is commonly counted as confirmation one. Each following block adds another. If inclusion height is 100 and the active tip is 102, the count is three: 102 − 100 + 1. That arithmetic only applies after verifying that the containing block is still in the active chain.",
        "Bitcoin settlement confidence is probabilistic. Confirmation counts are risk inputs, not universal guarantees or a fixed safety threshold for every payment. A system should choose its policy based on the transaction’s consequences and its threat model, then document that policy rather than borrowing a number from a different network."
      ], sources: ["payments", "paper"] },
      { id: "ethereum-receipt", title: "Ethereum: a receipt is not the whole payment check", paragraphs: [
        "Ethereum’s eth_getTransactionReceipt returns a receipt or null if none was found. For an included transaction, status 0x1 indicates execution success; 0x0 indicates failure. A failed transaction can still be included and consume gas. Inclusion and successful execution are therefore distinct observations.",
        "Even a successful receipt is not a business-level payment assertion. Check the intended chain, recipient, asset, and amount. For a contract interaction, verify the relevant execution result or event from the intended contract; a successful unrelated call is not payment for your order. Preserve the receipt’s block hash as well as its number so a later check can detect changed history."
      ], sources: ["rpc", "transactions"] },
      { id: "finality", title: "Ethereum: finality is more than counting blocks", paragraphs: [
        "Ethereum currently uses proof of stake. Gasper combines fork choice with checkpoint finality. Validators representing at least two-thirds of the stake establish the supermajority links used to justify and finalize checkpoints. Finalized history has stronger consensus assurances than recent head blocks; conflicting finalization would violate safety assumptions and imply substantial slashable stake.",
        "Ethereum JSON-RPC exposes safe and finalized block tags where supported. To judge a receipt, establish that its block belongs to the relevant canonical history and is covered by your policy’s checkpoint; comparing block numbers without checking ancestry is insufficient. Finality can stall, so elapsed time alone is not a substitute for observing it. Other networks and layer 2 systems can have different settlement boundaries."
      ], sources: ["finality", "gasper", "rpc"] },
      { id: "reorganizations", title: "A reorganization changes the observed history", paragraphs: [
        "A reorganization replaces a suffix of the chain a node had selected. A previously included transaction might appear in a replacement block, return to pending, or conflict with the replacement history. Confirmation counts can fall. An application must be able to move an observed payment back into an unresolved state rather than treating inclusion as an irreversible database fact.",
        "Record the operation identifier, all known transaction identifiers, inclusion block hash and height, execution outcome, and settlement policy. Recheck canonical inclusion before fulfillment, deduplicate repeated notifications, and retain an audit trail when an observation changes. If a reorganization affects already-delivered goods, route that to an explicit recovery policy rather than silently paying again.",
        "The chaining exercise demonstrates why ancestry matters but does not simulate competing branches, receipts, or finality. Adding a local block is not a network confirmation. Continue with the retry article to see how one business operation can survive an ambiguous submission response."
      ], sources: ["gasper", "payments"] },
    ],
  },
  {
    slug: "preventing-duplicate-blockchain-payments-on-retry",
    title: "Preventing duplicate blockchain payments when requests retry",
    description: "Design retries around one durable payment intent, reconcile ambiguous broadcasts, and test an offline example that prevents duplicate simulated effects.",
    scope: "Application design with Bitcoin and Ethereum distinctions. The runnable example is an in-memory teaching model, not a payment service.",
    experiments: ["chaining"], terms: ["transaction", "nonce", "chain-validity", "smart-contract", "idempotency", "reorganization"], example: "retry-payments.mjs",
    sections: [
      { id: "timeout", title: "The dangerous retry happens after an unknown outcome", paragraphs: [
        "Imagine an order refund. A worker broadcasts its transaction and then loses the response. A second attempt interprets the timeout as No payment happened, creates a new transaction, and sends another refund. Both transactions may be valid. Consensus can prevent spending the same input twice without knowing that two different valid transfers were intended to refund the same order only once.",
        "This is a gap between transport, ledger, and business semantics. Exactly once is not something an HTTP retry loop can promise across those boundaries. The design goal is one authorized payment intent, with repeated attempts that either refer to that intent or explicitly reject conflicting instructions."
      ], sources: ["chain", "broadcast"] },
      { id: "identity", title: "Choose the identity before doing the work", paragraphs: [
        "Give each logical operation a stable identifier, such as order-1024-refund-1, and reuse it on retries. Scope it to the authenticated customer or merchant. Associate it with a normalized payload containing network, asset identity, destination, integer amount in base units, and business purpose. Reject the same identifier with different parameters; do not quietly return success for a different payment.",
        "Do not deduplicate only by amount and recipient: two legitimate purchases can share both. Conversely, an idempotency identifier alone is insufficient if a client can mint a new one for every retry. Enforce the business rule with a durable unique constraint on the operation being paid, such as the authorized refund record."
      ], sources: ["idempotency"] },
      { id: "durability", title: "Persist the intent and coordinate workers", paragraphs: [
        "In one database transaction, reserve the operation and create a durable work item. A unique constraint arbitrates concurrent requests; a read-then-insert check does not. PostgreSQL’s ON CONFLICT can support that reservation, but the application must still verify that an existing row belongs to the caller and has the same normalized payload.",
        "Use a durable state machine and worker coordination to prevent two workers from independently preparing different transfers. Persist the prepared transaction’s identity and the exact broadcast artifact before external submission. The database cannot atomically commit with an arbitrary blockchain node, so recovery must cover both crash-before-send and crash-after-send-before-response. Never delete an uncertain record simply to unlock a retry."
      ], sources: ["database"] },
      { id: "reconcile", title: "Retry observation and delivery, not payment creation", paragraphs: [
        "After an ambiguous submission, reconcile the known transaction against node observations and recorded attempts. If rebroadcast is appropriate for the protocol, resend the same prepared transaction rather than constructing a second payment. Repeated broadcasts can produce different RPC responses, such as Already known; that is not a second ledger effect and is not by itself settlement evidence.",
        "Keep status polling separate from signing or creating another transfer. Apply bounded backoff and jitter to transient failures. Classify invalid-transaction errors separately from transport failures. Escalate unresolved outcomes instead of retrying forever or inventing a new intent. A crash recovery job should resume from durable state and include every known replacement in reconciliation."
      ], sources: ["broadcast", "rpc"] },
      { id: "protocols", title: "Protocol duplicate protection has a different scope", paragraphs: [
        "Bitcoin prevents an accepted transaction from spending an already-spent output. Two payments funded from different outputs can still both be accepted. Rebroadcasting identical serialized bytes refers to the same transaction; rebuilding a payment can change its identifier and spending choices. Replacement and fee-bumping flows need their own tracked relationships.",
        "An Ethereum account’s transaction nonce orders its transactions. At most one transaction with a given sender nonce can execute in a particular canonical history, but a retry created with the next nonce can execute as another payment. The account nonce is not the proof-of-work search counter shown in this guide. Fee replacements using the same account nonce remain part of the same operation and require reconciliation after reorganizations.",
        "For a contract you control, an operation identifier recorded and checked atomically with the intended effect can provide another layer of deduplication. Its authorization, namespace, and replay scope must be designed carefully. It cannot retroactively protect transfers sent through unrelated contracts or with newly invented operation identifiers."
      ], sources: ["chain", "accounts"] },
      { id: "exercise", title: "Run the timeout exercise without a network", paragraphs: [
        "Download the example below and run it with Node.js 20 or later. It uses a Map as the intent store and a Set as a fake ledger. The first send applies an effect and deliberately loses its response. The next request reuses the recorded intent and observes the existing effect. Concurrent retries return that same intent; a changed amount with the same operation identifier is rejected.",
        "Expected output includes simulated effects: 1 and conflicting retry: rejected. Change the retry’s operation identifier to represent a second operation and observe why an API-level identifier cannot enforce a business rule on its own. The assertions deliberately fail if the same-intent expectation is no longer met.",
        "The fake ledger models duplicate recognition only. It has no balances, signatures, RPC endpoint, or funds. The Map loses state at process exit and is not safe across service replicas. Production requires durable uniqueness, authorization, crash recovery, network-specific replacement handling, and settlement/reorganization tracking. Use this example to reason about the failure boundary, not as deployable payment code."
      ], sources: [] },
      { id: "fulfillment", title: "Deduplicate the business effect too", paragraphs: [
        "A once-submitted transaction can generate repeated webhook or polling observations. Protect fulfillment with its own durable uniqueness rule, tied to the business operation, and apply it only after verifying the intended payment and settlement policy. An idempotent refund API paired with a non-idempotent fulfillment handler still leaves a duplicate-effect path.",
        "Test concurrent requests, changed parameters, process restarts, the broadcast response being lost, replacement transactions, duplicate notifications, and an inclusion that disappears. The offline example covers only the first, second, and ambiguous-response cases. The submitted-versus-confirmed article explains the remaining observation states."
      ], sources: [] },
    ],
  },
];
