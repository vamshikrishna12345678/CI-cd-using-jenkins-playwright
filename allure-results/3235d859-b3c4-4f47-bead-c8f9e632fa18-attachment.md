# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: paramTest1.spec.ts >> Search functionality tests >> Search test for monitor
- Location: tests\paramTest1.spec.ts:47:13

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('h2.product-title').first()
Expected substring: "monitor"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('h2.product-title').first()

```

```yaml
- link "Tricentis Demo Web Shop":
  - /url: /
  - img "Tricentis Demo Web Shop"
- list:
  - listitem:
    - link "Register":
      - /url: /register
  - listitem:
    - link "Log in":
      - /url: /login
  - listitem:
    - link "Shopping cart (0)":
      - /url: /cart
  - listitem:
    - link "Wishlist (0)":
      - /url: /wishlist
- status
- textbox: Search store
- button "Search"
- list:
  - listitem:
    - link "Books":
      - /url: /books
  - listitem:
    - link "Computers":
      - /url: /computers
  - listitem:
    - link "Electronics":
      - /url: /electronics
  - listitem:
    - link "Apparel & Shoes":
      - /url: /apparel-shoes
  - listitem:
    - link "Digital downloads":
      - /url: /digital-downloads
  - listitem:
    - link "Jewelry":
      - /url: /jewelry
  - listitem:
    - link "Gift Cards":
      - /url: /gift-cards
- strong: Categories
- list:
  - listitem:
    - link "Books":
      - /url: /books
  - listitem:
    - link "Computers":
      - /url: /computers
  - listitem:
    - link "Electronics":
      - /url: /electronics
  - listitem:
    - link "Apparel & Shoes":
      - /url: /apparel-shoes
  - listitem:
    - link "Digital downloads":
      - /url: /digital-downloads
  - listitem:
    - link "Jewelry":
      - /url: /jewelry
  - listitem:
    - link "Gift Cards":
      - /url: /gift-cards
- strong: Manufacturers
- list:
  - listitem:
    - link "Tricentis":
      - /url: /tricentis
- strong: Newsletter
- text: "Sign up for our newsletter:"
- textbox
- button "Subscribe"
- heading "Search" [level=1]
- text: "Search keyword:"
- textbox "Search keyword:": monitor
- checkbox "Advanced search"
- text: Advanced search
- button "Search"
- strong: No products were found that matched your criteria.
- heading "Information" [level=3]
- list:
  - listitem:
    - link "Sitemap":
      - /url: /sitemap
  - listitem:
    - link "Shipping & Returns":
      - /url: /shipping-returns
  - listitem:
    - link "Privacy Notice":
      - /url: /privacy-policy
  - listitem:
    - link "Conditions of Use":
      - /url: /conditions-of-use
  - listitem:
    - link "About us":
      - /url: /about-us
  - listitem:
    - link "Contact us":
      - /url: /contactus
- heading "Customer service" [level=3]
- list:
  - listitem:
    - link "Search":
      - /url: /search
  - listitem:
    - link "News":
      - /url: /news
  - listitem:
    - link "Blog":
      - /url: /blog
  - listitem:
    - link "Recently viewed products":
      - /url: /recentlyviewedproducts
  - listitem:
    - link "Compare products list":
      - /url: /compareproducts
  - listitem:
    - link "New products":
      - /url: /newproducts
- heading "My account" [level=3]
- list:
  - listitem:
    - link "My account":
      - /url: /customer/info
  - listitem:
    - link "Orders":
      - /url: /customer/orders
  - listitem:
    - link "Addresses":
      - /url: /customer/addresses
  - listitem:
    - link "Shopping cart":
      - /url: /cart
  - listitem:
    - link "Wishlist":
      - /url: /wishlist
- heading "Follow us" [level=3]
- list:
  - listitem:
    - link "Facebook":
      - /url: http://www.facebook.com/nopCommerce
  - listitem:
    - link "Twitter":
      - /url: https://twitter.com/nopCommerce
  - listitem:
    - link "RSS":
      - /url: /news/rss/1
  - listitem:
    - link "YouTube":
      - /url: http://www.youtube.com/user/nopCommerce
  - listitem:
    - link "Google+":
      - /url: https://plus.google.com/+nopcommerce
- text: Powered by
- link "nopCommerce":
  - /url: http://www.nopcommerce.com/
- text: Copyright © 2026 Tricentis Demo Web Shop. All rights reserved.
```

# Test source

```ts
  1  | /*
  2  | 
  3  | Parameterization simply means reusing the same logic with different inputs.
  4  | Instead of writing the same code or same test again and again, we pass
  5  | parameters to run it with different values.
  6  | 
  7  | For example, imagine you want to check if a number is even or odd.
  8  | Instead of writing one programme for 2, another for 4, and another for 6 
  9  | You write a single programme that accepts a number as a parameter, and
  10 | then you test it with 2, 4, 6, 8, and so on.
  11 | 
  12 | This is called parameterization: same code but different inputs.
  13 | 
  14 | In testing, parameterization means running the same test case with multiple
  15 | sets of data.
  16 | 
  17 | For example, if you want to test a login page.
  18 | You don't write one test case for user 1, another test for user 2,
  19 | another test case for user 3.
  20 | Instead, you will write one test case and pass different user names and
  21 | passwords as parameters.
  22 | 
  23 | This makes your test cases shorter, cleaner, and easier to maintain.
  24 | 
  25 | There are multiple ways to store and use this data. 
  26 | 
  27 | 1. We can store the data directly inside the test case.
  28 | 2. We can store the data in an external JSON file. 
  29 | 3. We can store the data in an external JS file. 
  30 | 4. We can store the data in an external CSV. 
  31 | 5. We can even store the data in an external Excel file. 
  32 | 
  33 | For CSV and Excel, we need third-party integrations. 
  34 | 
  35 | */
  36 | 
  37 | import { expect, Locator, test } from '@playwright/test'
  38 | 
  39 | const searchItems: string[] = ['laptop', 'Gift card', 'smartphone', 'monitor']
  40 | 
  41 | test.describe('Search functionality tests', () => {
  42 |     for (const item of searchItems) {
  43 |         //This hook is only applicable within this `describe` block, not outside. 
  44 |         test.beforeEach(async ({page})=> {
  45 |             await page.goto('https://demowebshop.tricentis.com')
  46 |         })
  47 |         test(`Search test for ${item}`, async ({ page }) => {
  48 |             // await page.getByPlaceholder('Search store')
  49 |             await page.locator('#small-searchterms').fill(item)
  50 |             await page.getByRole('button', { name: 'Search' }).click()
> 51 |             await expect(page.locator('h2.product-title').first()).toContainText(item, { ignoreCase: true })
     |                                                                    ^ Error: expect(locator).toContainText(expected) failed
  52 |         })
  53 |     }
  54 | })
  55 | 
  56 | //Avoid using the `forEach` method in the case of asynchronous code.
  57 | //It doesn't handle async and await code very well. 
  58 | 
  59 | //What changes when you use test.describe()?
  60 | //1. Your test cases are now grouped, better organised under the search
  61 | //functionality test suite in the Playwright report.
  62 | 
  63 | //2. If you add any of the four hooks inside the `describe`, these hooks
  64 | // are only applicable to the test cases inside this block. 
  65 | 
```