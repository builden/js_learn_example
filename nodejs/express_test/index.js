/**
 * @Author: Bill
 * @Date:   2014-12-09 18:12:28
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-09 18:55:26
 * @note
 *  所用到的中间件
 *  跨域支持 https://github.com/troygoode/node-cors/
 */

'use strict';

console.log('=============== process begin ====================');

var express = require('express')
  , cors = require('cors')
  , app = express();

var fs = require('fs-extra');
var port = process.env.PORT || 80;

// 针对所有资源
// app.use(cors());

app.get('/cors', cors(), function(req, res, next) {
    res.json({msg: 'This is CORS-enabled for /cors dir'});
});

app.get('/products/:id', function(req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'});
});

app.get('/', function(req, res, next) {
    res.json({msg: 'default page'});
});

app.listen(80, function(){
  console.log('CORS-enabled web server listening on port ' + port);
});

// 参考url
// http://www.cnblogs.com/ahl5esoft/p/3769781.html