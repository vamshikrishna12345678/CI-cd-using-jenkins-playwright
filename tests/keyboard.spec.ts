/*
In Playwright, keyboard actions are used when we want to
behave like a real user pressing the keys.

If you just want to enter text, use the `fill` method most of the time.
If you want to test real keyboard behaviour, then only use keyboard actions.

Playwright itself recommends the `fill` method as the easiest way
to fill the form fields, and the Keyboard API is only useful when
you need actual key events. 

Normal Text Entry 
await page.locator().fill('Piyush')

Lets simulate Enter key
await page.locator().press('Enter')

We will use the keyboard API only when I want to type like a real user.

Difference between textbox and textarea

A normal text box is Usually for single line input 
<input type="text">

The text area is for multi-line input. 
<textarea></textarea>

Using Playwright, I can automate both the normal text box and
the text area with the same `fill` method.
For both, I can use the same role `textbox`. 

The below two steps are not really needed. 
    await page.keyboard.down('Tab')
    await page.keyboard.up('Tab')

You can simply use 
    await page.keyboard.press('Tab')

    It internally does key down and key up. 

*/

import { expect, Locator, test } from '@playwright/test'

test('Keyboard actions - Only MAC', async ({ page }) => {
    await page.goto('https://gotranscript.com/text-compare')

    // await page.locator('[name="text1"]').fill('This is my text')
    await page.getByPlaceholder('Paste one version of the text here.').fill('This is my text')

    //Now I want to simulate Command-C and Command-V. 
    await page.keyboard.press('Meta+A')
    await page.keyboard.press('Meta+C')
    // await page.keyboard.down('Tab')
    // await page.keyboard.up('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('Meta+V')
    await page.pause()
})

//Your test case should work on all the platforms - Windows/MAC
test.only('Keyboard actions - Both Windows & MAC', async ({ page }) => {
    await page.goto('https://gotranscript.com/text-compare')

    // await page.locator('[name="text1"]').fill('This is my text')
    const text1 = page.getByPlaceholder('Paste one version of the text here.')
    const text2 = page.getByPlaceholder('Paste another version of the text here.')

    await text1.fill('This is my text')

    //Now I want to simulate Control-C and Control-V. 
    await page.keyboard.press('ControlOrMeta+A')
    await page.keyboard.press('ControlOrMeta+C')
    // await page.keyboard.down('Tab')
    // await page.keyboard.up('Tab')
    await page.keyboard.press('Tab')
    await page.keyboard.press('ControlOrMeta+V')

    await expect(text2).toHaveValue('This is my text')
    await page.pause()
})
