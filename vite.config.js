import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Relative asset paths so the build works at ankitavthatte.github.io/project-firefly
  // AND at the custom domain root, with no config change between them.
  base: './',
  plugins: [react(), tailwindcss()],
})
