import { test, expect } from '@playwright/test';

//In test.fail(), The test case would be executed, and
// if it is failing, Playwright will not report the
// failure. It will still pass the test case. 
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright1/);
});

//test.fail()
test('Login test case', async ({ page }) => {
  await page.goto('https://playwright.dev/'); 
 
  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  // await page.pause()
});

test('get started link 2', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  // await page.pause()
});

/*
Run all the test cases on all the browsers in headless mode. 
npx playwright test

Run all the test cases with three workers in parallel. 
npx playwright test --workers=3

Runs a specific test file
npx playwright test one.spec.ts

Runs multiple spec files in headed mode
npx playwright test one.spec.ts two.spec.ts --headed

Run a specific test case with a name. 
npx playwright test -g "test name"

Run all the tests on a specific browser. 
npx playwright test --project=chromium

Run all the test cases on all the browsers in headed mode. 
npx playwright test --headed

Run all the test cases on all the browsers with debug mode. 
npx playwright test --debug

*/

