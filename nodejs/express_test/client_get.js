/**
 * @Author: Bill
 * @Date:   2014-12-30 20:50:25
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 21:00:33
 */

'use strict';

var http = require('http');

http.get("http://127.0.0.1/tweets", function(res) {
    console.log("Got response: " + res.statusCode);
    res.setEncoding('utf8');
    var data = ""
    res.on('data', function(d) {
        data += d;
    });
    res.on('end', function() {
        console.log(data);
    });
}).on('error', function(e) {
    console.log("Got error: " + e.message);
});
