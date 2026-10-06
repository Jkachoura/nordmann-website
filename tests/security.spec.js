// Beveiliging: Content-Security-Policy in elke pagina en de headers voor Netlify
const { test, expect } = require("@playwright/test");
const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const PAGES = ["/", "/privacy/", "/algemene-voorwaarden/", "/voorwaarden/", "/voorwaarden-zakelijk/", "/404.html"];

test("CSP-hash klopt met het inline script in 404.html", () => {
  const html = fs.readFileSync(path.join(ROOT, "public", "404.html"), "utf8");
  const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
  const hash = "sha256-" + crypto.createHash("sha256").update(script, "utf8").digest("base64");

  const pages = fs.readdirSync(path.join(ROOT, "public"), { recursive: true }).filter((f) => f.endsWith(".html"));
  for (const page of pages) {
    const content = fs.readFileSync(path.join(ROOT, "public", page), "utf8");
    expect(content, `${page} mist de juiste hash`).toContain(`'${hash}'`);
  }
  expect(fs.readFileSync(path.join(ROOT, "netlify.toml"), "utf8")).toContain(`'${hash}'`);
});

for (const p of PAGES) {
  test(`${p}: heeft een Content-Security-Policy en beveiligingsheaders`, async ({ page }) => {
    const res = await page.goto(p);
    await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveCount(1);

    const headers = res.headers();
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
  });
}

test("de site laat zich niet in een frame van een andere site laden", async ({ page, baseURL }) => {
  // Een lege pagina van "buiten" (zonder eigen beveiligingsregels) probeert de homepage in te sluiten
  await page.setContent(`<iframe name="inbedding" src="${baseURL}/" width="800" height="600"></iframe>`);
  await page.waitForTimeout(1500);

  // Playwright kan in het frame kijken: is de homepage daar geladen?
  const frame = page.frame({ name: "inbedding" });
  const loaded = frame ? await frame.locator("h1").count().catch(() => 0) : 0;
  expect(loaded, "de homepage is in een vreemd frame geladen").toBe(0);
});
