/**
 * @Author: Bill
 * @Date:   2014-12-31 11:43:04
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-07 17:02:58
 */

'use strict';

// 默认使用的是utf8编码
console.log(new Buffer('foobarbaz'));
console.log(new Buffer('foobarbaz', 'utf8'));
console.log(new Buffer('foobarbaz', 'ascii'));
//=> <Buffer 66 6f 6f 62 61 72 62 61 7a>

var buf = new Buffer('中');
console.log(buf);
//=> <Buffer e4 b8 ad>
console.log('buf length ' + buf.length);
//=> buf length 3
console.log(new Buffer('中', 'ascii')); // 字符会被截断
//=> <Buffer 2d>

// Buffer.concat(list, [totalLength])
// list Array List of Buffer objects to concat
// totalLength Number Total length of the buffers when concatenated
// Returns a buffer which is the result of concatenating all the buffers in the list together.

// buf.toString([encoding], [start], [end])
// encoding String, Optional, Default: 'utf8'