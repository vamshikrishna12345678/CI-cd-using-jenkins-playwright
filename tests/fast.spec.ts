/*

Wait for the element to have the succeeded class, then Only read its text. 

*/

import { expect, Locator, test } from '@playwright/test'

test('Get final internet speed from fast.com.', async ({ page }) => {
    test.setTimeout(5000)
    await page.goto('https://fast.com/')
    
    const speedValueElement =page.locator('#speed-value')
    const speedUnitElement = page.locator('#speed-units')

    //New locator for the succeeded state.
    const speedValueSucceeded = page.locator('#speed-value.succeeded')
    await speedValueElement.waitFor()
    await speedUnitElement.waitFor()

    console.log(await speedValueElement.innerText() + " " + await speedUnitElement.innerText())

    //Wait for the speed test to finish means the element should have the class "succeeded". 
    //This method tells Playwright to pause here until this element appears in the DOM and becomes visible.
    //{timeout: 60000} Means wait for up to 60 seconds and throw an error if the condition is not met.
    await speedValueSucceeded.waitFor({timeout: 60000}) //This does not increase the test timeout. 

    const finalSpeed = await speedValueElement.innerText()

    console.log(`Final internet speed is: ${finalSpeed}`)
})

test('Get final internet speed from fast.com 1', async ({ page }) => {
    await page.goto('https://fast.com/')
    
    const speedValueElement =page.locator('#speed-value')
    const speedUnitElement = page.locator('#speed-units')

    //New locator for the succeeded state.
    const speedValueSucceeded = page.locator('#speed-value.succeeded')
    await speedValueElement.waitFor()
    await speedUnitElement.waitFor()

    //Infinite loop risk
    //If the class succeeded never appears - the loop will run forever
    //Playwright test will only fail when the test level timeout is hit. 
    while(true){
        console.log(await speedValueElement.innerText() + " " + await speedUnitElement.innerText())

        const className = await speedValueElement.getAttribute('class')
        console.log(className)

        if(className?.includes('succeeded')){
            break
        }
    }
})

test.only('Get final internet speed from fast.com 2', async ({ page }) => {
    await page.goto('https://fast.com/')
    
    const speedValueElement =page.locator('#speed-value')
    const speedUnitElement = page.locator('#speed-units')

    //Regex are by default partial matches but case sensitive.
    //1. It waits for the element(#speed-value) to exist in the DOM. 
    //2. Wait for it to become visible. 
    //3. Keeps checking the element's class attribute until it matches /succeeded/
    //4. Retries for up to 60 seconds before failing 

    await expect(speedValueElement).toHaveClass(/succeeded/, {timeout: 60000})

    //Once the class is succeeded, get the final value. 
    const finalSpeed = await speedValueElement.innerText()
    console.log(`Final internet speed is: ${finalSpeed}`)

})