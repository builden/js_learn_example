/**
 * @Author: Bill
 * @Date:   2014-12-09 18:12:28
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-30 21:06:06
 * @note
 *  所用到的中间件
 *  跨域支持 https://github.com/troygoode/node-cors/
 *  解析post过来的数据 https://github.com/expressjs/body-parser
 */

'use strict';

console.log('=============== process begin ====================');

var express = require('express'),
    cors = require('cors'),
    app = express();
var bodyParser = require('body-parser');

var fs = require('fs-extra');
var port = process.env.PORT || 80;

// 'content-type': 'application/x-www-form-urlencoded'
app.use(bodyParser.urlencoded({ extended: false }));
// 'content-type': 'application/json'
app.use(bodyParser.json());

// 针对所有资源
// app.use(cors());

app.get('/cors', cors(), function(req, res, next) {
    console.log(getClientIP(req));
    res.json({
        msg: 'This is CORS-enabled for /cors dir'
    });
});

app.get('/products/:id', function(req, res, next) {
    res.json({
        msg: 'This is CORS-enabled for all origins!'
    });
});

app.get('/', function(req, res, next) {
    console.log(req.headers['user-agent']);
    // 返回的body内容
    res.json({
        msg: 'default page'
    });
});

var tweets = [];
app.post('/send', function(req, res) {
    console.log('get client post ' + getClientIP(req));
    console.log(req.headers);
    console.log(req.body);
    if (req.body && req.body.tweet) {
        tweets.push(req.body.tweet)
        res.send({
            status: "ok",
            message: "Tweet received"
        })
    } else {
        // 没有 tweet ？
        res.send({
            status: "nok",
            message: "No tweet received"
        })
    }
});

app.get('/tweets', function(req, res) {
    res. send(tweets);
});

app.listen(80, function() {
    console.log('CORS-enabled web server listening on port ' + port);
});

/**
 * 获取客户端ip
 * @param req
 * @returns {*}
 */
function getClientIP(req) {
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
}

// 参考url
// http://www.cnblogs.com/ahl5esoft/p/3769781.html