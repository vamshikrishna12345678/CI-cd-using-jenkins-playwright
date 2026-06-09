/*

Imagine a web page as a big room. 
Inside this room, you can place many things, for example:
- buttons
- text boxes
- images
- menus

Everything you see normally on a web page lives inside that
same room, but sometimes inside that room there is another
small room. That small room is called a frame. Technically,
in modern applications, we call it an `iframe`.

A frame is a web page inside another web page.

Frame is not just a visual box. It is a completely separate
document. That means
It has its own HTML
It has its own elements
It has its own structure
It has its own DOM. 

Where do we see frames in the real application?
- Advertisements
- Google Maps
- YouTube Videos
- Payment Gateways
- Login with Google
- Chat Widgets
- CAPTCHA

Frames allow websites to display content from another system
without mixing code or breaking the security boundaries.

You open an online shopping website. You add an item to the cart.
Then you click "Proceed to Payment". Then a form appears:
- Card number
- Expiry date
- CVV
- Pay now

Most people think maybe Playwright is not working, maybe the
locator is wrong, maybe a timing issue is there, but none of
these are the problem.

This payment form is not a part of the main page. It is inside
a frame. The frame is a separate document. Your script cannot
see its elements until you enter this document.

Imagine you are standing outside a room. Inside this room,
there is another small room, and the button you want to
is inside the small room. 

Can you press the button from outside? NO.

First, you enter the small room, then you press the button.
Same thing happens with frame.

When an element is inside a frame, you must first enter
the frame, then you can interact with the element. Always,
no exception. 

From an automation point of view, if an element is visible
on the screen, the locator looks correct, but the test still
fails, your first question should always be: "Is this element
inside an iframe or not?"

Many years back, websites were built differently. Earlier,
developers used something called `frame` and `frameset` tags.

But in the modern applications, these tags are no longer used.
Now we only use `iframe` tags.

#Document inside an iframe tag means iframe contains its own webpage.

In this website, it has an iframe. Your test script always starts
in the main document, but the element you want is inside the
iframe document. When your script tries to find this element
inside an iframe, it is going to fail.

That's why you must first tell Playwright to switch to the iframe
first and then only find that desired element.

In Playwright, there are two ways to work with iframes:
1. Using the frameLocator() method. This is the modern and
recommended approach. It is simple and works most of the time.

2. Using frame() method. It is still supported but less commonly used. 



*/

import { expect, Frame, FrameLocator, test } from '@playwright/test'
 

//This frame has an ID which is dynamically generated - frame-one748593425
//This means the website might create a new iframe ID every time the page.
// is loaded or refreshed. This locator is not stable. The most important
// thing is locator stability. 
test('Frame1', async ({page}) => {

    await page.goto('https://www.formsite.com/templates/registration-form-templates/vehicle-registration-form/')

    // await page.locator('#imageTemplateContainer > img').highlight()
    await page.getByTitle('Vehicle-Registration-Forms-and-Examples').click()

    const frameEle: FrameLocator = page.frameLocator('iframe[id^="frame-one"]')
    await frameEle.locator('#RESULT_TextField-1').fill('Proposal 1')
    await frameEle.locator('#RESULT_TextField-3').fill('Location')
    await frameEle.locator('#RESULT_TextArea-5').fill('This is a description')
  
    await page.pause()    
})

test('Frame2', async ({page}) => {
    await page.goto('https://selectorshub.com/iframe-scenario/')
    const frame1: FrameLocator = page.frameLocator('[data-element_type="container"] #pact1')
    const frame2: FrameLocator = frame1.frameLocator('#pact2')
    const frame3: FrameLocator = frame2.frameLocator('#pact3')

    // await frame1.getByPlaceholder('First Crush').fill('Crush 1')
    // await frame2.getByPlaceholder('Current Crush Name').fill('Crush 2')
    // await frame3.getByPlaceholder('Destiny').fill('Destiny')

    await frame1.locator('#inp_val').fill('Crush 1')    
    await frame2.locator('#jex').fill('Crush 2')
    await frame3.locator('#glaf').fill('Destiny')
  
    await page.pause()    
})

/*
getByPlaceholder reads like a user action.
Anyone can understand what field is being filled.

locator('#inp_val') - They are only meaningful if
you inspect the DOM. They are not readable in isolation.

Another important point is stability. Most people think
IDs are stable, always. That is not true.
In this example inp_val, jex, glaf - These IDs look random,
auto-generated. These are high-risk locators.

getByPlaceholder('First Crush') - It is tied to UI meaning.
It is less likely to change. It is closer to business intent.

And Playwright strongly recommends using user-facing locators.
Why? Automation should behave like a user, not like a DOM parser. 

page.locator() - It is still useful only in special cases. 
When no accessible attribute exists, when a placeholder is missing,
when text is dynamic 

*/