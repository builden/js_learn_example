/*
 * @Author: dengtao
 * @Date:   2014-12-09 23:55:06
 * @Last Modified by:   dengtao
 * @Last Modified time: 2014-12-10 00:06:06
 *
 * 作用和jsdom一样，都是使用jquery的方式在服务端解析xml，不过效率比jsdom更快更好
 * https://github.com/cheeriojs/cheerio
 */

'use strict';

var cheerio = require('cheerio');
var $ = cheerio.load('<h2 class="title">Hello world</h2>');

function main() {
    $('h2.title').text('Hello there!');
    $('h2').addClass('welcome');

    console.log($.html());
    //=> <h2 class="title welcome">Hello there!</h2>
}

main();
