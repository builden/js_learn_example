#!/usr/bin/env node

var glob = require('glob-all');
var p2p = require('./lib/pvr2png.js');
var k2p = require('./lib/ktx2png.js');
var a2p = require('./lib/atf2png.js');
var argv = require('optimist').argv;
var async = require('async');
var chalk = require('chalk');
var path = require('path');
var del = require('del');
require('shelljs/global');

// support file
// pvr - 方便ios加载的一种格式
// ccz - pvr的压缩格式，还可加密
// ktx - unity3d中的用到的格式
function main() {
  if (argv.h || argv.help) {
    console.log([
      'usage: pvr2png [options]',
      '  -g --glob     glob files',
      '  -d --dir      set dest dir [cwd]',
      '  -h --help     print the help list'
    ]);
    return;
  }

  var files = null;
  if (argv.g || argv.glob) {
    var gFile = argv.g || argv.glob;
    var files = glob.sync(gFile);
  } else {
    var dir = argv.d || argv.dir || process.cwd();
    files = glob.sync([path.join(dir, '**/*.pvr'), path.join(dir, '**/*.pvr.ccz')]);
  }

  if (files) {
    processFiles(files);
  } else {
    console.log("can't find any pvr|ccz|ktx files");
  }
}

function processFiles(files) {
  var pvrFiles = [];
  var cczFiles = [];
  var ktxFiles = [];
  var atfFiles = [];
  files.forEach(function(file) {
    var ext = path.extname(file);
    if (ext === '.pvr') {
      pvrFiles.push(file);
    } else if (ext === '.ccz') {
      cczFiles.push(file);
    } else if (ext === '.ktx') {
      ktxFiles.push(file);
    } else if (ext === '.atf') {
      atfFiles.push(file);
    }
  });

  var pvrLen = pvrFiles.length;
  var cczLen = cczFiles.length;
  var ktxLen = ktxFiles.length;
  var atfLen = atfFiles.length;
  if (pvrLen !== 0 || cczLen !== 0) {
    if (!which('TexturePacker')) {
      console.log("can't find global module TexturePacker");
      return;
    }
  }
  if (ktxLen !== 0) {
    if (!which('PVRTexToolCLI')) {
      console.log("can't find global module PVRTexToolCLI");
      return;
    }
  }

  async.series({
    pvr: function(callback) {
      pvr2pngFiles(pvrFiles, function(err, results) {
        if (pvrLen !== 0) {
          console.log(chalk.red('process ' + pvrLen + ' pvr files complete'));
        }
        callback(null, pvrFiles.length);
      });
    },
    ccz: function(callback) {
      pvr2pngFiles(cczFiles, function(err, results) {
        if (cczLen !== 0) {
          console.log(chalk.red('process ' + cczLen + ' ccz files complete'));
        }
        callback(null, cczFiles.length);
      });
    },
    ktx: function(callback) {
      ktx2pngFiles(ktxFiles, function(err, results) {
        if (ktxLen !== 0) {
          console.log(chalk.red('process ' + ktxLen + ' ktx files complete'));
        }
        callback(null, ktxFiles.length);
      });
    },
    atf: function(callback) {
      atf2pngFiles(atfFiles, function(err, results) {
        if (atfFiles !== 0) {
          console.log(chalk.red('process ' + atfLen + ' atf files complete'));
        }
        callback(null, atfFiles.length);
      });
    }
  }, function(err, results) {
    del.sync('out.plist');
  });
}

function pvr2pngFiles(files, cb) {
  async.mapLimit(files, 2, function(file, callback) {
    p2p(file, callback);
  }, cb);
}

function ktx2pngFiles(files, cb) {
  async.mapLimit(files, 2, function(file, callback) {
    k2p(file, callback);
  }, cb);
}

function atf2pngFiles(files, cb) {
  async.mapLimit(files, 2, function(file, callback) {
    a2p(file, callback);
  }, cb);
}

main();
