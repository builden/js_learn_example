/**
 * @Author: Bill
 * @Date:   2014-12-31 16:44:23
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-31 18:55:22
 */

'use strict';

// 原生http方式
var app = require('http').createServer(handler)
var io = require('socket.io').listen(app);
var fs = require('fs');
var url = require('url');

function handler(req, res) {
    var pathname = url.parse(req.url).pathname;
    fs.readFile(__dirname + pathname,
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading ' + pathname);
            }

            res.writeHead(200);
            res.end(data);
        });
}

app.listen(8080);

// express方式
/*var express = require('express');
var app = express();
var server = require('http').Server(app);
var fs = require('fs');
var url = require('url');

var io = require('socket.io').listen(server);

// 注意：这里只能使用http server监听端口
server.listen(8080);

app.use(express.static(__dirname));*/

io.on('connection', function(socket) {
    socket.emit('news', {
        hello: 'world'
    });
    socket.on('my other event', function(data) {
        console.log(data);
    });
});