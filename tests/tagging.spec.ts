/*
Grouping is for organising tests. 
Tagging is for selecting test cases 

Grouping tells us where the test case belongs. 
Tagging tells us what type of test it is or when we want to run it.

Imagine you have
    200 tests.
    Some tests are critical
    some tests are long
    some tests are unstable
    some tests are for quick verification.

Now, suppose you want to run only smoke test cases
regression test cases, critical test cases.
Running all 200 test cases every time would be slow and unnecessary.

Smoke testing means checking whether the main and the most important
features of the application are working or not.
It is not deep testing. It is a quick basic check.

Suppose we have a shopping website that we have to test.

Before doing detailed testing, we first check:
1. Can the user open the website?
2. Can the user log in?
3. Can the user search a product?
4. Can the user add a product to the cart?
5. Can the user place an order?

Smoke testing.

Regression Testing
Regression testing means checking whether old working features are still working after a new change.

Suppose developers added a new coupon feature to a shopping website.
Now we should not only test the coupon feature. 
We also need to check whether old features are still working. 
- Login
- Search
- Add to Cart
- Payment
- Order History

Because sometimes a new change can break an old feature.

Suppose you want to run only the smoke tests or only the regression test
or only the critical tests. Running 200 test cases every time would be
very slow and very unnecessary. That is where tags help. 

Tags are labels that we attach to tests so that we can run specific groups of tests. 

Why do we use tags? 
Because in the real projects we do not always run all test cases.
we run different sets of tests for different purposes.

There is no limit to how many tags you can add to a test case.

Use this command to run only the smoke tags
npx playwright test --grep smoke

To run only the regression test cases, run this command.
npx playwright test --grep regression

In order to run multiple tags, we can run this command. 
npx playwright test --grep "@smoke|@regression"

Here, the pipe symbol means "or", not "and". 
This command simply means run the test cases that contain @smoke and @regression.

Tags can be placed anywhere in the test name.
You can place them in the beginning, somewhere in the middle, or in the end. 

There is a little problem when we write the tags inside the test case name itself.

test('@smoke @regression @ui @critical Test1', async ({page}) => {}

Now, the test title is doing too many things. It is describing the test and holding'
the metadata. That makes the test case very hard to read and maintain.

We have a better way that is using the tag option. 

This is the shorter command. 
npx playwright test -g smoke 
*/

import { expect, Locator, test } from '@playwright/test'

//Here, @smoke is just a label. It's a tag. 
// test('@smoke Test1', async ({page}) => {
//     await page.goto('https://google.com')
// })

// Here I have given two tags: smoke and regression. 
// test('@smoke @regression Test2', async ({page}) => {
//     await page.goto('https://facebook.com')
// })

//Here, the title focuses only on the behaviour, and the tag is
//defined separately. This is very clean and easier to maintain. 
test('Test1', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('https://google.com')
})

//This test case now belongs to smoke and regression, basically both the groups. 
test('Test2', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    await page.goto('https://facebook.com')
})

//We can tag multiple test cases together. Sometimes many tests belong to the
//same category. Instead of repeating the tag again and again, we can apply it
//at the group level also.

//Now both the test cases automatically inherit the tag. This is very useful in real projects. 

test.describe('Authentication tests', {
    tag: '@smoke'
}, () => {
    test('User can login', async ({ page }) => {
        await page.goto('https://google.com')
    })

    test('Test1', async ({ page }) => {
        await page.goto('https://google.com')
    })
})

/*
Group is like a folder. 
Tag is like a label.

The group organises the test. 
The tags help decide which test cases to run.

Tags can be used across multiple files. This is one of the biggest advantages of tags. 

You may have login spec file, cart spec file, checkout spec file.
Each file can contain smoke tags! 
npx playwright trest --grep @smoke

*/