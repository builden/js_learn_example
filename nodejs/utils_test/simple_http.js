/* 
* @Author: Bill
* @Date:   2015-03-24 10:26:09
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-24 10:39:17
*/

'use strict';

var http = require('http');
var app = http.createServer(function(req, res) {
    console.log(req.method);
    console.log(req.url);
    console.log(req.httpVersion);
    console.log(req.headers);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
});

app.on('close', function() {
    console.log('close event');
});

app.listen(1337, '127.0.0.1');

console.log('Server runing at http://127.0.0.1:1337/');