import type { GalleryImage, NavItem, ServiceItem, SocialLink, VideoItem } from "./types";

export const site = {
  name: "Dangerous Meeting",
  description: "Grabacion multicamara, streaming y produccion audiovisual para actuaciones en vivo.",
  emails: ["juan@dangerousmeetings.com", "angel@dangerousmeetings.com"],
  phone: "+34 617 55 76 13",
  phoneHref: "tel:+34617557613",
  logoSrc: "/icons/Logotransparentelargo.png"
};

export const navItems: NavItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Servicios", href: "/servicios" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" }
];

export const socialLinks: SocialLink[] = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@DangerousMeetingLive",
    iconSrc: "/icons/whiteYoutube.png"
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dangerousmeeting_live/?utm_source=ig_web_button_share_sheet",
    iconSrc: "/icons/whiteIG.png"
  }
];

export const services: ServiceItem[] = [
  { label: "Grabacion en vivo" },
  { label: "Realizacion multicamara" },
  { label: "Streaming en vivo" },
  { label: "Grabacion de audio" },
  { label: "Edicion de video" },
  { label: "Edicion de audio" },
  { label: "Diseno de audio" },
  { label: "Diseno de video" }
];

export const galleryImages: GalleryImage[] = [
  {
    src: "/images/The Laws RRSS.jpg",
    alt: "Live concert recording session with stage lighting",
    title: "Live Recording",
    subtitle: "Concert Audio Production"
  },
  {
    src: "/images/The Laws RRSS-6.jpg",
    alt: "Multi-camera stage coverage during a live performance",
    title: "Stage Coverage",
    subtitle: "Multi-camera Recording"
  },
  {
    src: "/images/The Laws RRSS-9.jpg",
    alt: "Live sound engineering setup for concert production",
    title: "Live Mixing",
    subtitle: "Professional Sound Engineering"
  },
  {
    src: "/images/The Laws RRSS-12.jpg",
    alt: "Technical concert production with performers on stage",
    title: "Concert Production",
    subtitle: "Event Technical Support"
  },
  {
    src: "/images/Absu 1.png",
    alt: "Backstage production moment before a live recording",
    title: "Backstage Moments",
    subtitle: "Behind The Scenes"
  },
  {
    src: "/images/Lostregos 1.png",
    alt: "Festival recording work for audio and video production",
    title: "Festival Recording",
    subtitle: "Audio & Video Production"
  },
  {
    src: "/images/The Laws RRSS-15.jpg",
    alt: "Concert camera angle capturing musicians under dramatic stage lights",
    title: "Camera Direction",
    subtitle: "Live Performance Coverage"
  },
  {
    src: "/images/Absu 2.png",
    alt: "Close production capture from a live music performance",
    title: "Session Capture",
    subtitle: "Live Music Recording"
  }
];

export const videos: VideoItem[] = [
  {
    title: "Lostregos - 06/02/2025",
    youtubeEmbedUrl: "https://www.youtube.com/embed/55qj9p3h8BI"
  },
  {
    title: "Sadistic Christ - 26/01/2025",
    youtubeEmbedUrl: "https://www.youtube.com/embed/oohUqM-tZBQ"
  }
];
