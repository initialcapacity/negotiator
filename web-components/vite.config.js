import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: '../negotiator/static/web-components',
    emptyOutDir: true,
    assetsDir: '',
    rollupOptions: {
      input: './src/main.ts',
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    },
  },
})
