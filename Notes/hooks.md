
Hooks are special functions that run before or after your test. 
I can even call this a block of code. 

Before any class starts
1. the teacher opens the classroom
2. turns on the projector
3. and checks the attendance.

...Teacher is teaching in between. 

After the class ends 
1. Teacher closes the projector. 
2. Cleans the board 
3. It locks the classroom. 

Similarly, in Playwright we have four hooks.
1. beforeEach - This is the block of code that runs before every test. 
2. afterEach - This is the block of code that runs after every test. 
3. beforeAll - This is the block of code that runs exactly once before all the test cases. 
4. afterAll - This is the block of code that runs exactly once after all the test cases. 

When to use hooks?

You can use hooks for things like:
- opening the application
- login setup
- test data setup
- clean up after test
- closing extra pages
- deleting test data

Avoiding code duplication There is one reason, but not the only reason.

We use hooks mainly to prepare the test environment before the test starts and clean it after the test ends. 

Code duplication reduction is just a benefit. 

Hooks are used for:
1. setup - 1. Open application, Login, Create test data, Navigate to common page
2. clean up
3. consistency
4. avoiding duplication

Hooks are not just for reducing duplicate code. They are used to control what should happen before and after a test so test cases start and end in a proper state.

The placement of the hooks doesn't matter. You can keep these hooks anywhere. 

These hooks are applicable only for that specific file. 