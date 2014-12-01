function main() {
    // replaceTest();
    trimTest();
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
