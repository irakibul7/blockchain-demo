# Blockchain Field Guide

A hands-on blockchain simulator and sourced glossary for learning how hashes, proof of work, and linked blocks behave.

[Open the live field guide](https://blockchain-demo.therakibul.me/) · [Send feedback](https://github.com/irakibul7/blockchain-demo/issues/new?labels=feedback&title=Feedback%3A%20)

![Blockchain Field Guide social preview](./app/opengraph-image.png)

## What it teaches

The field guide turns blockchain mechanics into one continuous experiment:

1. Edit the data stored in a block.
2. See its SHA-256 hash change immediately.
3. Observe how the change breaks proof of work and later block references.
4. Re-mine the affected block and its descendants to repair the local chain.
5. Read the related glossary entries without leaving the learning flow.

This is a simplified, local educational simulator, not a cryptocurrency network. It uses one SHA-256 pass over a teaching-oriented block format and a leading-hex-zero target. Production protocols define their own serialization, targets, validation rules, networking, and consensus behavior.

## Features

- Interactive four-block chain with editable data
- Live hash comparison and chain-validity feedback
- Proof-of-work mining with visible nonce attempts
- Add-block and reset controls
- 24 beginner-friendly blockchain glossary terms
- Searchable glossary with `⌘K` and `Ctrl+K` shortcuts
- Shareable, crawlable pages for every term
- Primary technical sources and review dates beside definitions
- Responsive layout, keyboard focus styles, and semantic landmarks
- Canonical metadata, Open Graph and X cards, sitemap, robots.txt, and Schema.org `DefinedTerm` data
- Custom favicon and Apple touch icon

## Glossary

The glossary covers four connected groups:

- **Foundations:** blockchain, blocks, hashes, SHA-256, genesis blocks, and previous hashes
- **Proof of work:** nonces, difficulty, mining, chain validity, and tamper evidence
- **Networks and consensus:** nodes, peer-to-peer networks, forks, chain selection, and 51% attacks
- **Transactions and ownership:** transactions, wallets, public and private keys, digital signatures, and smart contracts

Definitions were reviewed against primary or protocol-maintained material from the [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf), [Bitcoin Developer Reference](https://developer.bitcoin.org/reference/block_chain.html), [NIST Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final), [NIST Digital Signature Standard](https://csrc.nist.gov/pubs/fips/186-5/final), and [Ethereum developer documentation](https://ethereum.org/developers/docs/). The complete editorial record is in [content-audit.md](./content-audit.md).

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- CryptoJS SHA-256
- Vitest
- ESLint
- Inter and IBM Plex Mono

The application is statically generated. The homepage, glossary term pages, sitemap, robots file, and social images can be deployed on any platform that supports a Next.js production build.

## Local development

### Requirements

- Node.js 20.9 or newer
- npm

### Setup

```bash
git clone git@github.com:irakibul7/blockchain-demo.git
cd blockchain-demo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm run lint` | Run ESLint |
| `npm run test` | Run the Vitest test suite |
| `npm run check` | Run type checking, linting, and tests |

## Project structure

```text
app/                     Routes, metadata, sitemap, robots, and social images
components/              Interactive field-guide interface
config/                  Site name, canonical domain, and project links
lib/blockchain.ts        Hashing, mining, and chain-validation logic
lib/glossary.ts          Reviewed glossary content and source records
lib/structured-data.ts   Schema.org glossary entities
public/                  Favicons and Apple touch icon
content-audit.md         Definition proofreading and fact-check record
```

## Quality checks

The project includes unit tests for blockchain behavior, glossary integrity, and structured data. Before opening a pull request, run:

```bash
npm run check
npm run build
```

## Contributing

Issues and pull requests are welcome. For content corrections, include a primary or protocol-maintained source and identify the glossary term being changed.

## Author

Built by [Rakibul Islam](https://therakibul.me/).

- [GitHub](https://github.com/irakibul7)
- [X](https://x.com/rkshuvo007)
- [LinkedIn](https://www.linkedin.com/in/rakibulislam39/)

## License

No license has been added yet. All rights are reserved by the repository owner unless a license file is introduced.
