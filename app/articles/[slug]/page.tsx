import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";
import { author, experiments, REVIEWED_AT, REVIEWED_LABEL, sources } from "@/lib/learning";
import { glossaryById } from "@/lib/glossary";
import { createArticleJsonLd, serializeJsonLd } from "@/lib/structured-data";
import { siteConfig } from "@/config/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return articles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return {};
  const url = `/articles/${article.slug}/`;
  return {
    title: article.title, description: article.description,
    alternates: { canonical: url }, authors: [author],
    openGraph: { title: article.title, description: article.description, url, type: "article", modifiedTime: REVIEWED_AT, authors: [author.url], images: ["/opengraph-image.png"] },
    twitter: { title: article.title, description: article.description, card: "summary_large_image", images: ["/twitter-image.png"] },
  };
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  // Example names come only from the authored manifest, never a URL parameter.
  const example = article.example ? await readFile(path.join(process.cwd(), "public/examples", article.example), "utf8") : null;
  return (
    <div className="article-shell">
      <a href="#article-content" className="skip-link">Skip to article</a>
      <header className="article-header"><Link href="/">{siteConfig.name}</Link><nav aria-label="Guide navigation"><Link href="/#learning-title">Experiments</Link><Link href="/#articles">Articles</Link><Link href="/#glossary-title">Glossary</Link></nav></header>
      <main id="article-content" className="article-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(createArticleJsonLd(article)) }} />
        <article>
          <p className="eyebrow">Field notes · Blockchain education</p><h1>{article.title}</h1>
          <p className="lede">{article.description}</p>
          <p className="review-line">By <a href={author.url} rel="author">{author.name}</a> · Updated and technically reviewed <time dateTime={REVIEWED_AT}>{REVIEWED_LABEL}</time></p>
          <p className="article-scope">{article.scope}</p>
          <nav className="article-toc" aria-label="On this page"><h2>On this page</h2><ol>{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
          {article.sections.map((section) => <section id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.sources.length > 0 && <p className="source-links">Primary sources: {section.sources.map((id) => <a key={id} href={sources[id].url}>{sources[id].label}</a>)}</p>}</section>)}
          {example && <section id="runnable-example"><h2>Runnable offline example</h2><p>Save <a href={`/examples/${article.example}`} download>{article.example}</a> and run <code>node {article.example}</code> with Node.js 20 or later. No dependencies, credentials, network access, or funds are needed.</p><pre tabIndex={0} aria-label="Offline JavaScript example"><code>{example}</code></pre></section>}
          <section><h2>Practice and vocabulary</h2><ul>{article.experiments.map((id) => <li key={id}><Link href={`/#exercise-${id}`}>{experiments.find((item) => item.id === id)?.title}</Link></li>)}</ul><nav className="related-terms" aria-label="Article glossary terms">{article.terms.map((id) => <Link key={id} href={`/term/${id}/`}>{glossaryById.get(id)?.name}</Link>)}</nav></section>
        </article>
        <nav className="reading-list" aria-label="Related articles"><h2>Continue reading</h2>{articles.filter((item) => item.slug !== slug).map((item) => <p key={item.slug}><Link href={`/articles/${item.slug}/`}>{item.title}</Link></p>)}</nav>
        <footer className="article-footer">Written by <a href={author.url} rel="author">{author.name}</a> for the Blockchain Field Guide. Examples are educational simulations. <Link href="/">Return to the simulator</Link>.</footer>
      </main>
    </div>
  );
}
