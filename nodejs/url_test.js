/**
 * @Author: Bill
 * @Date:   2014-12-31 11:24:11
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-31 11:31:48
 */

'use strict';

var url = require('url');

var myUrl = "http://www.nodejs.org/some/url/?with=query&param=that&are=awesome#alsoahash";

console.log(url.parse(myUrl));
//=> { protocol: 'http:',
//=>   slashes: true,
//=>   auth: null,
//=>   host: 'www.nodejs.org',
//=>   port: null,
//=>   hostname: 'www.nodejs.org',
//=>   hash: '#alsoahash',
//=>   search: '?with=query&param=that&are=awesome',
//=>   query: 'with=query&param=that&are=awesome',
//=>   pathname: '/some/url/',
//=>   path: '/some/url/?with=query&param=that&are=awesome',
//=>   href: 'http://www.nodejs.org/some/url/?with=query&param=that&are=awesome#alsoahash' }

// 解析query字段
console.log(url.parse(myUrl, true));
//=> ...
//=> query: { with: 'query', param: 'that', are: 'awesome' },

// 在http的request事件中，需要通过调用url.parse(req.url)来获取 url对象