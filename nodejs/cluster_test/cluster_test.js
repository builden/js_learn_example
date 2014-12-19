/**
 * @Author: Bill
 * @Date:   2014-12-19 16:18:43
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-19 16:23:29
 */

'use strict';

var cluster = require('cluster');

function fibo(n) {
    return n > 1 ? fibo(n - 1) + fibo(n - 2) : 1;
}

if (cluster.isMaster) {
    console.log('is parent process');
    cluster.fork();
} else {
    console.log('is child process');
    (function fiboLoop() {
        process.stdout.write(fibo(40).toString());
        setImmediate(fiboLoop);
    })();
}

(function spinForever () {
  process.stdout.write(".");
  setImmediate(spinForever);
})();