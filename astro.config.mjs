import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://okkworks.com',
  output: 'static',
  build: {
    format: 'directory',
  },
});
