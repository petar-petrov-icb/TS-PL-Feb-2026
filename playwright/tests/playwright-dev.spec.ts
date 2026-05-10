import { test, expect } from '@playwright/test';

test('navigate to playwright.dev and verify title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
