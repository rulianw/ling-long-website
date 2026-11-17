import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// inside defineConfig, in the plugins array, after react()
export default defineConfig({
  base: '/ling-long/',
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Ling Long Beuningen',
        short_name: 'Ling Long',
        description: 'Chinees afhaalrestaurant in Beuningen',
        theme_color: '#591117;',
        background_color: '#591117;',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          ],
        },
      }),
  ],
}
)

