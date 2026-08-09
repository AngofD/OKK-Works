import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://okk.works',
  output: 'static',
  build: {
    format: 'directory',
  },
});
