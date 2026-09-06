// © 2026 Danilo Ramos | daniloramos.dev.br | Todos os direitos reservados.

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
