import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  // base: "/eCommerceVanillaJS/",
  build: {
    assetsDir: "assets", // Organize assets properly
    rollupOptions: {
      input: {
        main: "./index.html",
        // Add other HTML entries if needed
      },
    },
  },
  optimizeDeps: {
    include: ["swiper"],
  },
});
