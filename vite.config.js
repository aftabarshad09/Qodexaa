import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  appType: 'custom',
  build: {
    outDir: 'dist/client',
    assetsDir: 'assets',
    sourcemap: false,
  }
})