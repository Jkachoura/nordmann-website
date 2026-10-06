// Mobiel menu: openen, sluiten met Escape en sluiten na het kiezen van een link
const { test, expect } = require("@playwright/test");

test.describe("mobiel menu", () => {
  test.skip(({ isMobile }) => !isMobile, "het menu is alleen op mobiel inklapbaar");

  test("opent en sluit met de knop, Escape en een link", async ({ page }) => {
    await page.goto("/");
    const toggle = page.locator("[data-nav-toggle]");
    const nav = page.locator("[data-nav]");

    await expect(nav).toBeHidden();

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(nav).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(nav).toBeHidden();

    await toggle.click();
    await nav.getByRole("link", { name: "Wagenpark" }).click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(page).toHaveURL(/#wagenpark$/);
  });
});
