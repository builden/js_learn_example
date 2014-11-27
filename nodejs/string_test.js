function main() {
    replaceTest();
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

main();