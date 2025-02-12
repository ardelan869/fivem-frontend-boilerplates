import path from 'path';
import solid from 'vite-plugin-solid';
import devtools from 'solid-devtools/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    devtools({
      autoname: true,
    }),
    solid(),
  ],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: './dist',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or 'modern'
      },
    },
  },
});
