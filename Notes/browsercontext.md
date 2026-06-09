Browser Context 

Imagine we are testing an e-commerce application. We have two users:
- admin user
- customer user

Admin user logs in and creates a new product.
Now, we want to verify that the customer can see that newly created product.

I'll open Chrome and log in as admin user. I'll create the product successfully. 
Now I want to log in as a customer, so I'll open a new tab and navigate to the application again. What happens?

I am still logged in as admin. Why?

Because all tabs in the same browser share the same session.
The browser remembers my login information using cookies and other session data. 
So, opening another tab does not give me another user. 

It gives me the same user in another tab. This means I can not have
Tab 1 -> admin
Tab 2 -> Customer

Inside a normal browser window, both tabs will use the same session. 

As a software tester, how do we solve this problem manually?

Usually, we do one of these things. 
Chrome -> Admin
Firefox -> Customer

OR

Chrome -> Admin
Chrome incognito window -> Customer

Now the sessions are separated. Admin and customer can work fully independently.

Each browser has its own session. This works, but it is going to consume a lot more resources because now you are running multiple browser instances. 
Launching a browser is costly. 

Do we really need two Chrome browsers, or do we simply need two independent sessions?

This is exactly the problem that browser contexts solve. 

Playwright says, "Why are you opening multiple browsers when your actual requirement is multiple independent users?"

Manually, we opened Chrome and logged in as admin, then we wanted to log in as a customer. Since the same browser session was already being used by admin, we had to find another way. We either opened Firefox, Edge, or an incognito window. 
The goal was never to use multiple browsers. The real goal was to maintain multiple independent sessions.

This is exactly the problem browser contexts solve. 

According to Playwright, instead of launching multiple browsers, let me give you multiple isolated sessions inside the same browser. 

For example, I can launch a single Chrome browser and create 
Browser context one. 
Browser context two.

Both are running inside the same browser, but they are completely independent of each other.

I can now login as Admin in Browser Context 1
Customer in Browser Context 2.

Even though both the contacts are using the same browser, they will never interfere with each other.

If the admin logs in, the customer does not automatically become logged in. If the customer logs out, the admin session remains unaffected. 

If one context stores some cookies, the other context cannot see them. why?

Because each browser context maintains its own session information:
- cookies
- local storage
- session storage
- cache

In simple words, each context behaves like its own private browser session. This is very similar to having multiple incognito windows opening at the same time.

Imagine the admin creates a new product called laptop. 
Admin performs this action inside browser context one. 
Then we switch to browser context to where the customer is logged in. 
The customer refreshes the page and verifies that the new laptop product is visible. 

Because the sessions are fully isolated from each other, we can accurately simulate how two different users interact with the same application. 

Performance
Launching a completely new browser takes time and consumes more system resources.
Creating a browser context is much lighter and faster because the browser is already running. 
Playwright is simply creating another isolated session inside that browser. That is why browser contexts are generally preferred over launching multiple browser instances whenever possible. 

And we are not limited to just two contexts. 
We can create
Context1 -> Admin
Context2 -> Customer
Context3 -> Manager
Context4 -> Support User 
Context5 -> Every guest user 

In other words, we can simulate multiple users working on the same application without launching multiple browsers. This feature is available across all Playwright-supported browsers.

A browser context is an isolated browser session inside a browser. It allows us to simulate multiple independent users efficiently without launching multiple browser instances.

