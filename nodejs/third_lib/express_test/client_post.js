/**
 * @Author: Bill
 * @Date:   2014-12-30 19:51:38
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 20:54:12
 */

'use strict';

var http = require('http'),
    assert = require('assert');

var optPost = {
    host: 'localhost',
    port: 80,
    path: '/send',
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
        // 'content-type': 'application/json'
    }
};

var req = http.request(optPost, function(res) {
    res.setEncoding('utf8');

    var data = "";
    res.on('data', function(d) {
        data += d;
    });
    res.on('end', function() {
        assert.strictEqual(data, '{"status":"ok","message":"Tweet received"}');
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// req.write(JSON.stringify({tweet: 'test'}));
req.write('tweet=test');
// 因为不确定会写入多少内容，所以需要调用end方法
req.end();