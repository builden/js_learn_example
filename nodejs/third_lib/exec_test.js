/* 
 * @Author: Bill
 * @Date:   2015-01-15 19:49:19
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-15 21:06:51
 *
 * https://github.com/bahamas10/node-exec
 *
 * function exec(args, opts, callback)
 * opts.env, opts.encoding, opts.killSignal, opts.timeout
 * callback(err, out, code)
 *
 * note: 原工程不支持windows系统，且不支持中文，这里进行了改写
 */

'use strict';

var exec = require('../utils/exec.js');
var iconv = require('iconv-lite');

process.on('uncaughtException', function(e) {
    console.error('Caught exception: ' + e.stack);
});

var child = exec('netstat -an', function(err, out, code) {
    // 程序结束后，会回调到这里
    if (err instanceof Error)
        throw err;

    // windows已经在程序内部默认改成了GBK编码
    // 输出程序运行过程中产生的数据
    process.stderr.write(err);
    process.stdout.write(out);

    // process.exit(code);
});

// 此处是为了边执行，边输出，这个stdout事件可注册多个
/*child.stdout.on('data', function(data) {
    console.log(iconv.decode(data, 'GBK'));
});*/