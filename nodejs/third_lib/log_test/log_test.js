/**
 * @Author: Bill
 * @Date:   2014-12-30 16:09:18
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-02-11 11:16:04
 *
 * log等级
 *     debug
 *     info
 *     error
 */

'use strict';

var fs = require('fs');

// 自己封装的log库
var logger = require('../../utils/logs.js');
logger.setOutputFile(__dirname + '/test.log');
logger.setLevel(logger.DEBUG);
logger.debug('debug %d %s %j', 1, 'haha', {x:1, y:'a'});
logger.log('log %d', 2);
logger.info('info %d', 3);
logger.warn('warn %d', 4);
logger.error('error %d', 5);

// 第三方的一个简单log库
/*var Log = require('log');
var log = new Log('debug', fs.createWriteStream('./logs/my.log'));
log.debug('preparing email');
log.info('sending email');
log.error('failed to send email');*/