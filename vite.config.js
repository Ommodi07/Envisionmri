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
      '/query': {
        target: 'https://chatbot-ggfw.onrender.com/',
        changeOrigin: true,
        secure: false,
      
      }
    }
  }
})