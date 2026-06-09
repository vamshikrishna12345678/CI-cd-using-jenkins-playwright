Imagine you have 100 test cases. 
If Playwright runs them one by one, it will take a very long time. 

Worker is like a separate person executing tests. 
If you have one worker, one person is doing all the work. 

If you have four workers, four people are doing at the same time, so the execution finishes much faster. 

If you have 20 test cases with one worker -> All twenty test cases will run sequentially, one after the other. 
20 test cases = 20 mins

If you have twenty test cases with four workers -> Tests are divided among four workers and run in parallel. 
20 test cases = 5 mins

workers: 1  It means no parallel execution. Here, fullyParallel setting is useless. 
workers: 4  Use 4 workers. Now Playwright will run four test cases in parallel.
workers: 8 Use eight workers.

Each worker gets its own browser context and runs independently. One worker does not share data with another worker.

Imagine a restaurant is receiving 100 food orders. If there is only one chef that is cooking, orders will take a very long time. But if four chefs are cooking simultaneously, orders are completed much faster. In Playwright, workers are like those chefs processing multiple tests at the same time. 

Round-robin scheduling

How does Playwright decide how many workers to use? 
By default, Playwright automatically chooses the number of workers based on the available CPU cores on your machine. 

Default workers = Number of CPU cores

If your laptop has 4 CPU cores, Playwright will use 4 workers. 
If your laptop has 8 CPU cores, Playwright will use 8 workers.

This helps you run your test cases in parallel efficiently based upon your system's capacity. 

We can overwrite the workers by writing 
--workers=X
