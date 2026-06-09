import { test } from '@playwright/test'

//page is the fixture that we have to use in every testcase
//Fixture - Fixture is something that is already prepared in advance for you.
//This page represents one browser tab. I don't even have to launch the browser.
//Playwright will automatically launch the browser for me. 

//Asynchronous code/step means it is non-blocking in nature.
//So Playwright will not wait for it to complete. I have to
//use await. Using a wait, I am forcing Playwright to wait
//for this step to complete, then only move on to the next line.
//Using await, I am making this asynchronous code behave like
//synchronous code(blocking)

//Hooks mean a common setup or cleanup code that Playwright
//runs automatically before or after a test. 

test.beforeEach(async ({page})=> {
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms').click()
})

//test('Testcase name', callbackFn)
test('my first test', async ({page})=> {
    await page.getByText('Form Layouts').click()
})

//Ideally, all the test cases should be completely isolated from each other.
//Mean all the test cases should be completely independent. 

test('navigate to Datepicker page', async ({page})=> {
    await page.getByText('Datepicker').click()
})

/*
Page fixture life cycle.
In every test case, we have to use page fixture in the destructuring syntax. 
{page}

I am not creating the page myself. 
I never write:
1. Create a browser.
2. Create a tab.
3. Close the tab.

The page fixture represents a browser tab. 
page = one browser tab

Every time any test case runs, Playwright automatically manages the page. 
This is the life cycle. 
Your test starts.
- The browser launches.
- The browser context(profile) is created.
- The page tab is created.
- Your test runs.
- The page closes.
- Your context/profile closes.
- The browser closes.

1. Your test case starts. 

2. The browser is launched. Playwright automatically starts the browser.
You do not write any code for that. Playwright automatically handles it.

3. The browser context is created.
A context is like a fresh browser session. Isolation happens at the context level.

It contains:
- Cookies
- Storage
- Permissions
- Network Settings

Each test gets a fresh, clean environment. 

4. Now Playwright creates the page. This is the tab you interact with. {page}

5. Your test case runs. Now you can write:
- page.go()
- page.locator().click()

6. After the test case finishes, Playwright automatically closes the page.
You do not have to write await page.close().

7. Browser Context is automatically closed or cleaned up. This ensures
no data leaks between the tests. 

8. Finally, the browser shuts down. 

Each test case gets a fresh page, a fresh context/profile, a clean environment. 

*/