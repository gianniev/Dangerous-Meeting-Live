import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary, getLocalizedNavItems } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["600", "700", "800"]
});

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary, locale } = await getDictionary();

  return {
    metadataBase: new URL(site.url),
    ...buildPageMetadata({
      description: dictionary.site.description,
      locale
    }),
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        { url: "/icons/head.png", type: "image/png", sizes: "512x512" }
      ],
      shortcut: "/favicon.ico",
      apple: [{ url: "/icons/head.png", type: "image/png", sizes: "512x512" }]
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { dictionary, locale } = await getDictionary();
  const localizedNavItems = getLocalizedNavItems(dictionary);

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${montserrat.variable}`}>
        <Header
          labels={{
            home: dictionary.nav.homeLabel,
            main: dictionary.nav.mainLabel,
            openMenu: dictionary.nav.openMenu
          }}
          navItems={localizedNavItems}
        />
        {children}
        <Footer navItems={localizedNavItems} rightsText={dictionary.footer.rights} socialLabel={dictionary.contact.socialLabel} />
      </body>
    </html>
  );
}
