/*
We can capture the screenshot in three ways.
1. Whatever is currently visible on the page, but not the full page.
2. Capture the full page screenshot.
3. Capture the screenshot of a specific area.

page.screenshot() 
This method captures a screenshot of the whole page, basically the
visible area, unless F is specified for the full page.
It returns binary data or a buffer by default, but you can save
the screenshot to a file by specifying the path. 
await page.screenshot({path: 'screenshots/homepage.png'})

The main purpose of page.screenshot is to take a picture of your web
page while the test is running. It is like pressing the Print Screen
button on your computer.

You mostly use the screenshot to
1. Save the evidence of how the page looked at a certain step.
2. For debugging issues: why a test case is failing.
3. Document the look of your application at certain points.

Page screenshot just captures the screenshot and saves it somewhere.
If you want to check for differences between runs, you would use
Visual testing.

Date.now() Returns the number of milliseconds from January 1, 1970.
And it always generates a unique number. It is like a clock that keeps running. 

Without the fullPage: true, the file size is smaller, and with fullPage:true,
it is more than double.

If you are trying to take the screenshot of a particular element which
is not a part of the visible area, playwright will automatically scroll there.

Next is capturing the screenshot by using the config file.
The default option is off. screenshot: 'off'

screenshot: 'on' Means always capture the screenshot. 
But be careful with this option because it is going to consume a good amount of space.

The screenshots are stored inside the `test-results` folder.
This is called automatic screenshot taking.

This option will capture the screenshot of the last step before Playwright is about
to abort the test. 

screenshot: 'only-on-failure' This means capture the screenshot only when the test case fails.

Most of the time, we will be using only this option -> only-on-failure.
The screenshot is automatically attached to the report.

When the test case passes, the name of the screenshot is test-finished-1.png
inside the test results folder in its respective folder. But when it fails,
the name of the screenshot is test-failed-1.png.

Videos
Video Resolution is the browser viewport size. If you don't set the viewport
size manually, Playwright uses its default viewport and the video matches that.
So viewport means the browser site.

By default, for chromium, firefox, and webkit, the default video resolution
is 1280 X 720(HD). 348KB

If you want to change the resolution, you can change it in the config file. 

If I use this resolution, this is called full HD resolution. 
    video: {
      mode: 'on',
      size: {width: 1920, height: 1080}
    }


Trace Viewer
The trace feature is very helpful for debugging. It is a GUI tool
where we can see all the information like time travel, network calls, etc.

To enable the trace viewer, we have a couple of options:
1. From the config file
This is the most popular option. 
trace: 'retain-on-failure',

Even the trace gets stored inside the test-results folder. 
It is stored as a zip file. 

From the config file, we can change the Trace setting, which
is applicable for all the test cases. If we want to enable the
Trace only for a particular test, first turn off the Trace in the
Global settings. Delete the trace from the test-results folder,
and now run your test case with this option.
npx playwright test mouse --trace on

Alternately, you can open this website to watch the trace. 
https://trace.playwright.dev/


*/


import { expect, test } from '@playwright/test'

test('Screenshots', async ({page}) => {
    // test.setTimeout(60_000)
    await page.goto('https://demowebshop.tricentis.com/')

    const timestamp = Date.now()

    await page.screenshot({
        path: `screenshots/homepage${timestamp}.png`,
        fullPage: true
    })

    const logo = page.getByAltText('Tricentis Demo Web Shop')
    await logo.screenshot({
        path: `screenshots/logo${timestamp}.png`
    })

    await page.locator('.product-grid.home-page-product-grid').screenshot({
        path: `screenshots/featuredproducts${timestamp}.png`
    })
})