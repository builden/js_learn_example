/**
 * @Author: Bill
 * @Date:   2014-12-09 18:40:32
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-09 18:54:38
 */

'use strict';

var path = require('path');

function main() {
    // normalizeTest();
    // joinTest();
    // resolveTest();
    relativeTest();
}

// 去掉中间的..、.节点
function normalizeTest() {
    console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));
    // return ==> \foo\bar\baz\asdf
}

// 拼接目录
function joinTest() {
    console.log(path.join('dir1', 'dir2', 'dir3/dir4', '..'));
    // return ==> dir1\dir2\dir3
}

// 相当于执行多次cd
function resolveTest() {
    console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'));
    // return ==> C:\WorkProj\js_learn_example\nodejs\wwwroot\static_files\gif\image.gif
}

// b 相对于 a 的位置
function relativeTest() {
    console.log(path.relative('C:\\orandea\\test\\aaa', 'C:\\orandea\\impl\\bbb'));
    // return ==> ..\..\impl\bbb
}

main();