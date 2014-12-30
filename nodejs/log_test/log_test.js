/**
 * @Author: Bill
 * @Date:   2014-12-30 16:09:18
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 19:24:16
 *
 * log等级
 *     debug
 *     info
 *     error
 */

'use strict';

var fs = require('fs');

// 自己封装的log库
var logger = require('./logs.js');
logger.setLevel(logger.INFO);
logger.debug('debug');
logger.log('log');
logger.info('info');
logger.warn('warn');
logger.error('error');

// 第三方的一个简单log库
var Log = require('log');
var log = new Log('debug', fs.createWriteStream('./logs/my.log'));
log.debug('preparing email');
log.info('sending email');
log.error('failed to send email');