/**
 * @Author: Bill
 * @Date:   2014-12-30 16:09:18
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 17:03:16
 *
 * log等级
 *     debug
 *     info
 *     error
 */

'use strict';

var fs = require('fs');
var Log = require('log');
var log = new Log('debug', fs.createWriteStream('./logs/my.log'));

log.debug('preparing email');
log.info('sending email');
log.error('failed to send email');

var logger = require('./logs.js');
logger.debug('debug');
logger.info('info');
logger.warn('warn');
logger.error('error');