import {expect, test, Page} from '@playwright/test'


async function selectDatepickerDate(page: Page, daysFromToday: number){
    const date = new Date()
    date.setDate(date.getDate() + daysFromToday)


    const expectedDate      = date.getDate().toString()
    const expectedMonthShort = date.toLocaleDateString('en-us', { month: 'short' })  // Aug
    const expectedMonthLong  = date.toLocaleDateString('en-us', { month: 'long' })   // August
    const expectedYear       = date.getFullYear()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
    const dateToAssert       = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    let actualMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent() ?? ''


    while (!actualMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('[data-name="chevron-right"]').click()
        actualMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent() ?? ''
    }
    await page.locator('.day-cell.ng-star-inserted:not(.bounding-month)')
              .getByText(expectedDate, { exact: true })
              .click()


    return dateToAssert
}


test('Complex Datepicker', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()


    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()


    const dateToAssert = await selectDatepickerDate(page, 500)


    await expect(calendarInputField).toHaveValue(dateToAssert)
})