var crypto = require("crypto");
var fs = require("fs-extra");

var filePre = 'game.min';
function main() {
    var srcFile = filePre + '.js';
    var md5 = getMd5(fs.readFileSync(srcFile, 'utf-8'));
    md5 = md5.slice(0, 7);
    var destFile = filePre + '_' + md5 + '.js';
    fs.copySync(srcFile, destFile);

    // destFile = "http://star-cdn.zeusky.com/stick/" + destFile;
    replaceFileString('./index.html', srcFile, destFile);
}

function getMd5(content) {
    return crypto.createHash('md5').update(content).digest('hex');
}

function replaceFileString(filePath, src, dest) {
    var bakSrcFile = filePath + ".bak";
    fs.renameSync(filePath, bakSrcFile);
    var txt = fs.readFileSync(bakSrcFile, 'utf-8');
    var txt = txt.replace(new RegExp(src, "g"), dest);
    fs.writeFileSync(filePath, txt);
}

main();