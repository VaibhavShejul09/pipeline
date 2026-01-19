import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // 🔥 ALL APIs GO THROUGH API GATEWAY
      '/api': {
        target: 'http://apic:8080',
        changeOrigin: true,
        secure: false,
      }
    },
  },
})
