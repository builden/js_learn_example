/**
 * @Author: Bill
 * @Date:   2014-12-29 20:13:05
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-20 17:57:08
 */

'use strict';
var assert = require('assert');

function main() {
    // roundTest();
    bitTest();
}

function roundTest() {
    // 四舍五入
    assert.equal(3, Math.round(3.2));
    assert.equal(4, Math.round(3.5));
    assert.equal(3, parseInt(3.1));
    assert.equal(3, parseInt(3.5));
}

function bitTest() {
    // ~ 非
    // | 或
    // & 与
    // ^ 异或
    // << 左移
    // >> 有符号位右移
    // >>> 无符号位右移
    assert.equal(2, 1 << 1);
    assert.equal(4, 1 << 2);
    assert.equal(2, 2 & 6);
}

main();