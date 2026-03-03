import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'serve' ? './' : '/suli-fresh-pears/',
  plugins: [command === 'serve' ? inspectAttr() : null, react()].filter(Boolean),
  build: {
    minify: false,
    cssMinify: false,
    reportCompressedSize: false,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
