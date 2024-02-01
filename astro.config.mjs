import { defineConfig } from "astro/config";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";
import compress from "astro-compress";

export default defineConfig({
  site: "https://ezaz.dev",
  integrations: [
    icon(),
    mdx(),
    // compress({
    //   CSS: false,
    // }),
  ],
});
