// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.radionova.bg/');
  await page.getByRole('link', { name: ' Актуално' }).click();
  await page.locator('.sidebar').click();
  await page
    .getByText('ПродължиТози уебсайт използва бисквитки за да съхранява настройки и да персонали')
    .click();
  await page.getByRole('link', { name: 'Продължи' }).click();
  await page
    .locator('div')
    .filter({ hasText: 'Актуално Нови предавания в ефира на Радио NOVA 150' })
    .nth(1)
    .click();
  await page.getByRole('link', { name: '🔍' }).click();
  await page.locator('#gs_tti50').click();
  await page.locator('#gs_tti50').click();
  await page.getByRole('button', { name: '▶' }).click();
  await page.getByRole('button', { name: '▶' }).click();
  await page.getByRole('link', { name: 'Нови предавания в ефира на Радио NOVA' }).first().click();
});
