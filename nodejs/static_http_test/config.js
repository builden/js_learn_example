/**
 * @Author: Bill
 * @Date:   2014-12-11 14:48:42
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-11 17:11:19
 */

'use strict';

// 一年的过期时限
exports.Expires = {
    fileMatch: /^(gif|png|jpg|js|css|mp3)$/ig,
    maxAge: 60 * 60 * 24 * 365
};

exports.Compress = {
    match: /css|html/ig
};
exports.Welcome = {
    file: "index.html"
};
exports.Timeout = 20 * 60 * 1000;
exports.Secure = null;