import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Explicitly use the root index.html file as the entry point
  root: '.',
  plugins: [react()],
})
