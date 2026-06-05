import type { VideoItem } from "@/lib/types";

type VideoSectionProps = {
  title: string;
  texts: {
    projects: {
      band: string;
      date: string;
    }[];
    recordedOn: string;
    serviceLine: string;
    subtitle: string;
  };
  videos: VideoItem[];
};

function getFallbackProject(video: VideoItem) {
  const [band = video.title, date = ""] = video.title.split(" - ");

  return { band, date };
}

export function VideoSection({ title, texts, videos }: VideoSectionProps) {
  return (
    <section className="videos">
      <div className="videos-header">
        <h2>{title}</h2>
        <p>{texts.subtitle}</p>
      </div>
      <div className="video-container">
        {videos.map((video, index) => {
          const project = texts.projects[index] ?? getFallbackProject(video);

          return (
            <article className="video-card" key={video.youtubeEmbedUrl}>
              <div className="video-frame">
                <iframe
                  src={video.youtubeEmbedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-card-content">
                <h3>{project.band}</h3>
                <p className="video-service-line">{texts.serviceLine}</p>
                <p className="video-date">
                  {texts.recordedOn} {project.date}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
