import type { Metadata } from "next";
import { ContactSection } from "@/components/ContactSection";
import { getDictionary } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary, locale } = await getDictionary();

  return buildPageMetadata({
    title: dictionary.contact.title,
    description: `${dictionary.contact.intro} ${dictionary.contact.social}`,
    locale,
    path: "/contacto"
  });
}

export default async function ContactoPage() {
  const { dictionary } = await getDictionary();

  return (
    <main className="contact-page">
      <ContactSection title={dictionary.contact.title} texts={dictionary.contact} />
    </main>
  );
}
