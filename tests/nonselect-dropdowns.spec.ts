
/*
DIV is just a container. It is like a box used to group things together. 

div = box/container
label = This is simply the text shown to the user. It tells the user what this field is for.
Span is simply used to display the text. 

For non-select drop-downs, we simply use the click method. 

Just because an element exists in HTML does not mean it is visible on the screen. 
So web applications often keep elements hidden. They show
them only after performing a click, and then it hides them again after selection. 

Use the Pick Locator functionality, and this is the locator suggested by Playwright.
locator('div').nth(3) -> This locator depends upon position, not identity. That is not good. 

The above locator means always click the fourth div on the page.
This is Fragile Automation. 

Playwright is trying to make something work quickly.
It is not trying to make something maintainable. 

The tool goal: Make it run. 
Your goal: make it stable. 

Playwright behavior
1. I found the element.
2. I check if it is visible.
3. It is hidden.
4. I will keep retrying.
5. Timeout reached.
6. Test failed.

I get the failure because the python option exists but it
is hidden, so Playwright refuses to click. 

Only after opening the dropdown, the Python option becomes
visible, and then the click will work. 

//div[@class="select-trigger"]//span[text()="Choose your preferred programming language"]

The real question is, is this the best default approach? NO

The rule is:
1. Always start with CSS first.
2. If it matches multiple elements, make it more specific using unique attributes, parent containers, or unique identifiers.
3. Do not jump to XPath immediately.

This is the equivalent CSS. [data-name="language"] .select-trigger span

############################################################
Reason for using await when calling the function 
############################################################

Await inside a function waits for the steps inside the function. 
Await when calling a function, waits for the whole function to finish. 

Imagine you ordered food from a restaurant. 
Inside the kitchen, the chef waits for the food to cook.
Outside, you are waiting for the entire order to be ready.

Both the waits are necessary.
*/

import { expect, Locator, Page, test } from '@playwright/test'

test.only('Non select dropdown', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/non-select-dropdown.html')

    //XPath
    //await page.locator('//div[@class="select-trigger"]//span[text()="Choose your preferred programming language"]').click()

    await page.locator('[data-name="language"] .select-trigger').click()

    //Always use stricter matching whenever possible because it makes our
    //locators more reliable and reduces false matches. 
    await page.getByText('Python', {exact: true}).click()
    await page.locator('div.options.show').getByText('Python', {exact: true}).click()

    await page.locator('[data-name="framework"] .select-trigger').click()
    await page.getByText('Angular', {exact: true}).click()

    await page.locator('[data-name="database"] .select-trigger').click()
    await page.getByText('MongoDB', {exact: true}).click()

    await page.pause()
})

//Every async function returns a promise. 
//Promise<void> Means this function will finish in the future and it does not return any value. 
async function selectDropdownOption(page: Page, dropdownName: string, optionValue: string): Promise<void>{
    await page.locator(`[data-name="${dropdownName}"] .select-trigger`).click()
    await page.getByText(optionValue, {exact: true}).click()
}

//SRP - Single responsibility principle 
//My code is cleaner, shorter, reusable, and easier to maintain.
//If tomorrow a new dropdown is added, we do not write new logic.
//We simply reuse the same function. That is the power of creating
//generic utilities. 
test('Non select dropdown1', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/non-select-dropdown.html')

    //I still have to write await even when I'm calling the function. It's a must. 
    await selectDropdownOption(page, 'language', 'Python')
    await selectDropdownOption(page, 'framework', 'Angular')
    await selectDropdownOption(page, 'database', 'MongoDB')

    await page.pause()
})

test('Non-editable textbox', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/dummy1.html')

    page.getByRole('textbox', {name: 'Name:'})
    const label = page.getByLabel('Name:')

    //This fill will not work because currently the text box is not editable.
    //await label.fill('Hello World')

    await expect(
        label, 
        'Verify that the textbox is having readonly attribute'
    ).toHaveAttribute('readonly')
    
    //I have to make this textbox editable. How? Simply click inside.
    await label.click()
    await label.fill('Hello World')
    await expect(label).toHaveValue('Hello World')
    await expect(label).not.toHaveAttribute('readonly')
    await page.pause()
})