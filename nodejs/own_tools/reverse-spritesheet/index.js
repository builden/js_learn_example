/* 
* @Author: Bill
* @Date:   2015-03-12 19:20:43
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-13 19:28:01
*/

'use strict';

var fs = require('fs-extra');
var walk = require('walk');
var path = require('path');
var parser = require('./lib/parser.js');
var splitImg = require('./lib/splitImg.js');
var copyOpacity = require('./lib/copyOpacity.js');

function main() {
    // var srcPath = 'C:\\WorkProj\\LtcProject\\crayon\\sprite_sheet_tmp\\src';
    var srcPath = 'D:\\CandyCrushSoga\\Android\\res_output\\shared\\game\\common\\tex\\candy'
    var outPath = 'D:\\spritesheetOut';

    var walker = walk.walk(srcPath, {
        followLinks: false
    });

    // 遍历文件，包括子文件夹下的文件
    walker.on('file', function(root, stat, next) {
        if (path.extname(stat.name) === '.plist') {
            console.log('reverse ' + root + '\\' + stat.name);
            var rst = parser(root + '\\' + stat.name);
            splitImg(root + '\\' + rst.imagePath, rst.frames, outPath + '\\' + path.basename(rst.imagePath, path.extname(rst.imagePath)));
        } else if (path.extname(stat.name) === '.xml') {
            console.log('reverse ' + root + '\\' + stat.name);
            var rst = parser(root + '\\' + stat.name);

            var extname = path.extname(rst.imagePath);
            var basename = path.basename(rst.imagePath, extname);
            var alphaFile = basename + '_a' + extname;
            var rgbFile = basename + '_rgb' + '.jpg';
            copyOpacity(root + '\\' + alphaFile, root + '\\' + rgbFile, outPath + '\\' + rst.imagePath, function(err) {
                splitImg(outPath + '\\' + rst.imagePath, rst.frames, outPath + '\\' + path.basename(rst.imagePath, path.extname(rst.imagePath))); 
            });

        }
        // console.log('[f]' + root + '\\' + stat.name + ' ' + stat.size);
        next();
    });

    walker.on('end', function() {
        // console.log('walk end');
    });
}

main();