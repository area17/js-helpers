'use strict';

let expect = require('chai').expect;
let jsHelpers = require('../index');

describe('#jsHelpers', function() {
	it('bundle', function() {
			expect(jsHelpers).to.be.a('object');
	});

	it('module import', function()	{
		expect(jsHelpers.cookieHandler.read).to.be.a('function');
		expect(jsHelpers.cookieHandler.delete).to.be.a('function');
		expect(jsHelpers.cookieHandler.create).to.be.a('function');
		expect(jsHelpers.ajaxRequest).to.be.a('function');
		expect(jsHelpers.getOffset).to.be.a('function');
		expect(jsHelpers.scrollToY).to.be.a('function');
		expect(jsHelpers.escapeString).to.be.a('function');
		expect(jsHelpers.extend).to.be.a('function');
		expect(jsHelpers.getIndex).to.be.a('function');
		expect(jsHelpers.getMetaContentByName).to.be.a('function');
		expect(jsHelpers.getUrlParameterByName).to.be.a('function');
		expect(jsHelpers.jsonpRequest).to.be.a('function');
		expect(jsHelpers.keycodes).to.be.a('object');
		expect(jsHelpers.message).to.be.a('function');
		expect(jsHelpers.objectifyForm).to.be.a('function');
		expect(jsHelpers.oritentationChangeFix).to.be.a('function');
		expect(jsHelpers.sendEventToSegmentio).to.be.a('function');
		expect(jsHelpers.turnObjectToQueryString).to.be.a('function');
		expect(jsHelpers.turnQueryStringToObject).to.be.a('function');
	});


});