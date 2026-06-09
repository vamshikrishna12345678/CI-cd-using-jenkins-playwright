/*
Every table will have a `table` tag. It might have an ID. It might not have an ID. 

Table will have a header. It will also have a body. 
Header is represented by the `thead` tag. Body is represented by the `tbody` tag.

Inside the `thead` tag, there is a single row represented by `tr`.
This row contains all the columns. 
All the columns are represented by `th` tags. 

The relationship between `thead` and `tbody` is that they are siblings to each other. 
Why are they siblings? Because they have a common parent `table` tag.

Inside the `tbody` tag, we have all the rows.
Each row is specified by the `tr` tag.
Each `tr` is one row.
Inside every `tr`, we have multiple cells. Each cell is represented by `td` tag. 

Since we have four `td` tags, we have four cells inside each row. 
The last cell inside each row contains a checkbox.

Automation
The first step is to identify the table uniquely. 

#productTable tbody tr
Above CSS means search for a row only inside the tbody

But if I use this CSS: #productTable tr     <- It means search for the 
rows in the entire table, Does not matter if it is there in the T head or T body. 

Generic Assertion 
Executes once 
No auto wait. 
If count is not 4 at that moment, the test fails. 

Locator Assertion
It auto retries. 
It waits until the condition becomes true. (Only upto 5 sec or whatever is the timeout)
Times out only if it never becomes true. 

expect(await columns.count()).toBe(4) In this case, Imagine if the table loads after
two seconds. And the rows are not loaded yet. The count is 0. The test fails. 

But in this locator assertion await expect(columns).toHaveCount(4)  It keeps retrying
until the columns have a count of four. This makes your test case a lot more stable.

In this test case, the table is already loaded, so both will pass.
In real applications, they are very dynamic. The difference becomes quite critical.

Use the generic assertions for simple values. 
Use the locator assertions for UI elements.

By default, all these assertions are hard assertions. It means as soon as Playwright
gets a failure, it simply stops executing the test. But in some special cases, if you
want the test to continue in spite of the failure, you can use soft assertion by using
`expect.soft`. Here, the failure is still reported, but only at the end, and the test
case will run fully. 

Here is my filter condition. 
    rows.filter({
        has: page.locator('td'),
        hasText: 'Tablet'
    })

This is how to read - Out of the five rows, give me all those rows that contain
a cell as well as it should contain this text tablet. 

Technically, every row has a cell or a td, so writing the `has` option is unnecessary.
Instead, we can use this filter. 
    rows.filter({
        hasText: 'Tablet'
    })
    
This is how we read -  Out of all the rows, give me only that specific row which
contains this text "tablet".   

*/

import { expect, Locator, test } from '@playwright/test'

test('Verify the number of rows and columns in the table.', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    //Columns ->    #productTable thead th
    //Rows ->       #productTable tbody tr

    const table = page.locator('#productTable')

    const columns = table.locator('thead th')
    console.log('Columns count:', await columns.count())        //4

    //expect(await columns.count()).toBe(4)       //Generic assertion - No auto-retry/no auto-wait
    await expect(columns).toHaveCount(4)        //Locator Assertion - Auto-wait/auto-retry

    const rows = table.locator('tbody tr')
    console.log('Rows count:', await rows.count())              //5

    expect(await rows.count()).toBe(5)
    await expect(rows).toHaveCount(5)

    await page.pause()
})

//Don't use click() with checkboxes, as it simply toggles the state. If it is on,
//click() will set it to off. If it is off, click() will set it to on.
//check() is much better, as it only checks the check box if it is not checked. 
test('Select the checkbox for tablet product. - loop', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    const rows = page.locator('#productTable tbody tr')
    const rowsCount = await rows.count()
    let productFound = false

    for (let i = 0; i < rowsCount; i++) {
        const row = rows.nth(i)
        const cellText = await row.locator('td').nth(1).innerText()

        if (cellText === 'iPhone') {
            await row.locator('input[type="checkbox"]').check()
            console.log('Checkbox checked for product "Tablet"')
            productFound = true
            break
        }
    }

    if (!productFound) console.log("Product 'Tablet' is not found")

    await page.pause()
})

test('Select the checkbox for tablet product. - filter', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    const rows = page.locator('#productTable tbody tr')

    // const matchedRow = rows.filter({
    //     has: page.locator('td'),
    //     hasText: 'Tablet'
    // })

    const matchedRow = rows.filter({ hasText: 'Tablet' })
    console.log(await matchedRow.count())

    //Check the check box inside the match row.
    await matchedRow.locator('input[type="checkbox"]').check()

    //Verify that the check box is indeed checked.
    await expect(matchedRow.locator('input[type="checkbox"]')).toBeChecked()

    console.log('Checkbox checked for product "Tablet"')

    await page.pause()
})

/*
Next requirement: select the checkboxes for multiple products. 
A naive option would be to simply copy and paste the same code to achieve this. 
A better option is to create a reusable function, and we can call it multiple times. 
*/

//Static checking feature of TS - The main advantage of using TypeScript
//Every async function returns a promise. 
async function selectProduct(rows: Locator, name: string): Promise<void> {
    const matchedRow = rows.filter({ hasText: name })

    //Check the check box inside the match row.
    await matchedRow.locator('input[type="checkbox"]').check()

    //Verify that the check box is indeed checked.
    await expect(matchedRow.locator('input[type="checkbox"]')).toBeChecked()
    console.log(`Checkbox checked for product "${name}"`)
}

test('Select the checkbox - using reusable functon', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    const rows = page.locator('#productTable tbody tr')

    await selectProduct(rows, 'Tablet')
    await selectProduct(rows, 'Smartphone')
    await selectProduct(rows, 'Laptop')

    await page.pause()
})

//Outer loop -> Rows
//Inner loop -> Columns
//Row1: Column 1, Column 2, Column 3 
//Row2: Column 1, Column 2, Column 3 

//This is NOT ideal -> for(let i = 0; i < await rows.count(); i++)
//Because we are finding the count in every iteration, which is not good.


test('Print all product details from first page', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    //rows is a collection
    //row.nth(i) = one specific row. Here I am reducing the scope. 
    const rows = page.locator('#productTable tbody tr')

    const rowCount = await rows.count()
    for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i)

        //Get all the columns in that row. 
        const columns = row.locator('td')

        //Nested for loop
        const columnsCount = await columns.count()
        for (let j = 0; j < columnsCount - 1; j++) {
            console.log(await columns.nth(j).innerText())
        }
    }

    await page.pause()
})

//1. I want to find out how many pages I have.
//2. The next logical thing is to repeat the same code for all the pages.
test('Print all product details - Pagination', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/automationpy.html')

    const pages = page.locator('#pagination > li')
    const pagesCount = await pages.count()
    console.log('Number of pages in the table: ', pagesCount)

    for (let p = 0; p < pagesCount; p++) {
        //Click on the page number only when you are not on the first page. 
        if (p > 0) {
            await pages.nth(p).click()
        }

        const rows = page.locator('#productTable tbody tr')
        const rowCount = await rows.count()

        console.log(`Page ${p + 1} - Row count: ${rowCount}`)

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i)
            const columns = row.locator('td')
            const columnsCount = await columns.count()

            let rowData = ''
            for (let j = 0; j < columnsCount - 1; j++) {
                // console.log(await columns.nth(j).innerText())
                const text = (await columns.nth(j).innerText()).trim()
                rowData += `${text} | `
            }
            console.log(rowData)
        }
    }

    await page.pause()
})

//Next requirement: now we want to find out a particular product in
//the entire table, even if it is not present on the first page.
//Example: portable charger. 


/*

This is my XPath. 
//td[text()="John.Smith"]/preceding-sibling::td/input[@type="checkbox"]

This is the pattern. 
//td[text()="<User Name>"]/preceding-sibling::td/input[@type="checkbox"]

*/


//We can perform a click on any node/element. 
//But we can check only on an input which has type equal to the checkbox attribute. 
test.only('Employee Management System ', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/practice-websites/webtables.html')

    // await page.locator("//td[text()='Joe.Root']/preceding-sibling::td/input[@type='checkbox']").check()
    await page.locator("//td[text()='John.Smith']/preceding-sibling::td/input[@type='checkbox']").check()

    await page.locator('tr', {hasText: 'Joe.Root'}).locator('td').first().click()
    page.locator('tr').filter({hasText: 'Joe.Root'})
    page.locator('tr:has-text("Joe.Root")')

    await page.pause()
})

//TODO - 
//1. Check all the check boxes.
//2. Uncheck all the check boxes.