/*
 * @Author: Bill
 * @Date:   2015-02-04 18:35:16
 * @Last Modified by:   dengtao
 * @Last Modified time: 2015-03-12 22:54:16
 *
 * http://chaijs.com/
 */

'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();

function main() {
    assertTest();
    expectTest();
    shouldTest();
}

// http://chaijs.com/api/assert/
function assertTest() {
    var foo = 'bar';
    var beverages = {
        tea: ['chai', 'matcha', 'oolong']
    };

    assert.typeOf(foo, 'string', 'foo is a string');
    assert.equal(foo, 'bar', 'foo equal `bar`');
    assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
    assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
}

// http://chaijs.com/api/bdd/
function expectTest() {
    var foo = 'bar',
        beverages = {
            tea: ['chai', 'matcha', 'oolong']
        };

    expect(foo).to.be.a('string');
    expect(foo).to.equal('bar');
    expect(foo).to.have.length(3);
    expect(beverages).to.have.property('tea').with.length(3);
    expect(1).to.be.a('number');
    expect(null).to.be.a('null');
    expect(undefined).to.be.an('undefined');
    expect(null).to.be.a.null;
    expect(undefined).to.not.be.an.null;
    expect(undefined).to.be.undefined;
    expect(null).to.not.be.undefined;
}

function shouldTest() {
    var foo = 'bar',
        beverages = {
            tea: ['chai', 'matcha', 'oolong']
        };

    foo.should.be.a('string');
    foo.should.equal('bar');
    foo.should.have.length(3);
    beverages.should.have.property('tea').with.length(3);
    // 1.should.be.a('number');
    // null.should.be.a('null');
    // undefined.should.be.an('undefined');
}

main();
