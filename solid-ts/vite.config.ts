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
  build: {
    outDir: './dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // or 'modern'
      },
    },
  }
});
