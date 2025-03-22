import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/submit-form": {
        target: "http://localhost:3000", // Your backend server URL
        changeOrigin: true,
        secure: false,
      },
      "/submit-login": {
        target: "http://localhost:3000", // Your backend server URL
        changeOrigin: true,
        secure: false,
      }
    },
  }
})
