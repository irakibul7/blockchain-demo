# Educational expansion review

Technical review date: September 7, 2026.

## Baseline and scope

The supplied directory initially had a clean checkout of `main` at `0b320df`, which contains the original Blockchain Demo. The published site was inspected in a browser and matched the existing local `codex/editorial-rebuild` branch at `86b2d57`. Work was therefore performed on that branch. Its AGENTS.md, simulator, four experiment navigation entries, 24 glossary definitions, tests, existing research, content audit, and CSS were inspected before implementation. No commits, pushes, or deployments were performed.

Preserved the warm paper layout, fonts, sidebar/mobile navigation, linked-block timeline, workbench, mining algorithm and yielding behavior, reset/add controls, glossary search, existing term URLs, and original source review dates. The deterministic blockchain model was not changed.

## Changes

- Four guided lessons: hashing, chaining/validation, transaction tampering, and proof of work. Each includes learning objectives, exact instructions, expected observations with explanations, common mistakes, simulator limitations, a prediction/check question, primary references, and links back to the existing workbench.
- Three original, statically rendered articles:
  - `/articles/why-changing-one-transaction-breaks-a-blockchain/`
  - `/articles/transaction-submitted-versus-confirmed/`
  - `/articles/preventing-duplicate-blockchain-payments-on-retry/`
- Two offline Node.js examples, displayed in article HTML and downloadable from `/examples/`: hash-change.mjs reproduces the simulator's fixture; retry-payments.mjs demonstrates a lost submission response, concurrent retries, and conflicting parameters.
- Four additional glossary terms: confirmations, finality, reorganization, and idempotency. Existing 24 terms retain August 26 review dates; new material uses September 7. No publication date or personal experience was invented.
- Relevant links between articles, guided lessons, and glossary terms. Article content remains server-rendered; the simulator receives only small article-link records and server-rendered lesson content.
- Visible Rakibul Islam authorship linking to https://therakibul.me/. Article JSON-LD uses the same visible name, URL, headline, description, and update date, with an embedded Person author. No unsupported credentials, endorsements, or claims of human reviewer participation were added.
- Unique article metadata, self-referencing canonicals, social metadata, sitemap entries, and unknown-article 404s. Trailing-slash routing now matches the pre-existing canonical/sitemap convention; unsuffixed routes redirect to the same content.
- State-sensitive “What just happened?” text after reset, tampering, or re-mining. It no longer describes an invalid chain after repair or claims every possible edit must miss the target.
- New-block input uses the same 512-character limit as the existing data editor and is disabled during mining.

## Technical source review

Primary documentation was opened and checked on September 7, 2026. These notes identify which sources support which claims; they are not claims that the authors of those documents reviewed this guide.

| Source | Claims checked and editorial treatment |
| --- | --- |
| [NIST Secure Hash Standard](https://csrc.nist.gov/pubs/fips/180-4/upd1/final) | SHA-256 digest size and deterministic hashing. No assertion of mathematically unique hashes. |
| [Bitcoin block reference](https://developer.bitcoin.org/reference/block_chain.html) | Header commitments, double SHA-256 and numeric proof-of-work target; distinguished from the simulator's single hash and leading-zero convention. |
| [Bitcoin chain guide](https://developer.bitcoin.org/devguide/block_chain.html) | Merkle commitments, parent hashes, transaction validation, UTXO spending and accumulated-work selection among valid histories. |
| [Bitcoin white paper](https://bitcoin.org/bitcoin.pdf) | Work required to compete with accepted history and probabilistic settlement assumptions. No absolute immutability or fixed safe confirmation threshold. |
| [Bitcoin payment processing](https://developer.bitcoin.org/devguide/payment_processing.html) | Inclusion/confirmations, conflicting transactions and payment-observation risk. |
| [Bitcoin sendrawtransaction](https://developer.bitcoin.org/reference/rpc/sendrawtransaction.html) | Broadcasting prepared serialized transactions; submission is separated from settlement. |
| [Ethereum transactions](https://ethereum.org/developers/docs/transactions/) | Submission, inclusion and execution outcome are distinct. |
| [Ethereum JSON-RPC](https://ethereum.org/developers/docs/apis/json-rpc/) | Receipt or null, receipt status, block hashes/numbers, safe/finalized tags. Null is treated conservatively as no receipt found, not proof that a payment never happened. |
| [Ethereum proof of stake](https://ethereum.org/developers/docs/consensus-mechanisms/pos/) and [Gasper](https://ethereum.org/developers/docs/consensus-mechanisms/pos/gasper/) | Stake-based checkpoint finality and fork choice. No fixed elapsed-time promise; no equation of Bitcoin confirmations with Ethereum finality. |
| [Ethereum accounts](https://ethereum.org/developers/docs/accounts/) | Account transaction nonce distinguished from the simulator's mining counter. |
| [Stripe idempotent requests](https://docs.stripe.com/api/idempotent_requests) | Stable operation identity and parameter consistency as an API design example, explicitly not a blockchain protocol rule. |
| [PostgreSQL INSERT](https://www.postgresql.org/docs/current/sql-insert.html) | Unique-conflict handling as one component of durable concurrent reservation. No claim of atomic commitment between a database and a blockchain node. |

Application recovery guidance and the fictional classroom exercises are explanatory design examples. They are not reports of deployed payment systems, production results, or performance measurements.

## Verification results

- `npm ci`: successful using the existing lockfile. Dependency warnings are recorded below.
- `npm run check`: typecheck and ESLint pass; 14 tests pass across four files (nine existing tests and five new learning-contract tests).
- `npm run build`: successful Next.js production build; all three articles and all 28 term pages statically generated.
- `npm run check:production`: passed against the production server at 127.0.0.1:3100. Inspects raw HTML without client JavaScript: all 32 sitemap content pages, all local anchor destinations/fragments, distinct article titles/descriptions, canonical/JSON-LD agreement, visible review dates, crawlable article bodies, example download routes, and unknown-article 404.
- Both examples execute under Node and their assertions pass. The retry example reports one simulated effect, identical intent IDs across concurrent retries, and rejection of conflicting parameters.
- `git diff --check`: passed.
- React review: kept article/lesson content server-rendered, stable keys and derived UI state, no new data-fetching effects or client dependencies. Used existing design tokens and semantic headings; example panels are keyboard-focusable and horizontally scrollable.

Browser verification used the Codex in-app browser at 1440×1000 and 390×844:

- Desktop reset → valid; edit 25 to 250 → invalid; re-mine → valid, with correct contextual explanation.
- Mobile reset/edit; add block 05 to invalid history → history remains invalid; re-mine all affected blocks → valid. Controls stay within the narrow viewport; the existing timeline scrolls horizontally.
- Mobile navigation opens, follows a lesson anchor and closes. Lessons have readable step lists, questions and reference links.
- Article reading layouts inspected on desktop and mobile; all three article titles verified. Code overflow stays inside the code panel, not the document.
- Related article navigation and keyboard navigation, table-of-contents anchors, article-to-glossary navigation, new glossary definitions, idempotency search and Escape dismissal verified.
- No browser warnings or errors observed on the verified final pages. A local production server was restarted after rebuilding before final checks.

## Limitations and follow-up

- The simulator remains one local chain. It does not implement balances, transaction authorization, a mempool, competing branches, receipts, network consensus, or finality. Articles explicitly explain those missing layers. No real funds, secrets, credentials, or RPC endpoints are used by examples.
- The retry example is deliberately in-memory and single-process. It does not test process crash persistence, multiple service replicas, replacement policies, or reorganization recovery. Those are described as production requirements, not demonstrated guarantees.
- The existing fixed toy difficulty keeps mining small and yields every 250 attempts. There is no new mining benchmark, mining hardware simulation, or claim of bounded completion time.
- Browser verification covers one browser implementation and desktop/mobile viewport sizes, not physical iOS/Android devices or a full assistive-technology audit.
- `npm audit --omit=dev` reports three high-severity package findings in the unchanged dependency versions: Next.js 16.2.1 and its PostCSS/sharp dependencies. These predate the content changes. The audit recommends upgrading Next.js; no framework/dependency upgrade was mixed into this patch. Address before a later deployment. CryptoJS also reports that active development has ended.
- Search-engine indexing and rich-result appearance cannot be guaranteed by metadata. The HTML and structured-data implementation were verified locally; no production deployment or search-console submission was performed.

## Reproduce

```sh
npm ci
npm run check
npm run build
npm run start -- --hostname 127.0.0.1 --port 3100
# In another terminal:
npm run check:production
node public/examples/hash-change.mjs
node public/examples/retry-payments.mjs
```

Set `CHECK_BASE_URL` if using a different local production port. Keep review dates tied to substantive technical review rather than automatically advancing them on each build.
