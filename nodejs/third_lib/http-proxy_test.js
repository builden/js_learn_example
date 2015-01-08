/**
 * @Author: Bill
 * @Date:   2015-01-08 10:31:44
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-08 12:19:09
 *
 * https://github.com/nodejitsu/node-http-proxy
 */

'use strict';
/*
var httpProxy = require('http-proxy');

var proxy = httpProxy.createServer({
    target: 'http://localhost:9005'
});

proxy.listen(9005);

proxy.on('error', function(err, req, res) {
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });

    res.end('Something went wrong.');
});

proxy.on('proxyRes', function(proxyRes, req, res) {
    console.log('RAW Response from the target', JSON.stringify(proxyRes.headers, true, 2));
});

proxy.on('open', function(proxySocket) {
    // listen for messages coming FROM the target here
    proxySocket.on('data', function(data) {
        console.log(data);
    });
});

proxy.on('close', function(req, socket, head) {
    // view disconnected websocket connections
    console.log('Client disconnected');
});*/


var util = require('util'),
    colors = require('colors'),
    http = require('http'),
    httpProxy = require('http-proxy'),
    request = require('request'),
    url = require('url');

var welcome = [
    '#    # ##### ##### #####        #####  #####   ####  #    # #   #',
    '#    #   #     #   #    #       #    # #    # #    #  #  #   # # ',
    '######   #     #   #    # ##### #    # #    # #    #   ##     #  ',
    '#    #   #     #   #####        #####  #####  #    #   ##     #  ',
    '#    #   #     #   #            #      #   #  #    #  #  #    #  ',
    '#    #   #     #   #            #      #    #  ####  #    #   #  '
].join('\n');

util.puts(welcome.rainbow.bold);

//
// Basic Http Proxy Server
//
httpProxy.createServer({
    target: 'http://localhost:9003'
}).listen(8003);

//
// Target Http Server
//
http.createServer(function(req, res) {
    var urlStr = url.format({
        protocol: 'http',
        hostname: req.headers['host'],
        pathname: req.url
    });
    request.get(urlStr).pipe(res);
}).listen(9003);

util.puts('http proxy server'.blue + ' started '.green.bold + 'on port '.blue + '8003'.yellow);
util.puts('http server '.blue + 'started '.green.bold + 'on port '.blue + '9003 '.yellow);