// md5
var crypto = require("crypto");

function main() {
    console.log(get16DigitMd5("abc"));
}

function getMd5(content) {
    return crypto.createHash('md5').update(content).digest('hex');
}

function get16DigitMd5(content) {
    return getMd5(content).slice(8, 24);
}

main();