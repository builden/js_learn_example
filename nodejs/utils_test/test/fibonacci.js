/* 
* @Author: Bill
* @Date:   2015-03-24 16:23:51
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-24 17:18:21
*/

'use strict';

var fibonacci = require('../lib/fibonacci.js');
var expect = require('chai').expect;
var rewire = require('rewire');

describe('fibonacci', function () {
    it('should equal 0 when n === 0', function() {
        expect(fibonacci(0)).to.equal(0);
    });

    it('should equal 1 when n === 1', function() {
        expect(fibonacci(1)).to.equal(1);
    });

    it('should equal 1 when n === 2', function() {
        expect(fibonacci(2)).to.equal(1);
    });

    it('should equal 3 when n === 3', function() {
        expect(fibonacci(3)).to.equal(2);
    });

    it('should equal 3 when n === 4', function() {
        expect(fibonacci(4)).to.equal(3);
    });

    it('should equal 5 when n === 5', function() {
        expect(fibonacci(5)).to.equal(5);
    });

    it('should equal 55 when n === 10', function() {
        expect(fibonacci(10)).to.equal(55);
    });

    it('should throw err when n === -1', function() {
        expect(function() {
            fibonacci(-1);
        }).to.throw('n should >= 0');
    });

    it('should throw err when n === "string"', function() {
        expect(function() {
            fibonacci("string");
        }).to.throw(Error);

        expect(function() {
            fibonacci("string");
        }).to.throw('n should be a Number');
    });
});

describe('inner Add Test', function () {
    var innerAdd = null;
    before(function() {
        var lib = rewire('../lib/fibonacci.js');
        innerAdd = lib.__get__('innerAdd');
    });
    it('expect innerAdd(1, 2) to equal 3', function() {
        expect(innerAdd(1, 2)).to.equal(3);
    });

    it('expect innerAdd(3, 2) to equal 5', function() {
        expect(innerAdd(3, 2)).to.equal(5);
    });
});