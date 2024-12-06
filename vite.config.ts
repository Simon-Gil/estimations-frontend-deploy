import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Inspect()],
  resolve: {
    alias: {'@':'src'}
  },
  define: {
    'process.env': process.env,
  },
  build: {
    outDir: 'dist', // Carpeta de salida
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js', // Ubicación de los archivos de entrada
        chunkFileNames: 'assets/[name]-[hash].js', // Ubicación de los chunks
        assetFileNames: 'assets/[name]-[hash][extname]', // Ubicación de otros assets como CSS, imágenes, etc.
      },
    },
  },
});
