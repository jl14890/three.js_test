import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "https://jooohyunpark.github.io/test/",
  build: {
    outDir: "./docs",
  },
});