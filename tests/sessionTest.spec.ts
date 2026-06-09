
import { expect, Locator, test } from '@playwright/test'

test.use({storageState: 'auth/session.json'})

test('Navigate to the Dashboard page in Orange HRM without logging in.', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
})