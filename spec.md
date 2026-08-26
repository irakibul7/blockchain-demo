# Blockchain Field Guide specification

Status: Approved for implementation

## Outcome

Build a responsive learning tool that helps a beginner understand how hashes, previous-hash references, nonces, difficulty, and proof-of-work make a simple chain tamper-evident. The experience must combine a working local simulator with a sourced blockchain glossary.

## Core journey

1. Inspect four linked blocks.
2. Edit block 02 and immediately see its hash change.
3. See block 02 fail proof-of-work and later blocks fail their previous-hash checks.
4. Re-mine from block 02, with visible progress and a responsive UI.
5. Reset the experiment or add a new block.
6. Continue into the glossary or search for a concept.

## Glossary

The first release contains 24 reviewed terms across foundations, proof-of-work, networks, and ownership. Each term includes:

- stable slug and canonical `/term/<slug>/` route;
- plain-English summary and expanded original explanation;
- source links and review date;
- related-term links and search aliases.

## Hard requirements

- Visible name: **Blockchain Field Guide**.
- Retain the existing repository and Vercel-friendly Next.js deployment.
- Make it explicit that this is a simplified local simulator, not a real blockchain network.
- Never block the interface with one unbounded mining loop.
- Natural document scrolling; no graph or node-map interface.
- Responsive from 320px upward, complete keyboard operation, visible focus, and reduced-motion support.
- Static metadata, sitemap, robots, semantic HTML, and crawlable term routes.
- Original explanatory content grounded in primary sources.

## Acceptance checks

- Editing block data changes its calculated hash.
- Invalidity propagates through later previous-hash references.
- Re-mining restores a valid chain and reports attempts.
- Adding a block preserves sequential indexes and links.
- Search finds names, aliases, summaries, and explanations.
- All 24 related-term references resolve.
- Type check, lint, unit tests, production build, desktop QA, and mobile QA pass.
