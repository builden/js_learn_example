/**
 * @Author: Bill
 * @Date:   2014-12-29 15:16:48
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-29 15:36:28
 *
 * 最好不要加message，否则无法看到actual具体的值
 */

'use strict';

var assert = require('assert');

// assert(value, message), assert.ok(value, [message])#
assert('0', 'test');

assert.ok('');

// assert.equal(actual, expected, [message]) 采用的是'=='比较
assert.equal(1, true, 'Truthy');

// assert.notEqual(actual, expected, [message]) 采用的是'!='比较
assert.notEqual(0, true, 'Truthy');

// @note 使用'=='或'!='比较
// false，0，空值（''），null，undefined，NaN都会返回false值
// true, 非空字符串'false', '0'等，返回的是真

// assert.strictEqual(actual, expected, [message]) 采用的是'==='比较
assert.strictEqual(!0, true, 'Truthy');

// assert.notStrictEqual(actual, expected, [message]) 采用的是'!=='比较
assert.notStrictEqual(1, true, 'Truthy');