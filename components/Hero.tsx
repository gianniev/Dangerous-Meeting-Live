import Image from "next/image";

type HeroProps = {
  imageSrc: string;
  videoSrc?: string;
  youtubeVideoId?: string;
  title: string;
  subtitle: string;
};

export function Hero({ imageSrc, videoSrc, youtubeVideoId, title, subtitle }: HeroProps) {
  const youtubeEmbedUrl = youtubeVideoId
    ? `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&modestbranding=1&playsinline=1`
    : null;

  return (
    <section className="hero">
      {youtubeEmbedUrl ? (
        <iframe
          allow="autoplay; encrypted-media; picture-in-picture"
          aria-hidden="true"
          className="hero-youtube"
          src={youtubeEmbedUrl}
          tabIndex={-1}
          title="Dangerous Meeting showreel background"
        />
      ) : videoSrc ? (
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
