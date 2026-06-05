import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getDictionary();

  return {
    title: dictionary.about.title
  };
}

export default async function NosotrosPage() {
  const { dictionary } = await getDictionary();

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1>{dictionary.about.title}</h1>
          {dictionary.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
