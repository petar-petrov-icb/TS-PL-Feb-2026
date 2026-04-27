// create the below 2 test scenarios
// put all groups of actions into a test.step
// use soft assertions, unless we are assrting a navigation has taken place
// try to add meaningful comments to all assertions
// you can find test execution command examples in the Readme.md file in project's main folder
// you can add -ui mode debug your tests during execution
// after execution view html report with command: 'npx playwright show-report' (if any tests failed report will open automaticaly)
// a trace artifact will be added to the report if any test has failed, you can use as well to debug your tests

import { test, expect } from '@playwright/test';

// first test scenario use CSS and XPATH selectors like page.locator('location string'):
test.describe('Playwright homework  - CSS and XPATH Locators', () => {
  test.use({ baseURL: 'https://rahulshettyacademy.com/' });

  // navigate to https://rahulshettyacademy.com/AutomationPractice/
  test('Scenario 1', async ({ page }) => {
    await test.step('Navigate to the page "AutomationPractice/"', async () => {
      await page.goto('AutomationPractice/');
      // assert succesful naviation
      await expect(page).toHaveTitle('Practice Page');
    });

    // check radio button #2
    await test.step('Click Radio button #2', async () => {
      const radioButton2 = await page.locator("input[value='radio2']");
      await radioButton2.click();
      // assert Radio button #2 is checked
      await expect.soft(radioButton2, 'The Radion Button #2 must be checked').toBeChecked();
    });

    // fill the input with "Bulgaria"
    await test.step('Fill the Suggestion class field with "Bulgaria" and verify "Bulgaria is selected from the autosuggestion', async () => {
      const autoCompleteField = await page.locator('#autocomplete');
      await autoCompleteField.fill('Bulgaria');
      // Wait for dropdown to become visible
      const option = page.locator('.ui-menu-item-wrapper', { hasText: 'Bulgaria' });
      await expect(option).toBeVisible();
      // click on the first auto complete suggestion
      await option.click();
      // Verify the input value is "Bulgaria"
      await expect.soft(autoCompleteField, 'The value must be "Bulgaria"').toHaveValue('Bulgaria');
    });

    // select option #2 from the dropdown
    await test.step('Select option #2 from the dropdown', async () => {
      const dropdown = await page.locator('#dropdown-class-example');
      await dropdown.selectOption('option2');
      // Verify the selected option is "option2"
      await expect(dropdown, 'The dropdown must have value "option2"').toHaveValue('option2');
    });

    // check checkbox #3
    await test.step('Check checkbox #3', async () => {
      const checkBox3 = await page.locator('#checkBoxOption3');
      await checkBox3.check();
      // Verify checkbox #3 is checked
      await expect.soft(checkBox3, 'The checkbox #3 must be checked').toBeChecked();
    });

    // click on the "Hide" button
    await test.step('Click on the "Hide button"', async () => {
      const hideButton = await page.locator('#hide-textbox');
      await hideButton.click();
      const displayText = await page.locator('#displayed-text');
      // Verify the input element is now hidden
      await expect
        .soft(displayText, 'The "Display text" field must NOT be visible')
        .not.toBeVisible();
    });

    // hover over the "Mouse Hover" element
    await test.step('Hover "Mouse hover" and verify the "Top link" is visible', async () => {
      const mouseHover = await page.locator('#mousehover');
      await mouseHover.hover();
      const topLink = await page.locator('.mouse-hover-content a', { hasText: 'Top' });
      // Verify the "Top" link is now visible
      await expect.soft(topLink, 'The "Top link" must be visible').toBeVisible();
    });
  });
});

// second test scenario use only Playwright selectors like page.getByRole('button', { name: 'Вход' }).click();

test.describe('Playwright homework  - Built in Locators', () => {
  test.use({ baseURL: 'https://testautomationpractice.blogspot.com/' });

  // navigate to https://testautomationpractice.blogspot.com/p/playwrightpractice.html
  test('Scenario 2', async ({ page }) => {
    await test.step('Navigate to the page "p/playwrightpractice.html"', async () => {
      await page.goto('p/playwrightpractice.html');
      // assert succesful naviation
      await expect(page).toHaveTitle('Automation Testing Practice: PlaywrightPractice');
    });

    // In Playwright Practice session group 1. getByRole() Locators pick a locator from section Navigation and click on it.
    await test.step('Click Home link in Navigation Section in the getByRole() Locators', async () => {
      const navigation = page.locator('#role-locators').getByRole('navigation');
      const homeLink = navigation.getByRole('link', { name: 'Home' });
      await homeLink.click();
      // assert navigation has taken place (url has changed)
      await expect.soft(page, 'The link must contain "#" at the end').toHaveURL(/#$/);
    });

    // In Playwright Practice session group 2. getByText() Locators pick one of the paragraphs with colored text and assert is color
    await test.step('Pick Paragraph with colored text from the getByText() Locators', async () => {
      const coloredText = await page.getByText('colored text');
      // assert the color of the Important text
      await expect
        .soft(coloredText, 'The colored text must be red')
        .toHaveCSS('color', 'rgb(255, 0, 0)');
    });

    // In Playwright Practice session group 3. getByLabel() Locators Locators click the unchecked radio button
    await test.step('Click the unchecked radio button in the getByLabel() Locators', async () => {
      const radioButton3 = await page.getByLabel('Express');
      await radioButton3.check();
      // assert the radio button is checked
      await expect.soft(radioButton3, 'The radio button "Express" must be checked').toBeChecked();
    });

    // In Playwright Practice session group 4. getByPlaceholder() Locators pick an input fill and assert it is editable
    await test.step('Pick an input field in the getByPlaceHolder() Locators', async () => {
      const searchField = await page.getByPlaceholder('Search products...');
      // fill the input filed with text
      await searchField.fill('product1');
      // assert the search filed is editable and has value "product1"
      await expect.soft(searchField, 'The search field must be editable').toBeEditable();
      await expect
        .soft(searchField, 'The search field has value "product1"')
        .toHaveValue('product1');
    });

    // In Playwright Practice session group 5.getByAltText() Locators assert the image is visible
    await test.step('Image is visible in the getByAltText() Locators', async () => {
      const image = await page.getByAltText('logo image');
      // assert the image is visible
      await expect.soft(image, 'The image "Logo image" must be visible on the page').toBeVisible();
    });

    // In Playwright Practice session group 6. getByTitle() Locators assert one of the elements' full text
    await test.step('Assert one of the elements full text in the getByTitle() Locators', async () => {
      const fullText = await page.getByTitle('Tooltip text');
      // assert the full text of the element
      await expect
        .soft(fullText, 'The element has full text "This text has a tooltip"')
        .toHaveText('This text has a tooltip');
    });

    // In Playwright Practice session group 7. getByTestId() Locators assert one of the element contains part of its text
    await test.step('Assert one of the elements in the getByTestId() Locators contains part of its text', async () => {
      const profileName = await page.getByTestId('profile-name');
      // assert the element contains part of its text
      await expect.soft(profileName, 'The element contains text "Doe"').toContainText('Doe');
    });
  });
});
