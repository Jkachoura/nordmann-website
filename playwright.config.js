// Browsertests voor de website. Draaien bij elke pull request (zie .github/workflows/checks.yml).
const { defineConfig, devices } = require("@playwright/test");

const PORT = 4173;

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["list"], ["html", { open: "never" }]] : "list",

  use: {
    baseURL: `http://localhost:${PORT}`,
    // Zonder animaties: blokken met data-reveal staan dan direct in beeld
    contextOptions: { reducedMotion: "reduce" },
    trace: "on-first-retry"
  },

  // Statische server voor public/ (tests/server.js), zoals GitHub Pages
  webServer: {
    command: `node tests/server.js`,
    env: { PORT: String(PORT) },
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI
  },

  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } } },
    { name: "mobiel", use: { ...devices["Pixel 7"] } }
  ]
});
