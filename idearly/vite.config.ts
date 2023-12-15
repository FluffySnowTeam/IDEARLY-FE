import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 프록시 설정
      "/api": "https://idearly.site",
    },
  },
  define: {
    global: {},
  },
});
