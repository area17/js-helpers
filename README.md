# A17 JS Helpers -- ES module version

This is a test version of a17 js helpers with es module pattern.

Please refer to See the [original version](https://code.area17.com/mike/a17-js-helpers) for all the necessary information.

## Basic

It's not a npm package yet. So copy the `src` folder and the `index.js` into a folder in the project. 
All the other files in this repo is for testing purpose.

All helpers are imported into index.js and then exported. When using it, it can either be imported as 

    import helpers from 'a17-helpers'
    
or cheey pick like this

    import { getCurrentMediaQuery, resized } from 'a17-helpers'

## Test

You can write test case in `test/test.js` file then run:

    npm run compile

then

    npm run test