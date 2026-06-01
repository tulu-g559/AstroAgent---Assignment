import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    proxy: {
      '/chat': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/chart': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/geocode': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/transits': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
