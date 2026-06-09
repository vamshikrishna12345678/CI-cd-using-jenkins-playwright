/*

Parameterization simply means reusing the same logic with different inputs.
Instead of writing the same code or same test again and again, we pass
parameters to run it with different values.

For example, imagine you want to check if a number is even or odd.
Instead of writing one programme for 2, another for 4, and another for 6 
You write a single programme that accepts a number as a parameter, and
then you test it with 2, 4, 6, 8, and so on.

This is called parameterization: same code but different inputs.

In testing, parameterization means running the same test case with multiple
sets of data.

For example, if you want to test a login page.
You don't write one test case for user 1, another test for user 2,
another test case for user 3.
Instead, you will write one test case and pass different user names and
passwords as parameters.

This makes your test cases shorter, cleaner, and easier to maintain.

There are multiple ways to store and use this data. 

1. We can store the data directly inside the test case.
2. We can store the data in an external JSON file. 
3. We can store the data in an external JS file. 
4. We can store the data in an external CSV. 
5. We can even store the data in an external Excel file. 

For CSV and Excel, we need third-party integrations. 

*/

import { expect, Locator, test } from '@playwright/test'

const searchItems: string[] = ['laptop', 'Gift card', 'smartphone', 'monitor']

test.describe('Search functionality tests', () => {
    for (const item of searchItems) {
        //This hook is only applicable within this `describe` block, not outside. 
        test.beforeEach(async ({page})=> {
            await page.goto('https://demowebshop.tricentis.com')
        })
        test(`Search test for ${item}`, async ({ page }) => {
            // await page.getByPlaceholder('Search store')
            await page.locator('#small-searchterms').fill(item)
            await page.getByRole('button', { name: 'Search' }).click()
            await expect(page.locator('h2.product-title').first()).toContainText(item, { ignoreCase: true })
        })
    }
})

//Avoid using the `forEach` method in the case of asynchronous code.
//It doesn't handle async and await code very well. 

//What changes when you use test.describe()?
//1. Your test cases are now grouped, better organised under the search
//functionality test suite in the Playwright report.

//2. If you add any of the four hooks inside the `describe`, these hooks
// are only applicable to the test cases inside this block. 
