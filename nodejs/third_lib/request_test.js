/**
 * @Author: Bill
 * @Date:   2015-01-08 10:27:38
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-08 14:44:23
 *
 * https://github.com/request/request
 */

'use strict';

var request = require('request');
var fs = require('fs-extra');

var r = request.defaults({
    'proxy': 'http://203.195.202.83:8080'
})

function main() {
    // simpleTest();
    // getTest();
    proxyTest();
    // postTest();
}

function simpleTest() {
    // 不支持gbk编码
    /*    request('http://www.baidu.com', function(err, res, body) {
            if (!err && res.statusCode === 200) {
                // console.log(body);
                fs.outputFileSync('test.html', body);
            }
        });*/

    request('http://www.baidu.com').pipe(fs.createWriteStream('index.html'));
}

function getTest() {
    request.get('http://www.baidu.com').on('response', function(res) {
        console.log(res.response.statusCode);
        console.log(res.headers['content-type']);
    }).on('error', function(err) {
        console.error(err);
    }).pipe(request.put('xxxx'));
}

function proxyTest() {
    r.get('http://www.baidu.com').pipe(fs.createWriteStream('index.html'));
/*    r.post({
        url: 'http://www.baidu.com/dafd/dd?dt=1',
        formData: 'x=123&y=dab'
    }).pipe(fs.createWriteStream('index.html'));*/
}

function postTest() {
    request.post({
        url: 'http://service.com/upload',
        formData: formData
    }, function optionalCallback(err, httpResponse, body) {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
}

main();