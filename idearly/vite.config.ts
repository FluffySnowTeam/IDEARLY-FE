import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import reactRefresh from "@vitejs/plugin-react-refresh";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      // 프록시 설정
      "/api": "https://idearly.site",
    },
  },
  define: {
    global: {},
  },
  build: {
    rollupOptions: {
      external: ["@toast-ui/react-editor"],
    },
  },
});
