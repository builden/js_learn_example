/**
 * SpriteSheetReverse
 * 精灵序列图反向生成
 */

var gm = require('gm');
var fs = require('fs');
var path = require('path');
// var jsdom = require('jsdom');
var images = require('images');
var cheerio = require('cheerio');

var SRC_PATH = __dirname + "/image_src/";
var DEST_PATH = __dirname + "/image_dst/";

var TMP_DIR = DEST_PATH + "temp/";

function main() {
    tryMkDir(DEST_PATH);

    var files = fs.readdirSync(SRC_PATH);
    for (i in files) {
        var extName = path.extname(files[i]);
        if (extName === '.plist') {
            var baseName = path.basename(files[i], extName);
            splitPlistFile(baseName);
        }
    }
}

function splitPlistFile(fileName) {
    var plistFile = SRC_PATH + fileName + ".plist";
    // 解析xml
    // var jquery = fs.readFileSync("./bower_components/jquery/dist/jquery.js", "utf-8");
    var fileContext = fs.readFileSync(plistFile);
    var $ = cheerio.load(fileContext);

    var framesTag = $('plist').children('dict').first().children('dict').first();
    var frames = [];
    framesTag.children('key').each(function() {
        frames.push({
            file: $(this).text()
        });
    });

    var count = 0;
    framesTag.children('dict').each(function() {
        var childs = $(this).find('key').each(function() {
            var key = $(this).text();
            if (key === 'rotated') {
                frames[count][$(this).text()] = $(this).next()[0].tagName;
            } else if (key === 'frame' || key === 'sourceColorRect') {
                frames[count][$(this).text()] = parseSize($(this).next().text());
            } else if (key === 'offset' || key === 'sourceSize') {
                frames[count][$(this).text()] = parsePoint($(this).next().text());
            } else {
                frames[count][$(this).text()] = $(this).next().text();
            }
        });
        count++;
    });

    console.log(frames);
    splitImg(fileName, frames);

    /*    jsdom.env({
            file: plistFile,
            src: [jquery],
            done: function(errors, window) {
                var $ = window.$;

                var framesTag = $('plist').children('dict').first().children('dict').first();
                var frames = [];
                framesTag.children('key').each(function() {
                    frames.push({
                        file: $(this).text()
                    });
                });

                var count = 0;
                framesTag.children('dict').each(function() {
                    var childs = $(this).find('key').each(function() {
                        var key = $(this).text();
                        if (key === 'rotated') {
                            frames[count][$(this).text()] = $(this).next()[0].tagName;
                        } else if (key === 'frame' || key === 'sourceColorRect') {
                            frames[count][$(this).text()] = parseSize($(this).next().text());
                        } else if (key === 'offset' || key === 'sourceSize') {
                            frames[count][$(this).text()] = parsePoint($(this).next().text());
                        } else {
                            frames[count][$(this).text()] = $(this).next().text();
                        }
                    });
                    count++;
                });

                // console.log(frames);
                splitImg(fileName, frames);
            }
        });*/
}


/**
 * 解析字符串类型的size
 * @param  {[String]} str eg. {{2,244},{115,44}}
 * @return {[Object]} {x:2, y:244, w:115, h:44}
 */
function parseSize(str) {
    // 去掉大括号
    str = str.replace(/{/g, "").replace(/}/g, "");
    var arr = str.split(',');
    return {
        x: parseInt(arr[0]),
        y: parseInt(arr[1]),
        w: parseInt(arr[2]),
        h: parseInt(arr[3])
    }
}

/**
 * 解析字符串类型的Point
 * @param  {[String]} str eg. {2,244}
 * @return {[Object]} {x:2, y:244}
 */
function parsePoint(str) {
    // 去掉大括号
    str = str.replace(/{/g, "").replace(/}/g, "");
    var arr = str.split(',');
    return {
        x: parseInt(arr[0]),
        y: parseInt(arr[1]),
    }
}

/**
 * 切割图片
 * @param  {[type]} frames [description]
 * @return {[type]}        [description]
 * frames数组
 * [{ file: 'die3.png',
 *   frame: { x: 43, y: 406, w: 81, h: 83 },
 *   offset: { x: 0, y: 0 },
 *   rotated: 'FALSE',
 *   sourceColorRect: { x: 0, y: 0, w: 81, h: 83 },
 *   sourceSize: { x: 81, y: 83 } }, ...] // x = width , y = height
 */
function splitImg(fileName, frames) {
    var srcImgFile = SRC_PATH + fileName + ".png";
    var destDir = DEST_PATH + fileName + "/";
    tryMkDir(TMP_DIR);
    tryMkDir(destDir);

    for (i in frames) {
        var frame = frames[i];
        console.log('create ' + frame.file);

        var img = gm(srcImgFile);
        if (frame.rotated.toUpperCase() === 'TRUE') {
            // width 和 height倒置
            img.crop(frame.frame.h, frame.frame.w, frame.frame.x, frame.frame.y);
            img.rotate('#FFFF', -90);
        } else {
            img.crop(frame.frame.w, frame.frame.h, frame.frame.x, frame.frame.y);
        }

        var tmpFile = TMP_DIR + frame.file;
        img.write(tmpFile, function(err) {
            if (err) {
                return console.dir(arguments);
            }
            resizeImg(destDir, this);
        }.bind(frame));
    }
}

function resizeImg(destDir, frame) {
    var img = images(frame.sourceSize.x, frame.sourceSize.y);
    var tmpFile = TMP_DIR + frame.file;
    var offset = calcOffset(frame);
    img.draw(images(tmpFile), offset.x, offset.y);

    var destFile = destDir + frame.file;
    img.save(destFile);
}

function calcOffset(frame) {
    return {
        x: frame.sourceColorRect.x,
        y: frame.sourceColorRect.y
    };
}

function tryMkDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
}

main();