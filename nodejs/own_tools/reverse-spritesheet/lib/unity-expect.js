/* 
 * @Author: Bill
 * @Date:   2015-04-15 19:26:03
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-04-16 10:09:20
 */

'use strict';

var glob = require('glob-all');
var fs = require('fs-extra');
var path = require('path');
var exec = require('child_process').exec;
var _s = require('underscore.string');
var gm = require('gm');
var del = require('del');
var async = require('async');

function disunity(file, cb) {
  exec('disunity extract ' + file, function(err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      console.log('disunity ' + file + ' err:' + err);
      console.log(stderr);
    }
    cb(err, stdout);
  });
}

function ktx2png(file, cb) {
  var dirname = path.dirname(file);
  var extname = path.extname(file);
  var basename = path.basename(file, extname);
  var pngFile = path.join(dirname, basename + '.png');
  var tmpFile = path.join(dirname, basename + '.pvr');
  var cmd = 'PVRTexToolCLI -f PVRTC1_4 -i \"' + file + '\" -d \"' + pngFile + '\"';
  console.log(cmd);
  exec2png(cmd, pngFile, function() {
    del.sync(tmpFile);
    cb && cb(null);
  });
}

function pvr2png(file, cb) {
  var dirname = path.dirname(file);
  var extname = path.extname(file);
  var basename = path.basename(file, extname);
  var pngFile = path.join(dirname, basename + '.png');
  var tmpFile = path.join(dirname, basename + '.Out.pvr');
  var cmd = 'PVRTexToolCLI -f PVRTC1_4 -i \"' + file + '\"" -d \"' + pngFile + '\"';
  console.log(cmd);
  exec2png(cmd, pngFile, function() {
    del.sync(tmpFile);
    cb && cb(null);
  });
}

function exec2png(cmd, pngFile, cb) {
  exec(cmd, function(err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      console.log('PVRTexToolCLI ' + cmd + ' err:' + err);
      console.log(stderr);
    } else {
      if (fs.existsSync(pngFile)) {
        var img = gm(pngFile);
        img.flip();
        img.write(pngFile, function(err) {
          if (err) {
            console.log('gm write file error ' + err);
          }
          cb && cb(null);
        });
      }
    }
  });
}

function files2png(dir) {
  var ktxFiles = glob.sync(dir + '/**/*.ktx');
  async.mapLimit(ktxFiles, 1, function(ktxFile, cb) {
    ktx2png(ktxFile);
    cb(null);
  }, function(err, results) {
    console.log('ktx2png ' + dir + ' finish');
    execPvrFiles();
  });

  function execPvrFiles() {
    var pvrFiles = glob.sync(dir + '/**/*.pvr');
    async.mapLimit(pvrFiles, 1, function(pvrFile, cb) {
      pvr2png(pvrFile);
      cb(null);
    }, function(err, results) {
      console.log('pvr2png ' + dir + ' finish');
    });
  }
}

function pvrFiles2png(dir) {
  var files = glob.sync()
}

function main() {
  var files = glob.sync(['resources.assets', 'sharedassets*.assets', 'sharedassets*.assets.split0']);
  // console.log(files);
  files.forEach(function(file) {
    // disunity(file, function(err, stdout) {
    var dir = _s.strLeftBack(file, '.');
    if (fs.existsSync(dir)) {
      files2png(dir);
    }
    // });
  });
}

// ktx2png('sharedassets2/Texture2D/Batbug 1.ktx');
// pvr2png('sharedassets0/Texture2D/About.pvr');
main();