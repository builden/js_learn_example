/* 
* @Author: Bill
* @Date:   2015-03-24 16:07:56
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-24 16:18:22
*/

'use strict';

var fibonacci = require('./lib/fibonacci.js');

function main() {
    if (process.argv.length < 3) {
        console.log('need num canshu');
        return;
    }
    var num = Number(process.argv[2]);
    console.log('fibonacci(' + num + ') is ' + fibonacci(num));
}

main();