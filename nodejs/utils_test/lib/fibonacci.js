/* 
* @Author: Bill
* @Date:   2015-03-24 16:04:14
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-26 13:55:25
*/

'use strict';

var fibonacci = function(n) {
  if (typeof n !== 'number') {
    throw new Error('n should be a Number');
  }

  if (n < 0) {
    throw new Error('n should >= 0');
  }

  if (n === 0 || n === 1) {
    return n;
  }

  return fibonacci(n-1) + fibonacci(n-2);
};

module.exports = fibonacci;

var innerAdd = function(a, b) {
    return a + b;
};

var innerObj = {
  bar: 'foo'
};