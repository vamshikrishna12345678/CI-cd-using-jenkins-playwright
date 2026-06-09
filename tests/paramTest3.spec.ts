import { expect, test } from '@playwright/test';
import { loginTestData } from '../testData/data';




test.describe('Login Tests', () => {
    for (const {email, password, validity} of loginTestData) {
        // const email = item[0]
        // const password = item[1]
        // const validity = item[2]
        // const [email, password, validity] = item

        const title = `${email || '<empty email>'} | ${password || '<empty pw>'} -> ${validity}`
        
        test(title, async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/login')

            //Fill the login form.
            await page.getByLabel('Email:').fill(email)
            await page.getByLabel('Password:').fill(password)
            await page.getByRole('button', {name: 'Log in'}).click()

            if(validity.toLowerCase() === 'valid'){
                //Assert that the logout link is visible, which indicates successful login.
                const logoutLink = page.getByRole('link', {name: 'Log out'})
                await expect(logoutLink, 'Verify that the logout link is visible.').toBeVisible();
            } else {
                //Assert the error message is visible and the user remains on the login page.
                const errorMessage = page.locator('div.validation-summary-errors')
                await expect(errorMessage, 'Verify that the error message is present.').toBeVisible();
                // await expect(page).toHaveURL('https://demowebshop.tricentis.com/login')
                await expect(page).toHaveURL(/\/login/)
            }
        })        
    }
})