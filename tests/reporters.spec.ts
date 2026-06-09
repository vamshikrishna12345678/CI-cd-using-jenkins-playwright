/*
By default, the report opens only on failure. We can configure this behaviour. 

reporter: [['html', {open: 'always'}]]
Now the report will always open irrespective of pass or fail.

The report always gets saved inside the `playwright-report` folder.

However, we can change the location of the report. 

If you are okay with the default behaviour of reporters, simply use this setting. 
reporter: 'html',

But if you want to modify the default behaviour, then you have to use in array form.
reporter: [['html', {open: 'always', outputFolder: 'html-report'}]],

Now I'm telling Playwright to save the report not in the default path,
but in this new path, which is html-report. 

To see the report stored in the custom path, run this command.
npx playwright show-report html-report

dot reporter - This is the most minimal test reporter built
into Playwright. When you run test cases using the dot
reporter, you don't get detailed logs. You just see dots and symbols
In the terminal 

This is the output of dot reporter.
°·

The dot reporter is the simplest reporter in Playwright. Instead of
printing detailed logs, it just shows dots and letters to indicate 
pass/fail/etc. It is great when you want quick feedback or when you
are running your test cases in CI/CD pipelines where too much output
can be messy.

Next is List Report. The list reporter prints out each test case name
as it runs one by one, along with its result. 
Instead of just showing dots like in the previous one, it gives you
a detailed list of test titles. 

This is the output when all the test cases are skipped. 

  -  1 [chromium] › tests/frames.spec.ts:102:6 › Frame1
  -  2 [chromium] › tests/frames.spec.ts:117:6 › Frame2

This is the output when one test case passes and another one fails. 
  
  ✘  1 [chromium] › tests/frames.spec.ts:102:5 › Frame1 (30.1s)
  ✓  2 [chromium] › tests/frames.spec.ts:117:5 › Frame2 (12.3s)

Why use the List Reporter?
1. Readable output: It is first because you see the actual test names.
2. Clear failure info: You instantly know which test failed without
scrolling down to the summary.
3. Balance: It is more detailed than dot reporter. Even the time is
mentioned for each test case.

The List Reporter is like the Dot Reporter's big brother.

Next is null reporter, so Playwright will not produce any reporter output at all.
Test cases will still run, but you don't see any progress or results in the terminal.

We can even override the reporter from the command line.
npx playwright test frames --reporter=list




*/