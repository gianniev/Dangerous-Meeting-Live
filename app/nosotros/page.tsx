import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary, locale } = await getDictionary();

  return buildPageMetadata({
    title: dictionary.about.title,
    description: dictionary.about.paragraphs[0],
    locale,
    path: "/nosotros"
  });
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
