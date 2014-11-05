var fs = require('fs');

function main() {
    writeFileSyncTest();
}

function readyFileSyncTest() {
    console.log(fs.readFileSync('mail.js', 'utf-8'));
}

function writeFileSyncTest() {
    fs.writeFileSync('./image_dst/zz', 'daiji_star_678g', 'utf-8');
}

main();
