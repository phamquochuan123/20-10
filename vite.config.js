import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" để chạy được ở bất kỳ đường dẫn GitHub Pages nào
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: { output: { manualChunks: { three: ["three", "@react-three/fiber", "@react-three/drei"] } } }
  }
});
