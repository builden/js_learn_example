/**
 * @Author: Bill
 * @Date:   2014-11-05 19:36:09
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-26 17:13:18
 *
 * https://github.com/jprichardson/node-fs-extra
 */

var fs = require('fs-extra');
var path = require('path');
var moment = require('moment');
var walk = require('walk');

function main() {
    // removeFileTest();
    // travel('./', function(pathname) {
    //   console.log(pathname);
    // });
    // fs.copySync('./image_src/140.jpg', './image_src/140.jpg.bak');
    // statTest();
    walkTest();
}

function walkTest() {
    walker = walk.walk('.', {
        followLinks: false,
        filters: ['.*js']
    });

/*    walker.on('directories', function(root, stats, next) {
        stats.forEach(function(stat) {
            console.log('[ds]', path.join(root, stat.name));
        });
        next();
    });*/

    // 遍历目录
    walker.on('directory', function(root, stat, next) {
        console.log('[d]', path.join(root, stat.name));
        next();
    });

    // 遍历文件，包括子文件夹下的文件
    walker.on('file', function(root, stat, next) {
        console.log('[f]' + root + '\\' + stat.name + ' ' + stat.size);
        next();
    });

    walker.on('end', function() {
        console.log('walk end');
    });
}

/**
 * 文件夹遍历
 * @param  {[type]}   dir      [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function(file) {
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

function statTest() {
    // var file = './mail.js';
    // var file = 'xxx.df';
    var file = 'image_dst';
    fs.stat(file, function(err, stats) {
        if (err) {
            console.log('file not exist: ' + err);
        } else {
            if (stats.isDirectory()) {
                console.log('isDirectory');
            } else {
                console.log('lastmodifytime is ' + moment(stats.mtime).format('YYYY-MM-DD HH:mm:ss'));
            }
        }
    });
}

main();