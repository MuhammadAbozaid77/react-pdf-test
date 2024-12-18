import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["pdfjs-dist/build/pdf.worker.mjs"], // Mark the worker file as external
    },
  },
});
