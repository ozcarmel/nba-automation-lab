import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://localhost:4287",
    trace: "on-first-retry"
  },
  webServer: {
    command: "C:\\Progra~1\\nodejs\\node.exe server.mjs",
    url: "http://localhost:4287",
    reuseExistingServer: true
  }
});
