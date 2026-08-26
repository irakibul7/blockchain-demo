import { FieldGuide } from "@/components/field-guide";
import { siteConfig } from "@/config/site";
import { glossaryById, glossaryTerms } from "@/lib/glossary";
import { createTermJsonLd, serializeJsonLd } from "@/lib/structured-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type TermPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return glossaryTerms.map((term) => ({ slug: term.id }));
}

export async function generateMetadata({ params }: TermPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = glossaryById.get(slug);
  if (!term) return {};

  return {
    title: term.name,
    description: term.summary,
    keywords: [term.name, ...term.aliases, "blockchain glossary"],
    alternates: { canonical: `/term/${term.id}/` },
    openGraph: {
      title: `${term.name} · ${siteConfig.name}`,
      description: term.summary,
      url: `/term/${term.id}/`,
    },
    twitter: {
      title: `${term.name} · ${siteConfig.name}`,
      description: term.summary,
      card: "summary_large_image",
    },
  };
}

export default async function TermPage({ params }: TermPageProps) {
  const { slug } = await params;
  const term = glossaryById.get(slug);
  if (!term) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(createTermJsonLd(term)) }}
      />
      <FieldGuide initialTermId={slug} />
    </>
  );
}
