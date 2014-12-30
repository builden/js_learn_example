/**
 * @Author: Bill
 * @Date:   2014-12-30 16:39:23
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 19:07:16
 *
 * how to use:
 * var logger = require('./logs.js');
 * logger.debug('debug');
 * logger.log('log');
 * logger.info('info');
 * logger.warn('warn');
 * logger.error('error');
 *
 * 字符串格式化可以使用util.format或_s.sprintf
 */

'use strict';

var moment = require('moment');
var chalk = require('chalk');

exports.DEBUG = 0;
exports.LOG = 1;
exports.INFO = 2;
exports.WARN = 3;
exports.ERROR = 4;

var LOG_LEVEL = exports.DEBUG;

/**
 * 设置日志等级
 * @param {Number} level logger.DEBUG
 */
function setLevel(level) {
    LOG_LEVEL = level;
}

exports.setLevel = setLevel;

function getNow() {
    return '[' + moment().format('YY-MM-DD HH:mm:ss.SSS') + '] ';
}

function debug(msg) {
    if (LOG_LEVEL <= exports.DEBUG)
        console.log(chalk.cyan(getNow() + '[DEBUG] ') + msg);
}
exports.debug = debug;

function log(msg) {
    if (LOG_LEVEL <= exports.LOG)
        console.log(getNow() + '[LOG] ' + msg);
}
exports.log = log;

function info(msg) {
    if (LOG_LEVEL <= exports.INFO)
        console.info(chalk.green(getNow() + '[INFO] ') + msg);
}
exports.info = info;

function warn(msg) {
    if (LOG_LEVEL <= exports.WARN)
        console.warn(chalk.yellow(getNow() + '[WARN] ') + msg);
}
exports.warn = warn;

function error(msg) {
    if (LOG_LEVEL <= exports.ERROR)
        console.error(chalk.red(getNow() + '[ERROR] ') + msg);
}
exports.error = error;