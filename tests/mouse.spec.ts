/*
https://demo.nopcommerce.com/

<a href="/apparel" aria-expanded="false" aria-haspopup="menu"
role="button" class="menu__link" tabindex="0">Apparel</a>

It's a link behaving as a button. Because of role="button"

Actual identity - it is a link
But role is button - So, it is a link behaving as a button. 

For the div, paragraph, and span elements, we can not use getByRole.

*/

import { expect, Locator, test } from '@playwright/test'

test('Mouse Hover', async ({ page }) => {
    await page.goto('https://demo.nopcommerce.com/')

    await page.getByRole('button', {name: 'Electronics'}).hover()
    await page.getByRole('button', {name: 'Apparel'}).hover()
})

test('Mouse right click action', async ({ page }) => {
    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html')

    page.locator('div', {hasText: 'Demo: Simple Context Menu'})

    //Normal click - Nothing happens
    await page.getByText('right click me', {exact: true}).click()

    //Right click
    await page.getByText('right click me', {exact: true}).click({button: 'right'})
})

test('Mouse double click action', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    const field2Textbox = page.locator('#field2')
    //Verify that the field 2 is empty. 
    await expect(field2Textbox).toBeEmpty()

    //Now perform the double click action. 
    await page.getByRole('button', {name: 'Copy Text'}).dblclick()

    await expect(field2Textbox).toHaveValue('Hello World!')

    // await page.pause()
})

test('Mouse drag and drop action', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    //Source element
    const source = page.locator('#draggable')

    //Target element
    const target = page.locator('#droppable')

    await source.dragTo(target)

    // await page.pause()
})