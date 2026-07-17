import type { MetadataRoute } from "next";
import { site } from "@/lib/site-data";

const routes = [
  { path: "/", priority: 1 },
  { path: "/servicios", priority: 0.8 },
  { path: "/nosotros", priority: 0.7 },
  { path: "/contacto", priority: 0.8 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route.path, site.url).toString(),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route.priority
  }));
}
