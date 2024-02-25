import { defineConfig } from "astro/config";
import icon from "astro-icon";
import { remarkReadingTime } from "./src/utils";

export default defineConfig({
  site: "https://ezaz.dev",
  integrations: [
    icon(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime]
  }
});
