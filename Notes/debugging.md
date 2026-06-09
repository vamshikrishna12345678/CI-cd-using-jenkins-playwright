
Debugging means finding and fixing mistakes in our code. Every tester and developer does this almost daily, so we must learn it properly. 

When our test case fails, Playwright is not wrong. Sometimes in our code, locator data or logic could be wrong. Debugging helps us find where.

The basic idea of debugging 
Normally, when we run test cases, they run super fast.
We cannot see what is happening

so we do not know
1. where it failed
2. why it failed
3. what went wrong. 

This is where we use the debugging feature. 

Debugging means 
1. Slow down the test case. 
2. Stop it in the middle. 
3. Watch every step. 

So that we can understand the problem. 

How do we debug in Playwright? There are three simple ways.

Way 1 - Using page.pause()
It simply opens the Playwright inspector window. This pauses the test at that particular line. 

You can see the browser, inspect elements, try out locators, and check the current page state. 
Use this feature when you want to pause at a particular place.

Way 2 - Using --debug
This runs the whole test in debug mode. In this case, it will always run in headed mode automatically. 
The test starts as paused from the very first line itself.

You can step through it line by line.
You can use this feature when you do not know where the problem is. 

Run this command
npx playwright test example.spec.ts --debug

While debugging, we can watch browser behaviour. We can see if the page is loaded properly. We can verify the data. 

We are basically watching the test work. 

Debugging is temporary. Never keep page.pause in your final code. Make sure you are removing it once your test case is fixed. 

Way 3 - VS Code Debug Button 
