import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['deonna-screwy-lia.ngrok-free.dev', 'all'],
  },
})
