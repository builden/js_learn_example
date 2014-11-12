var fs = require('fs');
var path = require('path');

function main() {
    // removeFileTest();
    travel('./', function(pathname) {
      console.log(pathname);
    });
}

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}

function readyFileSyncTest() {
    console.log(fs.readFileSync('mail.js', 'utf-8'));
}

function writeFileSyncTest() {
    fs.writeFileSync('./image_dst/zz', 'daiji_star_678g', 'utf-8');
}

/**
 * 创建文件夹
 * @return {[type]} [description]
 */
function mkdirTest() {
    var testDir = './image_dst/test';
    if (!fs.existsSync(testDir)) {
        console.log('not exist');
        fs.mkdirSync(testDir);
    } else {
        console.log("dir exist");
    }
}

/**
 * 遍历文件夹，没有做递归
 * @return {[type]} [description]
 */
function dirFilesTest() {
    var files = fs.readdirSync("./image_src");
    for (i in files) {
        var extName = path.extname(files[i]);
        if (extName === '.plist') {
            console.log(path.basename(files[i], extName));
        }
    }
}

/**
 * 删除文件
 * @return {[type]} [description]
 */
function removeFileTest() {
    fs.unlinkSync('./image_dst/zz');
}

main();
