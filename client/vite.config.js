import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Needed for Docker
    port: 5173,
    watch: {
      usePolling: true  // Required for hot-reload
    },
    proxy: {
      "/api/submit-form": {
        target: "http://express-server:3000", // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
      "/api/submit-login": {
        target: "http://express-server:3000", // Your backend server URL
        changeOrigin: true,
        secure: false,
      }
    },
  }
})
