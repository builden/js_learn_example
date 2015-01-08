/**
 * @Author: Bill
 * @Date:   2015-01-06 14:28:47
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-06 14:32:23
 */

'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

var Server = function() {
    console.log('init');
};

util.inherits(Server, EventEmitter);

var s = new Server();
s.on('abc', function() {
    console.log('abc event');
});

s.emit('abc');