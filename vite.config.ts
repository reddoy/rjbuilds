import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // relative base so the build works on reddoy.github.io/rjbuilds and on a custom domain later
  base: './',
  plugins: [react()],
})
