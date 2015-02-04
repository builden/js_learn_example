/**
 * 输入提示
 * @Author: Bill
 * @Date:   2014-12-05 14:06:02
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-05 17:27:32
 */

'use strict';

var prompt = require('prompt');
var readline = require('readline');

function main() {
    // promptTest();
    nativePromptTest();
}

function promptTest() {
    var properties = [{
        name: 'username',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Username must be only letters, spaces, or dashes'
    }, {
        name: 'password',
        hidden: true
    }];

    prompt.start();

    prompt.get(properties, function(err, result) {
        if (err) {
            return onErr(err);
        }
        console.log('Command-line input received:');
        console.log('  Username: ' + result.username);
        console.log('  Password: ' + result.password);
    });
}


function onErr(err) {
    console.log(err);
    return 1;
}

function nativePromptTest() {
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.setPrompt('IP>');
    rl.prompt();

    var count = 0;
    rl.on('line', function(line) {
        console.log('input: ' + line);
        rl.setPrompt(++count + '>');
        rl.prompt();
    });
}

main();