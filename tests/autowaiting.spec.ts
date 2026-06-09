/*
Playwright has a powerful feature called auto-waiting, which simplifies
test automation by automatically waiting for the right conditions before
performing actions. 

Auto-waiting means Playwright automatically waits for the necessary
conditions. Actionability checks before executing actions like click,
fill, type, etc.

await page.locator('dsdsds').click()

Before clicking, Playwright will wait until:
1. The button is attached to the DOM
2. It is visible
3. It is enabled
4. It is not covered by any other element

So the advantage of auto-waiting is we don't have to add manual waits
like `waitForTimeout`.

"Receives Events" -> When you click something in a browser, the browser
sends a mouse event to the element, but that works only if nothing is blocking it.
If something is sitting on top of that element, the click will go to
that top element instead. Playwright checks this before performing the action. 
So, receive events mean the element should not be covered or blocked by
any other element.

Imagine there's a button on the page, and there is a loading spinner that appears on top of it.

That button is visible? Yes
That button is stable? Yes
Can it receive an events? No. Because the overlay is sitting on top of it.

So if a real user clicks on that button, the click will hit the overlay, not the button.

Before performing any action, Playwright checks 
1. Is it visible? If yes, then go to the second check.
2. Is it stable? Stable means not moving. If yes, then go to the third check.
3. Can it receive events? If yes, then go to the final check.
4. Is it enabled?

Only when the four checks pass, then only Playwright performs the click. 

So the flow is 
1. Locator Resolution: Playwright waits for the element to appear in the DOM first.
2. Then only Playwright runs the listed actionability checks for that specific action.

If any of the actionability checks fail, Playwright DOES NOT immediately fail the test.
Instead, it waits and keeps retrying until:
1. the condition becomes true
2. the timeout is reached

Suppose a button is covered by a loading overlay. 
This is our Playwright code. 
await page.locator('#submit').click()

Playwright checks
1. Visible -> Yes
2. Stable -> Yes
3. Receive Events -> No(Overlay is covering the button)
So Playwright keeps waiting(upto 30 sec). Only when the spinner
disappears, Receive Events -> Yes. Now Playwright will perform the click.

If the condition never becomes true within the 30-second timeout,
Playwright will throw a timeout error.
Test timeout of 30 seconds exceeded. 

The auto-waiting feature not only works for actions; it also works for assertions. 

In simple words, auto waiting means Playwright will perform a range
of actionability checks. Only when all the actionability checks pass,
then only the action gets performed. 

Forcing Actions - This is used only in very special rare cases.

Sometimes you may want to skip the actionability checks. For example,
I don't want to verify if the element is visible or enabled or if
it can receive events. This is where forcing actions come into the
picture. It means we can forcefully perform an action without
performing the actionability checks.

To forcefully perform an action, simply add this -> {force: true}

Through the force option, we are telling Playwright to skip these
checks and perform the action immediately. Here, Playwright will
not wait for the element to become actionable. It will try to
perform the action even if the element is not ready. 

In most cases, this should be avoided because Playwright's auto-waiting
mechanism makes test cases more stable.

Using force as true simply tells Playwright to ignore the
actionability checks and execute the action immediately,
but this should be avoided as much as possible. 

There is no force option for assertions. It is only available
for actions like click, fill, etc. 

Why is auto waiting useful? 
1. It reduces flaky tests caused by timing issues. Flaky means
sometimes passes, sometimes fails.
2. It makes your test cases more stable and reliable.
3. It improves readability and maintainability.

 test.setTimeout() Must be inside the test case, not outside,
 and it should be written as early as possible, ideally the
 first line of your test case. 

*/

import { expect, test } from '@playwright/test'

test('Auto waiting & forcing', async ({page}) => {
    //This specific test case will get a maximum of 60 seconds. 
    // test.setTimeout(60_000)

    //Here we are telling Playwright, "This test case will take longer,
    //so give it more time." 
    test.slow()
    await page.goto('https://demowebshop.tricentis.com/')

    //Assertions - Auto weighting is applicable.
    //The auto waiting timeout is 5 seconds.
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/', {timeout: 10000})
    await expect(page.getByText('Welcome to our storezzz')).toBeVisible({timeout: 10000})

    //Actions - Auto weighting is applicable.
    //For actions, the timeout is 30 seconds. 
    await page.locator('#small-searchterms').fill('Laptop', {force: true})
    await page.locator('input[value="Search"]').click({force: true})
})