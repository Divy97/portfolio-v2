import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Divy Parekh Portfolio",
    short_name: "Divy",
    start_url: "/",
    display: "standalone",
    background_color: "#F3E2D4",
    theme_color: "#415E72",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
} 