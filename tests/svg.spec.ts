
import { expect, FrameLocator, Locator, test } from '@playwright/test'

test('Flipkart', async ({ page }) => {
    await page.goto('https://www.flipkart.com')

    // await page.locator('input[name="q"]').fill('Macbook')
    await page.getByRole('textbox', {name: 'Search for Products, Brands and More'}).fill('Macbook')

    //This will also work
    // await page.locator('input[name="q"]:not([readonly])').fill('Macbook')
    await page.keyboard.press('Enter')

    await page.pause()
})

//all() - Give me an array of all the matching elements "right now". 
//It does not wait for elements to appear. 

test('Pet Disease Alerts', async ({ page }) => {
    test.slow()
    await page.goto('https://petdiseasealerts.org/forecast-map#/')

    //Because it gives the page enough time to finish loading.
    await page.waitForTimeout(5000)

    const frameEle: FrameLocator = page.frameLocator('iframe[id^="map-instance"]')
    let allStates: Locator[] = await frameEle.locator('//*[local-name()="svg" and @id="map-svg"]//*[local-name()="g" and @id="regions"]/*[local-name()="g" and @class="region"]')
                  .all()

    //Total number of regions. 51                  
    console.log('Total number of regions.', allStates.length)                  

    await page.pause()
})

test('Pet Disease Alerts1', async ({ page }) => {
    test.slow()
    await page.goto('https://petdiseasealerts.org/forecast-map#/')

    //Because it gives the page enough time to finish loading.
    // await page.waitForTimeout(15000)

    const frameEle: FrameLocator = page.frameLocator('iframe[id^="map-instance"]')
    let allStates = frameEle.locator('//*[local-name()="svg" and @id="map-svg"]//*[local-name()="g" and @id="regions"]/*[local-name()="g" and @class="region"]')
            
    //Here I've added an explicit weight for individual region.
    // await expect(allStates.first()).toBeVisible()
    // await expect(allStates).toHaveCount(51)
    await allStates.first().waitFor({state: 'visible'})

    const totalRegtions = await allStates.count()

    //Total number of regions. 51                  
    console.log('Total number of regions.', totalRegtions)                  

    await page.pause()
})

test('Pet Disease Alerts2', async ({ page }) => {
    test.slow()
    await page.goto('https://petdiseasealerts.org/forecast-map#/')

    //Because it gives the page enough time to finish loading.
    // await page.waitForTimeout(15000)

    const frameEle: FrameLocator = page.frameLocator('iframe[id^="map-instance"]')
    let allStates = frameEle.locator('svg#map-svg g#regions > g.region')
            
    // await expect(allStates.first()).toBeVisible()
    // await expect(allStates).toHaveCount(51)
    await allStates.first().waitFor({state: 'visible'})

    // const totalRegions = await allStates.count()
    const stateElements = await allStates.all()

    //Total number of regions. 51                  
    console.log('Total number of regions.', stateElements.length)
    
    for(const e of stateElements){
        await e.hover()
        const stateName = await e.getAttribute("id")
        console.log(stateName)
    }

    // await page.pause()
})

test('Pet Disease Alerts - optimized', async ({ page }) => {
    test.slow()
    await page.goto('https://petdiseasealerts.org/forecast-map#/')

    const frameEle: FrameLocator = page.frameLocator('iframe[id^="map-instance"]')
    let allStates = frameEle.locator('svg#map-svg g#regions > g.region')
            
    await expect(allStates.first()).toBeVisible()
    // await expect(allStates).toHaveCount(51)
    // await allStates.first().waitFor({state: 'visible'})

    // const totalRegions = await allStates.count()
    const count = await allStates.count()

    for(let i = 0; i < count; i++){
        const state = allStates.nth(i)
        const box = await state.boundingBox()
        if(!box) continue

        await page.mouse.move(
            box.x + box.width / 2,
            box.y + box.height / 2,
            {steps: 50}
        )

        const stateName = await state.getAttribute("id")
        console.log(stateName)
    }

    // await page.pause()
})

/*
await page.mouse.click(x, y)
await page.mouse.move()
*/
