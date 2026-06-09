/*

Imagine we are testing a shopping website. 
We have many test cases. 

One test case is for login. 
One test case is for search. 
One test case is for adding a product to the cart. 
One test case is for payment. 
One test case is for billing.

If we keep all these test cases randomly in one file, after
some time it becomes confusing/Very difficult to manage. 

So what do we do? 
We organise them.

That is where grouping helps us. 

Grouping simply means keeping related test cases together.
For example, all login-related test cases can be kept inside one group. 

- Valid login
- Invalid login
- Blank username
- Blank password
- Wrong password
All these can come under Login Test Cases.

In Playwright, we use `test.describe()` for grouping.

Test.describe is like a folder. Just like we create folders on our computer.
- One folder for photos
- One folder for documents
- One folder for videos

Similarly, in testing we create groups for related test cases.

Grouping is mainly for better organization and readability.

Why is grouping useful? 
1. Better organisation. You can separate log in test cases,
check out test cases, and API test cases into logical 
2. Hooks. Each Describe block can have its own before each or after each setup. 
3. The HTML report reflects your group hierarchy, making it very clear
where each test belongs.

Now we want to execute the test cases only in group one. For that, we can run this command.
npx playwright test grouping --grep Group1

*/


import { expect, Locator, test } from '@playwright/test'

//Group1 - It is a folder
test.describe('Group1', async ()=> {
    test('Test1', async () => {
        console.log('This is Test1')
    })

    test('Test2', async () => {
        console.log('This is Test2')
    })
})

//Group - It is another folder. Why? For organizing things.
test.describe('Group2', async ()=> {
    test('Test3', async () => {
        console.log('This is Test3')
    })

    test('Test4', async () => {
        console.log('This is Test4')
    })
})

//All the test cases are related to fund transfer, so we keep them
//in one group or one folder. 

test.describe('Fund Transfer tests', async ()=> {
    test('Transfer money to saved beneficiary. ', async () => {

    })

    test('Transfer money to new beneficiary. ', async () => {

    })    

    test('Show error for insufficient funds', async () => {

    })
})

//Here, all the test cases are related to document upload, so they
//are kept in one group or one folder. 
test.describe('Document Upload tests', async ()=> {
    test('Photo uploaded successfully.', async () => {

    })

    test('Upload mark sheet successfully.', async () => {

    })    

    test('Show error when unsupported file is uploaded', async () => {

    })

    test('Show error when file size is too large', async () => {

    })    
})