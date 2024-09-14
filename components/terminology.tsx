import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { gloassary } from "@/lib/glossary";

const Terminology = () => {
  return (
    <div className="bg-secondary p-4 rounded-md">
      <h2 className="text-xl font-bold">Terminology</h2>
      <Accordion type="single" collapsible className="w-full">
        {gloassary.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="">{item.title}</AccordionTrigger>
            <AccordionContent>{item.description}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Terminology;
