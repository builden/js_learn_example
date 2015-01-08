/**
 * @Author: Bill
 * @Date:   2014-12-09 18:40:32
 * @Last Modified by:   dengtao
 * @Last Modified time: 2014-12-10 00:21:04
 */

'use strict';

var path = require('path');

function main() {
    // normalizeTest();
    // joinTest();
    // resolveTest();
    // relativeTest();
    // dirnameTest();
    // separatorTest();
    delimiterTest();
}

// 去掉中间的..、.节点
function normalizeTest() {
    console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));
    //=> \foo\bar\baz\asdf
}

// 拼接目录
function joinTest() {
    console.log(path.join('dir1', 'dir2', 'dir3/dir4', '..'));
    //=> dir1\dir2\dir3
}

// 相当于执行多次cd
function resolveTest() {
    console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));
    //=> C:\WorkProj\js_learn_example\nodejs\wwwroot\static_files\gif\image.gif
}

// b 相对于 a 的位置
function relativeTest() {
    console.log(path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'));
    //=> ..\..\impl\bbb
}

function dirnameTest() {
    var fullpath = '/foo/bar/baz/asdf/quux.html';
    console.log(path.dirname(fullpath));
    //=> /foo/bar/baz/asdf
    console.log(path.basename(fullpath));
    //=> quux.html
    console.log(path.basename(fullpath, '.html'));
    //=> quux
    console.log(path.extname(fullpath));
    //=> .html
}

// path.sep 路径间的分隔符
//   Linux下的分隔符是/
//   Windows下的分隔符是\\
function separatorTest() {
    console.log('/foo/bar/baz'.split(path.sep));
}

// path.delimiter PATH中的分界符
//   Linux下的分界符是:
//   Windows下的分解符是;
function delimiterTest() {
    console.log(process.env.PATH.split(path.delimiter));
}

main();
