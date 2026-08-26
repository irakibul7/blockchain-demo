import { FieldGuide } from "@/components/field-guide";
import { siteConfig } from "@/config/site";
import { glossaryById, glossaryTerms } from "@/lib/glossary";
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
    alternates: { canonical: `/term/${term.id}/` },
    openGraph: {
      title: `${term.name} · ${siteConfig.name}`,
      description: term.summary,
      url: `/term/${term.id}/`,
    },
  };
}

export default async function TermPage({ params }: TermPageProps) {
  const { slug } = await params;
  if (!glossaryById.has(slug)) notFound();
  return <FieldGuide initialTermId={slug} />;
}
