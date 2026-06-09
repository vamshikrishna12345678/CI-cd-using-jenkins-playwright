import { Locator, Page } from "@playwright/test";

export class FormLayoutsPage {
    readonly page: Page
    readonly formLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    constructor(page: Page){
        this.page = page
        this.formLayoutsMenuItem = this.page.getByText('Form Layouts')
        this.datePickerMenuItem = this.page.getByText('Datepicker')
    }

    async submitUsingTheGridForm(email: string, password: string, optionText: string){
       const usingTheGridForm = this.page.locator('nb-card', {hasText: 'Using the Grid'})

       await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
       await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
       await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
       await usingTheGridForm.getByRole('button', {name: 'Sign in'}).click()
    }

    //TSDoc comment
    //It allows you to document your functions, parameters, and return values in a standardised way. 

    /**
     * This method would fill out the inline form with user details. 
     * @param name - Should be first and last name 
     * @param email - Valid email for the test user. 
     * @param rememberMe - True or false: if user session has to be saved? 
     */
    async submitInlineForm(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: 'Inline form'})
        await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email)
        if(rememberMe){
            await inlineForm.getByRole('checkbox', {name: 'Remember me'}).check({force: true})
        }
        await inlineForm.getByRole('button', {name: 'Submit'}).click()
    }    
}