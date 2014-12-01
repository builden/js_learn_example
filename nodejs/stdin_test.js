var fs = require('fs');

function main() {
    // stdinTest();
    readlineTest();
}

// 标准输入流是一个可读的流,stdin流默认是暂停状态,所以想要从stdin读取必须要调用一次process.stdin.resume
function stdinTest() {
    // process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(chunk) {
        console.log(chunk.trim() + " " + chunk.trim().length);
        // process.stdout.write("data: " + chunk);
        // process.stdin.emit('end');
        process.stdin.pause();

        // process.stdin.resume();
    });

    process.stdin.on('end', function() {
        console.log('end...');
    });
}

function readlineTest() {
    var readline = require('readline');

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("What do you think of node.js? ", function(answer) {
        // TODO: Log the answer in a database
        console.log("Thank you for your valuable feedback:", answer);

        rl.question("What do you think of node.js  222? ", function(answer) {
            // TODO: Log the answer in a database
            console.log("Thank you for your valuable feedback 222:", answer);

            rl.close();
        });

        // rl.close();
    });
}

main();
