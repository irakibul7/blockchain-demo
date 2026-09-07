import Link from "next/link";
import { articles } from "@/lib/articles";
import { glossaryById } from "@/lib/glossary";
import { author, experiments, REVIEWED_AT, REVIEWED_LABEL, sources } from "@/lib/learning";

export function LearningContent() {
  return (
    <section className="learning-section" aria-labelledby="learning-title">
      <p className="eyebrow">Guided practice</p>
      <h2 id="learning-title">Predict. Change. Explain.</h2>
      <p>Four exercises use the same workbench above. Start each with Reset. All payment descriptions are fictional text; no funds move.</p>
      <p className="review-line">By <a href={author.url} rel="author">{author.name}</a> · Technical content and exercises reviewed <time dateTime={REVIEWED_AT}>{REVIEWED_LABEL}</time>. Dates reflect content review, not simulated block timestamps.</p>
      {experiments.map((experiment) => (
        <article id={`exercise-${experiment.id}`} className="lesson" key={experiment.id}>
          <h3>{experiment.title}</h3>
          <h4>What you will learn</h4><p>{experiment.learn}</p>
          <h4>Try it step by step</h4>
          <ol>{experiment.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          <a className="lesson-action" href="#workbench-title">Go to the workbench ↑</a>
          <h4>Expected result and why</h4><p>{experiment.result}</p>
          <h4>Common mistakes</h4><p>{experiment.mistakes}</p>
          <h4>What this simulation simplifies</h4><p>{experiment.limits}</p>
          <details><summary>Check your understanding: {experiment.question}</summary><p>{experiment.answer}</p></details>
          <nav className="related-terms" aria-label={`Terms for ${experiment.title}`}>
            <span>Review terms</span>{experiment.terms.map((id) => <Link key={id} href={`/term/${id}/`}>{glossaryById.get(id)?.name}</Link>)}
          </nav>
          <p className="source-links">Primary sources: {experiment.sources.map((id) => <a key={id} href={sources[id].url}>{sources[id].label}</a>)}</p>
          <p>Read next: {articles.filter((article) => article.experiments.includes(experiment.id)).map((article) => <Link className="reading-link" key={article.slug} href={`/articles/${article.slug}/`}>{article.title}</Link>)}</p>
        </article>
      ))}
      <section id="articles" className="reading-list" aria-labelledby="articles-title">
        <p className="eyebrow">Read the field notes</p><h2 id="articles-title">From a broken link to a reliable payment</h2>
        {articles.map((article) => <article key={article.slug}><h3><Link href={`/articles/${article.slug}/`}>{article.title}</Link></h3><p>{article.description}</p></article>)}
      </section>
    </section>
  );
}
