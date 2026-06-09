/*

- When you apply for a job, you upload your resume.
- When you create a profile, you upload your photo.
- When you submit a form, sometimes you upload a PDF or an image or a document.

In HTML, a file upload usually comes from a special input field. 
<input type="file">

With this HTML, it creates a button where the user can choose a file from their computer. 

Sometimes you may see something like this in the HTML. 
<input type="file" multiple>

Here, multiple means the user can upload more than one file.
For example, one resume, one ID proof, one photo.

From a testing point of view, we do not usually test the operating
system file picker. We do not need to manually open the file window and select the file.

In Playwright, we can simply use the method `setInputFiles()`.
If it supports single file, I can provide a single string argument.
If it supports multiple file upload, I can pass an array of strings. 

One important browser security rule is that a website cannot access your local files automatically. 
The user must choose the file, or the automation must explicitly provide the file.

*/

import { expect, Locator, test } from '@playwright/test'

test('Upload Single file', async ({ page }) => {
    await page.goto('https://recruiter.foundit.in/create-profile-page/')

    await page.locator('#img-icon').click()
    await page.locator('#imgInp').setInputFiles('uploadFiles/JPG_100kB.jpg')
    //Absolute Path -  /Users/piyushgupta/Documents/Playwright Training/corporate/wipro-may-playwright-batch/uploadFiles/JPG_100kB.jpg
    //Error: locator.setInputFiles: Error: Non-multiple file input can only accept single file
    //await page.locator('#imgInp').setInputFiles(['uploadFiles/JPG_100kB.jpg', 'uploadFiles/PNG_500kB.png'])
    
    await page.pause()
})

test.only('upload file mutiple',async({page})=>{
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    await expect(page.locator('#fileList')).toContainText('No Files Selected');
    // await page.locator('#filesToUpload').click();
    await page.locator('#filesToUpload').setInputFiles(['uploadFiles/JPG_100kB.jpg', 'uploadFiles/PNG_500kB.png']);
    await page.getByRole('button', {name: 'Choose files'})
    await page.pause(); 
})

test.only('Multiple File upload', async ({ page }) => {
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')
 
    //Check no files are uploaded initially
    await expect(page.locator('#fileList li')).toHaveText('No Files Selected')
 
    //Upload files
    await page.locator('#filesToUpload').setInputFiles(['uploadFiles/JPG_100kB.jpg', 'uploadFiles/PNG_500kB.png'])
 
    await expect(page.locator('#fileList li')).toHaveCount(2)
    await expect(page.locator('#fileList li').nth(0)).toHaveText('JPG_100kB.jpg')
    await expect(page.locator('#fileList li').nth(1)).toHaveText('PNG_500kB.png')
})