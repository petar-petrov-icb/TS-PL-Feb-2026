import { test, expect } from '@playwright/test';
// create the below 2 test scenarios and put them in a test suite
// put all groups of actions into a test.step
// use soft assertions, unless we are assrting a navigation has taken place
// try to add meaningful comments to all assertions
// you can find test execution command examples in the Readme.md file in project's main folder
// you can add -ui mode debug your tests during execution
// after execution view html report with command: 'npx playwright show-report' (if any tests failed report will open automaticaly)
// a trace artifact will be added to the report if any test has failed, you can use as well to debug your tests

// first test scenario use CSS and XPATH selectors like page.locator('location string'):

// navigate to https://rahulshettyacademy.com/AutomationPractice/
// assert succesful naviation

test.describe('Test Suite Martin', { tag: ['@suite', '@smoke', '@regression'] }, () => {
  test('first scenario', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await expect(page).toHaveTitle(/Practice Page/);

    // check radio button #2
    // assert Radio button #2 is checked
    await page.locator("//*[@id='radio-btn-example']/fieldset/label[2]/input").check();
    await expect(
      page.locator("//*[@id='radio-btn-example']/fieldset/label[2]/input"),
    ).toBeChecked();

    // fill the input with "Bulgaria"
    // click on the first auto complete suggestion
    // Verify the input value is "Bulgaria"
    await page.locator("//*[@id='autocomplete']").fill('Bulgaria');
    await page.locator("//*[@id='ui-id-1']/li", { hasText: 'Bulgaria' }).click();
    await expect(page.locator("//*[@id='autocomplete']")).toHaveValue('Bulgaria');

    // select option #2 from the dropdown
    // Verify the selected option is "option2"
    await page.selectOption('#dropdown-class-example', { index: 2 });
    //await page.selectOption('#dropdown-class-example', 'option2');
    await expect(page.locator("//*[@id='dropdown-class-example']")).toHaveValue('option2');

    // check checkbox #3
    // Verify checkbox #3 is checked
    await page.locator('//*[@id="checkBoxOption3"]').check();
    await expect(page.locator('#checkBoxOption3')).toBeChecked();

    // click on the "Hide" button
    // Verify the input element is now hidden
    await page.locator('#hide-textbox').click();
    await expect(page.locator('//*[@id="displayed-text"]')).toBeHidden();

    // hover over the "Mouse Hover" element
    // Verify the "Top" link is now visible
    await page.locator('//*[@id="mousehover"]').hover();
    await expect(page.getByText('Top')).toBeVisible();

    //await page.pause();
  });

  // second test scenario use only Playwright selectors like page.getByRole('button', { name: 'Вход' }).click();

  // navigate to https://testautomationpractice.blogspot.com/p/playwrightpractice.html
  // assert succesful naviation
  test('second scenario', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/p/playwrightpractice.html');
    await expect(page).toHaveTitle('Automation Testing Practice: PlaywrightPractice');

    // In Playwright Practice session group 1. getByRole() Locators pick a locator from section Navigation and click on it.
    // assert navigation has taken place

    // In Playwright Practice session group 2. getByText() Locators pick one of the paragraphs with colored text and assert its color
    const colorElement = page.getByText('colored text');
    await expect(colorElement).toHaveCSS('color', 'rgb(255, 0, 0)');

    // In Playwright Practice session group 3. getByLabel() Locators Locators check the unchecked radio button
    // assert is is checked now
    await expect(page.getByLabel('standard')).not.toBeChecked();
    await page.getByLabel('standard').click();
    await expect(page.getByLabel('standard')).toBeChecked();

    // In Playwright Practice session group 4. getByPlaceholder() Locators pick an input fill and assert it is editable
    // fill the input filed with text
    await expect(page.getByPlaceholder('Phone number (xxx-xxx-xxxx)')).toBeEditable();
    await page.getByPlaceholder('Phone number (xxx-xxx-xxxx)').fill('070012345');

    // In Playwright Practice session group 5.getByAltText() Locators assert the image is visible
    await expect(page.getByAltText('logo image')).toBeVisible();

    // In Playwright Practice session group 6. getByTitle() Locators assert one of the elements' full text
    await expect(page.getByTitle('Tooltip text')).toContainText('This text has a tooltip');

    // In Playwright Practice session group 7. getByTestId() Locators assert one of the element contains part of its text
    await expect(page.getByText('Product A')).toContainText('A');

    //await page.pause();
  });
});
