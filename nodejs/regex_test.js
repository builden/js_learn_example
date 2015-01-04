/**
 * 正则表达式测试
 * @Author: Bill
 * @Date:   2014-11-20 13:50:44
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-04 14:26:51
 */

var assert = require('assert');

function main() {
    // matchAndroidVerTest();
    numberTest();
}

function numberTest() {
    var str = '5';
    assert(str.match(/[0-4]/));
}

function matchAndroidVerTest() {
    var str = "Mozilla/5.0 (Linux; Android   4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36";

    // var str = "'lenovo-lenovo-a288t/1.0 linux/2.6.35.7 android/2.3.5 release/08.01.2012 browser/applewebkit533.1 (khtml, like gecko) mozilla/5.0 mobile'";

    var m = str.match(/Android([^\.]*)/i);
    var majorVer = m[1];
    majorVer = parseInt(majorVer.replace(/^\s*/, "").replace(/^\//, ""));
    console.log(majorVer);
    if (majorVer <= 2) {
        console.log("is match");
    } else {
        console.log("not match");
    }
}

main();