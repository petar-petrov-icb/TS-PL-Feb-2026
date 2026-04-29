import { expect, test } from '@playwright/test';

test('Homework 2', async ({ page }) => {
  const kursoveButton = page.getByRole('link', { name: 'Курсове', exact: true });
  const pragmaticLogo = page.locator('#logo');
  const kursZaIzbirane = page
    .locator('#menu-item-9220')
    .getByRole('link', { name: 'Автоматизирано Тестване с' });
  const kursHeader = page.getByRole('heading', {
    name: 'Автоматизирано Тестване с Playwright и TypeScript',
  });
  const lekciq11 = page.getByTitle('Въведение в Playwright');
  const lekciq11Heading = page.getByRole('heading', { name: 'Въведение в Playwright ' });

  await page.goto('https://pragmatic.bg/');
  await expect(pragmaticLogo).toBeVisible();

  await kursoveButton.hover();
  await kursZaIzbirane.click();
  await expect(kursHeader).toBeVisible();

  await lekciq11.click();
  await expect(lekciq11Heading).toBeVisible();
});
