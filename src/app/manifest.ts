import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PSE Interactif",
    short_name: "PSE",
    description:
      "Une plateforme pédagogique simple pour accéder aux activités de sa classe.",
    start_url: "/",
    display: "standalone",
    background_color: "#090b20",
    theme_color: "#090b20",
    lang: "fr",
    categories: ["education"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
