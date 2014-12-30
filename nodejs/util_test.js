/**
 * @Author: Bill
 * @Date:   2014-12-30 17:13:42
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 19:22:16
 */

'use strict';

var util = require('util');

// 同步输出日志，不推荐使用
util.log('sync output log');

// 格式化字符串
// 支持%d, %s, %j(json)
console.log(util.format('%s %d %j', 'test', 12, {x:1, y:2}));
//=> test 12 {"x":1,"y":2}

// 对象转字符串
console.log(util.inspect({x:1, y:2}));
var obj = {x: 1, y: {a:3, b: {c:'a', d:9}}};
console.log(util.inspect(obj, { showHidden: true, depth: null, colors: true }));
//=> { x: 1, y: 2 }

// util.inherits
// 实现对象原型继承