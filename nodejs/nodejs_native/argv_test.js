/**
 * process.argv,  返回的是参数数组
 *   node argv_test.js test
 *   [ 'node', 'E:\\code\\js_learn_example\\nodejs\\argv_test.js', 'test' ]
 */

function main(argv) {
    console.log(argv);
}

main(process.argv.slice(2));