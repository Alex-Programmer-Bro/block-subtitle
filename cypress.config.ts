import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    port: 7000,
    baseUrl: 'http://localhost:6006',
    setupNodeEvents(on, config) {
    },
  },
});
