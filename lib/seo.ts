import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site-data";

const localeMap: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR"
};

type PageMetadataInput = {
  description: string;
  locale: Locale;
  path?: string;
  title?: string;
};

export function buildPageMetadata({ description, locale, path = "/", title }: PageMetadataInput): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = title ? `${title} | ${site.name}` : site.name;

  return {
    title: fullTitle,
    description,
    keywords: site.keywords,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    publisher: site.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    alternates: {
      canonical: url
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      images: [
        {
          url: site.ogImage,
          alt: `${site.name} live recording`
        }
      ],
      locale: localeMap[locale],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [site.ogImage]
    }
  };
}
