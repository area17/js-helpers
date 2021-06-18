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

If your project as Babel or any Javascript compiler, for smaller builds you should import helpers individually:

    import ios100vhFix from '@area17/a17-helpers/src/utility/ios100vhFix'

### Note

From v2.0.0 onwards drops IE11 support but maintains Safari 10+, Edge 12+, Chrome 24+ and FireFox 29+ support. If you need IE11 support use v1.0.3 and if you need IE9 level support, use v0.8.4.

## Developing

Feel free to add any vanilla JS helpers that will be common to many projects and save someone some time working them out in the future. The main aims are no dependencies, small elegant code and high potential sharing across sites.

Please make sure you run `npm run prod` after making changes. This will compile all your changes to ES5 ready version and then you can feel free to publish to npm.

### .editorconfig

Download the editor config plugin for your text editor: [http://editorconfig.org/#download](http://editorconfig.org/#download)

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
* Tell engineering-fe Slack room
* Have a 🍦

## Update Log

**2.1.3**
* Update Production bundle

**2.1.2**
* `queryStringHandler` : dont replace plus signs from query strings

**2.1.1**
* `store.js` add better comment on this utility

**2.1.0**
* `store.js` add new tiny library to help you manage state across your application. Inspired by great libraries like Vuex and Redux and based on Beedle. For more informations, see demo : http://bp7store.dev.area17.com/

**2.0.2**
* `resized` helper updated to capture current media query being `""`

**2.0.1**
* updates `isBreakpoint` breakpoints to use shorthand breakpoint names: `'xs', 'md', 'lg', 'xl', 'xxl'` (in line with A17 boilerplate 7.1.0 and A17 Tailwind plugins)

**2.0.0**
* removes deprecated and useless utilities:
  * forEach gone (just use native [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach))
  * scrollToY (just use [native with options](https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo))
  * triggerCustomEvent (use native: `node.dispatchEvent(new CustomEvent('event:name', { detail: { foo: 'bar' } }));`)
* adds:
  * `ios100vhFix` - adds a `--1vh` CSS var to the `:root` for CSS usage to counter iOS frustrating 100vh change when the browser chrome disappears
  * `responsiveImageUpdate` - updates image `sizes` attribute on resized to make Safari recalc which source to use from the `srcset`
  * `manageBehaviors` and `createBehavior` from the boilerplate to create and manage behaviors, this version has the initial data bindings development
* updates to:
  * `setFocusOnTarget`
  * `resized` to sends breakpoint info on resized and sets current media query on load
  * `getCurrentMediaQuery` reads breakpoint info from a CSS variable `--breakpoint`
  * `focusTrap` gets cleaned up
  * `ajaxRequest` can now send JSON forms

**1.0.3**
* query string character replacement updated in `.fromObject()` in `queryStringHandler` to match `fixedEncodeURIComponent` at [MDN:encodeURIComponent](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)

**1.0.2**
* `resized` sends its event to the `window` and not the `document` for backwards compatibility

**1.0.1**
* Deprecated helpers are no longer used inside other helpers. If you're using `scrolled` you'll need to read `event.detail.last` and `event.detail.prev` (and **not** `event.data.xxxx`)

**1.0.0**
* Support is IE11+, Safari 10+, Edge, recent Chrome, recent FF to bring into line with A17 FE Boilerplate (and no longer IE9+, Safari 6+).
* Deprecation notices on:
  * forEach
  * manageBehaviors
  * triggerCustomEvent

**0.8.4**
* Added `scrolled` - a custom event to track requestAnimationFrame limited scroll events

**0.8.3**
* Fix `focusTrap` incorrectly removing events

**0.8.2**
* Update compiled version

**0.8.1**
* Added `focusTrap` and `focusDisplayHandler` to the index.js so this can be imported into your app

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
* Merge `turnObjectToQueryString` and `turnQueryStringToObject` into `queryStringHandler` as `.toObject()` and `.fromObject()` methods
* Add new `debounce` helper [Wiki](https://code.area17.com/a17/a17-helpers/wikis/debounce)

**0.2.1**

Changed dependencies from `a17.helpers` format to module

**0.2.0**

Add all the helpers from [original version](https://code.area17.com/mike/a17-js-helpers)

**0.1.0**

Basic structure and testing function
