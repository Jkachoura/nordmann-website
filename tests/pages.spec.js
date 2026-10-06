// Algemene controles op elke pagina, op desktop en mobiel (zie playwright.config.js)
const { test, expect } = require("@playwright/test");
const AxeBuilder = require("@axe-core/playwright").default;

const PAGES = [
  "/",
  "/privacy/",
  "/algemene-voorwaarden/",
  "/voorwaarden/",
  "/voorwaarden-zakelijk/",
  "/404.html"
];

for (const path of PAGES) {
  test.describe(`pagina ${path}`, () => {
    test("laadt zonder fouten en zonder ontbrekende bestanden", async ({ page, baseURL }) => {
      const problems = [];
      page.on("pageerror", (err) => problems.push(`JavaScript-fout: ${err.message}`));
      page.on("console", (msg) => {
        if (msg.type() === "error") problems.push(`Console: ${msg.text()}`);
      });
      page.on("response", (res) => {
        if (res.url().startsWith(baseURL) && res.status() >= 400) {
          problems.push(`${res.status()} voor ${res.url()}`);
        }
      });

      const res = await page.goto(path, { waitUntil: "networkidle" });
      expect(res.status()).toBe(200);
      expect(problems).toEqual([]);
    });

    test("heeft precies één hoofdkop en een titel", async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page).toHaveTitle(/Nordmann Automotive/);
    });

    test("wordt niet breder dan het scherm", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      );
      expect(overflow, "pagina scrollt horizontaal").toBeLessThanOrEqual(0);
    });

    test("heeft geen ernstige toegankelijkheidsproblemen", async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const serious = results.violations
        .filter((v) => v.impact === "serious" || v.impact === "critical")
        .map((v) => `${v.id}: ${v.help} (${v.nodes.map((n) => n.target.join(" ")).join(", ")})`);
      expect(serious).toEqual([]);
    });

    test("alle ankerlinks wijzen naar een bestaand onderdeel", async ({ page }) => {
      await page.goto(path);
      const missing = await page.evaluate(() =>
        [...document.querySelectorAll('a[href^="#"]')]
          .map((a) => a.getAttribute("href"))
          .filter((h) => h.length > 1 && !document.getElementById(h.slice(1)))
      );
      expect(missing).toEqual([]);
    });
  });
}

test.describe("algemene voorwaarden", () => {
  for (const path of ["/voorwaarden/", "/voorwaarden-zakelijk/"]) {
    test(`${path}: de pdf is te downloaden`, async ({ page, request }) => {
      await page.goto(path);
      const href = await page.locator(".legal__pdf").getAttribute("href");
      const res = await request.get(new URL(href, page.url()).href);
      expect(res.status()).toBe(200);
      expect(res.headers()["content-type"]).toContain("pdf");
    });

    test(`${path}: elk artikel staat in de inhoudsopgave`, async ({ page }) => {
      await page.goto(path);
      const articles = await page.locator(".legal__body section[id^='artikel-']").count();
      const toc = await page.locator(".legal__toc a").count();
      expect(articles).toBeGreaterThan(0);
      expect(toc).toBe(articles);
    });
  }
});
