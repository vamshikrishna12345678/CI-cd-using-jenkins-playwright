/*

Playwright has two types of assertions:
1. Generic/General assertions - Here we provide an exact value.
Try to avoid using generic assertions because there is no auto wait and no retry.
That's why we try to avoid them. 
General assertions do not have a timeout. They are non-retrying assertions. 

2. Locator assertions - Here we provide a locator. Try to use locator assertions
as much as possible because of the auto wait and retry mechanism. Locator
assertions have their own timeouts. They will wait up to five seconds for the
element to be available. 

By default, assertions are hard, which means as soon as Playwright sees a failure, it immediately stops.
But if I want Playwright to continue executing my test case in spite of the failure, we use soft assertion.
We use soft assertions only in very special cases. The majority of the time, we use the hard assertions only. 

In the case of soft assertions, errors are still reported, but only in the end. My scripts just continue. 

It is always a good idea to pass the optional second argument to specify more details about the assertion
to have more clarity in the HTML report. 
*/

import { expect, test } from '@playwright/test'

test('assertions', async ({page})=> {
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')

    //Generic Assertion
    const value = 7
    expect.soft(value, 'Verify the value is correct').toBe(8)

    //Generic Assertion
    const basicFormBtn = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')
    const text = await basicFormBtn.textContent()
    expect(text, 'Verify the button text is correct').toBe('Submit')

    //Locator Assertion - Here we always start with `await expect`. 
    await expect(basicFormBtn, 'Verify the button text is correct').toHaveText('Submit')

    //innerText() vs textContent() - They are used for fetching and storing the visible or HTML text
    //into a variable for later use.
    //ToHaveText() - Here I am directly putting an assertion on the HTML text without fetching and storing.

    //toHaveText -> HTML/visible text
    //toHaveValue -> Live value.
})

/*
Make sure that the page has a specific URL. 
1. expect(page).tohaveURL('')

This is used to verify the title of the page.
2. expect(page).toHaveTitle('')

This is used to verify that a particular element is visible.
3. expect(locator).toBeVisble()

This is used to verify that a particular element is enabled.
4. expect(locator).toBeEnabled()

This is used to verify that a particular element is disabled.
5. expect(locator).toBeDisabled()

This is used to verify that a radio button/checkbox is checked.
5. expect(locator).toBeChecked()

This is used to verify the black colour HTML/visible text. 
6. expect(locator).toHaveText('')
innerText() and textContent() are used to fetch the visible
or HTML text into a variable for later use.

This is used to verify the live value inside the text box.
It is usually shown inside the properties tab. 
7. expect(locator).toHaveValue('')
inputValue() is used to fetch the live value into a variable
for later use.

This is used to verify the attribute of an element.
8. expect(locator).toHaveAttribute('attribute name', 'attribute value')

This is used to verify that the text is present in the element. It does not require an exact match.
9.  expect(locator).toContainText('') 

This is used to verify the number of elements matching a locator.
10. expect(locator).toHaveCount()

All these assertions are hard assertions by default.
To use a soft assertion, simply use `expect.soft`.

For all these assertions, we can use the NOT to invert the value.

await expect(locator).toBeEnabled()     -> Prefer the direct way as much as possible. 
await expect(locator).not.toBeDisabled() -> Avoid the NOT way as much as possible.
*/