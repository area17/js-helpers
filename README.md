# A17 JS Helpers

A17 JS Helpers with an ES module pattern.

[Wiki](https://code.area17.com/a17/a17-helpers/wikis/home)

## What?

A collection of documented vanilla JS widgets.

In the A17 Boilerplate, we use these as a dependency and install via [NPM](https://www.npmjs.com/package/@area17/a17-helpers). Alternatively you can copy the `src` folder and the `index.js` into a folder of your project and compile.

If installed via NPM, you'll want to import into your JavaScript by:

    import helpers from '@area17/a17-helpers'

or, cherry pick individual helpers:

    import { getCurrentMediaQuery, resized } from '@area17/a17-helpers'

## Developing

Feel free to add any vanilla JS helpers that will be common to many projects and save someone some time working them out in the future. The main aims are no dependencies, small elegant code and high potential sharing across sites.

Please make sure you run `npm run prod` after making changes. This will compile all your changes to ES5 ready version and then you can feel free to publish to npm.

### .editorconfig

Download the editor config plugin for your text editor: [http://editorconfig.org/#download](http://editorconfig.org/#download)

### no jQuery

Intentionally vanilla JS to keep this JS library agnostic.

### Tests

Written using [Mochajs](http://mochajs.org) and [Chai.js](http://chaijs.com/), currently living in `test/test.js`. To run:

    $ npm run prod
    $ npm run test

**TODO** convert tests from pre-open-source Helpers to this version

### To add/update a helper

* Make your changes
* Bump the version number
* Test it, you may need to update the tests in /test/
* Update the [wiki](https://code.area17.com/a17/a17-helpers/wikis/home) document for it if required
* Tell @fe in the developers Hipchat room
* Have a 🍦

## Update Log

**0.8.0**
* Added `focusTrap` and `focusDisplayHandler` to trap keyboard tab focus within an element and to help style keyboard focus states

**0.7.2**
* ajaxRequest returns the request so you can abort it in your project function

**0.7.1**
* Scroll to Y : call the onComplete callback even if not scrolling

**0.7.0**
* Add rollup.js for compile the package. Now Everything is compiled. (Don't forget to compile it then push npm if you are updating it)

**0.6.8**
* Added `isBreakpoint` helper to query if a breakpoint is active

**0.6.6 and 0.6.7**
* Updated `copyTextToClipboard` as recent browser updates stopped it working

**0.6.5**
* Updated `lazyLoad` to v2.1.1 inline with updates to that lib

**0.6.4**
* Updated `package-lock.json`

**0.6.2 and 0.6.3**
* Updated `lazyLoad` to init correctly

**0.6.1**
* Updated `lazyLoad` to v2.1.0 inline with updates to that lib

**0.6.0**
* Links to [Wiki](https://code.area17.com/a17/a17-helpers/wikis/home) updated
* Missing semicolons on imports added
* Files with tabs as spaces converted to spaces for spaces
* Added .editorconfig
* Alphabetised `index.js`

**0.5.1**
* Renamed `message` to `messages`, updated `message--hide` to `s-hide`

**0.5.0**
* Added `fontLoadObserver`

**0.4.2**
* Refactored `debounce`

**0.4.1**
* Added default success message to `copyTextToClipboard`

**0.4.0**
* Added `lazyLoad`, a A17-helperised version of: [https://github.com/area17/lazyload](https://github.com/area17/lazyload)

**0.3.6**
* Updated `manageBehaviors` to not have warning typo...

**0.3.5**
* Updated `manageBehaviors` to warn when behavior fails to init and not trap JS errors from inside a behavior

**0.3.4**
* Added `forEach` to loop `querySelectorAll` nodes

**0.3.3**
* `getOffset` returns a full fixed `getBoundingClientRect` output (position with scroll) so includes bottom, right, width and height now

**0.3.2**
* `resized` checks for and sets `window.A17.currentMediaQuery` when media query changes

**0.3.1**
* Added `jsdom` an `jsdom-global` (https://github.com/rstacruz/jsdom-global) to `devDependencies` to test DOM events in Mocha tests.
* Added `.updateParameter()` method to `queryStringHandler` helper [Wiki](https://code.area17.com/a17/a17-helpers/wikis/updateParameter)
* Added new `setFocusOnTarget` helper [Wiki](https://code.area17.com/a17/a17-helpers/wikis/setFocusOnTarget) (with test)
* Added new `copyTextToClipboard` helper [Wiki](https://code.area17.com/a17/a17-helpers/wikis/copyTextToClipboard) (no test, not sure how to test..)

**0.3.0**
* Merge `tuenObjectToQueryString` and `turnQueryStringToObject` into `queryStringHandler` as `.toObject()` and `.fromObject()` methods
* Add new `debounce` helper [Wiki](https://code.area17.com/a17/a17-helpers/wikis/debounce)

**0.2.1**

Changed dependencies from `a17.helpers` format to module

**0.2.0**

Add all the helpers from [original version](https://code.area17.com/mike/a17-js-helpers)

**0.1.0**

Basic structure and testing function
