import { defineConfig } from "astro/config";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://ezaz.dev",
  integrations: [icon(), mdx()]
});