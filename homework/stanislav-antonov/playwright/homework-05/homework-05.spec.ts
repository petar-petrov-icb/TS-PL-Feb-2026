import { test, expect } from '@playwright/test';

test('Navigate to and open Lecture 11 - Stanislav', async ({ page }) => {
  await page.goto('https://pragmatic.bg/');
  await expect(page).toHaveURL('https://pragmatic.bg/');

  await page.locator('#menu-item-6972').hover();
  await page
    .locator('#menu-item-9220')
    .getByRole('link', { name: 'Автоматизирано Тестване с' })
    .click();

  await expect(page).toHaveTitle(
    'Автоматизирано Тестване с Playwright и TypeScript – Pragmatic LLC',
  );

  await page.getByRole('link', { name: 'Въведение в Playwright' }).click();
  await expect(page).toHaveTitle('Въведение в Playwright – Pragmatic LLC');
});
