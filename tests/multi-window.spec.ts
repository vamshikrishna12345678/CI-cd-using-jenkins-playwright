/*
Every page object/fixture refers to the original tab.
If you try to interact with the new tab using the current
page fixture, it is not going to work because you are still
pointing to the old tab.

So far, we are using just the page fixture provided by
Playwright because in 90% of scenarios we want to work
with a single tab only.
But what if we want to work with multiple windows or
multiple tabs? In that case, this page fixture will no
longer help, and we have to manage our own page.

In order to manage our own page, we have to start from
the very first step, which is to create a fresh browser.
Within this browser, create a fresh context or a profile.
Within this profile, we can create one or more pages.



*/

import { chromium, expect, test } from '@playwright/test'

//Playwright isolation works on the context level, not the browser level. 
test('Handle multiple pages/windows -only chromium', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext()

    const page1 = await context.newPage()
    const page2 = await context.newPage()

    await page1.pause()    
})

//Multi user scenario
//Playwright opens each isolated context in its own window to
// reflect the fact that they don't share cookies or sessions.
// It's like simulating two users on two different computers.
// Very useful for testing multi-user behaviours. 
test('Handle multiple pages/windows - only chromium1', async () => {
    const browser = await chromium.launch()

    //User1
    const context1 = await browser.newContext()     //One isolated profile
    const page1 = await context1.newPage()
    await page1.goto('https://conduit.bondaracademy.com/login')
    await page1.getByPlaceholder('Email').fill('piyushtest@test.com')
    await page1.getByPlaceholder('Password').fill('123456')
    await page1.getByRole('button', {name: 'Sign in'}).click()

    //User2
    const context2 = await browser.newContext()     //Second isolated profile
    const page2 = await context2.newPage()
    await page2.goto('https://conduit.bondaracademy.com/login')

    await page1.pause()    
})

//Multi-tab scenario
//Here, all pages will share the same session, same profile. 
test('Handle multiple pages/windows - only chromium2', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext() 

    //Here we are using only one context, meaning we are going to
    //share the same session in all the tabs and pages. 
    const page1 = await context.newPage()
    const page2 = await context.newPage()

    const allPages = context.pages()
    console.log('No of pages created', allPages.length)

    await page1.goto('https://conduit.bondaracademy.com/login')
    await page1.getByPlaceholder('Email').fill('piyushtest@test.com')
    await page1.getByPlaceholder('Password').fill('123456')
    await page1.getByRole('button', {name: 'Sign in'}).click()

    await page2.goto('https://conduit.bondaracademy.com/login')

    await page1.pause()    
})

test('Handle OrangeHRM pages - Not correct', async () => {
    const browser = await chromium.launch()
    const context = await browser.newContext() 

    const page1 = await context.newPage()
    const page2 = await context.newPage()

    const allPages = context.pages()
    console.log('No of pages created', allPages.length)

    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await expect(page1).toHaveTitle('OrangeHRM')

    await page2.goto('https://orangehrm.com/')
    await expect(page2).toHaveTitle('OrangeHRM: All in One HR Software for Businesses | OrangeHRM')

    await page1.pause()    
})

/*
const pagePromise = context.waitForEvent('page');
Hey Playwright, I am expecting a new page tab to open soon.
Please start listening for it.
Note that we don't have to use await here. 
Always make sure the listener is written before the actual action. 

const page2 = await pagePromise;
Wait for the new tab to finish opening and capture it in the page too. 

*/

test.only('Handle OrangeHRM pages - Optimized', async ({browser}) => {
    // const browser = await chromium.launch()
    const context = await browser.newContext() 

    const page1 = await context.newPage()

    await page1.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    await expect(page1).toHaveTitle('OrangeHRM')
    const pagePromise = context.waitForEvent('page');
    await page1.getByRole('link', {name: 'OrangeHRM, Inc'}).click()

    const page2 = await pagePromise;    
    await expect(page2).toHaveTitle('OrangeHRM: All in One HR Software for Businesses | OrangeHRM')

    await page1.bringToFront()
    
    await page1.pause()    
})

