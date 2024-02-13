import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import preact from "@astrojs/preact";
const DEV_PORT = 3000;


// https://astro.build/config
export default defineConfig({
  site: process.env.CI ? 'https://astro.build' : `http://localhost:${DEV_PORT}`,
  base: process.env.CI ? '/flowbite-astro-admin-dashboard' : undefined,
  server: {
    port: DEV_PORT
  },
  integrations: [tailwind(), sitemap(), preact()]
});