# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: datepicker.spec.ts >> Complex Datepicker
- Location: tests\datepicker.spec.ts:94:6

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-name="chevron-right"]')

```

# Page snapshot

```yaml
- generic [ref=e5]:
  - generic [ref=e7]:
    - navigation [ref=e9]:
      - generic [ref=e10]:
        - generic [ref=e11]:
          - generic [ref=e12]:
            - link [ref=e13] [cursor=pointer]:
              - /url: "#"
              - img [ref=e15]
            - link "Playground" [ref=e23] [cursor=pointer]:
              - /url: "#"
          - button "Light" [ref=e25] [cursor=pointer]:
            - generic [ref=e26]: Light
            - img [ref=e28]
        - generic [ref=e34]:
          - button [ref=e37] [cursor=pointer]:
            - img [ref=e39]
          - link [ref=e45] [cursor=pointer]:
            - /url: "#"
            - img [ref=e47]
          - link [ref=e53] [cursor=pointer]:
            - /url: "#"
            - img [ref=e55]
          - generic [ref=e65] [cursor=pointer]: Nick Jones
    - generic [ref=e66]:
      - list [ref=e71]:
        - listitem [ref=e72]:
          - link "IoT Dashboard" [ref=e73] [cursor=pointer]:
            - /url: /pages/iot-dashboard
            - img [ref=e75]
            - generic: IoT Dashboard
        - listitem [ref=e80]:
          - generic [ref=e81]: FEATURES
        - listitem [ref=e82]:
          - link "Forms" [expanded] [ref=e83] [cursor=pointer]:
            - /url: "#"
            - img [ref=e85]
            - generic: Forms
            - img [ref=e92]
          - list [ref=e97]:
            - listitem [ref=e98]:
              - link "Form Layouts" [ref=e99] [cursor=pointer]:
                - /url: /pages/forms/layouts
                - generic: Form Layouts
            - listitem [ref=e100]:
              - link "Datepicker" [ref=e101] [cursor=pointer]:
                - /url: /pages/forms/datepicker
                - generic: Datepicker
        - listitem [ref=e102]:
          - link "Modal & Overlays" [ref=e103] [cursor=pointer]:
            - /url: "#"
            - img [ref=e105]
            - generic: Modal & Overlays
            - img [ref=e113]
          - list:
            - listitem [ref=e118]:
              - link "Dialog" [ref=e119] [cursor=pointer]:
                - /url: /pages/modal-overlays/dialog
                - generic: Dialog
            - listitem [ref=e120]:
              - link "Window" [ref=e121] [cursor=pointer]:
                - /url: /pages/modal-overlays/window
                - generic: Window
            - listitem [ref=e122]:
              - link "Popover" [ref=e123] [cursor=pointer]:
                - /url: /pages/modal-overlays/popover
                - generic: Popover
            - listitem [ref=e124]:
              - link "Toastr" [ref=e125] [cursor=pointer]:
                - /url: /pages/modal-overlays/toastr
                - generic: Toastr
            - listitem [ref=e126]:
              - link "Tooltip" [ref=e127] [cursor=pointer]:
                - /url: /pages/modal-overlays/tooltip
                - generic: Tooltip
        - listitem [ref=e128]:
          - link "Extra Components" [ref=e129] [cursor=pointer]:
            - /url: "#"
            - img [ref=e131]
            - generic: Extra Components
            - img [ref=e140]
          - list:
            - listitem [ref=e145]:
              - link "Calendar" [ref=e146] [cursor=pointer]:
                - /url: /pages/extra-components/calendar
                - generic: Calendar
            - listitem [ref=e147]:
              - link "Drag & Drop" [ref=e148] [cursor=pointer]:
                - /url: /pages/extra-components/drag-drop
                - generic: Drag & Drop
            - listitem [ref=e149]:
              - link "PDF Download" [ref=e150] [cursor=pointer]:
                - /url: /pages/extra-components/pdf-download
                - generic: PDF Download
        - listitem [ref=e151]:
          - link "Charts" [ref=e152] [cursor=pointer]:
            - /url: "#"
            - img [ref=e154]
            - generic: Charts
            - img [ref=e161]
          - list:
            - listitem [ref=e166]:
              - link "Echarts" [ref=e167] [cursor=pointer]:
                - /url: /pages/charts/echarts
                - generic: Echarts
        - listitem [ref=e168]:
          - link "Tables & Data" [ref=e169] [cursor=pointer]:
            - /url: "#"
            - img [ref=e171]
            - generic: Tables & Data
            - img [ref=e180]
          - list:
            - listitem [ref=e185]:
              - link "Smart Table" [ref=e186] [cursor=pointer]:
                - /url: /pages/tables/smart-table
                - generic: Smart Table
            - listitem [ref=e187]:
              - link "Tree Grid" [ref=e188] [cursor=pointer]:
                - /url: /pages/tables/tree-grid
                - generic: Tree Grid
        - listitem [ref=e189]:
          - link "Auth" [ref=e190] [cursor=pointer]:
            - /url: "#"
            - img [ref=e192]
            - generic: Auth
            - img [ref=e199]
          - list:
            - listitem [ref=e204]:
              - link "Login" [ref=e205] [cursor=pointer]:
                - /url: /auth/login
                - generic: Login
            - listitem [ref=e206]:
              - link "Register" [ref=e207] [cursor=pointer]:
                - /url: /auth/register
                - generic: Register
            - listitem [ref=e208]:
              - link "Request Password" [ref=e209] [cursor=pointer]:
                - /url: /auth/request-password
                - generic: Request Password
            - listitem [ref=e210]:
              - link "Reset Password" [ref=e211] [cursor=pointer]:
                - /url: /auth/reset-password
                - generic: Reset Password
      - generic [ref=e212]:
        - generic [ref=e217]:
          - generic [ref=e219]:
            - generic [ref=e220]: Common Datepicker
            - textbox "Form Picker" [ref=e222]
          - generic [ref=e224]:
            - generic [ref=e225]: Datepicker With Range
            - textbox "Range Picker" [ref=e227]
          - generic [ref=e229]:
            - generic [ref=e230]: Datepicker With Disabled Min Max Values
            - textbox "Min Max Picker" [ref=e232]
        - navigation [ref=e234]:
          - generic [ref=e235]:
            - generic [ref=e236]:
              - text: Created by
              - link "Akveo" [ref=e238] [cursor=pointer]:
                - /url: https://akveo.page.link/8V2f
              - text: . Modified by
              - link "Bondar Academy" [ref=e240] [cursor=pointer]:
                - /url: https://www.bondaracademy.com
              - text: .
            - generic [ref=e241]:
              - link "" [ref=e242] [cursor=pointer]:
                - /url: "#"
              - link "" [ref=e243] [cursor=pointer]:
                - /url: "#"
              - link "" [ref=e244] [cursor=pointer]:
                - /url: "#"
              - link "" [ref=e245] [cursor=pointer]:
                - /url: "#"
  - generic [ref=e251]:
    - generic [ref=e252]:
      - button "January 2055" [ref=e254] [cursor=pointer]:
        - text: January 2055
        - img [ref=e256]
      - generic [ref=e261]:
        - button [ref=e262] [cursor=pointer]:
          - img [ref=e264]
        - button [active] [ref=e269] [cursor=pointer]:
          - img [ref=e271]
    - generic [ref=e278]:
      - generic [ref=e279]:
        - generic [ref=e280]: Su
        - generic [ref=e281]: Mo
        - generic [ref=e282]: Tu
        - generic [ref=e283]: We
        - generic [ref=e284]: Th
        - generic [ref=e285]: Fr
        - generic [ref=e286]: Sa
      - generic [ref=e287]:
        - generic [ref=e288]:
          - generic [ref=e290] [cursor=pointer]: "27"
          - generic [ref=e292] [cursor=pointer]: "28"
          - generic [ref=e294] [cursor=pointer]: "29"
          - generic [ref=e296] [cursor=pointer]: "30"
          - generic [ref=e298] [cursor=pointer]: "31"
          - generic [ref=e300] [cursor=pointer]: "1"
          - generic [ref=e302] [cursor=pointer]: "2"
        - generic [ref=e303]:
          - generic [ref=e305] [cursor=pointer]: "3"
          - generic [ref=e307] [cursor=pointer]: "4"
          - generic [ref=e309] [cursor=pointer]: "5"
          - generic [ref=e311] [cursor=pointer]: "6"
          - generic [ref=e313] [cursor=pointer]: "7"
          - generic [ref=e315] [cursor=pointer]: "8"
          - generic [ref=e317] [cursor=pointer]: "9"
        - generic [ref=e318]:
          - generic [ref=e320] [cursor=pointer]: "10"
          - generic [ref=e322] [cursor=pointer]: "11"
          - generic [ref=e324] [cursor=pointer]: "12"
          - generic [ref=e326] [cursor=pointer]: "13"
          - generic [ref=e328] [cursor=pointer]: "14"
          - generic [ref=e330] [cursor=pointer]: "15"
          - generic [ref=e332] [cursor=pointer]: "16"
        - generic [ref=e333]:
          - generic [ref=e335] [cursor=pointer]: "17"
          - generic [ref=e337] [cursor=pointer]: "18"
          - generic [ref=e339] [cursor=pointer]: "19"
          - generic [ref=e341] [cursor=pointer]: "20"
          - generic [ref=e343] [cursor=pointer]: "21"
          - generic [ref=e345] [cursor=pointer]: "22"
          - generic [ref=e347] [cursor=pointer]: "23"
        - generic [ref=e348]:
          - generic [ref=e350] [cursor=pointer]: "24"
          - generic [ref=e352] [cursor=pointer]: "25"
          - generic [ref=e354] [cursor=pointer]: "26"
          - generic [ref=e356] [cursor=pointer]: "27"
          - generic [ref=e358] [cursor=pointer]: "28"
          - generic [ref=e360] [cursor=pointer]: "29"
          - generic [ref=e362] [cursor=pointer]: "30"
        - generic [ref=e363]:
          - generic [ref=e365] [cursor=pointer]: "31"
          - generic [ref=e367] [cursor=pointer]: "1"
          - generic [ref=e369] [cursor=pointer]: "2"
          - generic [ref=e371] [cursor=pointer]: "3"
          - generic [ref=e373] [cursor=pointer]: "4"
          - generic [ref=e375] [cursor=pointer]: "5"
          - generic [ref=e377] [cursor=pointer]: "6"
```

# Test source

```ts
  16  |     //text "Common Datepicker"
  17  |     await page.locator('nb-card', {hasText: 'Common Datepicker'})
  18  |               .getByRole('textbox').click()    
  19  | 
  20  |     await page.pause()
  21  | })
  22  | 
  23  | /*
  24  | 
  25  | page.getByText('28', {exact: true})
  26  | This locator is not good because we are searching for 28th May on the entire page,
  27  | which is also finding the 28th of April.
  28  | So a good strategy is to search for 28th of May only within the calendar, and not
  29  | just that. I will search for 28th only within the current month and exclude past
  30  | and future dates.
  31  | 
  32  | Lets try this locator -> .cell-content
  33  | This is giving me 42 matches, including the past and the future dates. This is NOT good.
  34  | 
  35  | I want a locator that should only give me current month dates and exclude past
  36  | and future dates.
  37  | 
  38  | "bounding-month" This class is there for all the past as well as future dates,
  39  | but not for the current month. 
  40  | 
  41  | This locator [class="day-cell ng-star-inserted"] gives 30 matches
  42  | Why not 31? Because The current date, 25th, has an extra class called `today`.
  43  | So, this locator [class="day-cell ng-star-inserted"] will match all the 30
  44  | dates except today's date. So this CSS has a minor issue.
  45  | 
  46  | In order to fix this issue, we have to look at a different strategy.
  47  | If we try this CSS .day-cell.ng-star-inserted, it matches all 42 dates,
  48  | including past and future dates. This CSS does not have the today class,
  49  | still it is also including today's date. 
  50  | 
  51  | We just saw that the `bounding-month` class is there for the future as well as past dates. 
  52  | So, from this CSS .day-cell.ng-star-inserted we will exclude these many dates.
  53  | This is our final CSS -> .day-cell.ng-star-inserted:not(.bounding-month)
  54  | 
  55  | :not(...) This means select this on the left, but exclude anything that
  56  | matches the thing inside the parenthesis.
  57  | 
  58  | .day-cell:not(.bounding-month)  -> We are excluding by class. 
  59  | button:not(.disabled)           -> Exclude the buttons with the disabled class.
  60  | input:not([readonly])           -> Exclude the inputs with read-only attributes.
  61  | li:not(:first-child)            -> Exclude the first child. 
  62  | div:not(#my-id)                 -> Exclude a specific ID. 
  63  | 
  64  | Now, to exclude even today's class, we can use this CSS. 
  65  | .day-cell.ng-star-inserted:not(.bounding-month):not(.today)
  66  | 
  67  | Instead of writing the above CSS, which is slightly confusing,
  68  | we can go with this shorter CSS. 
  69  | .day-cell.ng-star-inserted:not(.bounding-month, .today)
  70  | 
  71  | Currently, we have a lot of hard coding in our test, which is not good,
  72  | so we are using the inbuilt date object. 
  73  | 
  74  |     let date = new Date()
  75  |     console.log(date)       //2026-05-25T11:29:03.750Z
  76  | 
  77  | In the real world, we have to select a dynamic date which should
  78  | always work irrespective of the month.
  79  | 
  80  | Suppose my requirement is to always select tomorrow's date or t+1.
  81  | 
  82  | date.setDate(26) -> From the entire date object which has dd, mm, and yyyy,
  83  | I am only changing the dd part. 
  84  | date.setDate(26) Means I am changing the dd part to 26, which is tomorrow's date.
  85  | 
  86  | Now date gives output as 2026-05-26T11:33:05.405Z
  87  | 
  88  | date.setDate(date.getDate() + 1)    -> Fetch the DD part of today's date, add 1
  89  | to it and now Without any hard coding, I am changing the dd part to tomorrow's date.
  90  | 
  91  | 
  92  | */
  93  | 
  94  | test.only('Complex Datepicker', async ({ page }) => {
  95  |     await page.goto('https://playground.bondaracademy.com/')
  96  |     await page.getByText('Forms').click()
  97  |     await page.getByText('Datepicker').click()
  98  |     
  99  |     const calendarInputField = page.getByPlaceholder('Form Picker')
  100 |     await calendarInputField.click()
  101 | 
  102 |     let date = new Date()
  103 |     console.log(date)
  104 |     date.setDate(date.getDate() + 100000)
  105 |     const expectedDate = date.getDate().toString()  //DD
  106 |     const expectedMonthShort = date.toLocaleDateString('en-us', {month: 'short'})    //MMM  -> Aug
  107 |     const expectedMonthLong = date.toLocaleDateString('en-us', {month: 'long'})    //August
  108 |     const expectedYear = date.getFullYear()     //YYYY
  109 |     const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
  110 | 
  111 |     //Lets handle the calendar part first
  112 |     let actualMonthAndYear: string = await page.locator('nb-calendar-view-mode button').textContent() ?? ''   // May 2026 
  113 |     const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}` //June 2026
  114 | 
  115 |     while(!actualMonthAndYear.includes(expectedMonthAndYear)){
> 116 |         await page.locator('[data-name="chevron-right"]').click()
      |                                                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
  117 |         actualMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent() ?? ''
  118 |     }
  119 | 
  120 |     //      .day-cell.ng-star-inserted:not(.bounding-month)
  121 |     // page.locator('[class="day-cell ng-star-inserted"]').getByText('28', {exact: true})
  122 |     await page.locator('.day-cell.ng-star-inserted:not(.bounding-month)')
  123 |               .getByText(expectedDate, {exact: true}).click()
  124 | 
  125 |     await expect(calendarInputField).toHaveValue(dateToAssert)
  126 | 
  127 |     //await page.pause()
  128 | })
```