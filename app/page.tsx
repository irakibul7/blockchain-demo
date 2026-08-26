import { FieldGuide } from "@/components/field-guide";
import { createGlossarySetJsonLd, serializeJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(createGlossarySetJsonLd()) }}
      />
      <FieldGuide />
    </>
  );
}
