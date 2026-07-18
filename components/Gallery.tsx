"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import type { GalleryImage } from "@/lib/types";

type GalleryProps = {
  images: GalleryImage[];
  labels: {
    close: string;
    dialog: string;
    label: string;
    next: string;
    previous: string;
  };
  subtitle: string;
  title: string;
};

export function Gallery({ images, labels, subtitle, title }: GalleryProps) {
  const featuredImages = images.slice(0, 8);
  const [mainImage, ...secondaryImages] = featuredImages;
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const activeImage = activeImageIndex === null ? null : featuredImages[activeImageIndex];
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const openerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const wasLightboxOpenRef = useRef(false);

  const openLightbox = useCallback((index: number) => {
    setActiveImageIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex !== null) {
        requestAnimationFrame(() => {
          openerRefs.current[currentIndex]?.focus();
        });
      }

      return null;
    });
  }, []);

  const showPrevious = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === 0 ? featuredImages.length - 1 : currentIndex - 1;
    });
  }, [featuredImages.length]);

  const showNext = useCallback(() => {
    setActiveImageIndex((currentIndex) => {
      if (currentIndex === null) {
        return currentIndex;
      }

      return currentIndex === featuredImages.length - 1 ? 0 : currentIndex + 1;
    });
  }, [featuredImages.length]);

  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") {
      return;
    }

    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY
    };
  }, []);

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const startPoint = pointerStartRef.current;

      if (!startPoint) {
        return;
      }

      pointerStartRef.current = null;

      const deltaX = event.clientX - startPoint.x;
      const deltaY = event.clientY - startPoint.y;

      if (Math.abs(deltaX) < 56 || Math.abs(deltaX) < Math.abs(deltaY)) {
        return;
      }

      if (deltaX < 0) {
        showNext();
        return;
      }

      showPrevious();
    },
    [showNext, showPrevious]
  );

  const handleLightboxKeyDown = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements?.length) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }, []);

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
      wasLightboxOpenRef.current = false;
      return;
    }

    if (!wasLightboxOpenRef.current) {
      closeButtonRef.current?.focus();
      wasLightboxOpenRef.current = true;
    }
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
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeImageIndex, closeLightbox, showNext, showPrevious]);

  if (!mainImage) {
    return null;
  }

  const activeCounter =
    activeImageIndex === null ? "" : `${String(activeImageIndex + 1).padStart(2, "0")} / ${String(featuredImages.length).padStart(2, "0")}`;

  return (
    <section className="gallery">
      <div className="gallery-header">
        <h2>{title}</h2>
        <p className="gallery-subtitle">{subtitle}</p>
      </div>
      <div className="gallery-grid">
        <GalleryCard
          ariaLabel={`${labels.dialog}: ${mainImage.title}`}
          buttonRef={(node) => {
            openerRefs.current[0] = node;
          }}
          image={mainImage}
          index={0}
          isFeatured
          onOpen={openLightbox}
        />
        {secondaryImages.map((image, index) => (
          <GalleryCard
            ariaLabel={`${labels.dialog}: ${image.title}`}
            buttonRef={(node) => {
              openerRefs.current[index + 1] = node;
            }}
            image={image}
            index={index + 1}
            key={image.src}
            onOpen={openLightbox}
          />
        ))}
      </div>
      {activeImage ? (
        <div
          aria-label={labels.dialog}
          aria-modal="true"
          className="lightbox"
          onClick={closeLightbox}
          onKeyDown={handleLightboxKeyDown}
          ref={dialogRef}
          role="dialog"
          tabIndex={-1}
        >
          <div className="lightbox-shell" onClick={(event) => event.stopPropagation()}>
            <button
              aria-label={labels.close}
              className="lightbox-close"
              onClick={closeLightbox}
              ref={closeButtonRef}
              type="button"
            >
              <span aria-hidden="true">X</span>
            </button>
            <div
              className="lightbox-image-area"
              onPointerCancel={() => {
                pointerStartRef.current = null;
              }}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerEnd}
            >
              <button
                aria-label={labels.previous}
                className="lightbox-control lightbox-control-prev"
                onClick={showPrevious}
                type="button"
              >
                <span aria-hidden="true">&lt;</span>
              </button>
              <div className="lightbox-image-wrap">
                <Image
                  alt={activeImage.alt}
                  fill
                  key={activeImage.src}
                  priority
                  sizes="(max-width: 768px) 100vw, 70vw"
                  src={activeImage.src}
                />
              </div>
              <button aria-label={labels.next} className="lightbox-control lightbox-control-next" onClick={showNext} type="button">
                <span aria-hidden="true">&gt;</span>
              </button>
            </div>
            <aside className="lightbox-info">
              <div className="lightbox-meta">
                <span className="lightbox-kicker">{labels.label}</span>
                <span className="lightbox-count">{activeCounter}</span>
              </div>
              <h3>{activeImage.title}</h3>
              <p>{activeImage.subtitle}</p>
            </aside>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function GalleryCard({
  ariaLabel,
  buttonRef,
  image,
  index,
  isFeatured = false,
  onOpen
}: {
  ariaLabel: string;
  buttonRef: (node: HTMLButtonElement | null) => void;
  image: GalleryImage;
  index: number;
  isFeatured?: boolean;
  onOpen: (index: number) => void;
}) {
  return (
    <button
      aria-label={ariaLabel}
      className={isFeatured ? "gallery-card gallery-card-featured" : "gallery-card"}
      onClick={() => onOpen(index)}
      ref={buttonRef}
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
