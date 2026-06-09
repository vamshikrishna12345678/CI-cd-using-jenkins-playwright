/*
You are testing an Online Shopping Application Manually

Every morning when you start testing:
1. You open the website.
2. You enter your user name.
3. You enter your password.
4. You click on the login.
5. You wait for the application to load.

Only after that you can start testing features. 

Suppose your project has 100 test cases, 500
test cases, or even 2,000 test cases.
Many of these test cases require a logged-in user.

If every test case performs the login steps again and again, a lot of problems arise.

1. Test cases will become slow. Every test spends extra
time logging in before doing the actual testing.

2. Unnecessary repetition: the login steps are repeated
hundreds of times, even though they are exactly the same.

3. More chance of failure. If the login page is temporarily
slow or unavailable, many test cases will fail even though
the functionality being tested is perfectly fine.

4. Wasted execution time. Instead of testing business features,
your automation spends a lot of time repeatedly performing logins. 

What is the solution? The solution is reusing sessions. 

Suppose you log into Instagram on your mobile phone today. After
logging in, you close the app. Tomorrow, when you open Instagram
again, it usually does not ask you to enter your username and
password again. You are already logged in.

Why?

Instagram has remembered your session. It knows that you have already
authenticated successfully. Playwright can do something very similar.
After a successful login, Playwright can save the authentication
information and use it later whenever needed.

The process looks like this:
1. Login once. Playwright opens the application and performs a successful login.

2. Save the session. After login, Playwright stores the authentication
information. This stored information is often called the authenticated
state or session state.

3. Reuse the saved session. Future test cases can directly use the saved session.

4. Skip the login completely. Since Playwright already has the saved
authentication information, it doesn't need to perform the login steps
again. The user is already considered logged in.

Suppose you are testing an e-commerce website.

You have the following test cases:
1. Search a product
2. Add product to the cart
3. Remove product from the cart
4. Place an order
5. View order history
6. Update the profile information
7. Change delivery address

All these features require the user to be logged in. 

Without the session reuse 

Test Case 1 -> Login -> Search Product
Test Case 2 -> Login -> Add to Cart
Test Case 3 -> Login -> Place Order
Test Case 4 -> Login -> Update Profile

Again and again and again 

Imagine hundreds of test cases doing the same thing.

With session reuse, we will log in once, save the session,
and all the test cases directly start from the logged-in state.

Now the test can focus on testing the actual business functionality
rather than repeatedly logging in.

Benefits of reusing sessions:
1. Faster execution
- Test cases don't waste time performing login repeatedly

2. Less code.
- You write login automation once instead of duplicating it everywhere.

3. Better Maintenance 
If the login page changes, you update the login logic in one place.

4. More stable tests.
- Fewer log-in operations mean fewer chances of log-in related failures.

5. Real-world practice.
Most professional Playwright frameworks use session reuse because it
saves a huge amount of execution time.

A very important thing to remember.
This does not mean we stop testing login functionality.
We still keep dedicated login test cases.
We test the login separately
But for other features like cart, orders, profile, payments, we can
reuse an already authenticated session and avoid unnecessary logins.

*/

import { expect, Locator, test } from '@playwright/test'

test('Orange HRM stores the login session.', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.getByRole('button', {name: 'Login'}).click()
    await page.waitForURL(/dashboard\/index/)

    //Now I want to store this logged-in session so that I can inject this
    //session in future test cases.
    //Test isolation happens at the context level. 
    await page.context().storageState({path: 'auth/session.json'})
})