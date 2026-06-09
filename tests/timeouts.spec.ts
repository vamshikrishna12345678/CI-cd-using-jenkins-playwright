/*
We can apply timeouts at both these places.
1. Timeout at the test level means inside the test case. 
2. Timeout at the configuration level means the config file.

Timeouts are applicable for actions as well as assertions. 

Test timeout means how long a single test is allowed to run
before Playwright stops it and marks it as failed. By default,
it is 30 seconds. It means every test gets a maximum of 30
seconds to execute. We can change this setting either for a
particular test, or we can apply it globally inside the config file. 

Playwright will allow each test to run for a maximum of 30 seconds.
It means if a test runs longer than 30 seconds, Playwright will
forcefully stop it and mark the test as failed.

The purpose of the smaller timeout is to make sure that tests do
not run forever. Sometimes a test might get stuck because a page
never loads or an element never appears. The smaller timeout protects
the test suite from hanging.

If we wonder why the timeout is only 30 seconds, this looks very small.

The reason is Playwright encourages us to write small and focused tests.
Instead of creating one very long test that performs too many actions,
we usually split the workflow into multiple smaller tests.

Because the test cases are smaller, most of them finish very quickly,
often within a few seconds only. A 30-second limit is usually more
than enough.

What if the test generally takes longer? For example, a test might
upload a very large file, which takes longer. It might generate a
long report or interact with a slow external system.

In these situations, we can increase the timeout for that specific test,
or we can increase the timeout globally for all the tests.

Set the timeout in the config file. 
timeout: 60 * 1000
The timeout is 60 seconds, applicable for all the test cases inside the
test folder globally. This is called the test level timeout. 

Test level timeout if written has a higher priority than the global config timeout. 

To summarize, There are two types of time outs. 
1. It is a global timeout which is applicable for all the tests.
2. Test level timeout which is applicable only for a specific test 

Then is assertion timeout.
For assertions, the default timeout is 5 seconds. 

Let's change the global expect timeout in the config file like this. 
expect: {timeout: 10000},
Now I'm seeing that for all the assertions, the default timeout
is no longer 5 sec. It is now 10 sec. 

Then we have test.slow().

The test.slow() Tells Playwright that this test is expected to
take longer than usual. When you mark a test case as slow,
Playwright automatically triples the default time out for this test.

Why do we need test.slow? 
In real applications, some tests naturally take longer. 

Examples:
Large report generation 
Large File Upload 
Data Heavy Dashboard 
Slow third-party integrations 

If Playwright keeps the normal timeout, the test might fail even
though the application is working correctly, so we mark it as slow.

And just like `test.setTimeout`, it should also be placed inside
the test and ideally as the first line. 

Difference between test.slow vs test.setTimeout 

Test.slow
    It automatically triples the existing timeout. 
    It's a simple way to say this test is slower than usual. 

Test.setTimeout 
You manually define the time order.

Expect timeout controls: How long should Playwright retry an
assertion before failing it?

There are a total of five types of timeouts in Playwright. 
1. Global timeout       -> Time limit of the whole test run. Default is no timeout. 
2. Test timeout         -> Time limit For the single test. Default is 30 sec.
3. Action timeout       -> Time limit for the action command. Default is no timeout. 
4. Navigation timeout   -> Time limit for the page navigation. Default is no timeout. 
5. Expect timeout       -> Time limit for expect locator assertions. Default is 5 sec.

Action Timeout controls how long Playwright waits for actions like click or fill or type.
In reality, Playwright already has auto waiting, so you rarely need to change this.

Navigation timeout. It controls how long Playwright waits for page navigation. 
page.goto()

*/


import { expect, test } from '@playwright/test'

//I will get this error upon running this test. 
//    Test timeout of 10000ms exceeded.
//Playwright has aborted the test because the test level timeout of 10 seconds was exceeded. 
test('Timeouts', async ({page}) => {
    // test.setTimeout(60_000)
    await page.goto('https://demowebshop.tricentis.com/')

    //page.waitForTimeout(3000) means Sleep for 3 seconds. Do nothing. 
    await page.waitForTimeout(3000)
    await page.waitForTimeout(3000)
    await page.waitForTimeout(3000)
    await page.waitForTimeout(3000)
    await page.waitForTimeout(3000)
})