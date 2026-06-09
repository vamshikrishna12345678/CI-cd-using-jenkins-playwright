
import { expect, Locator, test } from '@playwright/test'

//Baseline simply means your reference image.
/*
The first run failed because there is no baseline to
compare with, so Playwright automatically created one
and failed the test intentionally.
*/
test("Visual test", async ({ page }) => {
    await page.goto("https://demowebshop.tricentis.com/");

    // await page.waitForTimeout(5000)
    await expect(page).toHaveScreenshot('homepage.png', {})
});

//Will it always pass? 

//This is the command to update the baseline. 
//npx playwright test --update-snapshots

//npx playwright test visualtesting --update-snapshots

/*
The real-world rule is: if so many test cases are failing,
investigate first. Don't blindly update the snapshots. If a
change is valid, then only update snapshots. If not, log a bug. 

Updating snapshots is not a fix; it is a decision. 
*/