/**
 * @Author: Bill
 * @Date:   2014-12-29 20:13:05
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-29 20:16:51
 */

'use strict';
var assert = require('assert');

function main() {
    // 四舍五入
    assert.equal(3, Math.round(3.2));
    assert.equal(4, Math.round(3.5));
    assert.equal(3, parseInt(3.1));
    assert.equal(3, parseInt(3.5));
}

main();