/* 
 * @Author: Bill
 * @Date:   2015-05-15 17:51:28
 * @Last Modified by:   Bill
 * @Last Modified time: 2015-05-15 18:08:17
 */

'use strict';

var path = require('path');
var glob = require('glob-all');
var gm = require('gm');
var fs = require('fs-extra');
var exec = require('child_process').exec;
var s = require('underscore.string');

var files = glob.sync(['*.ccz']);

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

function ccz2png(file, cb) {
  var name = s.strLeft(file, '.pvr.ccz');
  var cmd = 'TexturePacker.exe --opt RGBA8888 --sheet "' + name + '.png" "' + name + '.pvr.ccz"';
  exec(cmd, function(err, stdout, stderr) {
    console.log(stdout);
    if (err) {
      console.log(err);
      console.log(stderr);
    }
  });
}

files.forEach(function(file) {
  var extname = path.extname(file);
  if (extname === '.ccz') {
    ccz2png(file);
  } else if (extname === '.pvr') {
    pvr2png(file);
  } else {
    console.log('unknown ' + file);
  }
});