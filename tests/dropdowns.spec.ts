/*
Static dropdowns - These are those drop downs which have fixed options,
fixed elements. It has a `select` tag.
For a `select` dropdown ONLY, you can simply use the selectOption() method. 
If the drop down does not have the select tag, you can not use this method.
*/
import { expect, Locator, test } from '@playwright/test'

test('Single select dropdown', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    //I can pass a string argument. I can even pass an object argument.
    await page.getByRole('combobox'), {name:'country'}
    await page.locator('#country').scrollIntoViewIfNeeded()
    await page.locator('#country').selectOption('Canada')       //HTML text
    await page.locator('#country').selectOption('uk')           //value attribute

    await page.locator('#country').selectOption({label: 'Japan'})   //HTML text
    await page.locator('#country').selectOption({value: 'brazil'})   //value attribute

    //Verify that the number of options in this drop-down is exactly 10.
    // console.log(await page.locator('#country > option').count())

    const countryDropdownOptions: Locator = page.locator('#country > option')
    await expect(countryDropdownOptions).toHaveCount(10)

    const optionsText: string[] = (await countryDropdownOptions.allInnerTexts()).map(text => text.trim())
    console.log(optionsText)

    await page.pause()
})

//count() - It is for fetching and storing the count. 
//toHaveCount() - This is an assertion. 
//You can not use innerText() and textContent() methods on multiple elements.

//For multi-select dropdowns, the only different thing is it has a `multiple` attribute.
//That is the only difference between a static drop-down from where I can select a
//single option versus a multi-select drop-down.

//In order to automate multi-select dropdown, I can pass an array of strings or an array of objects. 

//Check for Duplicates - From the colours drop-down, retrieve only the duplicate values in an array. 
//['Red','Green']