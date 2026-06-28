import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://cat5dog2.github.io',
  integrations: [mdx()],
});