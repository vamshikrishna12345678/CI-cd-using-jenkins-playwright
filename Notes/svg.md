SVG stands for Scalable Vector Graphics.

Most images, like JPG or PNG, are made of tiny dots called pixels.
SVG works very differently. 

SVG is not made of pixels, it is made of instructions.

If you zoom a normal image, the pixels of the image start becoming blurry.
The pixels get stretched, and the image starts losing sharpness.

Instead of storing the picture, you can store instructions, for example:
1. Draw a circle.
2. Centre at this position.
3. Radius is this much.

Now, whenever you open it, the computer redraws the circle perfectly. This is SVG.
SVG is a way to draw images using instructions instead of pixels. 

If you zoom a JPEG image, it becomes blurry, but if you zoom an SVG image, it stays sharp.
Because the computer simply redraws the shape using instructions 

Flipkart binocular image
<svg width="24" height="24" class="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

Here, the width is 24 pixels and the height is 24 pixels. The browser creates a small drawing area of 24 by 24 pixels, and inside this area, it draws this binocular icon. 

No matter how much you zoom this binocular image on flipkart, it stays sharper because this is an SVG, not a normal image. 

Scalable means the image can grow or shrink without losing the quality.

Graphics simply means anything visual that you see on the screen. 

Vector. A vector is a way to describe a shape using coordinates and directions. Instead of storing a picture, we store instructions. 
This set of instructions is called a vector.

Pixels are tiny coloured dots from where a photograph is made. And if you zoom in, it becomes blurry. 
A vector image is a drawing that is made of instructions. If you zoom in, it stays sharp.
Vector means the shape is described using math and not pixels. That is why 

1. SVG images can grow, shrink, and they stay sharp.

Vector + Graphics
Vector means instructions. Graphics means visual elements. 
Vector graphics mean visual elements drawn using instructions.

Scalable means it can grow or shrink. 

Final meaning of SVG is any visual elements drawn using instructions that can grow or shrink without losing quality.

Treat SVG like a whiteboard. 

SVG = Whiteboard
Path = It is the actual drawing on the whiteboard. 

Imagine you take a blank sheet of paper. That blank sheet is your SVG, and on that sheet, if you draw a circle, that drawing is called your path.

Why do we call SVG a container? Because it holds other elements. 

Just like a box can hold multiple items, a folder can hold files, a form can hold input fields.
SVG holds shapes.

SVG
|---title
|---path(circle)
|---path(handle)

You create a drawing area, then you draw this shape, then draw another shape.

What is the purpose of the path element? 
The path element is the instruction that tells the browser how to draw the shape. 

The d attribute contains the drawing instructions.
It tells the browser where to start, where to move, where to draw curves or lines.

M10.5 18
M simply means move to this position. 

M -> Move
L -> Line
C -> curve

Textbox
Only the elements that are visible and usable by the user appear in the accessibility tree.

The Accessibility tab shows only what the user can actually see. 

If I use this locator in flipkart, it gives me a strict mode violation error because Playwright is finding two matches. 
page.locator('input[name="q"]')

As for Playwright best practise, do not rely on CSS attributes when a semantic locator exists. You want to use a role-based locator. That is exactly what Playwright recommends. 

A semantic locator describes the element the way a user understands it. 
Not the way the code is written. 

Imagine you are giving directions. You can say "go to". 
Apartment no. 4B, Building Code 17, Unit 902 

OR
Go to
The Reception Desk 

Playwright provides special methods called semantic locators. 
getByRole()
getByText()
getByLabel()
getByPlaceholder()
getByAltText()
getByTitle()

These match what the user sees or interacts with, not internal code details.

page.getByRole('textbox', {name: 'Search for Products, Brands and More'})
This locator targets the real user-facing input, and it will give you a single match. 
Because it relies on user meaning. 

This locator is very brittle. Try to avoid it. Use roles as much as possible. 
input[name="q"]:not([readonly]

Strict mode violation is actually more like a protection and not an error. Playwright is trying to tell you your locator is ambiguous. Fix the locator, not the test. 

Why Playwright calls this a best practice? Because semantic locators are stable, readable, reliable, and closer to real user behaviour. 

CSS attributes change often. User meaning rarely changes. 

Normal XPath doesn't work for SVG elements. 
This XPath will give you zero elements -> //svg

CSS can find SVG elements easily, but XPath cannot. 

SVG elements follow slightly different rules compared to normal HTML elements. 

The correct way to find SVG is this. 
//*[local-name()='svg']

You can use the local name for normal elements also, but you should not. 
This XPath will work -> //*[local-name()='button']

Only use the local-name() when normal XPath fails. That is the rule. 

Use only normal XPath for normal elements like //input or //button

These are simpler, faster, easier to read and maintain. 

When to use local-name()
Use this XPath only for SVG elements. Because these are the elements where normal XPath will not work

name() and local-name()

This XPath will not work
//svg[@id="map-svg"]

This XPath works. 
//*[local-name()='svg']

Step 1: Identify the SVG 
The entire map is one SVG element. 

Step2: Show the background. 
The rect tag draws the background. 

The g element stands for grouping. It is used to group related shapes together. 

In this US map SVG is like the main folder; regions is like a subfolder. 
Alabama is like a file. 

One group can contain other groups, just like one folder can contain subfolders. 

GOAL#1- We want to collect all the regions in this map and then we want to capture the ID of each region and print it on the console. 

SVG
    features
            regions
                    individual states

//*[local-name()='svg']
This XPath is read like this: Find any element whose tag name is SVG. 

This XPath is matching five elements, so let us add an ID. 
//*[local-name()='svg' and @id="map-svg"]

I am making my locator more specific. That is exactly what we want in automation. 

Always ask yourself, "Whatever locator I have created, is this giving me a unique match?"
If no, add an attribute. 

The key rule is always to make your locator as specific as needed to identify one element. 

SVG -> features -> regions?
OR
SVG -> regions directly?

Do not navigate every level. Navigate only the levels that truly matter. 

House number

Street, block, building, floor, room if the house number is already unique 

Longer XPath
//*[local-name()='svg' and @id="map-svg"]//*[local-name()='g' and @id="regions"]

Shorter XPath
//*[local-name()='svg']//*[local-name()='g' and @id="regions"]

In the shorter XPath, we have five possible starting points. The XPath searches under each one. 
In the longer XPath, we have a single possible starting point. 

The shorter XPath will still find the correct regions group, but it is doing the extra work and relying on luck. 

The professional rule is: when an element has a stable unique attribute, use it, not because the shorter XPath is wrong, but because the specific XPath is safer. 

Your shorter XPath is like: search every building, then find the room. 
Your specific XPath is like: go directly to the correct building, then find a room. 

Both can reach the room. Only one is precise. 

This is the correct XPath that gives me 51 regions or 51 matching elements. 
//*[local-name()='svg' and @id="map-svg"]//*[local-name()='g' and @id="regions"]/*[local-name()='g']

Let's read this in simple English. 
Find an SVG with this ID map-svg
Inside this SVG, find the group with ID regions.
Then go exactly one level down and collect all the g elements. 

We can do a small improvement: add a class filter. 
//*[local-name()='svg' and @id="map-svg"]//*[local-name()='g' and @id="regions"]/*[local-name()='g' and @class='region']

Only reason for adding this extra class is to make your intent crystal clear. 

Why is this bigger XPath even better than the previous XPath? 
Because it explicitly says collect all the region elements, not just any g element.
This improves readability and reliability. 

Arizona's shape is uneven, but the bounding box is always a rectangle. 

The real structure is 
Main page
    iframe
        SVG
            features
                regions
                    individual states

This SVG is inside an iframe, which contains a dynamic ID. 
id="map-instance-28260"

id="map-instance-3569"

The ID keeps changing. 
Some websites generate IDs automatically every time the page loads, so the ID is not fixed. It changes dynamically. That is why we call it a dynamic ID.

The simplest way to find out is to refresh the page and check the ID. If the number changes, it is dynamic. If it stays the same, it is static. That is the best way to confirm. 

What is the best locator for the iframe? 
iframe[id^="map-instance"]
iframe[id*="map-instance"]

^ -> Starts with
$ -> Ends with
* -> contains

//div //button  -> This works

But this does not work. 
//iframe //svg

Why? Because the iframe contains a separate page or document, so from the main page, XPath can find the iframe. 
But XPath cannot directly jump inside that iframe and find SVG.

1. First, select the iframe.
2. Second, go inside the iframe document.
3. Third, then start writing XPath from the inside element. Like //*[local-name()='g']

From the main page, this will not work. 

1. Locate the iframe.
2. Switch to the iframe.
3. Locate the SVG.
4. Collect the regions.

The map is inside an iframe and it is loaded asynchronously, so the sequence is 
1. Page will load. 
2. iframe loads
3. SVG will load
4. Regions will render

This is not a good solution. It is fully unreliable.
await page.waitForTimeout(5000)

Sometimes 5 seconds is too much. Sometimes 5 seconds is not enough. 

We really don't need all methods in this case. Playwright has a better method that is count. Both behave the same way. They do not wait for elements to appear. 

all() vs count()
count() - Use it when you just want to find the number of elements. 

all() - When you want to find out the entire list of elements and
work with each element individually.

Currently, we are waiting for time. 
await page.waitForTimeout(15000)

This is a very poor approach. Instead of waiting for time, we should wait
for a condition. This is the approach we follow in the real projects. 

The `count` method does not wait until all matching elements appear.
It simply counts whatever is available at that point. 
This is why using count can be risky. 

waitFor() vs toBeVisible()
Both are used for weighting, but they are not exactly the same. 

1. waitFor() - It belongs to the locator. It waits until the locator
reaches a specific state.

await allStates.first().waitFor({state: 'visible'})
Here I'm waiting until the first region becomes visible. 

toBeVisible - It is an assertion. 
await expect(allStates.first()).toBeVisible()

The meaning of this assertion is: I expect the first region to become visible,
so keep checking until it becomes visible for a maximum of 5 seconds; otherwise, fail the test. 

To make it simpler, we can say wait until this element is visible. 

Wait for waits silently. toBeVisible() Not only waits, it also validates.
For test cases, validation is usually better. 

This is my current XPath. 
//*[local-name()="svg" and @id="map-svg"]//*[local-name()="g" and @id="regions"]/*[local-name()="g" and @class="region"]

This XPath is correct, stable, very professional, and actually working
but the next natural question is, should we really use XPath?
How about using CSS? 

This is the equivalent CSS.
svg#map-svg g#regions > g.region

In the case of XPath, we have to use a special XPath with local-name,
but in CSS we don't have any such restriction. CSS is much simpler and
easy to read. And Playrite handles SVG elements naturally with CSS,
no special syntax needed unlike XPath.

In XPath, we can traverse backwards and forwards in both directions
but in CSS we can only traverse forward. No backward traversal is possible.

GOAL#2 - Move your mouse on each and every region and print the id of each region. 

Imagine you ask someone, "Go stand near that chair."

But that chair is
Moving
Partially blocked
Very small
Hard to reach.

So the person keeps trying. 

Again...
Again...
Again...

Until the time runs out. This is exactly what Playwright is doing. 

This particular line of code is a failure. 
await e.hover()

Playwright is trying to hover on a state inside an SVG map inside an iframe that is a difficult element. Why? 

Some states are 
very small
partially hidden
change when the tooltip appears
and are not perfectly interactable. 

So Playwright keeps on retrying the hover element until the test timeout is reached.

The reason for this failure is that the hover never succeeded.
Your test failed because Playwright could not hover on some SVG regions,
so it kept retrying until the timeout was reached.

SVG regions are not normal elements. They are shapes. Shapes are dynamic. Sometimes they are tiny, sometimes they are stable, and hover is very strict. 

Some states are fully irregular. You cannot do the mouse hover. We have a better option, which is using mouse.move.

Mouse.move does not check if the element is clickable. Is it stable? Is it visible? It just moves the mouse on that element, so it works. 

boundingBox() - It tells us the exact position and size of an element on the screen. 

It gives us four important values. 
x -> Distance from the left side 
y -> Distance from the top 
width -> How wide is the element? 
height -> How tall is the element? 

Instead of just knowing that an element exists, we now know exactly where it is located on the page. 

steps: 1
Instant Movement 

steps: 10
Fast but visible. 

steps: 20
Very smooth movement. 

steps: 50
Very slow movement, mostly for demos. 

Start ->> End

Start -> step -> step -> step -> End