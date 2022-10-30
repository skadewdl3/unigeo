import { fileURLToPath, URL } from 'node:url';
import filterReplace from 'vite-plugin-filter-replace';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    filterReplace([
      {
        filter: /\.vue/,
        replace: {
          from: 'prodEnv = false',
          to: 'prodEnv = true'
        }
      }
    ])
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
