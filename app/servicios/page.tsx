import type { Metadata } from "next";
import { ServiceList } from "@/components/ServiceList";
import { getDictionary, getLocalizedServices } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getDictionary();

  return {
    title: dictionary.services.title
  };
}

export default async function ServiciosPage() {
  const { dictionary } = await getDictionary();
  const localizedServices = getLocalizedServices(dictionary);

  return (
    <main>
      <section className="page-hero">
        <div className="page-hero-content">
          <h1>{dictionary.services.title}</h1>
          <p>{dictionary.services.description}</p>
          <ServiceList services={localizedServices} />
        </div>
      </section>
    </main>
  );
}
