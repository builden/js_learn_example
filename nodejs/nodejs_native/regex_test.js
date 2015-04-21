/**
 * 正则表达式测试
 * @Author: Bill
 * @Date:   2014-11-20 13:50:44
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-04-21 14:44:17
 */

var assert = require('assert');

function main() {
    // matchAndroidVerTest();
    // numberTest();
    // getShortFaceurlTest();
    // multilineTest();
    // replaceAllTest();
    replaceSpaceTest();
}

function replaceSpaceTest() {
    var str = 'line string  line\r\n\r\n string    line   ';
    var newStr = str.replace(/\s+/g, ' ');
    console.log(newStr);
}

function replaceAllTest() {
    var str = 'cc.min.xx, cc.min.xx, cc.xx';
    // var newStr = str.replace(new RegExp('cc.min.xx', 'g'), 'cc_aa.xx');
    var newStr = str.replace(/cc.min.xx/g, 'cc_aa.xx');
    console.log(newStr);
    //=> cc_aa.xx, cc_aa.xx, cc.xx
}

function multilineTest() {
/*    var re = /(\w+)\s(\w+)/m;
    var str = "John\nline1\nline2 Smith";
    var newstr = str.replace(re, "$2\n$1");
    var m = str.match(re);
    if (m) {
        console.log(m);
    } else {
        console.log('can not match');
    }*/

/*    var re = /(\/\/=> file)(.*)(\/\/<= file)/im;
    var str = '//=> file\nline1 \nline2\n//<= file';
    var newstr = str.replace(re, '$1wahaha$3');*/

    // 注意:
    //   .可以匹配除\n以外的任意字符，但如果想匹配包含\n的字符
    //   则可以使用[\s\S]
    var re = /(\/\/=>.*\n)([\s\S]*)(\n\/\/<=.*)/m;
    var str = "//=> push sprite sheet\n\
for (var i = 0; i < 5; i++) {\n\
    g_resources.push('res/crayon_main' + i + '.plist');\n\
    g_resources.push('res/crayon_main' + i + '.png');\n\
}\n\
g_resources.push('res/crayon_bg.plist');\n\
g_resources.push('res/crayon_bg.jpg');\n\
//<= push sprite sheet";

    var m = str.match(re);
    //console.log(m);
    var newstr = str.replace(re, '$1lin1\nline2$3');
    // console.log(str);
    // console.log('--------------');
    console.log(newstr);
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

function getShortFaceurl(longUrl) {
    var m = longUrl.match(/qzopenapp\/(.*)\/50/i);
    return m ? m[1] : '';
}

function getShortFaceurlTest() {
    var str = 'http://thirdapp2.qlogo.cn/qzopenapp/63536c60195e77078d8251a5cfef7663075c1c7ef5f5ecf73a982e61258bcd5e/50';
    console.log(getShortFaceurl(str));
}

main();