# Glossary content audit

Reviewed: 2026-08-26

## Method

All 24 summaries and definitions were proofread for clarity, grammar, internal consistency, and overstatement. Technical claims were checked against primary or protocol-maintained sources:

- Satoshi Nakamoto, *Bitcoin: A Peer-to-Peer Electronic Cash System*
- Bitcoin Developer Reference, *Block chain*
- NIST FIPS 180-4, *Secure Hash Standard*
- NIST FIPS 186-5, *Digital Signature Standard*
- Ethereum.org developer documentation for blocks, transactions, accounts, and smart contracts

The review keeps the simulator's teaching shortcuts explicit: one SHA-256 pass rather than Bitcoin's double-SHA-256 header hash, a leading-hex-zero teaching target rather than a numeric protocol target, and one local chain rather than distributed consensus.

## Results

| Term | Result | Review note |
| --- | --- | --- |
| Blockchain | Passed | Describes hash-linked records without claiming every blockchain is proof-of-work. |
| Block | Passed | Separates the simulator's fields from protocol-specific production formats. |
| Genesis block | Passed | Correctly describes a protocol-defined starting block and the demo's zero sentinel. |
| Hash | Passed | Distinguishes hashing from encryption and authorship proof. |
| SHA-256 | Passed | Clarifies 256-bit output and Bitcoin's double-SHA-256 header hashing. |
| Previous hash | Passed | Accurately explains parent references and descendant repair. |
| Nonce | Passed | Separates the demo's counter from protocol-defined mutable header fields. |
| Difficulty | Passed | Distinguishes a target threshold from the demo's fixed leading-zero rule. |
| Proof of work | Passed | Covers costly production, cheap verification, and cumulative repair cost. |
| Mining | Passed | Notes that real mining includes candidate construction and propagation. |
| Chain validity | Passed | States that local consistency does not imply acceptance by a real network. |
| Tamper evidence | Passed | Uses “tamper-evident” instead of claiming literal immutability. |
| Node | Passed | Distinguishes validating nodes, lightweight clients, and this browser demo. |
| Peer-to-peer network | Passed | Avoids implying that P2P removes rules or operational concentration. |
| Consensus | Passed | Treats proof-of-work as one consensus ingredient, not a universal synonym. |
| Fork | Passed | Covers temporary competing histories and lasting rule changes. |
| Chain selection | Passed | Uses accumulated proof-of-work rather than raw block count. |
| 51% attack | Passed | Limits capabilities to reorganization/censorship; excludes key theft and arbitrary signatures. |
| Transaction | Revised | Now allows protocol variation instead of implying every transaction always has the same signature model. |
| Wallet | Revised | Aligns with Ethereum's distinction between an account and a wallet interface. |
| Public key | Revised | Replaces “shareable half” with the more precise “non-secret value.” |
| Private key | Passed | Covers authorization, loss, exposure, and recovery material without claiming coins live in a key. |
| Digital signature | Revised | Describes verification of a corresponding-key signature without overclaiming real-world identity. |
| Smart contract | Passed | Avoids claims that “smart” means intelligent, legal, secure, or self-sufficient off-chain. |

Final result: passed
