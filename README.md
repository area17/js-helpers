# A17 JS Helpers

[![https://nodei.co/npm/@area17/a17-helpers.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@area17/a17-helpers.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@area17/a17-helpers)

## Introduction

A collection of documented vanilla JS widgets.

Originally written as we transitioned away from using jQuery and now just a useful time saver for


## Setup

1. Install via npm:

```shell
$ npm install @area17/a17-helpers
```

Import all helpers into your JavaScript by:

```JavaScript
import helpers from '@area17/a17-helpers';
```

or, cherry pick individual helpers by either:

```JavaScript
import { extend } from '@area17/a17-helpers';
```

or:

```JavaScript
import extend from '@area17/a17-helpers/src/extend';
```

And then use the helper:

```JavaScript
const obj1 = { foo: "bar", qux: "foobar" };
const obj2 = { foo: "baz" };
const merged_obj = extend(obj1, obj2);
```

### Whats the difference?

Importing from `@area17/a17-helpers` with either `import helpers from '@area17/a17-helpers'` or `import { extend } from '@area17/a17-helpers'` will bring in _all_ the JS helpers into your bundle and then you will need to use tree shaking in either Webpack or Rollup to remove helpers you don't use.

Cherry picking from the source file will bring in _just_ the chosen helper and so you won't need to tree shake your production builds.

If you are using Webpack to compile your code and you are using it in production mode, it is likely doing this treeshaking and removing unused code for you automatically.

### TypeScript

When modifying or creating JS helpers, dont forget to generate declaration files of your helpers so these can be imported into TS projects.

Please run : `npm run types`
This will add declaration files at the same place your JS files.

## Major revision notes:

### v2.0.0+

From v2.0.0 onwards drops IE11 support but maintains Safari 10+, Edge 12+, Chrome 24+ and FireFox 29+ support. 
If you need IE11 support use v1.0.3 and if you need IE9 level support, use v0.8.4.

### v3.0.0+

`oritentationChangeFix` renamed to `orientationChangeFix`.

`manageBehaviors` and `createBehaviors` have been removed - behaviors and behavior management has been split out into its own library [A17-Behaviors](https://github.com/area17/a17-behaviors).
`fontLoadObserver` removed, use https://github.com/zachleat/fontfaceonload
`lazyLoad` removed, use use https://www.npmjs.com/package/@area17/a17-lazyload


### v3.1.0+

Added:
* [`isVisible`](https://github.com/area17/js-helpers/wiki/isVisible)
* [`getFocusableElements`](https://github.com/area17/js-helpers/wiki/getFocusableElements)
* `listeners`
    * [`listeners.add()`](https://github.com/area17/js-helpers/wiki/addListener)
    * [`listeners.remove()`](https://github.com/area17/js-helpers/wiki/removeListener)
* [`nl2br`](https://github.com/area17/js-helpers/wiki/nl2br)
* [`removeEmoji`](https://github.com/area17/js-helpers/wiki/removeEmoji)
* [`removeHTMLentities`](https://github.com/area17/js-helpers/wiki/removeHTMLentities)
* [`removeNoneASCIICharacters`](https://github.com/area17/js-helpers/wiki/removeNoneASCIICharacters)
* [`removeNonePrintableCharacters`](https://github.com/area17/js-helpers/wiki/removeNonePrintableCharacters)
* [`replaceAccentedCharacters`](https://github.com/area17/js-helpers/wiki/replaceAccentedCharacters)

### v3.2.0+

Added:
* [`responsiveImageSizes`](https://github.com/area17/js-helpers/wiki/responsiveImageSizes)
* [`responsiveImageSrcset`](https://github.com/area17/js-helpers/wiki/responsiveImageSrcset)

## Documentation and demos

* [Wiki](https://github.com/area17/js-helpers/wiki)

## Contribution

Feel free to add any vanilla JS helpers that will be common to many projects and save someone some time working them out in the future. The main aims are no dependencies, small elegant code and high potential sharing across sites.

### Code of Conduct

AREA 17 is dedicated to building a welcoming, diverse, safe community. We expect everyone participating in the AREA 17 community to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it. Please follow it.

### Tests

Written using [Jest](https://jestjs.io/) with tests in `/test/`. 
To run:

```Shell
$ npm run test
```
