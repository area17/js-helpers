# A17 JS Helpers

## Introduction

A collection of documented vanilla JS widgets.

Originally written as we transitioned away from using jQuery and now just a useful time saver for


## Setup

1. Install via npm:

```shell
$ npm install @area17/a17-helpers
```

Import into your JavaScript by:

```JavaScript
import helpers from '@area17/a17-helpers';
```

or, cherry pick individual helpers:

```JavaScript
import ios100vhFix from '@area17/a17-helpers/src/utility/ios100vhFix'
```

### v2.0.0+

From v2.0.0 onwards drops IE11 support but maintains Safari 10+, Edge 12+, Chrome 24+ and FireFox 29+ support. If you need IE11 support use v1.0.3 and if you need IE9 level support, use v0.8.4.

### v3.0.0+

`manageBehaviors` and `createBehaviors` have been removed - behaviors and behavior management has been split out into its own library [A17-Behaviors](https://github.com/area17/a17-behaviors)

## Documentation and demos

* [Wiki](https://code.area17.com/a17/a17-helpers/wikis/home)

## Contribution

Feel free to add any vanilla JS helpers that will be common to many projects and save someone some time working them out in the future. The main aims are no dependencies, small elegant code and high potential sharing across sites.

Please make sure you run `npm run prod` after making changes. This will compile all your changes to ES5 ready version and then you can feel free to publish to npm.

### Code of Conduct

AREA 17 is dedicated to building a welcoming, diverse, safe community. We expect everyone participating in the AREA 17 community to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it. Please follow it.

### Tests

Written using [Mochajs](http://mochajs.org) and [Chai.js](http://chaijs.com/), currently living in `test/test.js`. To run:

    $ npm run prod
    $ npm run test

**TODO** convert tests from pre-open-source Helpers to this version
