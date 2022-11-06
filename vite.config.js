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
          from: '%BASE_URL%',
          to:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000'
              : 'https://unigeo.deta.dev'
        }
      },
      {
        filter: /\.js/,
        replace: {
          from: '%BASE_URL%',
          to:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000'
              : 'https://unigeo.deta.dev'
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
