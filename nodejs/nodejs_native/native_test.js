/**
 * @Author: Bill
 * @Date:   2014-11-11 11:20:34
 * @Last Modified by:   builden
 * @Last Modified time: 2015-01-12 00:13:40
 */

'use strict';
var _ = require('lodash');

function main() {
    // urlEncodeTest();
    // globalTest();
    // outputStackTest();
    // objNestTest();
    arrTest();
    // objTest();
}

function objTest() {
    var id = 1;
    var obj = {};
    obj[id] = {x:1, y: 1};
    console.log(obj);
    delete obj[id];
    console.log(obj);
}

function arrTest() {
/*    var arr = [];
    arr[1] = {x: 1, y: 0};
    console.log(arr);
    arr[2] = 1;
    console.log(arr);
    delete arr[1];
    console.log(arr);*/

    var arr1 = [1, 2, 3];
    var len = arr1.length;
    if (len % 2 === 1) --len;
    arr1.splice(0, len);
    console.log(arr1);
}

function outputStackTest() {
    try {
        JSON.parse('daba');
    } catch (e) {
        console.error(e.stack);
    }
}

function globalTest() {
    console.log('__dirname: ' + __dirname);
    console.log('__filename: ' + __filename);
    console.log('typeof exports is ' + typeof exports);
    //=> object
    console.log('typeof require is ' + typeof require);
    //=> function
}

// URI编码转化
function urlEncodeTest() {
    console.log(encodeURI("http://www.w3school.com.cn/My first/汉字"));
    //=> http://www.w3school.com.cn/My%20first/%E6%B1%89%E5%AD%97
    console.log(encodeURI(',/?:@&=+$#'));
    //=> ,/?:@&=+$#

    console.log(decodeURI('http://www.w3school.com.cn/My%20first/%E6%B1%89%E5%AD%97'));
    //=> http://www.w3school.com.cn/My first/汉字
    console.log(decodeURI(',/?:@&=+$#'));
    //=> ,/?:@&=+$#

    console.log(encodeURIComponent("http://www.w3school.com.cn/My first/汉字"));
    //=> http%3A%2F%2Fwww.w3school.com.cn%2FMy%20first%2F%E6%B1%89%E5%AD%97
    console.log(encodeURIComponent(',/?:@&=+$#'));
    //=> %2C%2F%3F%3A%40%26%3D%2B%24%23

    console.log(decodeURIComponent("http%3A%2F%2Fwww.w3school.com.cn%2FMy%20first%2F%E6%B1%89%E5%AD%97"));
    //=> http://www.w3school.com.cn/My first/汉字
    console.log(decodeURIComponent('%2C%2F%3F%3A%40%26%3D%2B%24%23'));
    //=> ,/?:@&=+$#
}

/**
 * 模拟
 * @return {[type]} [description]
 */
function objNestTest() {
    var UNIT_KIND = {
        NULL: null,
        NORMAL0: "normal0",
        NORMAL1: "normal1",
        NORMAL2: "normal2",
        NORMAL3: "normal3",
        NORMAL4: "normal4",
        COLOR: "color",
        CCORE: "ccore",
        STONED: "stoned",
        STONER: "stoner",
        THIEF: "thief",
        PET1: "pet1",
        PET2: "pet2",
        PET3: "pet3",
        KEY: "key"
    };

    console.log(UNIT_KIND);
    var UNIT_TYPE = {};
    UNIT_TYPE[UNIT_KIND.NORMAL0] = {
        res: "xxx"
    };

    console.log(UNIT_TYPE);
}

main();
