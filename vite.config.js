import { defineConfig } from "vitest/config";
export default defineConfig({
  base: "./",
  esbuild: { jsx: "automatic" },
  test: {
    environment: "jsdom",
    setupFiles: "./test/setup.js",
    globals: true,
    restoreMocks: true,
  },
});
