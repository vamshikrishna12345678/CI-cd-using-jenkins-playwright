/*
A dialogue is something that interrupts the user and asks for attention. For example:
- Are you sure?
- Enter your name.
- Payment successful.

Not all dialogues are the same. There are two major types. 
1. Browser Dialog
2. Application dialog

Browser Dialog
These are created using a JavaScript methods - alert(), confirm(), prompt()

These are not part of your DOM.
You cannot inspect them.
They block the page completely.
They must be handled using an event listener. 

Modal dialogs -> These are the dialogues that block interaction with
the rest of the page, and the user must deal with this dialogue
before interacting with the rest of the page. 

Purpose of simple alert: just inform the user. 
It just has the OK button. User has to click OK, then only the execution
will continue.

Purpose of confirm/confirmation alert: The purpose of this alert is to
ask the user to choose.
It has an OK button, it has a cancel button, and it returns either
`true` or `false`.

If the user clicks on the OK button, it returns true. 
If the user clicks on the Cancel button, it returns false.

Purpose of prompt alert: Ask the user for input.
It has OK and Cancel buttons. It returns the typed value.

Prompt is used to collect data.

All these three: alert, confirm, and prompt are browser dialogues.
They block user interaction. They are not a part of the DOM, and
you cannot inspect them.
They have to be handled using event listeners. For example, page.on()

- alert informs
- confirm ask for yes or no
- prompt ask for input

Here is the truth about the browser dialogues.
By default, Playwright automatically dismisses all the dialogs
if you do not handle them yourself. So that your test case does not freeze.

Playwright's design philosophy is that test cases should not hang
unexpectedly, so if you don't register a dialogue listener,
Playwright will auto-dismiss dialogues to prevent blocking.

*/

import { expect, Frame, FrameLocator, test } from '@playwright/test'

test('Alerts', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    //It is an event listener.
    //It means if something happens on the page, notify me. 
    //page.on('<Any Event>', callbackFunction)
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('alert')
        expect(dialog.type()).toContain('alert')
        expect(dialog.message()).toContain('I am an alert box!')

        await dialog.accept()
    })
    await page.locator('#alertBtn').click()
    await page.locator('#confirmBtn').click()
    // await page.locator('#promptBtn').click()
})

//TODO - 
//Handle the confirm and prompt alert.
//Verify the text shown in the application after clicking both OK and 
//Cancel buttons.
//For the prompt alert, provide your name and click OK.
//Now validate this message. Hello <Your Name>! How are you today?

test('Confirmation alert with OK and Cancel', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    //It is an event listener.
    //It means if something happens on the page, notify me. 
    //page.on('<Any Event>', callbackFunction)
    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('confirm')
        expect(dialog.type()).toContain('confirm')
        expect(dialog.message()).toContain('Press a button!')

        await dialog.accept()     //Press the OK button.
        // await dialog.dismiss()   //Click on the cancel button. 
    })
    await page.locator('#confirmBtn').click()
    await expect(page.locator('#demo')).toHaveText('You pressed OK!')
    // await page.locator('#promptBtn').click()
})

test.only('Prompt alert with OK and Cancel - Dismiss', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt')
        expect(dialog.type()).toContain('prompt')
        expect(dialog.defaultValue()).toContain('Harry Potter')
        expect(dialog.message()).toContain('Please enter your name:')

        // await dialog.accept()     //Press the OK button.
        await dialog.dismiss()   //Click on the cancel button. 
    })
    await page.locator('#promptBtn').click()
    await expect(page.locator('#demo')).toHaveText('User cancelled the prompt.')
})

test.only('Prompt alert with OK and Cancel - Accept', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    page.on('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt')
        expect(dialog.type()).toContain('prompt')
        expect(dialog.defaultValue()).toContain('Harry Potter')
        expect(dialog.message()).toContain('Please enter your name:')

        await dialog.accept('Piyush Gupta')     //Press the OK button.
        // await dialog.dismiss()   //Click on the cancel button. 
    })
    await page.locator('#promptBtn').click()
    await expect(page.locator('#demo')).toHaveText('Hello Piyush Gupta! How are you today?')
})