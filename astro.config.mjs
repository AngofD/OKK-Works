import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://okkworks.com',
  output: 'static',
  devToolbar: { enabled: false },
  build: {
    format: 'directory',
  },
});
