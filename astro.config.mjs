import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://angofd.github.io',
  base: '/OKK-Works',
  output: 'static',
  build: {
    format: 'directory',
  },
});
