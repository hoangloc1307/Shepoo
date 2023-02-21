import { defineConfig } from 'vite'
import pluginRewriteAll from 'vite-plugin-rewrite-all'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), pluginRewriteAll(), visualizer()],
  server: {
    port: 3000,
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
})
