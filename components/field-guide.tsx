"use client";

import {
  ArrowCounterClockwise,
  ArrowRight,
  CheckCircle,
  Hammer,
  Info,
  LinkSimple,
  List,
  MagnifyingGlass,
  Plus,
  X,
  XCircle,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  appendBlock,
  createInitialChain,
  DEFAULT_DIFFICULTY,
  getBlockValidity,
  isChainValid,
  remineFrom,
  shortenHash,
  updateBlockData,
  type BlockRecord,
  type MiningProgress,
} from "@/lib/blockchain";
import {
  glossaryById,
  glossarySections,
  glossaryTerms,
  searchGlossary,
} from "@/lib/glossary";

type FieldGuideProps = {
  initialTermId?: string;
};

const initialValidChain = createInitialChain();

function createTeachingChain() {
  return updateBlockData(initialValidChain, 1, "Payment of $25 to Alice");
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(new Date(value));
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchGlossary(query), [query]);
  const closeDialog = () => {
    setQuery("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="search-backdrop" role="presentation" onMouseDown={closeDialog}>
      <section
        className="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="search-dialog__header">
          <div>
            <p className="eyebrow">Glossary search</p>
            <h2 id="search-title">Find a blockchain term</h2>
          </div>
          <button className="icon-button" onClick={closeDialog} aria-label="Close search">
            <X size={20} />
          </button>
        </header>
        <label className="search-field">
          <MagnifyingGlass size={20} aria-hidden="true" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Escape") closeDialog();
            }}
            placeholder="Search hash, nonce, consensus…"
          />
          <span>{results.length}</span>
        </label>
        <div className="search-results" aria-live="polite">
          {results.length ? (
            results.map((item) => (
              <Link key={item.id} href={`/term/${item.id}/`} className="search-result" onClick={closeDialog}>
                <span>
                  <small>{item.section}</small>
                  <strong>{item.name}</strong>
                  <span>{item.summary}</span>
                </span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            ))
          ) : (
            <p className="search-empty">No glossary terms match “{query}”.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export function FieldGuide({ initialTermId }: FieldGuideProps) {
  const [chain, setChain] = useState<BlockRecord[]>(createTeachingChain);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mining, setMining] = useState(false);
  const [progress, setProgress] = useState<MiningProgress | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [newBlockData, setNewBlockData] = useState("");
  const [addingBlock, setAddingBlock] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const activeBlock = chain[1];
  const beforeHash = initialValidChain[1].hash;
  const validities = chain.map((block, index) =>
    getBlockValidity(block, chain[index - 1]),
  );
  const cumulativeValidity = validities.map((validity, index) =>
    validity.isValid && validities.slice(0, index).every((item) => item.isValid),
  );
  const chainValid = isChainValid(chain);

  useEffect(() => {
    if (!initialTermId) return;
    const target = document.getElementById(`glossary-${initialTermId}`);
    requestAnimationFrame(() => target?.scrollIntoView({ block: "start" }));
  }, [initialTermId]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      } else if (event.key === "/" && !/input|textarea/i.test((event.target as Element)?.tagName)) {
        event.preventDefault();
        setSearchOpen(true);
      } else if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onProgress = (next: MiningProgress) => {
    setProgress(next);
    setAttempts(next.attempts);
  };

  const handleRemine = async () => {
    setMining(true);
    setAttempts(0);
    setAnnouncement("Mining started from block 02.");
    try {
      const repaired = await remineFrom(chain, 1, DEFAULT_DIFFICULTY, onProgress);
      setChain(repaired);
      setAnnouncement("The chain is valid again. Blocks 02 and later were re-mined.");
    } finally {
      setMining(false);
      setProgress(null);
    }
  };

  const handleAddBlock = async () => {
    const data = newBlockData.trim();
    if (!data) return;
    setMining(true);
    setAttempts(0);
    setAnnouncement("Mining the new block.");
    try {
      const next = await appendBlock(chain, data, DEFAULT_DIFFICULTY, onProgress);
      setChain(next);
      setNewBlockData("");
      setAddingBlock(false);
      setAnnouncement(`Block ${String(next.length).padStart(2, "0")} was added to the chain.`);
    } finally {
      setMining(false);
      setProgress(null);
    }
  };

  const resetExperiment = () => {
    setChain(createInitialChain());
    setAttempts(0);
    setAnnouncement("The original valid chain was restored.");
  };

  const copyTermLink = async (id: string) => {
    const url = `${window.location.origin}/term/${id}/`;
    await navigator.clipboard.writeText(url);
    setAnnouncement("Term link copied.");
  };

  return (
    <div className="field-guide-shell">
      <a href="#main-content" className="skip-link">Skip to the experiment</a>

      <header className="mobile-header">
        <Link href="/" className="mobile-brand">Blockchain Field Guide</Link>
        <div>
          <button className="icon-button" onClick={() => setSearchOpen(true)} aria-label="Search glossary">
            <MagnifyingGlass size={20} />
          </button>
          <button className="icon-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Open navigation" aria-expanded={menuOpen}>
            <List size={21} />
          </button>
        </div>
      </header>

      <aside className={`sidebar ${menuOpen ? "sidebar--open" : ""}`} aria-label="Field guide navigation">
        <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
          <span>Blockchain</span>
          <span>Field Guide</span>
        </Link>
        <button className="search-trigger" onClick={() => setSearchOpen(true)}>
          <MagnifyingGlass size={20} />
          <span>Search</span>
          <kbd>⌘K</kbd>
        </button>
        <nav>
          <p className="nav-label">Experiments</p>
          <a href="#glossary-hash" onClick={() => setMenuOpen(false)}><span>01</span>Hashing<i /></a>
          <a href="#chain-timeline" onClick={() => setMenuOpen(false)}><span>02</span>Chaining<i /></a>
          <a href="#tampering" className="active" onClick={() => setMenuOpen(false)}><span>03</span>Tampering<i /></a>
          <a href="#proof-of-work-panel" onClick={() => setMenuOpen(false)}><span>04</span>Proof of work<i /></a>
        </nav>
        <section className="sidebar-glossary">
          <p className="nav-label">Glossary</p>
          <strong>{glossaryTerms.length}</strong><span> terms</span>
          <button onClick={() => setSearchOpen(true)}><MagnifyingGlass size={17} /> Search glossary</button>
        </section>
        <div className="sidebar-about">
          <Info size={18} />
          <p><strong>About this guide</strong><span>A simplified, local learning simulator. Not a real blockchain network.</span></p>
        </div>
      </aside>

      <main id="main-content" className="main-content">
        <section id="tampering" className="experiment-section" aria-labelledby="experiment-title">
          <div className="eyebrow-row"><p className="eyebrow">03 &nbsp; Tampering</p><span>{chain.length} blocks · difficulty {DEFAULT_DIFFICULTY}</span></div>
          <h1 id="experiment-title">See one change travel through the chain</h1>
          <p className="lede">Edit a block&apos;s data and see how its hash changes — and why later blocks can no longer prove one continuous history.</p>
          <div className="simulator-note"><Info size={18} /><span>This is a simplified, local simulator — not a real blockchain network.</span></div>

          <section id="chain-timeline" className="timeline-section" aria-labelledby="timeline-title">
            <div className="section-heading-row">
              <h2 id="timeline-title" className="section-label">Chain timeline</h2>
              <div className={`chain-state ${chainValid ? "valid" : "invalid"}`}>
                {chainValid ? <CheckCircle size={17} weight="fill" /> : <XCircle size={17} weight="fill" />}
                {chainValid ? "Valid chain" : "Invalid chain"}
              </div>
            </div>
            <div className="block-timeline">
              {chain.map((block, index) => {
                const validity = validities[index];
                const displayValid = cumulativeValidity[index];
                const selected = index === 1;
                const reason = !validity.meetsDifficulty
                  ? "Hash misses target"
                  : !validity.previousHashMatches
                    ? "Previous hash mismatch"
                    : !validity.hashMatches
                      ? "Stored hash mismatch"
                      : !displayValid
                        ? "Earlier history invalid"
                        : "All checks pass";
                return (
                  <article key={`${block.index}-${block.timestamp}`} className={`block-column ${selected ? "selected" : ""} ${displayValid ? "is-valid" : "is-invalid"}`}>
                    <header>
                      <p>Block {String(block.index + 1).padStart(2, "0")}</p>
                      <span>{displayValid ? <CheckCircle size={15} /> : <XCircle size={15} />} {displayValid ? "Valid" : "Invalid"}</span>
                    </header>
                    <dl>
                      <div><dt>Index</dt><dd>{String(block.index + 1).padStart(2, "0")}</dd></div>
                      <div><dt>Timestamp</dt><dd>{formatTimestamp(block.timestamp)}</dd></div>
                      <div><dt>Data</dt><dd>{selected ? <textarea aria-label="Block 02 data" value={block.data} disabled={mining} maxLength={512} onChange={(event) => setChain((current) => updateBlockData(current, 1, event.target.value))} /> : block.data}</dd></div>
                      <div><dt>Previous hash</dt><dd className={!validity.previousHashMatches ? "bad-value" : ""}>{shortenHash(block.previousHash)}</dd></div>
                      <div><dt>Nonce</dt><dd>{block.nonce.toLocaleString()}</dd></div>
                      <div><dt>Hash</dt><dd className={!validity.meetsDifficulty ? "bad-value" : ""}>{shortenHash(block.hash)}</dd></div>
                    </dl>
                    <footer>{reason}</footer>
                    {index < chain.length - 1 && <span className={`chain-link ${validities[index + 1].previousHashMatches ? "link-valid" : "link-invalid"}`} aria-hidden="true" />}
                  </article>
                );
              })}
            </div>
          </section>

          <section className="workbench" aria-labelledby="workbench-title">
            <h2 id="workbench-title" className="section-label">Experiment workbench</h2>
            <div className="workbench-grid">
              <div>
                <p className="workbench-step">1. Edit block 02 data</p>
                <label htmlFor="workbench-data">Make any change to the data below.</label>
                <textarea id="workbench-data" value={activeBlock.data} disabled={mining} maxLength={512} onChange={(event) => setChain((current) => updateBlockData(current, 1, event.target.value))} />
                <small>{activeBlock.data.length} / 512 characters</small>
              </div>
              <div>
                <p className="workbench-step">2. Hash comparison</p>
                <label>Before edit</label><code>{beforeHash}</code>
                <label>Current</label><code>{activeBlock.hash}</code>
                <p className={beforeHash === activeBlock.hash ? "comparison-ok" : "comparison-bad"}>{beforeHash === activeBlock.hash ? <CheckCircle size={16} /> : <XCircle size={16} />} {beforeHash === activeBlock.hash ? "Hashes match" : "Hashes do not match"}</p>
              </div>
              <div id="proof-of-work-panel">
                <p className="workbench-step">3. Proof of work</p>
                <label>Difficulty target</label>
                <div className="target-row"><code>{"0".repeat(DEFAULT_DIFFICULTY)}…</code><span>leading zeros</span></div>
                <button className="primary-action" disabled={mining || chainValid} onClick={handleRemine}>
                  <Hammer size={19} weight="bold" />
                  {mining && progress ? `Mining block ${String(progress.blockIndex + 1).padStart(2, "0")}…` : "Re-mine from block 02"}
                </button>
                <p className="attempts">{mining ? `${attempts.toLocaleString()} attempts on the current block` : "This updates block 02 and every descendant."}</p>
                <div className="secondary-actions">
                  <button onClick={resetExperiment} disabled={mining}><ArrowCounterClockwise size={16} /> Reset</button>
                  <button onClick={() => setAddingBlock((value) => !value)} disabled={mining}><Plus size={16} /> Add block</button>
                </div>
              </div>
            </div>
            {addingBlock && (
              <div className="add-block-form">
                <label htmlFor="new-block-data">New block data</label>
                <input id="new-block-data" autoFocus value={newBlockData} onChange={(event) => setNewBlockData(event.target.value)} placeholder="Certificate issued to Alice" />
                <button onClick={handleAddBlock} disabled={!newBlockData.trim() || mining}>Mine and add block</button>
              </div>
            )}
          </section>

          <section className="what-happened">
            <h2 className="section-label">What just happened?</h2>
            <p>Changing block 02 produced a new hash. Its proof-of-work no longer meets the target, and block 03 still points to block 02&apos;s old hash. That broken link leaves the remaining history invalid until the affected blocks are re-mined.</p>
          </section>
        </section>

        <section className="glossary-section" aria-labelledby="glossary-title">
          <div className="glossary-intro">
            <p className="eyebrow">Blockchain glossary</p>
            <h2 id="glossary-title">The concepts behind the experiment</h2>
            <p>Twenty-four reviewed terms, written for beginners and connected to primary technical sources.</p>
          </div>
          {glossarySections.map((section) => (
            <section key={section} className="glossary-group" aria-labelledby={`section-${section.replaceAll(" ", "-")}`}>
              <div className="glossary-group-heading">
                <h3 id={`section-${section.replaceAll(" ", "-")}`}>{section}</h3>
                <span>{glossaryTerms.filter((item) => item.section === section).length} terms</span>
              </div>
              {glossaryTerms.filter((item) => item.section === section).map((item) => (
                <article key={item.id} id={`glossary-${item.id}`} className="glossary-entry">
                  <header>
                    <div><p className="eyebrow">{item.section}</p><h4>{item.name}</h4></div>
                    <button onClick={() => copyTermLink(item.id)}><LinkSimple size={16} /> Copy link</button>
                  </header>
                  <p className="term-summary">{item.summary}</p>
                  <div className="term-body">
                    <div><p className="section-label">Definition</p><p>{item.explanation}</p></div>
                    <aside aria-label={`Sources and review date for ${item.name}`}>
                      <p><span>Reviewed</span><time dateTime={item.reviewedAt}>Aug 26, 2026</time></p>
                      <p><span>Sources</span></p>
                      <ul>{item.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.label}</a></li>)}</ul>
                    </aside>
                  </div>
                  <nav className="related-terms" aria-label={`Terms related to ${item.name}`}>
                    <span>Related terms</span>
                    {item.related.map((relatedId) => {
                      const related = glossaryById.get(relatedId);
                      return related ? <Link key={relatedId} href={`/term/${relatedId}/`}>{related.name}</Link> : null;
                    })}
                  </nav>
                </article>
              ))}
            </section>
          ))}
        </section>

        <footer className="site-footer">
          <p>Blockchain Field Guide · A simplified educational simulator</p>
          <a href="https://github.com/irakibul7/blockchain-demo" target="_blank" rel="noreferrer">View source</a>
        </footer>
      </main>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
      <p className="sr-only" aria-live="polite">{announcement}</p>
    </div>
  );
}
