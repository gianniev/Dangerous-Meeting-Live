import { ContactSection } from "@/components/ContactSection";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { getDictionary } from "@/lib/i18n";
import { galleryImages, videos } from "@/lib/site-data";

export default async function HomePage() {
  const { dictionary } = await getDictionary();

  return (
    <main>
      <Hero
        imageSrc="https://www.izotope.com/storage-cms/images/_aliases/hero_fallback_1x/0/0/2/5/365200-1-eng-GB/fbb8b7d55c99-How-to-mix-a-live-recording.jpg"
        videoSrc="/hero/DimmuBorgirDemo.mp4"
        title={dictionary.home.hero.title}
        subtitle={dictionary.home.hero.subtitle}
      />

      <section className="content-section">
        <div className="section-text">
          <h1>{dictionary.home.intro.title}</h1>
          {dictionary.home.intro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <Gallery images={galleryImages} title={dictionary.gallery.title} subtitle={dictionary.gallery.subtitle} />
      <VideoSection videos={videos} title={dictionary.videos.title} texts={dictionary.videos} />
      <ContactSection title={dictionary.contact.title} texts={dictionary.contact} />
    </main>
  );
}
