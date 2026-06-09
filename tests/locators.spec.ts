//Locators - 
//As a human, I can easily identify any element. I don't need
// any ID or any unique attribute to identify an element.
//I can just look at the element and tell that it is a button,
// or is it a checkbox, or is it a text box, etc.

//But Playwright is not human. Playwright doesn't have any
//instinct. I need to give this intelligence or capability
//to Playwright so that it can identify any element uniquely.
//And this is called locating techniques. 

import { expect, Locator, test } from '@playwright/test'

//1. Playwright's inbuilt locators(There are 7 of them)
//2. Use the CSS selectors(This can be used outside Playwright for ex Selenium)
//3. Use the XPath(This can be used outside Playwright for ex Selenium)

//Locators are lazy. Playwright is going to ignore it unless I'm performing any action. 
test('different locating strategies', async ({page})=> {
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    
    page.getByText('Option 1')

    //Our goal as an automation developer is to find out elements uniquely on the page.
    //That's why we will learn different locating strategies.
    //90% of the time we will find elements uniquely, but there are special
    //cases where we will find multiple elements. 

    //1. By tag name
    //Tag name is too generic. 
    page.locator('input')   //We have 20 input elements on the page.

    //2. Locate by id
    //This is a very Powerful Strategy.
    //IDs are supposed to be unique. It's an HTML rule. 
    //We have a little problem: not every element has a unique ID.
    //This is chosen by the developer. 

    //Syntax - #id OR tagName#id
    page.locator('#inputEmail1')
    page.locator('input#inputEmail1')   //Here, providing the tag name is unnecessary. 

    //3. Locate by classes
    //We can locate by one or more classes. 

    //Syntax - .class1.class2.class3..... OR tagName.class1.class2.class3.....
    //3 classes means use 3 dots. 5 classes means use 5 dots. 
    page.locator('.input-full-width.size-medium.status-basic')
    page.locator('input.input-full-width.size-medium.status-basic') //Here, it is a good idea to use a tag just to find out a unique element.

    page.locator('.input-full-width.size-medium')       //Now using just 2 classes.
    page.locator('.input-full-width')           //Now using just 1 class.

    //4. By attribute name and value
    //We use the syntax if the element has a unique attribute and value. 
    //Syntax - [attributeName="attributeValue"] OR tagName[attributeName="attributeValue"]

    page.locator('[placeholder="Jane Doe"]')            //This is exact case sensitive match
    page.locator('input[placeholder="Jane Doe"]')
    page.locator('[placeholder="Jane Doe"][nbinput]')   //Multiple attributes and values. another pair of square brackets
    page.locator('[placeholder="Jane Doe"][nbinput][type="text"]')
    page.locator('[data-cy="inputEmail1"][id="inputEmail1"]')
    page.locator('input#inputEmail1[data-cy="inputEmail1"]')

    page.locator('[placeholder*="ane Do"]')     //Partial match(Try to avoid)
    page.locator('[placeholder^="Jane Do"]')   //^ means starts with
    page.locator('[placeholder$="ane Doe"]')   //$ means ends with

    //5. By XPath
    //Syntax - //*[@attributeName="attributeValue"] OR //tagName[@attributeName="attributeValue"]

    page.locator('//input[@placeholder="Jane Doe"]')
    page.locator('//*[@placeholder="Jane Doe"]')

    page.locator('//*[text()="Form Layouts"]')      //Here, I am using the text() function

    //In CSS, We can not use the text to locate elements. This is a limitation of CSS.
    //There is another limitation: in CSS, we cannot go backwards.

    //6. By text
    page.getByText('Forms')      //Partial match by default
    page.getByText('Form Layouts', {exact: true})      //Exact match

    page.locator(':text("Form Layouts")')              //Partial match
    page.locator(':text-is("Form Layouts")')           //Exact match

    //Traversal
    //6th Floor - 601, 602(diagonally opposite), 603(right in front), 604(My flat)
    //The problem is I am not able to identify the target element uniquely.
    //Look for a nearby flat(603). Diagonally opposite to this flat is mine.

    //Traversal means look for a nearby element if you are not able to find the
    //target element using any of the above strategies.

    //1. Parent -> Child
    //2. Child -> Parent
    //3. Sibling() -> Sibling(604)

    //XPath
    //Single slash means go exactly one level down.
    //      //nb-card/nb-card-body/form
    //Double slash means go either one level down OR multiple levels down

    //CSS
    //> sign means immediate child or go exactly one level down.
    //          nb-card > nb-card-body > form
    //space means go either one level down OR multiple levels down


    //      nb-card nb-card-header      Space means either immediate or deeply nested children
    //      nb-card > nb-card-header      > means only immediate NOT deeply nested children
})

test('locating child elements', async ({page})=> {
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')

    //In all the nb-card elements, find all nb-radio elements.
    //6 -> 3  -> 1 match
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    // await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').locator('nb-radio').getByText('Option 2', {exact: true}).click()

    //Playwright will throw a `strict mode violation` error if it finds multiple matches. 
    // await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).click()

    //first() - Go for the first match. 
    //last() - Go for the last match. 
    //But there is NO second(), third() etc.
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'})
              .last().click()

    await page.locator('nb-card').getByRole('button', {name: 'Sign in'})
              .nth(0).highlight()              

    // await page.locator('nb-card').getByRole('button', {name: 'Sign in'})
    //           .nth(1).click()

    await page.locator('nb-card').getByRole('button', {name: 'Sign in'})
              .nth(1).scrollIntoViewIfNeeded() 
              
    await page.locator('nb-card').getByRole('button', {name: 'Sign in'})
              .nth(1).highlight()              

    //Instead of first(), we have nth() method.
    //nth(0)    -> first
    //nth(1)    -> last

    //Indexing is NOT considered good practice. We try to avoid it as much as possible
    await page.locator('nb-card').nth(1).getByRole('button', {name: 'Sign in'}).click()

    //Always try to avoid using indexes. That should be the last option.
    //If nothing works, then you may use an index. 

    //Out of the six matches, filter out and give me only those
    //matches that contain this text using the grid. 
    //The filter text can belong to the same element or any of its deeply nested children
    await page.locator('nb-card').filter({hasText: 'Using the Grid'})
              .getByRole('button', {name: 'Sign in'}).click()

    //      //*[text()="Using the Grid"]/parent::nb-card
    //      //*[text()="Using the Grid"]/following-sibling::nb-card-body//button

    //hasText -> It is case insensitive, supports partial text and Regex as well
    await page.locator('nb-card').filter({hasText: 'Using the gri'})
              .getByRole('button').click()    

    //Regex is case sensitive but partial match by default.            
    await page.locator('nb-card').filter({hasText: /Using the Grid/i}).click()           
})

test('locating child elements1', async ({page})=> {
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')

    //1. Find out a parent by taking the help of its child element's unique text
    page.locator('nb-card').filter({hasText: 'Using the gri'})

    //2. Find out a parent by taking the help of its child element's unique locator
    //other than the text.
    //How many nb-card elements will have a child with a specific id?? Only 1.
    page.locator('nb-card').filter({has: page.locator('#inputEmail1')})
})

test('Automate Basic Form', async ({page})=> {
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')

    page.locator('#exampleInputEmail1')
    await page.locator('nb-card').filter({hasText: 'Basic form'})
        .getByRole('textbox', {name: 'Email address'}).fill('piyush@test.com')

    await page.locator('nb-card').filter({hasText: 'Basic form'})
        .getByRole('textbox', {name: 'Password'}).fill('123456')
        
    await page.locator('nb-card').filter({hasText: 'Basic form'})
        .getByRole('button', {name: 'Submit'}).click()

    //Here I am applying multiple filters. 
    //6 matches -> 3 matches        
    page.locator('nb-card').filter({has: page.locator('input[type="checkbox"]')})
                           .filter({hasText: 'Sign in'})
})

test('Reusing locators', async ({page})=> {
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')

    let basicForm: Locator = page.locator('nb-card').filter({hasText: 'Basic form'})
    // basicForm = 10       //This will not work. I can only store a locator in here.
    await basicForm.getByRole('textbox', {name: 'Email address'}).fill('piyush@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('123456')        
    await basicForm.getByRole('button', {name: 'Submit'}).click()
})

test('Reusing locators optimized', async ({page})=> {
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')

    //When we are storing locators, using await is completely unnecessary.
    //Why? Because I am not performing any action yet.
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const emailField = basicForm.getByRole('textbox', {name: 'Email address'})
    const passwordField = basicForm.getByRole('textbox', {name: 'Password'})
    const submitBtn = basicForm.getByRole('button', {name: 'Submit'})

    await emailField.fill('piyush@test.com')
    await passwordField.fill('123456')        
    await submitBtn.click()

    //Assertion
    //Make sure that emailField Has a live value -> piyush@test.com
    await expect(emailField).toHaveValue('piyush@test.com')

    //toHaveValue assertion does not fetch and store for later use.
    //For fetching and storing the value for later use, we use the method 
    //inputValue()
    const emailValue = await emailField.inputValue()
    expect(emailValue).toBe('Piyush@test.com')      //toBe() is like ===
})

//Assertion

test('Extracting values', async ({page})=> {
    await page.goto('https://playground.bondaracademy.com/pages/forms/layouts')

    //innerText() vs textContent()
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    console.log(await basicForm.locator('button').innerText())      //SUBMIT
    console.log(await basicForm.locator('button').textContent())    //Submit
    
    //textContent() - It gives you the raw text without any style. It also
    //gives you the hidden text. Slightly faster than innerText
    //It returns exactly what is in the HTML, no matter how it is styled or displayed. 

    //innerText() - It gives you the styled text after applying CSS style/styles.
    //It does not give you the hidden text. Slightly slower.  
    //It returns what is actually rendered on the screen. Give me the text
    //a user actually sees.

    //inputValue() - It fetches the live value from the text field. 

    //All the above three methods fetch and store for later use. 
})