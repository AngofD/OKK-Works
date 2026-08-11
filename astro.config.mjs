import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://okk-works.pages.dev',
  output: 'static',
  build: {
    format: 'directory',
  },
});
