import { test, expect } from '@playwright/test';

test.describe('Homework 06 - Playwright locators practice', () => {
  test('Scenario 1 - CSS selectors', async ({ page }) => {
    await test.step('Navigate to Automation Practice page', async () => {
      await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

      // Verify successful navigation to the practice page
      await expect(page).toHaveURL('https://rahulshettyacademy.com/AutomationPractice/');
    });

    await test.step('Check radio button #2', async () => {
      const radioButton = page.locator('input[type="radio"][value="radio2"]');

      await radioButton.check();

      // Verify Radio button #2 is checked
      await expect.soft(radioButton).toBeChecked();
    });

    await test.step('Fill autocomplete input and select Bulgaria suggestion', async () => {
      const selectCountriesField = page.locator('#autocomplete');

      await selectCountriesField.fill('Bulgaria');

      const firstAutoCompleteSuggestion = page.locator('ul.ui-autocomplete li').first();

      await firstAutoCompleteSuggestion.click();

      // Verify the selected country remains in the input
      await expect.soft(selectCountriesField).toHaveValue('Bulgaria');
    });

    await test.step('Select option #2 from dropdown', async () => {
      const selectDropdown = page.locator('#dropdown-class-example');

      await selectDropdown.selectOption('option2');

      // Verify option #2 is selected by value
      await expect.soft(selectDropdown).toHaveValue('option2');
    });

    await test.step('Check checkbox #3', async () => {
      const checkBox = page.locator('#checkBoxOption3');

      await checkBox.check();

      // Verify checkbox #3 is checked
      await expect.soft(checkBox).toBeChecked();
    });

    await test.step('Click Hide button and verify input is hidden', async () => {
      const hideShowInputField = page.locator('#displayed-text');
      const hideButton = page.locator('#hide-textbox');

      // Verify the input is visible before hiding it
      await expect.soft(hideShowInputField).toBeVisible();

      await hideButton.click();

      // Verify the input is hidden after clicking Hide
      await expect.soft(hideShowInputField).toBeHidden();
    });

    await test.step('Hover over Mouse Hover element and verify Top link is visible', async () => {
      const mouseHoverButton = page.locator('.mouse-hover');
      const topLink = page.locator('.mouse-hover-content a[href="#top"]');

      await mouseHoverButton.hover();

      // Verify Top link is visible after hovering over Mouse Hover
      await expect.soft(topLink).toBeVisible();
    });
  });

  test('Scenario 2 - Playwright built-in locators', async ({ page }) => {
    await test.step('Navigate to Playwright Practice page', async () => {
      await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');

      // Verify successful navigation to the practice page
      await expect(page).toHaveURL(
        'https://testautomationpractice.blogspot.com/p/playwrightpractice.html',
      );
    });

    await test.step('Click on Home page inside the Navigation section', async () => {
      await page.getByRole('menuitem', { name: 'Home' }).click();

      // Verify navigation has taken place after clicking Home
      await expect(page).toHaveURL(
        'https://testautomationpractice.blogspot.com/p/playwrightpractice.html#',
      );
    });

    await test.step('Check the color of a specific colored paragraph', async () => {
      // Verify the colored paragraph has the expected red color
      await expect.soft(page.getByText('colored text')).toHaveCSS('color', 'rgb(255, 0, 0)');
    });

    await test.step('Click the unchecked radio button', async () => {
      const radioButton = page.getByRole('radio', { name: 'Standard' });

      // Verify the radio button is unchecked before clicking it
      await expect.soft(radioButton).not.toBeChecked();

      await radioButton.check();

      // Verify the radio button is checked after clicking it
      await expect.soft(radioButton).toBeChecked();
    });

    await test.step('Fill input field with text', async () => {
      const inputField = page.getByPlaceholder('Enter your full name');

      // Verify the input field is editable before filling it
      await expect.soft(inputField).toBeEditable();

      await inputField.fill('Toni Storaro');

      // Verify the input field contains the filled value
      await expect.soft(inputField).toHaveValue('Toni Storaro');
    });

    await test.step('Check the image is visible', async () => {
      // Verify the image with alt text is visible
      await expect.soft(page.getByAltText('logo image')).toBeVisible();
    });

    await test.step('Check element full text using title locator', async () => {
      // Verify the element found by title has the expected full text
      await expect.soft(page.getByTitle('Home page link')).toHaveText('Home');
    });

    await test.step('Check element contains part of its text using test id', async () => {
      // Verify the element found by test id contains the expected partial text
      await expect.soft(page.getByTestId('profile-name')).toContainText('John');
    });
  });
});
