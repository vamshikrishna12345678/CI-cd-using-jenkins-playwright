/*
Shadow DOM is a special isolated section inside the main DOM.
It is used to encapsulate part of the web page. This means the
elements inside it are protected and cannot be accessed directly
from outside.

So this looks like an iframe, but there are differences. 

Iframes are mostly used to embed external websites or advertisements
inside your page.
Shadow DOM is usually used within the same application, for example,
a login box, a credit card input form, or account details that you
want to keep isolated from the rest of the page.

The purpose of Shadow DOM is mainly security, styling isolation,
and better component management. It is used heavily in modern
frameworks like React, Angular, and Web Component.

Shadow DOM is not a separate page. It is still part of the same page.
It just hides its internal HTML and CSS from the outside.

iframe = Website inside a website.
Shadow DOM = Private section inside the same website 

Problem without using Shadow DOM feature
When a web page is built, everything usually lives inside one big DOM.
This means all the HTML elements and all the CSS styles are part
of the same environment.

Imagine a developer creates a small reusable component like a login form.
Inside this login component, he has written a CSS like all input fields
should have a green border.

All input fields should have a green border. The login form looks clean and properly styled.

The main web page might also have its own CSS. For example, the page
designer might have written a rule that says all input fields should
have a red border. 

Because everything is a part of the same DOM, the browser applies
the global CSS rule even to the login component. Suddenly, the login
form that was supposed to have green borders now has red borders.

Component is now visually broken, even though the developer wrote it 
correctly, and the opposite can also happen. 

This creates conflicts and makes large applications very hard to
maintain. That is exactly the problem Shadow DOM solves. 

A shadow DOM is like a private room inside a house.
The main web page is the house, but the component gets its 
own private room. Inside this room, it has its own HTML and its own CSS.

Because of this isolation, the CSS from outside cannot interfere with it,
and the CSS inside the component cannot affect the rest of the page.

This makes components safer, reusable, and easier to manage. That is why
many modern UI libraries and web components now use Shadow DOM behind the scenes.

A developer can attach a shadow DOM to an element.
The best part about Playwright is that, unlike Selenium, Playwright can
automatically handle shadow DOM for you. Simply use `page.locator` and
Playwright will directly search elements inside shadow DOM without any special handling. 

Auto-piercing - Playwright can directly go inside the Shadow DOM boundary
and interact with the elements.

You interact with Shadow DOM elements in Playwright the same way you interact with normal elements.
This is one reason why Playwright works smoothly with modern applications
that use Shadow DOM. 
Playwright automatically crosses the Shadow DOM boundary. It means you do not
need to manually enter the Shadow DOM. You do not need any special
JavaScript. You do not need any extra step.

Playwright auto-handles shadow DOM.
Playwright does not auto-handle iframes. 

Shadow Host - It is that element that attaches the Shadow DOM.

Shadow DOM has two modes - Open and closed. 
1. mode: 'open'
1. mode: 'closed'

The mode decides whether this Shadow DOM is accessible from outside or not.
Open mode means JavaScript can access it from outside. It means even the
automation tools can inspect and interact with it.

Playwright works perfectly with open shadow DOM using auto-piercing feature. 

But if it is a closed shadow DOM, no automation tool in the world can
interact with these shadow DOM elements. 

*/

import { expect, Frame, FrameLocator, test } from '@playwright/test'
 
//page -> Shadow DOM1 -> Shadow DOM2 -> Input element
test('Nested Shadow DOM', async ({page}) => {
    await page.goto('https://selectorshub.com/iframe-in-shadow-dom/')

    //Auto-piercing
    await page.locator('#pizza').fill('Veggie Delight')
  
    await page.pause()    
})

//page -> iFrame -> Shadow DOM -> Input element
test('Shadow DOM inside iFrame', async ({page}) => {
    await page.goto('https://selectorshub.com/shadow-dom-in-iframe/')

    //await page.frameLocator('#pact').first().locator('#tea').fill('Masala tea')
    await page.frameLocator('[data-element_type="container"] #pact')
              .locator('#tea').fill('Masala tea')
  
    await page.pause()    
})

test.only('Closed Shadow DOM', async ({page}) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/closed-shadow-dom.html')
    // await page.locator('#secretInput').fill('hello')
    await page.getByPlaceholder('Type something here').fill('Hello')
  
    await page.pause()    
})