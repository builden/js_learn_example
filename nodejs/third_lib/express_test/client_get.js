/**
 * @Author: Bill
 * @Date:   2014-12-30 20:50:25
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-07 17:57:55
 */

'use strict';

var http = require('http');
var fs = require('fs-extra');
var iconv = require('iconv-lite');

/* 中午字符有可能被截断
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
});*/

function getCharset(res) {
    var content = res.headers['content-type'];
    var m = content.match(/charset=([^\s]*)/i);
    return m ? m[1] : 'utf8';
}

function getHttpTxt(url, cb) {
    http.get(url, function(res) {
        var charset = getCharset(res);
        var size = 0;
        var chunks = [];
        res.on('data', function(chunk) {
            size += chunk.length;
            chunks.push(chunk);
        });
        res.on('end', function() {
            var buf = Buffer.concat(chunks, size);
            cb(null, iconv.decode(buf, charset));
        });
    }).on('error', function(e) {
        cb(e.message, '');
    });
}

getHttpTxt('http://www.baidu.com', function(err, doc) {
    fs.outputFile('test.html', doc, function(err) {
        if (err) console.error(err);
    })
});
