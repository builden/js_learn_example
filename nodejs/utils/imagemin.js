/* 
 * @Author: Bill
 * @Date:   2015-01-27 19:21:26
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-01-27 20:31:57
 */

'use strict';

var exec = require('./exec.js');
var iconv = require('iconv-lite');
var images = require('images');

var pngquantPath = exports.pngquantPath = function() {
    return __dirname + '\\pngquant.exe';
}

var jpegtranPath = exports.jpegtranPath = function() {
    return __dirname + '\\jpegtran.exe';
}

/**
 * png压缩
 * @param  {[type]}   inFile  [description]
 * @param  {[type]}   outFile [description]
 * @param  {[type]}   speed   1 - 10(数字越小，压缩率越高)
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
exports.pngMin = function(inFile, outFile, speed, cb) {
    var cmd = pngquantPath() + ' -s' + speed + ' -o ' + outFile + ' ' + inFile;
    console.log(cmd);
    var child = exec(cmd, function(err, out, code) {
        cb(err, code);
    });

    child.stdout.on('data', function(data) {
        console.log(iconv.decode(data, 'GBK').trim('\r\n'));
    });
}

/**
 * jpg压缩
 * @param  {[type]}   inFile  [description]
 * @param  {[type]}   outFile [description]
 * @param  {[type]}   quality 压缩质量，1 - 100
 * @param  {Function} cb      [description]
 * @return {[type]}           [description]
 */
exports.jpgMin = function(inFile, outFile, quality, cb) {

    // 有损压缩
    images(inFile).save(outFile, {
        quality: quality
    });

    // 无损压缩
    var cmd = jpegtranPath() + ' -copy none -optimize -progressive -outfile ' + outFile + ' ' + outFile;
    console.log(cmd);
    var child = exec(cmd, function(err, out, code) {
        cb(err, code);
    });

    child.stdout.on('data', function(data) {
        console.log(iconv.decode(data, 'GBK').trim('\r\n'));
    });
}