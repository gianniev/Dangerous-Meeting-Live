import { headers } from "next/headers";
import en from "@/dictionaries/en.json";
import es from "@/dictionaries/es.json";
import type { NavItem, ServiceItem } from "@/lib/types";

export type Locale = "es" | "en";
export type Dictionary = typeof es;

const dictionaries = {
  es,
  en
} satisfies Record<Locale, Dictionary>;

export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return "es";
  }

  const languages = acceptLanguage
    .split(",")
    .map((language) => language.trim().toLowerCase().split(";")[0]);

  const matchingLanguage = languages.find((language) => language.startsWith("es") || language.startsWith("en"));

  if (matchingLanguage?.startsWith("en")) {
    return "en";
  }

  return "es";
}

export async function getLocale(): Promise<Locale> {
  const headerStore = await headers();

  return detectLocale(headerStore.get("accept-language"));
}

export async function getDictionary(): Promise<{ dictionary: Dictionary; locale: Locale }> {
  const locale = await getLocale();

  return {
    dictionary: dictionaries[locale],
    locale
  };
}

export function getLocalizedNavItems(dictionary: Dictionary): NavItem[] {
  return [
    { label: dictionary.nav.home, href: "/" },
    { label: dictionary.nav.services, href: "/servicios" },
    { label: dictionary.nav.about, href: "/nosotros" },
    { label: dictionary.nav.contact, href: "/contacto" }
  ];
}

export function getLocalizedServices(dictionary: Dictionary): ServiceItem[] {
  return dictionary.services.items.map((label) => ({ label }));
}
