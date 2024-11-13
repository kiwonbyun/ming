import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ["react", "react-dom"],
  onSuccess: "cp src/styles.css dist/",
  watch: true,
  injectStyle: true,
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
