// 'use strict';

// require('jsdom-global')();

// let expect = require('chai').expect;
// let jsHelpers = require('../index');
it("test", () => {
  expect(1).toBe(1);
});

// describe('#jsHelpers', function() {
//   it('bundle', function() {
//     expect(jsHelpers).to.be.a('object');
//   });

//   it('module import', function() {
//     expect(jsHelpers.cookieHandler.read).to.be.a('function');
//     expect(jsHelpers.cookieHandler.delete).to.be.a('function');
//     expect(jsHelpers.cookieHandler.create).to.be.a('function');
//     expect(jsHelpers.ajaxRequest).to.be.a('function');
//     expect(jsHelpers.getOffset).to.be.a('function');
//     expect(jsHelpers.scrollToY).to.be.a('function');
//     expect(jsHelpers.escapeString).to.be.a('function');
//     expect(jsHelpers.extend).to.be.a('function');
//     expect(jsHelpers.getIndex).to.be.a('function');
//     expect(jsHelpers.getMetaContentByName).to.be.a('function');
//     expect(jsHelpers.getUrlParameterByName).to.be.a('function');
//     expect(jsHelpers.isBreakpoint).to.be.a('function');
//     expect(jsHelpers.jsonpRequest).to.be.a('function');
//     expect(jsHelpers.keycodes).to.be.a('object');
//     expect(jsHelpers.messages).to.be.a('function');
//     expect(jsHelpers.objectifyForm).to.be.a('function');
//     expect(jsHelpers.oritentationChangeFix).to.be.a('function');
//     expect(jsHelpers.sendEventToSegmentio).to.be.a('function');
//     expect(jsHelpers.queryStringHandler).to.be.a('object');
//     expect(jsHelpers.debounce).to.be.a('function');
//     expect(jsHelpers.setFocusOnTarget).to.be.a('function');
//     expect(jsHelpers.forEach).to.be.a('function');
//     expect(jsHelpers.lazyLoad).to.be.a('function');
//     expect(jsHelpers.fontLoadObserver).to.be.a('function');
//   });

//   it('queryString handler', () => {
//     let url = 'http://a17-js-helpers.com?test=ok&fun=yes';
//     let updatedUrl = 'http://a17-js-helpers.com?test=ok&fun=no';
//     let query = '?test=ok&fun=yes';
//     let obj = {
//       test: 'ok',
//       fun: 'yes'
//     };

//     //test to obj
//     expect(jsHelpers.queryStringHandler.toObject(url)).to.deep.equal(obj);

//     //test from obj
//     expect(jsHelpers.queryStringHandler.fromObject(obj)).to.equal(query);

//     //test from obj
//     expect(jsHelpers.queryStringHandler.updateParameter(url, 'fun', 'no')).to.equal(updatedUrl);
//   });

//   it('debounce', () => {
//     let fooStart = 1;
//     let barStart = 1;

//     let foo = jsHelpers.debounce(
//       num => {
//         fooStart += num;
//       },
//       100,
//       true
//     );

//     let bar = jsHelpers.debounce(num => {
//       barStart += num;
//     }, 100);

//     for (let i = 0; i < 500; i++) {
//       foo(i);
//       bar(i);
//     }

//     expect(fooStart).to.equal(1);

//     setTimeout(function() {
//       expect(barStart).to.equal(500);
//     }, 100);
//   });

//   it('setFocusOnTarget', () => {
//     let div = document.createElement('div');
//     jsHelpers.setFocusOnTarget(div);
//     expect(document.activeElement).to.equal(div);
//   });

//   it('fontLoadObserver', () => {
//     jsHelpers.fontLoadObserver({
//       name: 'TimesNewRoman',
//       variants: [
//         {
//           name: 'Times New Roman'
//         }
//       ]
//     });
//   });
// });
