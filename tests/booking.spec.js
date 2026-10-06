// Reserveringsformulier: elke controle moet ook werken als iemand de HTML-attributen
// (min, max, maxlength) in de ontwikkelaarstools weghaalt.
const { test, expect } = require("@playwright/test");

// Datum "jjjj-mm-dd" in de tijdzone van de browser, n dagen vanaf vandaag
async function day(page, offset) {
  return page.evaluate((n) => {
    const d = new Date();
    d.setDate(d.getDate() + n);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  }, offset);
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  // window.open onderscheppen in plaats van WhatsApp echt te openen
  await page.evaluate(() => {
    window.__opened = [];
    window.open = (url) => { window.__opened.push(url); return null; };
  });
});

async function fill(page, { name = "Jan Jansen", from, to, note = "" }) {
  await page.fill("#bf-name", name);
  await page.fill("#bf-from", from);
  await page.fill("#bf-to", to);
  if (note) await page.fill("#bf-note", note);
}

async function submit(page) {
  const button = page.locator("[data-booking-form] button[type=submit]");
  await button.scrollIntoViewIfNeeded();
  await button.click();
}

const opened = (page) => page.evaluate(() => window.__opened);
const errorFor = (page, name) => page.locator(`[data-error-for="${name}"]`);

test("weigert een ophaaldatum in het verleden, ook zonder min-attribuut", async ({ page }) => {
  await page.evaluate(() => {
    document.querySelector("#bf-from").removeAttribute("min");
    document.querySelector("#bf-to").removeAttribute("min");
  });
  await fill(page, { from: await day(page, -30), to: await day(page, -28) });
  await submit(page);

  expect(await opened(page)).toEqual([]);
  await expect(errorFor(page, "from")).toBeVisible();
  await expect(errorFor(page, "from")).toHaveText("Kies een ophaaldatum vanaf vandaag.");
});

test("weigert terugbrengen vóór ophalen", async ({ page }) => {
  await fill(page, { from: await day(page, 10), to: await day(page, 5) });
  await submit(page);

  expect(await opened(page)).toEqual([]);
  await expect(errorFor(page, "to")).toHaveText("Kies een datum op of na de ophaaldatum.");
});

test("weigert datums meer dan een jaar vooruit, ook zonder max-attribuut", async ({ page }) => {
  await page.evaluate(() => {
    document.querySelector("#bf-from").removeAttribute("max");
    document.querySelector("#bf-to").removeAttribute("max");
  });
  await fill(page, { from: await day(page, 400), to: await day(page, 402) });
  await submit(page);

  expect(await opened(page)).toEqual([]);
  await expect(errorFor(page, "from")).toHaveText("Reserveren kan tot een jaar vooruit.");
});

test("weigert een lege naam", async ({ page }) => {
  await fill(page, { name: "   ", from: await day(page, 3), to: await day(page, 4) });
  await submit(page);

  expect(await opened(page)).toEqual([]);
  await expect(errorFor(page, "name")).toHaveText("Vul uw naam in.");
});

test("weigert een te lange naam, ook zonder maxlength", async ({ page }) => {
  await page.evaluate(() => document.querySelector("#bf-name").removeAttribute("maxlength"));
  await fill(page, { name: "x".repeat(200), from: await day(page, 3), to: await day(page, 4) });
  await submit(page);

  expect(await opened(page)).toEqual([]);
  await expect(errorFor(page, "name")).toHaveText("Gebruik maximaal 80 tekens.");
});

test("accepteert vandaag als ophaaldatum", async ({ page }) => {
  await fill(page, { from: await day(page, 0), to: await day(page, 1) });
  await submit(page);
  expect(await opened(page)).toHaveLength(1);
});

test("stuurt een geldige aanvraag als WhatsApp-bericht door", async ({ page }) => {
  const from = await day(page, 3);
  const to = await day(page, 5);
  await page.selectOption("#bf-car", "Volkswagen Golf 8.5 R");
  await fill(page, { from, to, note: "Graag rond 10 uur" });
  await submit(page);

  const urls = await opened(page);
  expect(urls).toHaveLength(1);
  expect(urls[0]).toMatch(/^https:\/\/wa\.me\/31629207716\?text=/);

  const text = decodeURIComponent(urls[0].split("?text=")[1]);
  const nl = (iso) => iso.split("-").reverse().join("-");
  expect(text).toContain("Naam: Jan Jansen");
  expect(text).toContain("Auto: Volkswagen Golf 8.5 R");
  expect(text).toContain(`Ophalen: ${nl(from)}`);
  expect(text).toContain(`Terugbrengen: ${nl(to)}`);
  expect(text).toContain("Opmerking: Graag rond 10 uur");
});

test("'Deze auto aanvragen' vult de juiste auto in", async ({ page }) => {
  const buttons = page.locator("[data-select-car]");
  const count = await buttons.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const car = await buttons.nth(i).getAttribute("data-select-car");
    await buttons.nth(i).scrollIntoViewIfNeeded();
    await buttons.nth(i).click();
    await expect(page.locator("#bf-car")).toHaveValue(car);
  }
});
