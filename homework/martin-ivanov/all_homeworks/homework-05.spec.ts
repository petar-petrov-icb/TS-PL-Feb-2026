// use the code gen tool in VScode Testing tab to generate the following scenario:

// go to https://pragmatic.bg/
// hover on "Курсове"
// click on "Автоматизирано Тестване с Playwright и TypeScript"
// click the title of lecture 11 (its a link)

// afterwords you will have a new file in project/tests folder.
// Move it to your homework folder and rename the file and scenario inside to something meaningfull
// you can execute the new scenario "*.spec.ts" file by scenario name with this command: `npx playwright test -g "Scenario Name"` by changing "Scenario Name" to your scenario's name

// bonus: you can add some assertions to check page titles after each navigation (see lecture 11 example of this assertion)

// Good luck and happy hacking!

import { test, expect } from '@playwright/test';

test('Martin homework - Nagivation lecture 11', async ({ page }) => {
  await page.goto('https://pragmatic.bg/');
  await expect(page).toHaveTitle(/Pragmatic LLC/);

  await page.locator("//*[@id='menu-item-6972']/a[1]").hover();

  await page.locator('#menu-item-9220').click();

  await page.getByRole('link', { name: 'Въведение в Playwright' }).click();
  await expect(page.getByRole('heading', { name: 'Въведение в Playwright' })).toBeVisible();

  //await page.pause();
});
