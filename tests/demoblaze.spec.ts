import { expect, test } from "@playwright/test";

//display: block -> Make this element visible on the application.
//display: none -> Make this element hidden on the application. It wont even
//occupy any space. As if the element is NOT there only.

//The logout link exists in HTML, but it is not shown on the screen.
//If it is not shown, Playwright can not interact with it.
//Playwright can only interact with the elements that are actually
//visible and rendered on the screen.
//Hidden and invisible elements can not be interacted with.

/*
toBeHidden - It passes if the element is either not present
in the HTML at all or if it is present in the HTML but not visible.

toBeVisible - It passes if the element is in the HTML + it is also visible. 

*/

test("assertions", async ({ page }) => {
  await page.goto("https://demoblaze.com/");

  await page.getByRole("link", { name: "Log in" }).click(); //Way 1 - Preferred. Why? User facing
  page.locator("#login2"); //Way 2 - Very solid but 1st is better

  page.getByRole("textbox").first(); //Works but not ideal. Why? We are using indexing
  await page.locator("#loginusername").fill("piyushgupta84");
  await page.locator("#loginpassword").fill("123456");

  //We are using expect because we are verifying something. It's an assertion.
  await expect(
    page.getByRole("link", { name: "Log out" }),
    "Verify if the Log out link is hidden",
  ).toBeHidden(); //Assertion Before Login
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(
    page.getByRole("link", { name: "Log out" }),
    "Verify if the Log out link is visible",
  ).toBeVisible(); //Assertion After Login

  //This will give me three matches. Which is not ideal
  // await page.getByText('Log in')

  //This will not work as log out is hidden.
  // await page.getByRole('button', {name: 'Log out'}).click()

  //await page.pause()
}); 

/*
My requirement is to click on the Sony Vaio i5 link. 

Step 1: Act like a normal user.

If you were using this site normally, how would you find Sony Vaio i5? 

I will look at all the products. I will start reading
names one by one. Find Sony VAIO i5. Click it. 

Automation always starts from human behaviour. 

Step 2: Inspect the target element. 

Step 3: Check if we can use the text directly. 

Relying only on text can be very risky. Text can be unstable. Your automation will be fragile. 

Real automation needs stable selectors/locators and logic. 

For this, we have to explore the common locator approach.
*/

test("Click Sony vaio i5", async ({ page }) => {
  await page.goto("https://demoblaze.com/");

  await page.getByText("Sony vaio i5").click();
});

test("Click Sony vaio i5 - for loop", async ({ page }) => {
  await page.goto("https://demoblaze.com/");

  //Just do nothing for these five seconds. Completely pause JavaScript.
  //This is called a hard-coded wait. We should never ever use this in real automation.
  //This is only for practice or for temporary debugging.
  // await page.waitForTimeout(5000)

  //Here I am telling Playwright to wait for this element to be visible.
  // await page.locator('#tbodyid').waitFor()        //Wait for the grid to be visible. But there is no guarantee that the products are also visible.
  // await page.locator('h4.card-title').first().waitFor()   //Wait for the first product to be visible. If the first product is visible, all the other products should also be visible.

  //Here, not only I'm waiting, I'm also verifying.
  await expect(page.locator("h4.card-title").first()).toBeVisible();

  //  h4.card-title
  //Here I am no longer dependent on the text. I have control over the entire list.

  //count() is a snapshot method. It just gives you the current count.
  //It doesn't care if the grid is loaded or not.
  const products = page.locator("h4.card-title");
  const optionsCount = await products.count(); //9

  for (let i = 0; i < optionsCount; i++) {
    const text = await products.nth(i).innerText();

    //text.includes('Sony vaio i5')
    if (text === "Sony vaio i5") {
      await products.nth(i).click();
      break;
    }
  }
});

//filter = Built-in smart loop
test("Click Sony vaio i5 - filter", async ({ page }) => {
  await page.goto("https://demoblaze.com/");

  // await expect(page.locator('h4.card-title').first()).toBeVisible()

  const products = page.locator("h4.card-title");
  await products.filter({ hasText: "Sony vaio i5" }).click();
});

//HTML vs DOM
//What are Single Page applications(SPA)
//Do we need to do something special in automation when we deal with these applications?
