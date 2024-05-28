import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

export default defineConfig({
  plugins: process.env.MODE === 'production' ? react({ jsxRuntime: 'classic' }) : react(),
  css: { preprocessorOptions: { scss: { sourceMap: true } } },
  resolve: { alias: { '@': join(__dirname, 'src') } },
  server: {
    open: false,
    port: 8888,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:8101',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: { outDir: 'build' },
  preview: {
    port: 8100
  }
})
