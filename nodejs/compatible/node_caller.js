/* 
* @Author: Bill
* @Date:   2015-03-17 16:53:17
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-17 17:19:33
*/

'use strict';

var hello = require('./hello.js');
var hello2 = require('./hello2.js');

var h = new hello('abc');
h.func1();
h.func2('2');

console.log('--------------');
var h2 = new hello('cdf');
h2.func2('3');

console.log('--------------');
hello2.func1('test');
console.log(hello2.version);