import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

function nonBlockingStylesheet(): import('vite').Plugin {
  return {
    name: 'non-blocking-stylesheet',
    transformIndexHtml(html) {
      return html.replace(
        /<link\s+rel="stylesheet"\s+(crossorigin\s+)?href="(\/assets\/[^"]+\.css)"[^>]*>/,
        (_, crossorigin, href) => {
          const cross = crossorigin || ''
          return `<link rel="preload" as="style" ${cross}href="${href}" onload="this.rel='stylesheet'"><noscript><link rel="stylesheet" ${cross}href="${href}"></noscript>`
        }
      )
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    nonBlockingStylesheet(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(new Date().toISOString().slice(0, 10).replace(/-/g, '')),
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
})
