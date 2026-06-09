
import { expect, Locator, test } from '@playwright/test'

test("User can login and add product to cart", async ({ page }) => {
    // Navigate to the login page
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle(/Swag Labs/);

    // Login with valid credentials
    await page.fill("#user-name", "standard_user");
    await page.fill("#password", "secret_sauce");
    await page.click("#login-button");

    await expect(page.locator(".inventory_list")).toBeVisible();

    // Add product to cart
    await page.click("#add-to-cart-sauce-labs-backpack");
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    // Open cart and verify product
    await page.click(".shopping_cart_link");
    await expect(page.locator(".inventory_item_name"))
        .toHaveText("Sauce Labs Backpack");
});

/*
`test.step` allows you to divide your test into clear named steps. 
Each step represents a logical action in your test. Instead of seeing
one big block of actions, you see a sequence of meaningful steps.
It is like turning a long paragraph into short, readable sections. 
*/
test.only("User can login and add product to cart using test.step", async ({ page }) => {
    await test.step("Navigate to the login page.", async () => {
        await page.goto("https://www.saucedemo.com/");
        await expect(page).toHaveTitle(/Swag Labs/);
    })

    await test.step("Login with valid credentials. ", async () => {
        await page.fill("#user-name", "standard_user");
        await page.fill("#password", "secret_sauce");
        await page.click("#login-button");

        await expect(page.locator(".inventory_list")).toBeVisible();
    })

        await page.click("#add-to-cart-sauce-labs-backpack");
        await expect(page.locator(".shopping_cart_badge")).toHaveText("1");

    await test.step("Open Cart and Verify Product ", async () => {
        await page.click(".shopping_cart_link");
        await expect(page.locator(".inventory_item_name"))
            .toHaveText("Sauce Labs Backpack");
    })
});