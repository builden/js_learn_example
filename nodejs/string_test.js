/*
 * @Author: dengtao
 * @Date:   2014-11-29 22:56:12
 * @Last Modified by:   dengtao
 * @Last Modified time: 2014-12-10 00:20:29
 */

'use strict';

var _s = require('underscore.string');

function main() {
    // replaceTest();
    // trimTest();

    // 修改字符串第一个单词首字母大写
    // 相反的又decapitalize
    console.log(_s.capitalize('epeli test By'));
    //=> Epeli test By

    // _.numberFormat(number, [ decimals=0, decimalSeparator='.', orderSeparator=','])
    console.log(_s.numberFormat(1000, 2));
    //=> 1,000.2

    // 编辑距离，是指两个字串之间，由一个转成另一个所需的最小编辑次数
    console.log(_s.levenshtein('kitten', 'kattan'));
    //=> 2
}

/**
 * 替换函数
 * @return {[type]} [description]
 */
function replaceTest() {
    var str = "abc abc";
    console.log(str.replace(/a/g, "d"));
    console.log(str.replace(/A/ig, "d"));
    console.log(str.replace(/A/ig, "d"));
    console.log(str.replace(new RegExp("A", "ig"), "d"));
}

function trimTest() {
    // var str = " ab cc d \n";
    var str = " \n";
    console.log("str:" + str);
    console.log("str len:" + str.length);
    console.log("str trimed:" + str.trim());
    console.log("str trimed len:" + str.trim().length);
}

main();
