import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/chat': {
        target: 'https://chatbot-ggfw.onrender.com/query',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/chatbot/, ''),
      }
    }
  }
})