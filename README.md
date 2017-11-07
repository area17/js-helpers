# A17 JS Helpers -- ES module version

This is a test version of a17 js helpers with es module pattern.

Please refer to See the [original version](https://code.area17.com/mike/a17-js-helpers) for all the necessary information.

## Basic

It can be used as a npm package or just copy the `src` folder and the `index.js` into a folder in the project. All the other files in this repo is for testing purpose.

All helpers are imported into index.js and then exported. When using it, it can either be imported as

    import helpers from 'a17-helpers'

or cheey pick like this

    import { getCurrentMediaQuery, resized } from 'a17-helpers'

## Test

You can write test case in `test/test.js` file then run:

    npm run compile

then

    npm run test


## Update Log

**0.3.2**
* `resized` checks for and sets `window.A17.currentMediaQuery` when media query changes

**0.3.1**
* Added `jsdom` an `jsdom-global` (https://github.com/rstacruz/jsdom-global) to `devDependencies` to test DOM events in Mocha tests.
* Added `.updateParameter()` method to `queryStringHandler` helper [Wiki](https://code.area17.com/mike/a17-js-helpers/wikis/A17-Helpers-updateParameter)
* Added new `setFocusOnTarget` helper [Wiki](https://code.area17.com/mike/a17-js-helpers/wikis/a17-helpers-setFocusOnTarget) (with test)
* Added new `copyTextToClipboard` helper [Wiki](https://code.area17.com/mike/a17-js-helpers/wikis/a17-helpers-copyTextToClipboard) (no test, not sure how to test..)

**0.3.0**
* Merge `tuenObjectToQueryString` and `turnQueryStringToObject` into `queryStringHandler` as `.toObject()` and `.fromObject()` methods
* Add new `debounce` helper [Wiki](https://code.area17.com/mike/a17-js-helpers/wikis/a17-helpers-debounce)


**0.2.1**

Changed dependencies from `a17.helpers` format to module

**0.2.0**

Add all the helpers from [original version](https://code.area17.com/mike/a17-js-helpers)

**0.1.0**

Basic structure and testing function
