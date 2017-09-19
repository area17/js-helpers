'use strict';

let expect = require('chai').expect;
let jsHelpers = require('../index');

describe('#jsHelpers', function() {
	it('bundle', function() {
			expect(jsHelpers).to.be.a('object');
	});
});