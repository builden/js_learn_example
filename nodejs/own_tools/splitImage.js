/* 
 * @Author: Bill
 * @Date:   2015-01-20 10:23:23
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-20 11:03:42
 *
 * https://github.com/zhangyuanwei/node-images
 */

'use strict';

var images = require('images');
var path = require('path');

function main() {
    splitImg('numbers.png', 10, 26, 33);
}

function splitImg(filePath, count, width, height) {
    for (var i = 0; i < count; i++) {
        images(images('numbers.png'), i * width, 0, width, height).save(i + path.extname(filePath));
    }
}

main();