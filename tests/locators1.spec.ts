import { expect, Locator, test } from '@playwright/test'

/*
Inside locator Assertions, we have two major subtypes. 

1. toBe** - toBeVisible, toBeHidden
These assertions check for behaviour. 

2. toHave** - Example: toHaveValue, toHaveText
These assertions check for a specific value. 

For connected fields, we need to check two things. 
1. Either the label and input are not parent and child. It means they need
matching `for` and `id`.

2. If input is a child of label, then IDs are not needed. They are
automatically connected because of the parent-child relationship. 

getByRole() is my first preferred choice.
Then is getByLabel() as my second choice.

getByTest() is the last choice().
*/


test('Playwright locators', async ({ page }) => {
    await page.goto('http://demo.nopcommerce.com/register')

    //Writing : Locator in the below code is optional But ideally,
    //we should keep it just to make my intent more clear. 
    const logo: Locator = page.getByAltText('nopCommerce demo store')

    // await expect(page.getByAltText('nopCommerce demo store'))   //Not so readable
    await expect(logo).toBeVisible()

    //Here I don't care about the element type. I am searching for
    //any element which has this text "Register". 
    page.getByText('Register')

    page.getByRole('link', { name: 'Register' })
    page.getByRole('heading', { name: 'Register' })
    page.getByRole('button', { name: 'Register' })

})



test('Text box actions', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    page.locator('#name')
    const nameTextbox: Locator = page.getByRole('textbox', { name: 'Enter Name' })

    //Make sure that the text box is visible and enabled.
    await expect(nameTextbox, '').toBeVisible()
    await expect(nameTextbox, '').toBeEnabled()

    //console.log(await nameTextbox.getAttribute('maxlength'))    //'15'
    //console.log(await nameTextbox.getAttribute('Piyush'))       //null
    // const maxlength: string | null = await nameTextbox.getAttribute('maxlength')

    //Generic Assertion
    const maxlength: string = await nameTextbox.getAttribute('maxlength') ?? ''
    expect(maxlength).toBe('15')

    //Locator Assertion. Keeps checking for 5 seconds. 
    await expect(nameTextbox).toHaveAttribute('maxlength', '15')

    await page.pause()
})

/*
Nullish Coalescing ?? operator
The Nullish Coalescing Operator is used to provide a
default value when a variable is either `null` or `undefined`.

If the value is null or undefined, then it will return the
value on the right side.
*/

//Radio buttons always work in pairs.
test('Radio button actions', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    // page.locator('#male')
    const maleRadio: Locator = page.getByRole('radio', { name: 'Male', exact: true })
    // const maleRadio: Locator = page.getByLabel('Male', {exact: true })

    //Make sure that the radio button is visible and enabled.
    await expect(maleRadio, '').toBeVisible()
    await expect(maleRadio, '').toBeEnabled()

    //Verify that the radio button is not checked.
    expect(await maleRadio.isChecked()).toBe(false)
    expect(await maleRadio.isChecked()).toBeFalsy()
    await expect(maleRadio, 'Verify that the radio button is not checked').not.toBeChecked()

    //Check the radio button. 
    await maleRadio.check()

    //Verify that the radio button is now checked. 
    expect(await maleRadio.isChecked()).toBe(true)
    expect(await maleRadio.isChecked()).toBeTruthy()
    await expect(maleRadio, 'Verify that the radio button is not checked').toBeChecked()

    await page.pause()
})

//TODO - Figure out how to generate the assertion biolerplate code automatically
//TODO - In radio button test case, figure out which one is better:
//getByRole or getByLabel.
//TODO - Check all the check boxes.
//TODO - Check the first three check boxes(Sun, Mon, Tue)
//Uncheck the check boxes that are checked and check the ones that are unchecked.
//Automate the multi-select dropdown and Sorted List.
//Check for Duplicates - From the colours drop-down, retrieve only the duplicate values in an array. 
//['Red','Green']


test('Check box actions', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    const dayCheckboxes = page.locator('.form-check').getByRole('checkbox')
    const checkboxes = page.locator('input[type="checkbox"]');

    const count = await checkboxes.count();

    for (let i = 0; i < count; i++) {
        //Never use click() for checkboxes. Always use the check() method.
        //click() simply toggles the state. It works like an on and off button.
        //If it is on, it changes it to off. If it is off, it is turning it on.
        //The check method only checks if it is not checked. Otherwise, it does
        //nothing. 
        await checkboxes.nth(i).check();
    }

    await page.pause()
})

//Code Gen is basically a record and playback tool. Whatever step I am performing
//in the application, Playwright is simply going to record it.
//Command to launch CodeGen is 
//npx playwright codegen