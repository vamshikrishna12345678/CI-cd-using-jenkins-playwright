import { expect, Locator, test } from '@playwright/test'

test('Inline filter', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    //External filter
    //First, I'm finding all 3 nb-cards. Then I am filtering
    //and finding a unique card
    await page.locator('nb-card').filter({hasText: 'Common Datepicker'})
              .getByRole('textbox').click()

    //Inline filter
    //First, I'm finding that nb-card directly that contains the
    //text "Common Datepicker"
    await page.locator('nb-card', {hasText: 'Common Datepicker'})
              .getByRole('textbox').click()    

    await page.pause()
})

/*

page.getByText('28', {exact: true})
This locator is not good because we are searching for 28th May on the entire page,
which is also finding the 28th of April.
So a good strategy is to search for 28th of May only within the calendar, and not
just that. I will search for 28th only within the current month and exclude past
and future dates.

Lets try this locator -> .cell-content
This is giving me 42 matches, including the past and the future dates. This is NOT good.

I want a locator that should only give me current month dates and exclude past
and future dates.

"bounding-month" This class is there for all the past as well as future dates,
but not for the current month. 

This locator [class="day-cell ng-star-inserted"] gives 30 matches
Why not 31? Because The current date, 25th, has an extra class called `today`.
So, this locator [class="day-cell ng-star-inserted"] will match all the 30
dates except today's date. So this CSS has a minor issue.

In order to fix this issue, we have to look at a different strategy.
If we try this CSS .day-cell.ng-star-inserted, it matches all 42 dates,
including past and future dates. This CSS does not have the today class,
still it is also including today's date. 

We just saw that the `bounding-month` class is there for the future as well as past dates. 
So, from this CSS .day-cell.ng-star-inserted we will exclude these many dates.
This is our final CSS -> .day-cell.ng-star-inserted:not(.bounding-month)

:not(...) This means select this on the left, but exclude anything that
matches the thing inside the parenthesis.

.day-cell:not(.bounding-month)  -> We are excluding by class. 
button:not(.disabled)           -> Exclude the buttons with the disabled class.
input:not([readonly])           -> Exclude the inputs with read-only attributes.
li:not(:first-child)            -> Exclude the first child. 
div:not(#my-id)                 -> Exclude a specific ID. 

Now, to exclude even today's class, we can use this CSS. 
.day-cell.ng-star-inserted:not(.bounding-month):not(.today)

Instead of writing the above CSS, which is slightly confusing,
we can go with this shorter CSS. 
.day-cell.ng-star-inserted:not(.bounding-month, .today)

Currently, we have a lot of hard coding in our test, which is not good,
so we are using the inbuilt date object. 

    let date = new Date()
    console.log(date)       //2026-05-25T11:29:03.750Z

In the real world, we have to select a dynamic date which should
always work irrespective of the month.

Suppose my requirement is to always select tomorrow's date or t+1.

date.setDate(26) -> From the entire date object which has dd, mm, and yyyy,
I am only changing the dd part. 
date.setDate(26) Means I am changing the dd part to 26, which is tomorrow's date.

Now date gives output as 2026-05-26T11:33:05.405Z

date.setDate(date.getDate() + 1)    -> Fetch the DD part of today's date, add 1
to it and now Without any hard coding, I am changing the dd part to tomorrow's date.


*/

test.only('Complex Datepicker', async ({ page }) => {
    await page.goto('https://playground.bondaracademy.com/')
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    
    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date()
    console.log(date)
    date.setDate(date.getDate() + 100000)
    const expectedDate = date.getDate().toString()  //DD
    const expectedMonthShort = date.toLocaleDateString('en-us', {month: 'short'})    //MMM  -> Aug
    const expectedMonthLong = date.toLocaleDateString('en-us', {month: 'long'})    //August
    const expectedYear = date.getFullYear()     //YYYY
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    //Lets handle the calendar part first
    let actualMonthAndYear: string = await page.locator('nb-calendar-view-mode button').textContent() ?? ''   // May 2026 
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}` //June 2026

    while(!actualMonthAndYear.includes(expectedMonthAndYear)){
        await page.locator('[data-name="chevron-right"]').click()
        actualMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent() ?? ''
    }

    //      .day-cell.ng-star-inserted:not(.bounding-month)
    // page.locator('[class="day-cell ng-star-inserted"]').getByText('28', {exact: true})
    await page.locator('.day-cell.ng-star-inserted:not(.bounding-month)')
              .getByText(expectedDate, {exact: true}).click()

    await expect(calendarInputField).toHaveValue(dateToAssert)

    //await page.pause()
})