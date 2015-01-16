/* 
 * @Author: Bill
 * @Date:   2015-01-16 18:11:01
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-16 19:05:44
 */

/*
Second, s: 秒, 取值范围:[0-59]
minute, m：分, 取值范围:[0-59]
hour, h: 时, 取值范围:[0-23]
time, t: 秒每日, 取值范围:[0-86399]
day, D: 日, 取值范围:[1-31]
dayOfWeek, dw, d: 日每周, 取值范围:[1-7]
dayOfYear, dy: 日每年，取值范围:[1-365]
weekOfMonth, wm: 周每月，取值范围:[1-5]
weekOfYear, wy: 周每年，取值范围:[1-52]
month, M: 月，取值范围:[1-12]
year, Y: 年，取值范围:[1970-2099]
*/

'use strict';

var later = require('later');
var moment = require('moment');

function main() {
    // everyWeekTest();
}

function parseTest() {
    var sched = later.parse.text('every 5 mins'),
        occurrences = later.schedule(sched).next(10);

    for (var i = 0; i < 10; i++) {
        console.log(occurrences[i]);
    }
}

function timeTableTest() {
    // 基础时间表（每天的10:15 和 10:45)启动
    var basic = {
        h: [10],
        m: [15, 45]
    };

    // 组合时间表（设置每日10:15am , 10:45am, 和17:40pm 启动）
    var composite = [
        basic, {
            h: [17],
            m: [30]
        }
    ];

    // 异常时间表（用于设置一下无效的日期：设置 每年1月 和 每周一，六，日 时间表无效）
    var exception = [{
        M: [1]
    }, {
        dw: [1, 6, 7]
    }];

    var sched = {
        schedules: composite,
        exceptions: exception
    };

    later.date.localTime();

    console.log("Now:" + new Date());
    var occurrences = later.schedule(sched).next(10);
    for (var i = 0; i < occurrences.length; i++) {
        console.log(occurrences[i]);
    }
}

function everyWeekTest() {
    // 每周5，4:00
    var sched = {
        schedules: [{
            dw: [6],
            h: [4]
        }]
    };
    later.date.localTime(); // 使用本地时间
    var occurrences = later.schedule(sched).next(10);
    for (var i = 0; i < occurrences.length; i++) {
        console.log(occurrences[i]);
    }

    later.setInterval(function() {
        console.log(getNowString());
    }, sched);
}

function getNowString() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
}

main();

(function test() {
    console.log('t');
}());