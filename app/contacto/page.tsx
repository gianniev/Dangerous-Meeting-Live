import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getDictionary();

  return {
    title: dictionary.contact.title
  };
}

export default async function ContactoPage() {
  const { dictionary } = await getDictionary();

  return (
    <main>
      <ContactSection title={dictionary.contact.title} texts={dictionary.contact} />
    </main>
  );
}
