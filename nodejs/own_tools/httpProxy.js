/**
 * @Author: Bill
 * @Date:   2015-01-08 13:59:30
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-08 14:39:21
 */

'use strict';

var PORT = process.argv[2] || 8080;
var http = require('http');
var request = require('request');
var logger = require('../utils/logs.js');

process.on('uncaughtException', function(e) {
    logger.error('process Caught exception: ' + e.stack);
});

var proxy = http.createServer(function(req, res) {
    request({
        method: req.method,
        url: req.url,
        headers: req.headers
    }).pipe(res);
});

proxy.listen(PORT, function() {
    logger.info('Proxy server listen on port %d', PORT);
});