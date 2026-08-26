# Blockchain Field Guide

## Product contract

- Preserve the project as an educational, local blockchain simulator. Never imply that it is a real distributed network.
- Use the selected visual target at `docs/selected-design.png`.
- Keep the experience editorial, warm monochrome, responsive, and naturally scrollable.
- Treat the experiment and glossary as one product. Terms need stable URLs, reviewed sources, and original explanations.
- Describe blockchains as tamper-evident and costly to rewrite under their consensus assumptions, not literally immutable.

## Engineering contract

- Keep blockchain calculations deterministic and independently testable in `lib/`.
- Do not perform unbounded proof-of-work loops without yielding control back to the browser.
- Run `npm run check` and `npm run build` before committing.
- Inspect the working interface at desktop and mobile widths, including the tamper and re-mine flow.
- Keep changes focused and do not commit generated caches or build output.
