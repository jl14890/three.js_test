import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "https://jl14890.github.io/three.js_test/",
  build: {
    outDir: "./docs",
  },
});