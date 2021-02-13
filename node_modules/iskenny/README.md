## isKenny
> Returns true if the given input string is kenny.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save iskenny
```

## Usage

Works only with strings. not case sensitive.

```js
const isKenny = require('iskenny');

console.log(isKenny('Kenny')); //=> true
console.log(isKenny('kenny')); //=> true

console.log(isKenny(0)); //=> false
console.log(isKenny('Andy')); //=> false
```
