import { expect, Locator, test } from '@playwright/test'
import tags from '../testData/tags.json'

test.describe('Mocking', ()=> {
  test.beforeEach(async ({page})=> {

    //Let's mock the Get Tags API.
    await page.route('**/api/tags', async route => 
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(tags)
      })
    )

    //Mock articles API
    //    **/api/articles* will match ->
    //    /api/articles
    //    /api/articles?limit=10&offset=0
    await page.route('**/api/articles*', async route => 
      await route.fulfill({
        body: JSON.stringify({
          articles: []
        })
      })
    )

    //Visit the login page. 
    await page.goto('https://conduit.bondaracademy.com/login')

    //Perform the login. 
    await page.getByPlaceholder('Email').fill('piyushtest@test.com')
    await page.getByPlaceholder('Password').fill('123456')
    await page.getByRole('button', {name: 'Sign in'}).click()

    await page.waitForURL('https://conduit.bondaracademy.com/')

  })

  test('Verify the popular tags.', async ({page})=> {
    const tagList = page.locator('div.tag-list')

    await expect(tagList).toContainText('playwright')
    await expect(tagList).toContainText('automation')
    await expect(tagList).toContainText('testing')
  })
})