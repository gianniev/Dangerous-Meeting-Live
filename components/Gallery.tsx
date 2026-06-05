"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { GalleryImage } from "@/lib/types";

type GalleryProps = {
  images: GalleryImage[];
  subtitle: string;
  title: string;
};

export function Gallery({ images, subtitle, title }: GalleryProps) {
  const featuredImages = images.slice(0, 8);
  const [mainImage, ...secondaryImages] = featuredImages;
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const activeImage = activeImageIndex === null ? null : featuredImages[activeImageIndex];

  const closeLightbox = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  const showPreviousImage = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === 0 ? featuredImages.length - 1 : currentIndex - 1;
    });
  }, [featuredImages.length]);

  const showNextImage = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === featuredImages.length - 1 ? 0 : currentIndex + 1;
    });
  }, [featuredImages.length]);

  useEffect(() => {
    if (activeImageIndex === null) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeImageIndex]);

  useEffect(() => {
    if (activeImageIndex === null) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPreviousImage();
      }

      if (event.key === "ArrowRight") {
        showNextImage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, closeLightbox, showNextImage, showPreviousImage]);

  if (!mainImage) {
    return null;
  }

  return (
    <section className="gallery">
      <div className="gallery-header">
        <h2>{title}</h2>
        <p className="gallery-subtitle">{subtitle}</p>
      </div>
      <div className="gallery-grid">
        <GalleryCard image={mainImage} index={0} isFeatured onOpen={setActiveImageIndex} />
        {secondaryImages.map((image, index) => (
          <GalleryCard image={image} index={index + 1} key={image.src} onOpen={setActiveImageIndex} />
        ))}
      </div>
      {activeImage ? (
        <div
          aria-label={`${activeImage.title} image preview`}
          aria-modal="true"
          className="lightbox"
          onClick={closeLightbox}
          role="dialog"
        >
          <button
            aria-label="Close image preview"
            className="lightbox-close"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            type="button"
          >
            X
          </button>
          <button
            aria-label="Show previous image"
            className="lightbox-control lightbox-control-prev"
            onClick={(event) => {
              event.stopPropagation();
              showPreviousImage();
            }}
            type="button"
          >
            &lt;
          </button>
          <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
            <div className="lightbox-image-wrap">
              <Image src={activeImage.src} alt={activeImage.alt} fill sizes="(max-width: 768px) 92vw, 82vw" />
            </div>
            <div className="lightbox-caption">
              <span>{activeImage.subtitle}</span>
              <h3>{activeImage.title}</h3>
            </div>
          </div>
          <button
            aria-label="Show next image"
            className="lightbox-control lightbox-control-next"
            onClick={(event) => {
              event.stopPropagation();
              showNextImage();
            }}
            type="button"
          >
            &gt;
          </button>
        </div>
      ) : null}
    </section>
  );
}

function GalleryCard({
  image,
  index,
  isFeatured = false,
  onOpen
}: {
  image: GalleryImage;
  index: number;
  isFeatured?: boolean;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      aria-label={`Open ${image.title} image`}
      className={isFeatured ? "gallery-card gallery-card-featured" : "gallery-card"}
      onClick={() => onOpen(index)}
      type="button"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={isFeatured}
        sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"}
      />
      <span className="gallery-card-overlay">
        <span className="gallery-card-kicker">{image.subtitle}</span>
        <span className="gallery-card-title">{image.title}</span>
      </span>
    </button>
  );
}
