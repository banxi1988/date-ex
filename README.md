# date-ex

[![Build Status](https://travis-ci.org/banxi1988/date-ex.svg?branch=master)](https://travis-ci.org/banxi1988/date-ex)

A Set of Utility extension method for Date class

## Installation

1.  `npm i date-ex -S`
2.  `yarn add date-ex`

## Usage

### JavaScript

```js
require("date-ex");
new Date(2018, 5, 11).dateByAddingDays(2).toISODateString(); // return 2018-06-12
```

### TypeScript

```ts
import "date-ex";
new Date(2018, 5, 11).dateByAddingDays(2).toISODateString(); // return 2018-06-12
```

### Full check api list

[api list](https://github.com/banxi1988/date-ex/blob/master/dist/index.d.ts)

## Test

`npm run test`
