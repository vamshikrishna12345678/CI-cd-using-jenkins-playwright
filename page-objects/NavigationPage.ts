import { Locator, Page } from "@playwright/test";

/*
Some benefits of TypeScript over JavaScript 
There is no type checking in JavaScript. We have it in TypeScript. 
There is no readonly keyword in JavaScript, but it is there in text. 
We don't need to declare the type in JavaScript, but it is mandatory in TypeScript. 
*/
export class NavigationPage {

    //As per the best practice, we should separate the locators from the functions. 
    readonly page: Page
    readonly formLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator
    constructor(page: Page){
        this.page = page
        this.formLayoutsMenuItem = this.page.getByText('Form Layouts')
        this.datePickerMenuItem = this.page.getByText('Datepicker')
        this.smartTableMenuItem = this.page.getByText('Smart Table')
        this.toastrMenuItem = this.page.getByText('Toastr')
        this.tooltipMenuItem = this.page.getByText('Tooltip')
    }

    //These are public methods. 
    async formLayoutsPage(){
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuItem.click()
    }

    async datePickerPage(){
        // await this.page.getByText('Forms').click()
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()
    }
    
    async smartTablePage(){
        // await this.page.getByText('Tables & Data').click()
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }
    
    async toastrPage(){
        // await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
    }
    
    async tooltipPage(){
        // await this.page.getByText('Modal & Overlays').click()
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }  
    
    //This is my private method And it can only be used within this class.
    //Nobody else can call this method from outside. 
    //Inside the page object classes, I cannot write page.someMethod(). 
    //I have to write this.page.someMethod()
    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')

        //Click on the menu item only if it is not open. 
        if(expandedState === "false"){
            await groupMenuItem.click()
        }
    }
}