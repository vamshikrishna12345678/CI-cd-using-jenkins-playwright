XPath is a way to find an element on a web page by looking at the HTML structure. 

This is my HTML. 
<html>
    <body>
        <form>
            <input id="email">
            <button>Login</button>
        </form>
    </body>
</html>

I want to find the button using XPath. I can write 

XPath -> //button

Meaning -> Find a button anywhere on the page. 

Let's say I have a house address. To reach a person, I can do 
India -> Haryana -> City -> Street -> House

Similarly, XPath can say 
HTML -> Body -> Form -> Button

1. Find by Tag Name
page.locator('//button')

2. Find by text
page.locator('//button[text()='Login']')    Give me only button element whose text is Login
page.locator('//*[text()='Login']')     Give me any element whose text is Login

3. Find by attribute
page.locator('//input[@id="email"]')       XPath
page.locator('input[id="email"]')       CSS