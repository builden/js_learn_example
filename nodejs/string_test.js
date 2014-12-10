/*
 * @Author: dengtao
 * @Date:   2014-11-29 22:56:12
 * @Last Modified by:   dengtao
 * @Last Modified time: 2014-12-11 00:08:11
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

    // 按固定长度分割
    console.log(_s.chop('whitespace', 3));
    //=> [ 'whi', 'tes', 'pac', 'e' ]

    // 清除多余的空格
    console.log(_s.clean(' foo    bar  '));
    //=> foo bar

    // 字符串拆成数组
    console.log(_s.chars('hello'));
    //=> [ 'h', 'e', 'l', 'l', 'o' ]

    console.log(_s.swapCase('Hello'));
    //=> hELLO

    // 是否包含子串
    console.log(_s.include('foobar', 'ob'));
    //=> true

    // 包含子串的个数
    console.log(_s.count('foobar', 'o'));
    //=> 2

    // html标签转义, 相反则使用unescapeHTML
    console.log(_s.escapeHTML('<div>Blah blah blah</div>'));
    //=> &lt;div&gt;Blah blah blah&lt;/div&gt;

    // 插入子串
    console.log(_s.insert('hello', 2, 'insert'));
    //=> heinsertllo

    // 是否是空白串
    console.log(_s.isBlank(' \n\t'));
    //=> true

    // _s._.join(separator, *strings)
    console.log(_s.join('-', 'foo', 'bar', 'baz'));
    //=> foo-bar-baz

    // 按行拆分成字符串数组
    console.log(_s.lines('hello\nworld'));
    //=> [ 'hello', 'world' ]

    console.log(_s.startsWith('image.gif', 'image'));
    //=> true

    console.log(_s.endsWith('image.gif', '.gif'));
    //=> true

    // ltrim, rtrim
    console.log(_s.trim('_-foobar-_', '-_'));
    //=> foobar

    console.log(_s.truncate('hello world', 3));
    //=> hel...

    // 和prune类似，避免出现半个单词的情况
    console.log(_s.prune('hello world', 4));
    //=> ...

    // 按正则表达式切割字符串，_s.words(str, delimiter=/\s+/)
    console.log(_s.words('i-love-you', '-'));
    //=> [ 'i', 'love', 'you' ]

    console.log(_s.sprintf('%0.1f', 1.17));
    //=> 1.2

    console.log(_s.pad('1', 8, '0'));
    //=> 00000001

    console.log(_s.toNumber('2.556'));
    //=> 3

    // strLeft, strLeftBack
    console.log(_s.strRight('This_is_a_test_string', '_'));
    //=> is_a_test_string
    console.log(_s.strRightBack('This_is_a_test_string', '_'));
    //=> string

    console.log(_s.repeat('foo', 3));
    //=> foofoofoo

    console.log(_s.surround('foo', 'ab'));
    //=> abfooab

    console.log(_s.quote('foo'));
    //=> "foo"

    console.log(_s.unquote('"foo"'));
    //=> foo
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
