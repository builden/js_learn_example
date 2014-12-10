/**
 * @Author: Bill
 * @Date:   2014-10-13 16:38:16
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-10 10:02:47
 *
 * YYYY     2014            4 digit year
 * YY       14              2 digit year
 * Q        1..4            Quarter of year. Sets month to first month in quarter.
 * M MM     1..12           Month number
 * MMM MMMM January..Dec    Month name in locale set by moment.locale()
 * D DD     1..31           Day of month
 * Do       1st..31st       Day of month with ordinal
 * DDD DDDD 1..365          Day of year
 * X        1410715640.579  Unix timestamp
 * x        1410715640579   Unix ms timestamp
 *
 * H HH     0..23           24 hour time
 * h hh     1..12           12 hour time used with a A.
 * a A      am pm           Post or ante meridiem
 * m mm     0..59           Minutes
 * s ss     0..59           Seconds
 * S        0..9            Tenths of a second
 * SS       0..99           Hundreds of a second
 * SSS      0..999          Thousandths of a second
 * Z ZZ     +12:00          Offset from UTC as +-HH:mm, +-HHmm, or Z
 */

'use strict';

var moment = require('moment');

function main() {
    // diffTest();
    formatTest();
}

function formatTest() {
    var now = moment();
    console.log(now.format('YYYY-MM-DD HH:mm:ss.SSS'));
}

function diffTest() {
    var t1 = moment('2014-10-13 17:44:50');
    var t2 = moment('2014-10-13 17:45:51');
    var t3 = moment(new Date());
    console.log(t1.format());
    console.log(t2.format());
    console.log(t3.format());
    t3.add(6, 'second');
    console.log(t3.format());
    console.log(t2.diff(t1, "seconds"));
    console.log(t3.startOf('day'));
    console.log(t3.dayOfYear());

    if (t3.dayOfYear() === moment('2014-10-21 12:30:01').dayOfYear()) {
        console.log("is the same day");
    } else {
        console.log("is not the same day");
    }
}

main();