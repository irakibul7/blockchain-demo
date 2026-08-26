# Design QA — Blockchain Field Guide

Final result: passed

## Comparison target

- Source visual truth: `docs/selected-design.png`
- Rendered implementation: `docs/prototype-desktop.png`
- Combined comparison: `docs/design-comparison.png`
- Route and state: `/`, initial tampered Block 02 state, light theme
- CSS viewport requested: 1440 × 1024 at device density 1
- Source pixels: 1487 × 1058
- Implementation pixels: 1425 × 1013 (the in-app browser reserved pixels for its scrollbar/chrome)
- Normalization: the source was scaled to 1425 × 1013 and placed beside the unchanged 1425 × 1013 browser capture in `docs/design-comparison.png`.

## Full-view evidence

The final side-by-side comparison shows the same editorial information hierarchy: fixed light navigation rail, compact single-line experiment headline, four-column timeline, three-column workbench, explanatory bridge, and glossary continuation. The implementation intentionally keeps the orange action color from the chosen product direction while preserving the source's cream paper, navy type, monospaced labels, fine rules, and dense technical layout.

No additional focused crop was needed because the normalized comparison keeps the full primary screen readable at original resolution and contains no photographic or illustrative assets. Important control, type, state, and spacing details were also inspected in the unscaled implementation capture.

## Comparison history

### Pass 1 — blocked

- [P1] The implementation used a dark navy sidebar while the selected design used a light paper rail.
- [P2] The oversized, wrapped headline and padded workbench pushed the glossary substantially farther below the fold than the selected design.
- [P2] Block 04 appeared valid even though the selected design communicated the broken ancestor state through every later block.

Fixes applied:

- Rebuilt the sidebar with the light paper surface, thin divider, neutral controls, and orange active marker.
- Reduced hero scale and vertical padding, compacted block cards and form controls, and removed the elevated workbench card treatment.
- Added cumulative chain-state presentation and the more precise “Earlier history invalid” reason while keeping each block's direct link check visible.

### Pass 2 — passed

The post-fix comparison in `docs/design-comparison.png` resolves all P1/P2 findings. The primary composition, density, light surface system, status semantics, and navigation proportions now align with the selected direction.

## Required fidelity surfaces

- Fonts and typography: Inter Variable and IBM Plex Mono reproduce the target's editorial sans/technical mono split. Heading wrapping, label tracking, weights, and code density are consistent with the design hierarchy.
- Spacing and layout rhythm: rail width, page margin, timeline grid, compact cards, workbench columns, and section rules match the source structure. Desktop and mobile have no page-level horizontal overflow; the block timeline scrolls locally on small screens by design.
- Colors and visual tokens: cream paper, navy content, muted neutral rules, green/red validation states, and orange active/action states are coherent and accessible. The orange proof-of-work CTA is an intentional brand-level deviation from the source's black button.
- Image quality and asset fidelity: the target contains no photography or illustration. Interface icons use one Phosphor icon family rather than hand-drawn SVG or placeholder assets.
- Copy and content: the app clearly identifies itself as a simplified local simulator, uses “tamper-evident” concepts rather than absolute immutability claims, and explains cumulative invalid history accurately.
- Accessibility and behavior: visible focus treatment, labelled inputs/dialogs, skip link, reduced-motion support, keyboard search, live mining announcements, and mobile menu semantics are present.

## Functional browser evidence

- Re-mining changed the initial state from “Invalid chain” to “Valid chain” and disabled the completed action.
- Adding “Certificate issued to Alice” mined and rendered Block 05 while preserving a valid chain.
- Glossary search returned relevant results and `/term/hash` loaded with its heading positioned in view.
- Mobile navigation and glossary search worked at 390 × 844; the document did not overflow horizontally.
- A clean browser load reported no console warnings or errors.

## Residual P3 polish

- The richer glossary introduction means the first definition begins slightly lower than in the selected mock. This is acceptable because it makes the 24-term collection easier to understand as a standalone section.
