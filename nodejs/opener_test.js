/**
 * @Author: Bill
 * @Date:   2014-12-19 17:31:23
 * @Last Modified by:   Bill
 * @Last Modified time: 2014-12-19 18:17:10
 */

'use strict';

var opener = require("opener");
var exec = require('child_process').exec;

function main() {
    var dosome = exec('notepad');
    dosome.on('exit', function(code, signal) {
        console.log('exit ' + code + '_' + signal);
    });
}

function openerTest() {
    // opener("http://google.com");
    opener("notepad++", function(error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}

main();