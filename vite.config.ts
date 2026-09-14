import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Keeper Comeback',
        short_name: 'Comeback',
        description: 'Dein adaptiver Wiedereinstiegsplan für Fitness, Torwarttraining und Mobilität.',
        theme_color: '#07120f',
        background_color: '#07120f',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        scope: './',
        icons: [
          { src: './pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: './pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: './pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        navigateFallback: 'index.html',
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}']
      }
    })
  ]
})
