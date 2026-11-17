import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/',
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ling Long Beuningen',
        short_name: 'Ling Long',
        description: 'Chinees afhaalrestaurant in Beuningen',
        theme_color: '#591117',
        background_color: '#591117',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/images/rice-bowl.png', sizes: '192x192', type: 'image/png' },
          ],
        },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
            },
            cacheableResponse: {
              statuses: [0, 200]
            },
          }
        }
      ],
      globPatterns: ['**/*.{js,css,html,ico,png,webp}'],
      globIgnores: ['**/node_modules/**/*', '**/dist/**/*'],
    }
      }),
  ],
}
)

