/* 
 * @Author: Bill
 * @Date:   2015-03-12 19:20:43
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-04-28 17:59:13
 */

'use strict';

var fs = require('fs-extra');
var path = require('path');
var parser = require('./lib/parser.js');
var splitImg = require('./lib/splitImg.js');
var copyOpacity = require('./lib/copyOpacity.js');
var glob = require('glob-all');
var _s = require('underscore.string');
var async = require('async');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

// var srcPath = "G:\\GameResAnalyse\\candycrushsodasaga_1_40_2\\Payload\\stritz.app\\res_output";

// var srcPath = "G:\\GameResAnalyse\\enfeel_birzzle_2_1_3\\Payload\\BoxDrain.app"
// var srcPath = "G:\\GameResAnalyse\\cat_from_star\\Payload\\Abduction.app";
// var srcPath = "G:\\GameResAnalyse\\Walkr_com_fourdesire_spacewalk_1_3_8_4\\Payload\\Space Walk.app";
var srcPath = 'G:\\GameResAnalyse\\stellap\\Payload\\CookiePang.app\\game';

// var srcPath = 'C:\\WorkProj\\LtcProject\\crayon\\sprite_sheet_tmp\\src';
// var srcPath = 'D:\\CandyCrushSoga\\Android\\res_output\\shared\\game\\common\\tex\\candy'
// var srcPath = 'D:\\CandyCrushSoga\\Android\\res_output';
//var srcPath = 'D:\\birzzle\\assets\\Images\\main_menu';
//
function main() {
  console.log(process.argv[2]);
  var isMinPng = process.argv[2] === 'minpng';
  if (isMinPng) {
    minPng();
  } else {
    var count = 0;
    composeFiles(function(err, results) {
      var xmlFiles = glob.sync([srcPath + '\\**\\*.xml']);
      xmlFiles.forEach(function(xmlFile) {
        var dirname = path.dirname(xmlFile);
        var extname = path.extname(xmlFile);
        var basename = path.basename(xmlFile, extname);
        var pngFile = path.join(dirname, basename + '.png');
        var outPath = path.join(dirname, basename);
        if (fs.existsSync(pngFile)) {
          var rst = parser(xmlFile);
          splitImg(pngFile, rst.frames, outPath);
          console.log('find spritesheet and split: ' + pngFile);
          count++;
        }
      });
      console.log('split count: ' + count);
    });

    // png图片压缩
    var plistFiles = glob.sync([srcPath + '/**/*.plist']);
    async.mapLimit(plistFiles, 1, function(plistFile, callback) {
      var dirname = path.dirname(plistFile);
      var extname = path.extname(plistFile);
      var basename = path.basename(plistFile, extname);
      var pngFile = path.join(dirname, basename + '.png');
      var outPath = path.join(dirname, basename);
      if (fs.existsSync(pngFile)) {
        parser(plistFile, function(err, rst) {
          if (!err) {
            console.log('find spritesheet and split: ' + pngFile);
            // console.log(rst.frames);
            splitImg(pngFile, rst.frames, outPath, callback);
            count++;
          } else {
            console.log('parse ' + plistFile + ' error');
            callback(null);
          }
        });
      } else {
        console.log(pngFile + ' not exist');
        callback(null);
      }
    }, function(err, results) {
      console.log(err);
      console.log('plist finished');
    });
    // plistFiles.forEach(function(plistFile) {

    // });
  }

  return;

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

function composeFiles(cb) {
  var rgbFiles = glob.sync([srcPath + '\\**\\*_rgb.jpg']);
  var count = 0;
  async.map(rgbFiles, function(rgbFile, callback) {
    var dirname = path.dirname(rgbFile);
    var extname = path.extname(rgbFile);
    var basename = path.basename(rgbFile, extname);
    var outName = _s.strLeftBack(basename, '_');
    var aFile = path.join(dirname, outName + '_a.png');
    var opaFile = path.join(dirname, outName + '.png');
    if (!fs.existsSync(aFile)) {
      console.log(aFile + ' is not exist');
      callback(null);
    } else {
      copyOpacity(aFile, rgbFile, opaFile, function(err) {
        console.log('compose file: ' + opaFile);
        count++;
        callback(null);
      });
    }
  }, function(err, results) {
    console.log('compose files count: ' + count);
    cb(err, results);
  });
}

function minPng(cb) {
  gulp.src(srcPath + '/**/*.png')
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 3
    }))
    .pipe(gulp.dest(srcPath));
}

main();