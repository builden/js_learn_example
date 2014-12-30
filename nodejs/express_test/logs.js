/**
 * @Author: Bill
 * @Date:   2014-12-30 16:39:23
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 17:48:24
 *
 * how to use:
 * var logger = require('./logs.js');
 * logger.debug('debug');
 * logger.info('info');
 * logger.warn('warn');
 * logger.error('error');
 *
 * 字符串格式化可以使用util.format或_s.sprintf
 */

'use strict';

var moment = require('moment');

function getNow() {
    return '[' + moment().format('YY-MM-DD HH:mm:ss.SSS') + '] ';
}

function debug(msg) {
    console.log(getNow() + '[DEBUG] ' + msg);
}
exports.debug = debug;

function info(msg) {
    console.info(getNow() + '[INFO] ' + msg);
}
exports.info = info;

function warn(msg) {
    console.warn(getNow() + '[WARN] ' + msg);
}
exports.warn = warn;

function error(msg) {
    console.error(getNow() + '[ERROR] ' + msg);
}
exports.error = error;