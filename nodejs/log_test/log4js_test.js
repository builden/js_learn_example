/**
 * @Author: Bill
 * @Date:   2014-12-30 15:52:04
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 17:52:10
 */

'use strict';

var log4js = require('log4js');
log4js.configure({
  appenders: [
    { type: 'console' },
    { type: 'file', filename: 'logs/cheese.log', category: 'cheese',
        "maxLogSize": 20480, "backups": 10, }
  ]
});

var logger = log4js.getLogger('cheese');

logger.setLevel('TRACE');

logger.trace('Entering cheese testing');
logger.debug('Got cheese.');
logger.info('Cheese is Gouda.');
logger.warn('Cheese is quite smelly.');
logger.error('Cheese is too ripe!');
logger.fatal('Cheese was breeding ground for listeria.');