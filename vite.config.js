import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Web QR",
        short_name: "QR",
        description: "App para generar e imprimir códigos QR por trabajadora",
        theme_color: "#10B981",
        background_color: "#0f172a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/logo-webp.webp",
            sizes: "192x192",
            type: "image/webp",
          },
          {
            src: "/logo-webp.webp",
            sizes: "512x512",
            type: "image/webp",
          },
        ],
      },
    }),
  ],
});
