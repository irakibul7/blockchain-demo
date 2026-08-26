# Blockchain Field Guide research

Date: 2026-08-26

## Existing-product findings

The original Blockchain Demo has the right educational core: learners can inspect blocks, edit data, mine proof-of-work, add blocks, and see validity change. The rebuild keeps those actions while replacing disconnected cards, tabs, accordions, and side panels with a continuous lesson.

The most important technical issue is main-thread proof-of-work. The old `Block` constructor mines synchronously, so startup and mining can delay rendering and input. The rebuild uses bounded mining batches that yield to the browser between batches. Web Workers are the next escalation if measured difficulty grows beyond the small classroom target.

Source: [MDN — Using Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers).

## Subject-matter findings

- A hash function produces a message digest that changes when the message changes. SHA-256 is defined by NIST's Secure Hash Standard.
- Bitcoin-style proof-of-work repeatedly changes a nonce until the block hash satisfies a target. A later block references the previous block's hash.
- Editing historical data changes its hash. Rewriting a proof-of-work chain requires redoing work for the changed block and its descendants, then overcoming the network's accepted chain. The demo illustrates only the local hash-link and proof-of-work mechanics.
- “Immutable” is too absolute for this teaching tool. “Tamper-evident” and “expensive to rewrite under the consensus model” are more accurate.

Primary sources:

- [Bitcoin: A Peer-to-Peer Electronic Cash System](https://bitcoin.org/bitcoin.pdf)
- [NIST FIPS 180-4 — Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final)
- [Ethereum.org — Blocks](https://ethereum.org/developers/docs/blocks/)

## Product direction

The selected direction is a continuous Chain Timeline inspired by the successful Agentic AI Glossary:

- A sticky left rail separates Experiments from Glossary.
- The primary lesson is “See one change travel through the chain.”
- A horizontal block sequence makes cause and effect visible.
- A focused workbench supports editing, comparing hashes, re-mining, resetting, and adding a block.
- The glossary follows the experiment in the same semantic document and has search, stable `/term/<slug>/` routes, sources, related terms, and review dates.
- The visible product name is **Blockchain Field Guide**.

## Visual system

- Warm paper surface, near-black text, subtle texture, and hairline rules.
- Inter for display/body and IBM Plex Mono for technical values.
- Red and green are reserved for invalid and valid state.
- No crypto-market imagery, wallets, prices, gradients, graph canvas, or dashboard card grid.
