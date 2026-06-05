import Image from "next/image";

type HeroProps = {
  imageSrc: string;
  videoSrc?: string;
  title: string;
  subtitle: string;
};

export function Hero({ imageSrc, videoSrc, title, subtitle }: HeroProps) {
  return (
    <section className="hero">
      {videoSrc ? (
        <video className="hero-video" autoPlay loop muted playsInline poster={imageSrc} aria-hidden="true">
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <Image src={imageSrc} alt="" className="hero-image" fill priority sizes="100vw" />
      )}
      <div className="hero-text">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </section>
  );
}
