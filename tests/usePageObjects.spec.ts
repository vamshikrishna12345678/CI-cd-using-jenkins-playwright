import { expect, Locator, test } from '@playwright/test'
import { NavigationPage } from '../page-objects/NavigationPage'
import { FormLayoutsPage } from '../page-objects/FormLayoutsPage'

test.beforeEach(async ({page})=> {
    await page.goto('https://playground.bondaracademy.com')
})

//In order to use the functionality of any class, we have to create the object of the class,
//and using that object I can call this functionality or method. 
test('Navigate to Form Layouts page.', async ({ page }) => {
    // const navigationPage = new NavigationPage(page)
    // await navigationPage.formLayoutsPage()
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()    
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('Fill the forms.', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridForm('test@test.com', '123456', 'Option 1')
    await onFormLayoutsPage.submitInlineForm('John Smith', 'john.smith@gmail.com', false)
})