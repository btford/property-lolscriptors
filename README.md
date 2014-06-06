# property lolscriptors

patches property descriptor functions so you can configure "non-configurable" properties of objects


## Install

```shell
npm install property-lolscriptors
```


## Use

```javascript
var patchPropertyDescriptors = require('property-lolscriptors');
var redefine = patchPropertyDescriptors();

var x = {};

Object.defineProperty(x, 'y', {
  value: 5
});

// x.y => 5

// throws TypeError:
Object.defineProperty(x, 'y', {
  value: 5
});

// x.y => 5

// will not throw TypeError
redefine(x, 'y', {
  value: 10
});

// x.y => 10
```


## license
MIT
