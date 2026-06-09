/*
Application Programming Interface 

So, imagine you are sitting in a restaurant.
You are the customer.
You want food.

You don't go directly inside the kitchen and start cooking.
You call the waiter and say, "I want one dosa."
The waiter takes a request to the kitchen.
The kitchen prepares the dosa.
Then the waiter brings the dosa back to you. 

You are the user. 
The kitchen is a system or the server. 
The waiter is like an API.

The API takes your request, sends it to the system, and brings back the response.
That is the basic job of an API.

Suppose you open a shopping application. You search for mobile phones. 
The app has to show you a list of mobile phones.
But where is that data coming from? It is not stored inside your phone. 
The application is sending a request to the backend server. 
Something like, "Give me all the mobile phones under ₹20,000." 
The server checks the data and sends back a response. 
The response may contain product name, price, rating, image, discount, and so on.

This communication between the application and the backend usually happens through APIs.
API is like a bridge between the two systems. 
One system asks for something; another system gives the answer. 

Whenever we use an API, there are two important things: Request and Response.
Request means, what are we asking. Response means, what are we getting back.

If we are logging into an application, we send a request with username and password.
This request goes to the backend server. The server checks whether the
details are correct or not. If they are correct, the server sends a
response by saying "login successful".

If they are wrong, the server sends a response saying "invalid username or password".

In API testing, we mainly check this communication. 
We check:
- Is the API accepting the correct request?
- Is it giving the correct response?
- Is the status code correct?
- Is the data correct?
- Is the error message correct?
- Is the API behaving properly when the wrong data is sent?

Why do we test APIs separately? Why not just test from the UI only?

Suppose login is not working. 
The problem may be in the login button
the problem may be in the front-end code
or the problem may be in the back-end API. 

If we test only from the UI, we may not immediately know where the issue is.
But if we test the API directly, we can check whether the back end is working properly or not.
That is why API testing is very, very important. 

API testing is very much faster than GUI testing because we are not
even opening the browser.
We are not clicking buttons.
We are not waiting for pages to load.
We are directly sending requests and checking responses.

Suppose we have a student management application. There may be APIs like:
- Get all students
- Add a new student
- Update student details
- Delete a student

When we test these APIs, we check things like:
if I ask for all the students, am I getting the current student list? 
- If I add a new student, is the student really getting added or not? 
If I update the student's phone number, is it getting updated correctly? 
If I delete a student, is the student removed properly or not?

This is API testing.
We are not testing how the page looks.
We are not testing the button colour.
We are not testing alignment.

We are testing the communication between systems.
Now, when we use Playwright for API testing, Playwright allows us to send API requests directly.
It means we can test APIs without opening the browser.

For example, we can send a request to login.
Then we can check the response.
We can then verify whether the status is successful or not.
We can verify whether the response contains the expected data. 

Before learning API testing with Playwright, we should remember these basics:
API is a bridge between the two systems. 
Request means what we asked for. Response means what we get back.
API testing means checking whether the API is working correctly or not
And Playwright helps us automate this API testing.

Every time you use a mobile phone, website, payment application, food delivery app,
or shopping app, APIs are working silently in the background.
You may not see APS directly from your eyes, but they are doing a lot of work.
Once you understand request and response, API testing becomes much easier.

Suppose you open Instagram.
You see your feed.
Now think carefully: Are all the posts already stored inside your phone?
NO!!!!!!!

Your Instagram app is sending a request to the Instagram server.
The request is like: "Give me the latest post for this particular user." 

The server checks your account, your following list, your preferences, and
then sends back a response.

That response contains post details like:
- user name
- caption
- image or video URL
- number of likes
- comments
- time of the posts

Here:
- Instagram App is the client.
- Instagram server is the backend, which you cannot see.
- API is the bridge between them.
- Request means asking for feed data.
- Response means getting the feed data back.

Same thing happens when you like a post. When you tap the like button,
the app makes a request.
This user liked the post.
The server saves that information and sends back a response:
"Like added successfully."

Then the application updates the heart icon and the like count.
API is not something separate from the real-life apps.

Every time we scroll, like a post, comment, follow someone, upload
a reel, or refresh the feed, APIs are working silently in the
background. That is why API testing is so important.

Because if the API fails:
- The feed may not load
- Likes may not update
- Comments may not appear
- Log in may fail
- Reels may not upload

Before testing API with Playwright, we first need to understand this simple idea.
The screen is what we see. 
The API is the hidden communication happening behind the screen.

Status Code??
This is very important but very easy to understand as well.

Imagine you send a request to a server.
The server replies with a number.
That number tells us what happened. 

200 = Success
401 = Created successfully
404 = Not found
500 = Internal Server Error

What data comes back in a response?
When Instagram sends your feed back, it doesn't send pretty screens; it just sends data. 

{
    "username": "piyush123",
    "likes": 500,
    "caption": "Enjoying my vacation"
}

JSON is simply a way of organizing and transferring data, nothing more.
{
    "name": "Piyush",
    "city": "Shimla"
}

Common HTTP methods

GET - Getting some information back. 
For example, show me my feed. 

POST - It is used to create something. 
For example, create a new post.

PUT - It is used to update something.
For example, update the profile information. 

DELETE - It is for deleting something
For example, delete a post. 

The base URL is the address of the server.
Query parameters are like extra instructions you are giving.
limit=10 Means I want only ten articles at a time. 
offset=0 Means start from the very first article. 

Not all APIs are open. Some APIs require you to be logged in because
the server needs to know who you are before allowing you to do certain actions.

How does the server know it's you? 
When you log in, the server gives you a special token, like a digital key. You
must send this token back with every request that needs authorisation. 

If I run the get tags API without the await, I get this error: request
context disposed because I didn't use the await keyword. Playwright ran
this API, but I didn't wait for it to complete, and meanwhile Playwright
has automatically disposed my request.

By default, Playwright will wait up to 30 seconds for the API response,
whatever is the default timeout mentioned in the config file.

So Playwright will make a request to the server. If the server replies
within 30 seconds, you get the response. If it doesn't reply in 30
seconds, Playwright will throw a timeout error. 

const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags')
The meaning of the above line is:

We are telling Playwright to
1. Go and make this API request.
2. Wait until the response comes back.
3. Store this response safely in a constant called tagsResponse.

Whenever we make an API request, we get a response. Precisely, it
is the raw response, not the actual JSON response. Inside this
raw response, we can see the status code as 200 OK. 
200 Means the request was successful.
OK means it is the human-readable text for this code.

To get the actual JSON response, we have to convert this raw
response to the JSON response, which is an extra step in Playwright. 
For this, we use the json() method.

The status code validation is always on the raw response, not the JSON response. 

When we test an API response, we usually validate in layers:
1. Status Validation: Did the request succeed?
2. Structure Validation: Does the response contain expected keys?
3. Data Validation: Is the data in the correct format and range?
4. Content Validation: Does the data contain the exact expected values or not?

Fail faster

If something controls the environment or endpoints, put it in the config file. 
If something controls the input value for tests, put it in the test-data file. 
If it is reusable logic, put it in utils. 

Why should we run the APIs in Postman before automating them in Playwright?

Before we start automating any API using Playwright or any automation tool,
there is one step that you should always do. 

First, run the API in Postman.
Not because Postman is better
Not because automation is difficult
But because we need to verify the API itself before we automate it. 

Imagine you start writing an automation script without verifying it in
Postman first, and the test case fails.

Now the question becomes:
Is the script wrong?
Is the API not working?
Is the request incorrect?
Is the environment down?

You do not know. 

And now you are debugging everything. This wastes a lot of time.
So Postman helps us validate the API quickly.

In the Postman, you can immediately check:
- Is the URL correct?
- Is the method correct?
- Are the headers correct?
- Is authentication working or not?
- Is the response coming properly or not?
- What is the status code?
- What does the response body look like?

All of this can be verified in seconds. 

In the real projects, the workflow looks like this. 

1. Developer builds API.
2. Tester validates the API in Postman.
3. Tester understands the request and response.
4. Then only automation is written.

Postman is used for exploration, validation, and understanding the API. 
Automation is used for regression, repeatability, and CI/CD execution.

Never automate an API you have not manually tested first.

Suppose if I provide an invalid URL 
https://conduit-api.bondaracademy.com/dummyapi/tags

I get 404 Not Found, and I get an HTML response. 

When the endpoint is correct, the server returns JSON, but when the
endpoint is wrong, many servers return an error page, which is usually written in HTML. 

*/

import { expect, Locator, test } from '@playwright/test'
// import { BASE_URL, URLS } from '../config/urls'

const BASE_URL = 'https://conduit-api.bondaracademy.com'

//Use the uppercase for constants for better readability. 
const ENDPOINTS = {
    TAGS: '/api/tags',
    ARTICLES: '/api/articles',
    USERS: {
        BASE: '/api/users',
        LOGIN: '/api/users/login'
    }
}

//For APIs, we will not be opening a browser at all, so we can remove the page fixture.
//In order to automate APIs, we will need another fixture called request.
//API test cases are much faster than UI test cases. 
test.skip('Get Tags API - Not optimized', async ({ request }) => {
    const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags')
    const tagsResponseJSON = await tagsResponse.json()
    // console.log(tagsResponseJSON)

    //1. Status Validation
    //toBe(200) This is a stricter equality. We are checking the value as well as the data type. 
    expect(tagsResponse.status()).toBe(200)
    //expect(tagsResponse.status()).toEqual(200)

    //Verify that the response body has tags key
    expect(tagsResponseJSON).toHaveProperty('tags')

    //Check that the tags array is not empty. 
    expect(tagsResponseJSON.tags.length).toBeGreaterThan(0)
    expect(tagsResponseJSON.tags.length).toBeLessThanOrEqual(10)

    //Check that a specific tag exists, for example, GitHub
    //Here I'm not checking the position of GitHub. I'm only checking if it is present or not. 
    expect(tagsResponseJSON.tags).toContain('GitHub')

    //Check that the very first element of the tags array is equal to Test.
    //Here I'm not only checking the tag, I'm even checking its position, which is zeroth here. 
    expect(tagsResponseJSON.tags[0]).toContain('Test')
})

/*
TODO - Find out when to use toBe() and when to use to beEqual().
Try using faker and uuid library
*/

test('Get Tags API - optimized', async ({ request }) => {
    // const response = await request.get(BASE_URL.DEV + ENDPOINTS.TAGS)
    const response = await request.get(BASE_URL + ENDPOINTS.TAGS)
    const body = await response.json()

    //1. Status Validation
    //toBe(200) This is a stricter equality. We are checking the value as well as the data type. 
    expect(response.status()).toBe(200)
    //expect(tagsResponse.status()).toEqual(200)

    //2. Structure Validation - I want to verify the response structure first before verifying the response body. 
    //Verify that the response body has tags key
    expect(body).toHaveProperty('tags')

    //3. Data validation is whether the data is in the correct format and range or not.
    const { tags } = body

    //Check that tags is actually an array, not a string, not even null.
    expect(Array.isArray(tags)).toBe(true)  //Fail the test if `tags` is not an array. 
    expect(tags).toBeInstanceOf(Array)  //Above is slightly better than this.
    expect(tags).not.toHaveLength(0)

    //Check that the tags array is not empty. 
    expect(tags.length).toBeGreaterThan(0)
    expect(tags.length).toBeLessThanOrEqual(10)

    //4. Content Validation: Does the data contain the exact expected values? 
    //Check that a specific tag exists, for example, GitHub
    //Here I'm not checking the position of GitHub. I'm only checking if it is present or not. 
    expect(tags).toContain('GitHub')

    //Check that the very first element of the tags array is equal to Test.
    //Here I'm not only checking the tag, I'm even checking its position, which is zeroth here. 
    expect(tags[0]).toContain('Test')
})

test('Get All Articles API', async ({ request }) => {
    //Prefer `params` key over string concatenation. 
    const response = await request.get(BASE_URL + ENDPOINTS.ARTICLES, {
        params: {
            limit: 10,
            offset: 0
        }
    })

    //1. First, check: did the API respond correctly? 
    //Status Validation 
    expect(response.status()).toBe(200)

    const body = await response.json()

    const { articles, articlesCount } = body

    //2. Structure validation 
    expect(Array.isArray(articles)).toBe(true)

    //3. Data Validation 
    expect(articles.length).toBeLessThanOrEqual(10)

    //4. Content Validation 
    expect(articlesCount).toBe(10)
})

/*
That is the flow:
1. First, run the login API.
2. Second, capture the token from the login response.
3. Third, use this token while calling the create article API.

*/

//Naming convention
//Name variables by 
//ACTION + TYPE
//loginResponse
//createArticleResponse
//deleteArticleResponse

//NOT - response1, response2

type Article = {
    slug: string,
    title: string
}

//BASE_URL + ENDPOINTS.USERS.LOGIN
test('Create & Delete Article API', async ({ request }) => {
    const loginResponse = await request.post(`${BASE_URL}${ENDPOINTS.USERS.LOGIN}`, {
        data: {
            user: {
                email: "piyushtest@test.com",
                password: "123456"
            }
        }
    })

    //1. Verify the login is successful. 
    expect(loginResponse.status()).toBe(200)

    const body = await loginResponse.json()

    //2. Validate the structure.
    expect(body).toHaveProperty('user')

    //3. Extract token
    //const { token } = body.user       //Cannot read property `token` of undefined. 

    // const authToken = body.user.token
    const { token: authToken } = body.user        //Destructuring 

    //4. Optional validation
    expect(authToken).toBeTruthy()          //Verified token is anything other than the six false values.

    const createArticlePayload = {
        article: {
            title: `Test Article ${Date.now()}`,
            description: "Article About",
            body: "This is body",
            tagList: []
        }
    }

    //Postman needs a JSON. Playwright needs a JavaScript object. 
    // BASE_URL + ENDPOINTS.ARTICLES
    const createArticleResponse = await request.post(`${BASE_URL}${ENDPOINTS.ARTICLES}`, {
        data: createArticlePayload,
        headers: {
            authorization: `Token ${authToken}`
        }
    })

    expect(createArticleResponse.status()).toBe(201)
    const createArticleBody = await createArticleResponse.json()
    expect(createArticleBody).toHaveProperty('article')
    expect(createArticleBody.article).toHaveProperty('title')

    expect(createArticleBody.article.title).toBe(createArticlePayload.article.title)

    const articlesResponse = await request.get(`${BASE_URL}${ENDPOINTS.ARTICLES}`, {
        params: {
            limit: 10,
            offset: 0
        },
        headers: {
            authorization: `Token ${authToken}`
        }        
    })

    //Status Validation 
    expect(articlesResponse.status()).toBe(200)

    const articlesBody = await articlesResponse.json()
    expect(articlesBody).toHaveProperty('articles')

    const createdSlug = createArticleBody.article.slug

    //createdArticle can be an object if found or else, undefined.
    const createdArticle = articlesBody.articles.find(
        (article: Article) => article.slug === createdSlug
    )
    expect(createdArticle).toBeTruthy()
    expect(createdArticle?.title).toBe(createArticlePayload.article.title)

    const deleteArticleResponse = await request.delete(
        `${BASE_URL + ENDPOINTS.ARTICLES}/${createdSlug}`, {
        headers: {
            authorization: `Token ${authToken}`
        }        
    })

    expect(deleteArticleResponse.status()).toBe(204)


})

/*
The full life cycle is:
1. Login
2. Create
3. Verify creation
4. Delete
5. Verify deletion
*/